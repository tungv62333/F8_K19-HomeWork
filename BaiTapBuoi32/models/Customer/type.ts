export interface CustomerI {
    getId(): string;
    getName(): string;
    setName(name: string): void;
    getPhone(): number;
    updatePhone(phone: number): void;
    getAddress(): string;
    updateAddress(address: string): void;
    toString(): string;
}
