import { v7 } from "uuid";

interface CustomerData {
    id: string;
    name: string;
    tax: string;
    address: string;
}

class Customer {
    private id: string;
    private name: string;
    private tax: string;
    private address: string;

    constructor(name: string, tax: string, address: string) {
        this.id = v7().toString();
        this.name = name;
        this.tax = tax;
        this.address = address;
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    setName(name: string) {
        this.name = name;
    }

    getTax() {
        return this.tax;
    }

    setTax(tax: string) {
        this.tax = tax;
    }

    getAddress() {
        return this.address;
    }

    setAddress(address: string) {
        this.address = address;
    }

    update(customerData: Partial<CustomerData>) {
        if (customerData.name !== undefined) this.name = customerData.name;
        if (customerData.tax !== undefined) this.tax = customerData.tax;
        if (customerData.address !== undefined)
            this.address = customerData.address;
    }
}

class CustomerService {
    private customers: Customer[] = [];

    create(customerData: Omit<CustomerData, "id">): Customer {
        const customer = new Customer(
            customerData.name,
            customerData.tax,
            customerData.address,
        );

        this.customers.push(customer);

        return customer;
    }

    findById(id: string): Customer | null {
        const customer = this.customers.find(
            (customer) => customer.getId() === id,
        );

        if (!customer) {
            return null;
        }

        return customer;
    }

    updateById(
        id: string,
        customerData: Partial<CustomerData>,
    ): Customer | null {
        const customer = this.findById(id);

        if (!customer) {
            return null;
        }

        customer.update(customerData);

        return customer;
    }
}

interface EmployeeData {
    id: string;
    name: string;
}

class Employee {
    private id: string;
    private name: string;

    constructor(name: string) {
        this.id = v7().toString();
        this.name = name;
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    setName(name: string) {
        this.name = name;
    }

    receiveNoti(message: string) {
        console.log(
            `${this.id} - ${this.name} received notification: ${message}`,
        );
    }

    update(employeeData: Partial<EmployeeData>) {
        if (employeeData.name !== undefined) this.name = employeeData.name;
    }
}

class EmployeeService {
    private employees: Employee[] = [];

    create(employeeData: Omit<EmployeeData, "id" | "receiveNoti">): Employee {
        const employee = new Employee(employeeData.name);

        this.employees.push(employee);

        return employee;
    }

    findById(id: string): Employee | null {
        const employee = this.employees.find(
            (employee) => employee.getId() === id,
        );

        if (!employee) {
            return null;
        }

        return employee;
    }

    updateById(
        id: string,
        employeeData: Partial<EmployeeData>,
    ): Employee | null {
        const employee = this.findById(id);

        if (!employee) {
            return null;
        }

        employee.update(employeeData);

        return employee;
    }
}

interface ProjectData {
    id: string;
    customerId: string;
    employeeId: string;
}

class Project {
    private id: string;
    private customerId: string;
    private employeeId: string;

    constructor(customerId: string, employeeId: string) {
        this.id = v7().toString();
        this.customerId = customerId;
        this.employeeId = employeeId;
    }

    getId(): string {
        return this.id;
    }

    getCustomerId(): string {
        return this.customerId;
    }

    setCustomerId(customerId: string): void {
        this.customerId = customerId;
    }

    getEmployeeId(): string {
        return this.employeeId;
    }

    setEmployeeId(employeeId: string): void {
        this.employeeId = employeeId;
    }

    update(projectData: Partial<ProjectData>): void {
        if (projectData.customerId !== undefined) {
            this.customerId = projectData.customerId;
        }

        if (projectData.employeeId !== undefined) {
            this.employeeId = projectData.employeeId;
        }
    }
}

class ProjectService {
    private projects: Project[] = [];
    private employeeService: EmployeeService;

    constructor(employeeService: EmployeeService) {
        this.employeeService = employeeService;
    }

    create(projectData: Omit<ProjectData, "id">): Project {
        const project = new Project(
            projectData.customerId,
            projectData.employeeId,
        );

        this.projects.push(project);

        const employee = this.employeeService.findById(projectData.employeeId);

        if (employee) {
            employee.receiveNoti("Bạn vừa được gán vào dự án mới.");
        }

        return project;
    }

    findById(id: string): Project | null {
        const project = this.projects.find((project) => project.getId() === id);

        if (!project) {
            return null;
        }

        return project;
    }

    updateById(id: string, projectData: Partial<ProjectData>): Project | null {
        const project = this.findById(id);

        if (!project) {
            return null;
        }

        if (projectData.employeeId !== undefined) {
            const employeeChanged =
                projectData.employeeId !== project.getEmployeeId();

            project.update(projectData);

            if (employeeChanged) {
                const employee = this.employeeService.findById(
                    projectData.employeeId,
                );

                if (employee) {
                    employee.receiveNoti(
                        "Bạn đã được chuyển giao phụ trách dự án này.",
                    );
                }
            }
        } else {
            project.update(projectData);
        }

        return project;
    }
}

const customerService = new CustomerService();
const employeeService = new EmployeeService();
const projectService = new ProjectService(employeeService);

// TEST CASE 1

console.log("TEST CASE 1: Tạo Customer");

const customer = customerService.create({
    name: "Nguyễn Văn A",
    tax: "0123456789",
    address: "Hà Nội",
});

console.log(customer);
console.log("Customer ID:", customer.getId());

console.log("======================================");

// TEST CASE 2

console.log("TEST CASE 2: Cập nhật Customer");

const updatedCustomer = customerService.updateById(customer.getId(), {
    address: "TP Hồ Chí Minh",
});

console.log(updatedCustomer);
console.log("Địa chỉ mới:", updatedCustomer?.getAddress());

console.log("======================================");

// TEST CASE 3

console.log("TEST CASE 3: Tạo Employee");

const employee1 = employeeService.create({
    name: "Nguyễn Văn B",
});

const employee2 = employeeService.create({
    name: "Trần Văn C",
});

console.log(employee1);
console.log(employee2);

console.log("ID khác nhau:", employee1.getId() !== employee2.getId());

console.log("======================================");

// TEST CASE 4

console.log("TEST CASE 4: Tìm Employee");

const foundEmployee = employeeService.findById(employee1.getId());

console.log("Employee tìm được:");
console.log(foundEmployee);

const notFoundEmployee = employeeService.findById("abcxyz");

console.log("Employee không tồn tại:");
console.log(notFoundEmployee);

console.log("======================================");

// TEST CASE 5

console.log("TEST CASE 5: Tạo Project");

const project = projectService.create({
    customerId: customer.getId(),
    employeeId: employee1.getId(),
});

console.log(project);

console.log("======================================");

// TEST CASE 6

console.log("TEST CASE 6: Đổi nhân viên phụ trách");

const updatedProject = projectService.updateById(project.getId(), {
    employeeId: employee2.getId(),
});

console.log(updatedProject);

console.log("======================================");

// TEST CASE 7

console.log("TEST CASE 7: Chỉ cập nhật Customer");

const updatedProject2 = projectService.updateById(project.getId(), {
    customerId: customer.getId(),
});

console.log(updatedProject2);
console.log("Không có notification");

console.log("======================================");

// TEST CASE 8

console.log("TEST CASE 8: Update dữ liệu không tồn tại");

console.log(
    "Customer:",
    customerService.updateById("not-found", {
        address: "Đà Nẵng",
    }),
);

console.log(
    "Employee:",
    employeeService.updateById("not-found", {
        name: "ABC",
    }),
);

console.log(
    "Project:",
    projectService.updateById("not-found", {
        customerId: customer.getId(),
    }),
);

console.log("======================================");

// TEST CASE 9

console.log("TEST CASE 9: Tạo Project với Employee không tồn tại");

const project2 = projectService.create({
    customerId: customer.getId(),
    employeeId: "abcxyz",
});

console.log(project2);
console.log("Không được có notification ở trên.");
