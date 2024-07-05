import React from "react";
import { CartProductType } from "../product/[productid]/ProductDetails";
import { FormatPrice } from "@/utils/FormatPrice";
import Link from "next/link";
import { truncateText } from "@/utils/truncateText";
import Image from "next/image";
import SetQuantity from "../components/products/SetQuantity";
import { useCart } from "@/hooks/useCart";

interface ItemContentProps {
    item: CartProductType;
}

const ItemContent: React.FC<ItemContentProps> = ({ item }) => {
    const { handleRemoveProductFromCart, handleCartQtyIncrease, handleCartQtyDecrease } = useCart();

    return (
        <div className="grid grid-cols-5 text-xs md:text-sm border-t-[1.5px] border-slate-200 py-4 items-center">
            <div className="col-span-2 justify-self-start flex gap-2 md:gap-4">
                <Link href={`product/${item.id}`}>
                    <div className="relative w-[70px] aspect-square">
                        <Image src={item.selectedImg.image} alt={item.name} layout="fill" className="object-contain" />
                    </div>
                </Link>
                <div className="flex flex-col">
                    <Link href={`product/${item.id}`}>
                        <span className="truncate">{truncateText(item.name)}</span>
                    </Link>
                    <div>{item.selectedImg.color}</div>
                    <button className="text-slate-500 underline" onClick={() => handleRemoveProductFromCart(item)}>
                        Remove
                    </button>
                </div>
            </div>
            <div className="justify-self-center">{FormatPrice(item.price)}</div>
            <div className="justify-self-center">
                <SetQuantity
                    cartCounter={true}
                    cartProduct={item}
                    handleQtyIncrease={() => handleCartQtyIncrease(item)}
                    handleQtyDecrease={() => handleCartQtyDecrease(item)}
                />
            </div>
            <div className="justify-self-end font-semibold">
                {FormatPrice(item.price * item.quantity)}
            </div>
        </div>
    );
}

export default ItemContent;
