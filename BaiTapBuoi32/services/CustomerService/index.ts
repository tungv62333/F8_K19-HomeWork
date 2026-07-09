import { CustomerServiceI } from "./type";
import { Customer } from "../../models/Customer";
import { UpdateCustomerDataI } from "./type";

export class CustomerService implements CustomerServiceI {
    private customers: Customer[] = [];

    addCustomer(customer: Customer): void {
        this.customers.push(customer);
    }

    updateCustomer(id: string, data: UpdateCustomerDataI): void {
        const customer = this.customers.find((c) => c.getId() === id);
        if (customer) {
            customer.setName(data.name);
            customer.updatePhone(data.phone);
            customer.updateAddress(data.address);
        } else {
            throw new Error("Customer not found");
        }
    }

    deleteCustomer(id: string): void {
        const customerIndex = this.customers.findIndex((c) => c.getId() === id);
        if (customerIndex !== -1) {
            this.customers.splice(customerIndex, 1);
        }
    }

    findById(id: string): Customer | undefined {
        return this.customers.find((c) => c.getId() === id);
    }

    findByPhone(phone: number): Customer | undefined {
        return this.customers.find((c) => c.getPhone() === phone);
    }

    getAllCustomers(): Customer[] {
        return this.customers;
    }

    printCustomers(): void {
        this.customers.forEach((c) => console.log(c.toString()));
    }
}
