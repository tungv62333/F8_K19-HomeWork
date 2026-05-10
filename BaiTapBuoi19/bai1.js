const products = [
    { id: 1, name: "iPhone", price: 2000 },
    { id: 2, name: "Samsung", price: 1500 },
    { id: 3, name: "Xiaomi", price: 1000 },
    { id: 4, name: "Oppo", price: 1200 },
];

const orders = [
    {
        id: 1,
        items: [
            { productId: 1, quantity: 2 },
            { productId: 2, quantity: 1 },
        ],
    },
    {
        id: 2,
        items: [
            { productId: 1, quantity: 1 },
            { productId: 3, quantity: 3 },
        ],
    },
    {
        id: 3,
        items: [
            { productId: 2, quantity: 2 },
            { productId: 4, quantity: 1 },
        ],
    },
];

function createProductPriceMap(products) {
    const productPriceMap = {};

    for (let i = 0; i < products.length; i++) {
        const product = products[i];

        productPriceMap[product.id] = product.price;
    }

    return productPriceMap;
}

function findBestSellingProduct(products, orders) {
    const productPriceMap = createProductPriceMap(products);

    const productRevenueMap = {};

    for (let i = 0; i < orders.length; i++) {
        const order = orders[i];

        for (let j = 0; j < order.items.length; j++) {
            const item = order.items[j];

            const revenue = productPriceMap[item.productId] * item.quantity;

            if (productRevenueMap[item.productId] === undefined) {
                productRevenueMap[item.productId] = 0;
            }

            productRevenueMap[item.productId] += revenue;
        }
    }

    let bestSellingProduct;
    let highestRevenue = 0;

    for (let i = 0; i < products.length; i++) {
        const product = products[i];

        const revenue = productRevenueMap[product.id];

        if (revenue > highestRevenue) {
            highestRevenue = revenue;
            bestSellingProduct = product;
        }
    }

    return bestSellingProduct;
}

let bestSellingProduct = findBestSellingProduct(products, orders);

console.log(`Sản phẩm ${bestSellingProduct.name} có doanh thu cao nhất`);
