import { OrderServiceI } from "./type";
import { Order, OrderItem } from "../../models/Order";
import { Customer } from "../../models/Customer";
import { ProductService } from "../ProductService";

export class OrderService implements OrderServiceI {
    private orders: Order[] = [];
    private productService: ProductService;
    constructor(productService: ProductService) {
        this.productService = productService;
    }

    createOrder(customer: Customer) {
        const order = new Order(customer);
        this.orders.push(order);
    }

    getOrder(customerId: string): Order | undefined {
        return this.orders.find(
            (order) => order.getCustomer().getId() === customerId,
        );
    }

    findOrder(orderId: string): Order | undefined {
        return this.orders.find((o) => o.getId() === orderId);
    }

    addProduct(orderId: string, productId: string, quantity: number): void {
        const order = this.findOrder(orderId);
        if (!order) {
            throw new Error("Không có đơn hàng này");
        }

        const product = this.productService.findById(productId);
        if (!product) {
            throw new Error("Không có sản phẩm này");
        }

        if (product.getStock() < quantity) {
            throw new Error("Số lượng tồn kho không đủ");
        }

        const item = new OrderItem(product, quantity);
        order.addItem(item);
    }

    removeProduct(orderId: string, productId: string): void {
        const order = this.findOrder(orderId);

        if (!order) {
            throw new Error("Không có đơn hàng này");
        }

        order.removeItem(productId);
    }

    checkout(orderId: string): void {
        const order = this.findOrder(orderId);
        if (!order) {
            throw new Error("Không có đơn hàng này");
        }

        order.getItems().forEach((item) => {
            item.getProduct().decreaseStock(item.getQuantity());
        });

        order.setStatus("PAID");
    }

    cancelOrder(orderId: string): void {
        const order = this.findOrder(orderId);

        if (!order) {
            throw new Error("Không có đơn hàng này");
        }

        if (order.getStatus() === "PAID") {
            throw new Error("Đơn hàng đã thanh toán, không thể hủy");
        }

        if (order.getStatus() === "CANCELLED") {
            throw new Error("Đơn hàng đã được hủy");
        }

        order.getItems().forEach((item) => {
            item.getProduct().increaseStock(item.getQuantity());
        });

        order.setStatus("CANCELLED");
    }

    getOrders(): Order[] {
        return this.orders;
    }

    printOrders(): void {
        this.orders.forEach((order) => {
            console.log("==================================");
            console.log(`Order ID: ${order.getId()}`);
            console.log(`Khách hàng: ${order.getCustomer().getName()}`);
            console.log(`Ngày tạo: ${order.getCreatedAt()}`);
            console.log(`Trạng thái: ${order.getStatus()}`);

            console.log("Danh sách sản phẩm:");

            order.getItems().forEach((item) => {
                console.log(
                    `- ${item.getProduct().getName()} | ` +
                        `SL: ${item.getQuantity()} | ` +
                        `Đơn giá: ${item.getPrice()} | ` +
                        `Thành tiền: ${item.getTotal()}`,
                );
            });

            console.log(`Tổng tiền: ${order.calculateTotal()}`);
        });
    }
}
