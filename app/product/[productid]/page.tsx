import Container from "@/app/components/container";
import { product } from "@/utils/product";
import ProductDetails from "./ProductDetails";
import ListRating from "./ListRating";
// import { products } from "@/utils/products";

interface IPrams {
    productId?: string

}

const Product = ({ params }: { params: IPrams }) => {
    console.log("params", params);
//   const product = products.find((item) => item.id === 
// params.productId)
    return (  
        <Container>
            <ProductDetails product = {product}/>
            <div className="flex flex-col mt-20 gap-4">
                <div>rating</div>
                <ListRating product={product} />
            </div>
        </Container>
    );
}
 
export default Product; 