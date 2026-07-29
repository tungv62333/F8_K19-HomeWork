import "./BrandFilter.css";
import { useState } from "react";

const brands = [
    {
        id: 0,
        name: "Tất cả",
    },
    {
        id: 1,
        name: "Apple",
    },
    {
        id: 2,
        name: "Samsung",
    },
    {
        id: 3,
        name: "Xiaomi",
    },
    {
        id: 4,
        name: "OPPO",
    },
    {
        id: 5,
        name: "TECNO",
    },
    {
        id: 6,
        name: "HONOR",
    },
    {
        id: 7,
        name: "realme",
    },
    {
        id: 8,
        name: "Nokia",
    },
    {
        id: 9,
        name: "Infinix",
    },
];

function BrandFilter() {
    const [active, setActive] = useState(0);

    return (
        <div className="brand-filter">
            {brands.map((brand) => (
                <button
                    className={
                        active === brand.id ? "brand-item active" : "brand-item"
                    }
                    onClick={() => setActive(brand.id)}
                >
                    {brand.name}
                </button>
            ))}
        </div>
    );
}

export default BrandFilter;
