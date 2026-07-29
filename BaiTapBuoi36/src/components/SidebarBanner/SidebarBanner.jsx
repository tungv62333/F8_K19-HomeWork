import "./SidebarBanner.css";

const banners = [
    {
        id: 1,
        image: "https://cdn2.cellphones.com.vn/insecure/rs:fill:321:795/q:100/plain/https://media-asset.cellphones.com.vn/page_configs/01KWE8EDQE54YXMHVKP0GA8HJD.png",
    },
    {
        id: 2,
        image: "https://cdn2.cellphones.com.vn/insecure/rs:fill:321:795/q:100/plain/https://media-asset.cellphones.com.vn/page_configs/01KY4ADSCAZ3WEQYD53JRBYWS5.png",
    },
];

function SidebarBanner() {
    return (
        <div className="sidebar-banner">
            {banners.map((banner) => (
                <div className="banner-item" key={banner.id}>
                    <img src={banner.image} alt="Banner" />
                </div>
            ))}
        </div>
    );
}

export default SidebarBanner;
