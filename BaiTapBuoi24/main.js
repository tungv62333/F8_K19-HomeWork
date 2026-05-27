console.log("SCRIPT RUN");
// Fetch product data from API
const getProducts = async () => {
    const response = await fetch("https://fakestoreapi.com/products");
    const productsData = await response.json();
    return productsData;
};

// Fetch cart data from API
const getCart = async () => {
    const response = await fetch("http://localhost:3000/cart");
    const cartData = await response.json();
    return cartData;
};

// Generate category count data
const getCategoryStats = (products) => {
    const categoryMap = {};

    products.forEach((product) => {
        categoryMap[product.category] =
            (categoryMap[product.category] || 0) + 1;
    });

    const categoryStats = [
        {
            category: "Tất cả sản phẩm",
            count: products.length,
        },
    ];

    for (const category in categoryMap) {
        categoryStats.push({
            category,
            count: categoryMap[category],
        });
    }

    return categoryStats;
};

// Render category list to sidebar
const renderCategoryList = async () => {
    const products = await getProducts();
    const categoryStats = getCategoryStats(products);
    const categoryHTML = categoryStats
        .map((categoryItem) => {
            return `
                <li class="category-item">
                    <span class="category-item__name"
                        >${categoryItem.category}</span
                    >
                    <span class="category-item__count"
                        >${categoryItem.count}</span
                    >
                </li>
            `;
        })
        .join("");

    document.querySelector(".category-list").innerHTML = categoryHTML;
};

// Generate HTML for a product card
const createProductCardHTML = (product) => {
    return `
        <div class="product-card">
            <div class="product-card__image-wrapper">
                <img
                    class="product-card__image"
                    src="${product.image}"
                    alt="${product.title}"
                />
            </div>
            <div class="product-card__category">${product.category}</div>
            <div class="product-card__title">${product.title}</div>
            <div class="product-card__rating">
                <div class="product-card__star">
                    <i class="product-card__star--icon fa-solid fa-star"></i>
                </div>
                <div class="product-card__rate">${product.rating.rate}</div>
                <div class="product-card__count">(${product.rating.count})</div>
            </div>
            <div class="product-card__footer">
                <div class="product-card__price">$${product.price}</div>
                <button class="product-card__cart-btn" onclick="addToCart(${product.id})">
                    <i
                        class="product-card__cart-btn--icon fa-solid fa-cart-shopping"
                    ></i>
                </button>
            </div>
        </div>
    `;
};

// Render product cards to product grid
const renderProductCards = async () => {
    const products = await getProducts();
    const productHTML = products
        .map((product) => createProductCardHTML(product))
        .join("");
    document.querySelector(".product-grid").innerHTML = productHTML;
};

// Render cart count to header
const renderCartCount = async () => {
    const cart = await getCart();
    let cartCount = 0;
    cart.forEach((cartItem) => {
        cartCount += cartItem.quantity;
    });
    const cartCountElement = document.querySelector(".header__cart-count");
    cartCountElement.textContent = cartCount;
    cartCountElement.style.display = cartCount > 0 ? "flex" : "none";
};

// Add item to cart
const addToCart = async (productId) => {
    await fetch("http://localhost:3000/cart", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            productId,
            quantity: 1,
        }),
    });
    renderCartCount();
};

renderCartCount();
renderCategoryList();
renderProductCards();
