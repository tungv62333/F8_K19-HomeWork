import "./ProductCard.css";
import { FaHeart } from "react-icons/fa";

function ProductCard({ product }) {
    return (
        <div className="product-card">
            <div className="card-badge">
                <span className="discount">Giảm {product.discount}%</span>

                <span className="installment">Trả góp 0%</span>
            </div>

            <div className="card-image">
                <img src={product.image} alt={product.name} />
            </div>

            <div className="card-body">
                <h3 className="product-name">{product.name}</h3>

                <div className="pre-order">Hàng đặt trước</div>

                <div className="price-row">
                    <span className="price">
                        {product.price.toLocaleString()}đ
                    </span>

                    <span className="old-price">
                        {product.oldPrice.toLocaleString()}đ
                    </span>
                </div>

                <div className="smember">
                    Smember giảm thêm {product.memberDiscount.toLocaleString()}đ
                </div>

                <div className="installment-box">
                    Trả góp 0% - 0đ phụ phí - 0đ trả trước - kỳ hạn đến 12 tháng
                </div>
            </div>

            <div className="card-footer">
                <FaHeart />
            </div>
        </div>
    );
}

export default ProductCard;
