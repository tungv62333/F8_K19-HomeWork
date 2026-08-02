import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Products from "./pages/Products";
import HomePage from "./pages/index.jsx";
import ProductDetail from "./pages/ProductDetail";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
    },
    {
        path: "/products",
        element: <Products />,
    },
    {
        path: "/products/:id",
        element: <ProductDetail />,
    },
]);

createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />,
);
