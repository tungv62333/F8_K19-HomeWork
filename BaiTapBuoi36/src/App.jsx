import "./App.css";

import SidebarBanner from "./components/SidebarBanner/SidebarBanner";
import CategoryTabs from "./components/CategoryTabs/CategoryTabs";
import CategoryMenu from "./components/CategoryMenu/CategoryMenu";
import BrandFilter from "./components/BrandFilter/BrandFilter";
import ProductList from "./components/ProductList/ProductList";

function App() {
    return (
        <div className="app">
            <div className="container">
                <div className="sidebar">
                    <SidebarBanner />
                </div>
                <div className="content">
                    <CategoryTabs />
                    <CategoryMenu />
                    <BrandFilter />
                    <ProductList />
                </div>
            </div>
        </div>
    );
}

export default App;
