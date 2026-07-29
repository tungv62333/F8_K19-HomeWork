import "./CategoryTabs.css";
import { useState } from "react";

const tabs = [
    {
        id: 1,
        name: "Điện thoại",
    },
    {
        id: 2,
        name: "Máy tính bảng",
    },
];

function CategoryTabs() {
    const [active, setActive] = useState(1);

    return (
        <div className="category-tabs">
            {tabs.map((tab) => (
                <button
                    className={active === tab.id ? "tab active" : "tab"}
                    onClick={() => setActive(tab.id)}
                >
                    {tab.name}
                </button>
            ))}
        </div>
    );
}

export default CategoryTabs;
