import "./CategoryMenu.css";

import {
    FaRobot,
    FaGamepad,
    FaCamera,
    FaBatteryFull,
    FaMobileAlt,
    FaFire,
} from "react-icons/fa";

const categories = [
    {
        id: 1,
        icon: <FaRobot />,
        title: "Điện thoại AI",
    },
    {
        id: 2,
        icon: <FaGamepad />,
        title: "Gaming",
    },
    {
        id: 3,
        icon: <FaCamera />,
        title: "Chụp ảnh đẹp",
    },
    {
        id: 4,
        icon: <FaBatteryFull />,
        title: "Pin khủng",
    },
    {
        id: 5,
        icon: <FaMobileAlt />,
        title: "Điện thoại gập",
    },
    {
        id: 6,
        icon: <FaFire />,
        title: "Phổ thông",
    },
];

function CategoryMenu() {
    return (
        <div className="category-menu">
            {categories.map((item) => (
                <button className="category-item">
                    <span className="icon">{item.icon}</span>
                    <span className="title">{item.title}</span>
                </button>
            ))}
        </div>
    );
}

export default CategoryMenu;
