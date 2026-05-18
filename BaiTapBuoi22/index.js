const employees = [
    { id: 1, name: "Alice", age: 23, status: "working" },
    { id: 3, name: "Bob", age: 25, status: "working" },
    { id: 6, name: "John", age: 27, status: "working" },
    { id: 8, name: "David", age: 23, status: "quit_job" },
    { id: 10, name: "Eve", age: 20, status: "working" },
];

const products = [
    { id: 1, name: "Phone", price: 1200 },
    { id: 2, name: "Laptop", price: 3000 },
    { id: 3, name: "Tab", price: 2000 },
    { id: 4, name: "PC", price: 800 },
    { id: 5, name: "Monitor", price: 1500 },
];

const orders = [
    { id: 1, employeeId: 1, productId: 4, quantity: 1 },
    { id: 2, employeeId: 3, productId: 2, quantity: 4 },
    { id: 3, employeeId: 1, productId: 5, quantity: 3 },
    { id: 4, employeeId: 6, productId: 1, quantity: 2 },
    { id: 5, employeeId: 3, productId: 5, quantity: 3 },
    { id: 6, employeeId: 8, productId: 1, quantity: 1 },
    { id: 7, employeeId: 10, productId: 3, quantity: 2 },
];

// ==================================================================================

// build map
function toIdMap(items) {
    const idMap = {};

    for (const item of items) {
        const { id, ...rest } = item;
        idMap[id] = rest;
    }

    return idMap;
}

// employee map
const employeeByIdMap = toIdMap(employees);

// product map
const productByIdMap = toIdMap(products);

// ==================================================================================

// Build stats map
const buildStatsMap = (orders) => {
    if (!orders || orders.length === 0) {
        return {
            productStatsMap: {},
            employeeStatsMap: {},
        };
    }

    let productStatsMap = {};
    let employeeStatsMap = {};

    for (const order of orders) {
        const revenue = order.quantity * productByIdMap[order.productId].price;

        // Product stats
        if (!productStatsMap[order.productId]) {
            productStatsMap[order.productId] = {
                soldQuantity: 0,
                revenue: 0,
            };
        }

        productStatsMap[order.productId].soldQuantity += order.quantity;

        productStatsMap[order.productId].revenue += revenue;

        // Employee stats
        if (!employeeStatsMap[order.employeeId]) {
            employeeStatsMap[order.employeeId] = {
                soldQuantity: 0,
                revenue: 0,
                productRevenueMap: {},
            };
        }

        employeeStatsMap[order.employeeId].soldQuantity += order.quantity;

        employeeStatsMap[order.employeeId].revenue += revenue;

        if (
            employeeStatsMap[order.employeeId].productRevenueMap[
                order.productId
            ]
        ) {
            employeeStatsMap[order.employeeId].productRevenueMap[
                order.productId
            ] += revenue;
        } else {
            employeeStatsMap[order.employeeId].productRevenueMap[
                order.productId
            ] = revenue;
        }
    }

    return {
        productStatsMap,
        employeeStatsMap,
    };
};

const { productStatsMap, employeeStatsMap } = buildStatsMap(orders);

// ==================================================================================

// ex01
const filterWorkingEmployees = (employees) => {
    if (!employees || employees.length === 0) {
        return [];
    }

    return employees.filter((employee) => employee.status === "working");
};

const workingEmployees = filterWorkingEmployees(employees);

console.log(`1. Danh sách nhân viên đang làm việc là:`);
console.log(workingEmployees);

// ==================================================================================

// ex02
const findOldestEmployee = (employees) => {
    if (!employees || employees.length === 0) {
        return null;
    }

    let oldestEmployee = employees[0];

    for (const employee of employees) {
        if (employee.age > oldestEmployee.age) {
            oldestEmployee = employee;
        }
    }

    return oldestEmployee;
};

const oldestEmployee = findOldestEmployee(employees);

console.log(`2. Nhân viên lớn tuổi nhất là: ${oldestEmployee.name}`);

// ==================================================================================

// ex03
const findCheapestProduct = (products) => {
    if (!products || products.length === 0) {
        return null;
    }

    let cheapestProduct = products[0];

    for (const product of products) {
        if (product.price < cheapestProduct.price) {
            cheapestProduct = product;
        }
    }

    return cheapestProduct;
};

const cheapestProduct = findCheapestProduct(products);

console.log(`3. Sản phẩm có giá rẻ nhất là: ${cheapestProduct.name}`);

// ==================================================================================

// ex04
const findBestSellingProduct = (productStatsMap, products) => {
    let bestSellingProductId = null;

    let highestSoldQuantity = 0;

    for (const productId in productStatsMap) {
        if (productStatsMap[productId].soldQuantity > highestSoldQuantity) {
            highestSoldQuantity = productStatsMap[productId].soldQuantity;

            bestSellingProductId = productId;
        }
    }

    return products.find((product) => product.id == bestSellingProductId);
};

const bestSellingProduct = findBestSellingProduct(productStatsMap, products);

console.log(`4. Sản phẩm bán chạy nhất là: ${bestSellingProduct.name}`);

// ==================================================================================

// ex05
const findHighestRevenueProduct = (productStatsMap, products) => {
    let highestRevenue = 0;

    let highestRevenueProductId = null;

    for (const productId in productStatsMap) {
        if (productStatsMap[productId].revenue > highestRevenue) {
            highestRevenue = productStatsMap[productId].revenue;

            highestRevenueProductId = productId;
        }
    }

    return products.find((product) => product.id == highestRevenueProductId);
};

const highestRevenueProduct = findHighestRevenueProduct(
    productStatsMap,
    products,
);

console.log(
    `5. Sản phẩm có doanh thu cao nhất là: ${highestRevenueProduct.name}`,
);

// ==================================================================================

// ex06
const findBestSellingEmployee = (employeeStatsMap, employees) => {
    let bestSellingEmployeeId = null;

    let highestSoldQuantity = 0;

    for (const employeeId in employeeStatsMap) {
        if (employeeStatsMap[employeeId].soldQuantity > highestSoldQuantity) {
            highestSoldQuantity = employeeStatsMap[employeeId].soldQuantity;

            bestSellingEmployeeId = employeeId;
        }
    }

    return employees.find((employee) => employee.id == bestSellingEmployeeId);
};

const bestSellingEmployee = findBestSellingEmployee(
    employeeStatsMap,
    employees,
);

console.log(`6. Nhân viên bán nhiều hàng nhất là: ${bestSellingEmployee.name}`);

// ==================================================================================

// ex07
const findHighestRevenueEmployee = (employeeStatsMap, employees) => {
    let highestRevenue = 0;

    let highestRevenueEmployeeId = null;

    for (const employeeId in employeeStatsMap) {
        if (employeeStatsMap[employeeId].revenue > highestRevenue) {
            highestRevenue = employeeStatsMap[employeeId].revenue;

            highestRevenueEmployeeId = employeeId;
        }
    }

    return employees.find(
        (employee) => employee.id == highestRevenueEmployeeId,
    );
};

const highestRevenueEmployee = findHighestRevenueEmployee(
    employeeStatsMap,
    employees,
);

console.log(
    `7. Nhân viên có doanh thu cao nhất là: ${highestRevenueEmployee.name}`,
);

// ==================================================================================

// ex08
const findHighestRevenueProductByEmployee = (employeeStatsMap) => {
    let highestRevenueProductMap = {};

    for (const employeeId in employeeStatsMap) {
        let highestRevenue = 0;

        let highestRevenueProduct = null;

        const productRevenueMap =
            employeeStatsMap[employeeId].productRevenueMap;

        for (const productId in productRevenueMap) {
            if (productRevenueMap[productId] > highestRevenue) {
                highestRevenue = productRevenueMap[productId];

                highestRevenueProduct = productByIdMap[productId];
            }
        }

        highestRevenueProductMap[employeeByIdMap[employeeId].name] =
            highestRevenueProduct.name;
    }

    return highestRevenueProductMap;
};

const highestRevenueProductMap =
    findHighestRevenueProductByEmployee(employeeStatsMap);

console.log(`8. Sản phẩm doanh thu cao nhất của mỗi nhân viên:`);
console.log(highestRevenueProductMap);

// ==================================================================================

// ex09
const toEmployeeCommissionMap = (employeeStatsMap) => {
    let employeeCommissionMap = {};

    for (const employeeId in employeeStatsMap) {
        employeeCommissionMap[employeeByIdMap[employeeId].name] =
            employeeStatsMap[employeeId].revenue * 0.03;
    }

    return employeeCommissionMap;
};

const employeeCommissionMap = toEmployeeCommissionMap(employeeStatsMap);

console.log(`9. Hoa hồng của nhân viên:`);
console.log(employeeCommissionMap);

// ==================================================================================

// ex10
const sortEmployeesByRevenue = (employeeStatsMap, employees) => {
    let employeesWithRevenue = [];

    for (const employee of employees) {
        employeesWithRevenue.push({
            ...employee,
            revenue: employeeStatsMap[employee.id]?.revenue || 0,
        });
    }

    employeesWithRevenue.sort(
        (employeeA, employeeB) => employeeB.revenue - employeeA.revenue,
    );

    return employeesWithRevenue;
};

const sortedEmployees = sortEmployeesByRevenue(employeeStatsMap, employees);

console.log(`10. Danh sách nhân viên theo doanh thu giảm dần:`);

console.log(sortedEmployees);
