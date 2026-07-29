import "./ProductList.css";

import products from "../../data/products";
import ProductCard from "../ProductCard/ProductCard";

function ProductList() {
    return (
        <div className="product-list">
            {products.map((product) => (
                <ProductCard product={product} />
            ))}
        </div>
    );
}

export default ProductList;
