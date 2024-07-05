import { CartProductType } from "@/app/product/[productid]/ProductDetails";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

type CartContextType = {
    cartTotalQty: number;
    cartTotalAmount: number;
    cartProducts: CartProductType[];
    handleAddProductToCart: (product: CartProductType) => void;
    handleRemoveProductFromCart: (product: CartProductType) => void;
    handleCartQtyIncrease: (product: CartProductType) => void;
    handleCartQtyDecrease: (product: CartProductType) => void;
    handleClearCart: () => void;
    paymentIntent: string | null;
    handleSetPaymentIntent: (val: string | null ) => void;
};

export const CartContext = createContext<CartContextType | null>(null);

interface Props {
    [propName: string]: any;
}

export const CartContextProvider: React.FC<Props> = (props) => {
    const [cartTotalQty, setCartTotalQty] = useState(0);
    const [cartTotalAmount, setCartTotalAmount] = useState(0)
    const [cartProducts, setCartProducts] = useState<CartProductType[] | null>([]);
    const [paymentIntent, setPaymentIntent] = useState<string | null>(null)
     

    // console.log('qty', cartTotalQty)
    // console.log('amount', cartTotalAmount)
    useEffect(() => {
        const cartItems = localStorage.getItem("eShopCartItems");
        const parsedCartProducts: CartProductType[] = cartItems ? JSON.parse(cartItems) : [];
        setCartProducts(parsedCartProducts);
        const totalQty = parsedCartProducts.reduce((total, product) => total + product.quantity, 0);
       const eShopPaymentIntent:any = localStorage.getItem("eShopPaymentIntent");
       const paymentIntent: string | null = JSON.parse(eShopPaymentIntent);
        setCartTotalQty(totalQty);
        setPaymentIntent(paymentIntent)
    }, []);

    useEffect(() => {
        const getTotals = () => {

            if(cartProducts){ 
          const { total, qty } = cartProducts?.reduce(
            (acc, item) => {
                const itemTotal = item.price * item.quantity

                acc.total += itemTotal
                acc.qty += item.quantity 

                return acc;
            }, {
                total: 0,
                qty: 0,

            });
            setCartTotalQty(qty)
            setCartTotalAmount(total)

        };
    };
        getTotals()
    }, [cartProducts])

    const handleAddProductToCart = useCallback((product: CartProductType) => {
        setCartProducts((prev) => {
            const updatedCart = [...prev, product];
            toast.success("Product added to cart");
            localStorage.setItem("eShopCartItems", JSON.stringify(updatedCart));
            return updatedCart;
        });
        setCartTotalQty((prev) => prev + product.quantity);
    }, []);

    const handleRemoveProductFromCart = useCallback((product: CartProductType) => {
        setCartProducts((prev) => {
            const updatedCart = prev.filter((item) => item.id !== product.id);
            toast.success("Product removed from cart");
            localStorage.setItem("eShopCartItems", JSON.stringify(updatedCart));
            return updatedCart;
        });
        setCartTotalQty((prev) => prev - product.quantity);
    }, []);

    const handleCartQtyIncrease = useCallback((product: CartProductType) => {
        setCartProducts((prev) => {
            const updatedCart = prev.map((item) =>
                item.id === product.id && item.quantity < 99
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
            localStorage.setItem("eShopCartItems", JSON.stringify(updatedCart));
            return updatedCart;
        });
        setCartTotalQty((prev) => prev + 1);
    }, []);

    const handleCartQtyDecrease = useCallback((product: CartProductType) => {
        setCartProducts((prev) => {
            const updatedCart = prev.map((item) =>
                item.id === product.id && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            );
            localStorage.setItem("eShopCartItems", JSON.stringify(updatedCart));
            return updatedCart;
        });
        setCartTotalQty((prev) => prev - 1);
    }, []);

    const handleClearCart = useCallback(() => {
        setCartProducts([]);
        setCartTotalQty(0);
        localStorage.setItem("eShopCartItems", JSON.stringify([]));
    }, [cartProducts]);

    const handleSetPaymentIntent = useCallback((val: string | null) => {
    setPaymentIntent(val);
    localStorage.setItem("eShopPaymentIntent", JSON.stringify(val));

}, [paymentIntent]);

    const value = {
        cartTotalQty,
        cartTotalAmount,
        cartProducts,
        handleAddProductToCart,
        handleRemoveProductFromCart,
        handleCartQtyIncrease,
        handleCartQtyDecrease,
        handleClearCart,
        paymentIntent,
        handleSetPaymentIntent ,
    };

    return <CartContext.Provider value={value} {...props} />;
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === null) {
        throw new Error("useCart must be used within a CartContextProvider");
    }
    return context;
};
