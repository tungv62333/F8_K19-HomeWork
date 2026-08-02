import { useEffect, useState } from "react";
import { useParams } from "react-router";
import api from "../../plugins/axios";
import styles from "./index.module.css";
import { useNavigate } from "react-router";
import ProductCard from "../../components/ProductCard";
import HeaderBar from "../../components/HeaderBar";

function ProductDetail() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [featuredProducts, setFeaturedProducts] = useState([]);

    const getProduct = async () => {
        try {
            const { data } = await api.get(`products/${id}`);
            setProduct(data);
        } catch (error) {
            console.log(error);
        }
    };

    const getFeaturedProducts = async () => {
        try {
            const { data } = await api.get("products");

            const products = data
                .filter((p) => String(p.id) !== String(id))
                .sort(() => Math.random() - 0.5)
                .slice(0, 4);

            setFeaturedProducts(products);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getProduct();
        getFeaturedProducts();
    }, [id]);

    if (!product) {
        return <h2>Loading...</h2>;
    }

    console.log(product);

    return (
        <>
            <HeaderBar />
            <div className={styles.page}>
                <div className={styles.detailContainer}>
                    <div className={styles.productDetail}>
                        <div className={styles.productImage}>
                            <img src={product.image} alt={product.title} />
                        </div>

                        <div className={styles.productInfo}>
                            <button
                                className={styles.backButton}
                                onClick={() => navigate("/products")}
                            >
                                ← Back to Products
                            </button>

                            <span className={styles.category}>
                                {product.category}
                            </span>

                            <h1 className={styles.title}>{product.title}</h1>

                            <h2 className={styles.price}>${product.price}</h2>

                            <div className={styles.rating}>
                                <span>⭐</span>
                                <span>{product.rating.rate} / 5</span>
                                <span className={styles.review}>
                                    ({product.rating.count} reviews)
                                </span>
                            </div>

                            <p className={styles.description}>
                                {product.description}
                            </p>

                            <div className={styles.actionBox}>
                                <button className={styles.btnCart}>
                                    Add To Cart
                                </button>

                                <button className={styles.btnBuy}>
                                    Buy Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.featuredContainer}>
                    <h2 className={styles.featuredTitle}>Featured Products</h2>

                    <div className={styles.featuredGrid}>
                        {featuredProducts.map((p) => (
                            <ProductCard
                                key={p.id}
                                product={p}
                                onClickProductCart={() =>
                                    navigate(`/products/${p.id}`)
                                }
                                onClickAddToCard={() => {}}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductDetail;
