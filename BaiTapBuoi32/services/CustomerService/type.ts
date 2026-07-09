import { Customer } from "../../models/Customer";

export interface UpdateCustomerDataI {
    name: string;
    phone: number;
    address: string;
}

export interface CustomerServiceI {
    addCustomer(customer: Customer): void;
    updateCustomer(id: string, data: UpdateCustomerDataI): void;
    deleteCustomer(id: string): void;
    findById(id: string): Customer | undefined;
    findByPhone(phone: number): Customer | undefined;
    getAllCustomers(): Customer[];
    printCustomers(): void;
}
