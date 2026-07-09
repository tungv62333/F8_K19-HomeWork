import { CustomerI } from "./type";
import { v7 } from "uuid";

export class Customer implements CustomerI {
    private id: string;
    private name: string;
    private phone: number;
    private address: string;

    constructor(name: string, phone: number, address: string) {
        this.id = v7().toString();
        this.name = name;
        this.phone = phone;
        this.address = address;
    }

    getId(): string {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    setName(name: string): void {
        this.name = name;
    }

    getPhone(): number {
        return this.phone;
    }

    updatePhone(phone: number): void {
        this.phone = phone;
    }

    getAddress(): string {
        return this.address;
    }

    updateAddress(address: string): void {
        this.address = address;
    }

    toString(): string {
        return `Customer { id: ${this.id}, name: ${this.name}, phone: ${this.phone}, address: ${this.address},`;
    }
}
