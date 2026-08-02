import { useEffect, useState } from "react";
import api from "../../plugins/axios";
import { useNavigate } from "react-router";
import ProductCard from "../../components/ProductCard/index.jsx";
import HeaderBar from "../../components/HeaderBar/index.jsx";

function Products() {
    const [products, setProducts] = useState([]);
    const [productsInCart, setProductsInCart] = useState([]);

    const navigate = useNavigate();

    const getProducts = async () => {
        const { data } = await api.get("products");
        setProducts(data);
    };

    const onAddToCart = (productId) => {
        if (productsInCart.includes(productId)) return;
        setProductsInCart([...productsInCart, productId]);
    };

    const onProductCart = (productId) => {
        navigate(`/products/${productId}`);
    };

    console.log(products);

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <>
            <HeaderBar total={productsInCart.length} />

            <main className="container">
                <h1>Products</h1>

                <div className="product-grid">
                    {products.map((p) => (
                        <ProductCard
                            product={p}
                            onClickAddToCard={onAddToCart}
                            onClickProductCart={onProductCart}
                        />
                    ))}
                </div>
            </main>
        </>
    );
}

export default Products;
