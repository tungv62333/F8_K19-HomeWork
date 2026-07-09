import { OrderI, OrderItemI } from "./type";
import { Product } from "../../models/Product";
import { Customer } from "../../models/Customer";
import { v7 } from "uuid";

export class OrderItem implements OrderItemI {
    private product: Product;
    private quantity: number;
    private price: number;

    constructor(product: Product, quantity: number) {
        this.product = product;
        this.quantity = quantity;
        this.price = product.getPrice();
    }

    getProduct(): Product {
        return this.product;
    }

    getQuantity(): number {
        return this.quantity;
    }

    getPrice(): number {
        return this.price;
    }

    getTotal(): number {
        return this.quantity * this.price;
    }
}

export class Order implements OrderI {
    private id: string;
    private customer: Customer;
    private items: OrderItem[];
    private createdAt: Date;
    private status: string;

    constructor(customer: Customer) {
        this.id = v7().toString();
        this.customer = customer;
        this.items = [];
        this.createdAt = new Date();
        this.status = "NEW";
    }

    getId(): string {
        return this.id;
    }

    getCustomer(): Customer {
        return this.customer;
    }

    setCustomer(customer: Customer): void {
        this.customer = customer;
    }

    getItems(): OrderItem[] {
        return this.items;
    }

    setItems(items: OrderItem[]): void {
        this.items = items;
    }

    getCreatedAt(): Date {
        return this.createdAt;
    }

    setCreatedAt(createdAt: Date): void {
        this.createdAt = createdAt;
    }

    getStatus(): string {
        return this.status;
    }

    setStatus(status: string): void {
        this.status = status;
    }

    addItem(item: OrderItem): void {
        this.items.push(item);
    }

    removeItem(productId: string): void {
        const productIndex = this.items.findIndex(
            (p) => p.getProduct().getId() === productId,
        );

        if (productIndex !== -1) {
            this.items.splice(productIndex, 1);
        }
    }

    calculateTotal(): number {
        let total = 0;
        this.items.forEach((item) => {
            total += item.getTotal();
        });
        return total;
    }

    printInvoice(): void {
        console.log("Hoá đơn:");
        this.items.forEach((item) => {
            console.log(`Sản phẩm: ${item.getProduct()}`);
            console.log(`Số lượng: ${item.getQuantity()}`);
            console.log(`Sản phẩm: ${item.getPrice()}`);
            console.log(`Thành tiền: ${item.getTotal()}`);
        });
        console.log(`Tổng cộng: ${this.calculateTotal()}`);
    }
}
