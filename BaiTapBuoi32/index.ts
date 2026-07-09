import { Product } from "./models/Product";
import { Customer } from "./models/Customer";
import { ProductService } from "./services/ProductService";
import { CustomerService } from "./services/CustomerService";
import { OrderService } from "./services/OrderService";

// Product
const productService = new ProductService();

const iphone17 = new Product("Iphone 17 Pro Max", 35000000, 7);
const iphone16 = new Product("Iphone 16", 28000000, 5);
const samsungA5 = new Product("Samsung A5", 5000000, 15);
const redmi8 = new Product("Redmi Note 8", 3000000, 10);

productService.addProduct(iphone17);
productService.addProduct(iphone16);
productService.addProduct(samsungA5);
productService.addProduct(redmi8);

console.log("===== DANH SÁCH SẢN PHẨM =====");
productService.printProducts();

// Customer
const customerService = new CustomerService();

const tung = new Customer("Tùng", 987654321, "Hà Nội");
const nam = new Customer("Nam", 987987987, "Hải Phòng");

customerService.addCustomer(tung);
customerService.addCustomer(nam);

console.log("===== DANH SÁCH KHÁCH HÀNG =====");
customerService.printCustomers();

// Order
const orderService = new OrderService(productService);
orderService.createOrder(tung);
const tungId = tung.getId();
const order1 = orderService.getOrder(tungId);
if (!order1) {
    throw new Error("Không có đơn hàng");
}
orderService.addProduct(order1.getId(), iphone17.getId(), 2);
orderService.addProduct(order1.getId(), samsungA5.getId(), 3);

orderService.createOrder(nam);
const namId = nam.getId();
const order2 = orderService.getOrder(namId);
if (!order2) {
    throw new Error("Không có đơn hàng");
}
orderService.addProduct(order2.getId(), iphone16.getId(), 1);
orderService.addProduct(order2.getId(), redmi8.getId(), 2);

// Print Order
console.log("===== DANH SÁCH ĐƠN HÀNG =====");
orderService.printOrders();

// Checkout
orderService.checkout(order1.getId());

console.log("===== SAU KHI THANH TOÁN =====");
orderService.printOrders();

// Cancel
orderService.cancelOrder(order2.getId());

console.log("===== SAU KHI HỦY ĐƠN =====");
orderService.printOrders();

// Kiểm tra tồn kho
console.log("===== TỒN KHO SAU CÙNG =====");
productService.printProducts();
