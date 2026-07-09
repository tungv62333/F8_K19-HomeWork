import { Product } from "../../models/Product";
import { Customer } from "../../models/Customer";
import { OrderItem } from ".";

export interface OrderItemI {
    getTotal(): number;
}

export interface OrderI {
    addItem(item: OrderItem): void;
    removeItem(productId: string): void;
    calculateTotal(): number;
    printInvoice(): void;
}
