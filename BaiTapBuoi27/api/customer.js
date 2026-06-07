// get all customers
const getCustomers = async () => {
    try {
        const response = await fetch("http://localhost:3000/customers");
        return await response.json();
    } catch {
        alert("get data failed");
    }
};

// get customer by id
const getCustomerById = async (id) => {
    try {
        const response = await fetch(`http://localhost:3000/customers/${id}`);
        return await response.json();
    } catch {
        alert("get data failed");
    }
};

// create customer
const createCustomer = async (data) => {
    try {
        const response = await fetch(`http://localhost:3000/customers/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        return await response.json();
    } catch {
        alert("get data failed");
    }
};

// edit customer by id
const updateCustomerById = async (id, data) => {
    try {
        const response = await fetch(`http://localhost:3000/customers/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        return await response.json();
    } catch {
        alert("get data failed");
    }
};

// delete customer by id
const deleteCustomerById = async (id) => {
    try {
        const response = await fetch(`http://localhost:3000/customers/${id}`, {
            method: "DELETE",
        });
        return await response.json();
    } catch {
        alert("Delete failed");
    }
};

export {
    getCustomers,
    getCustomerById,
    createCustomer,
    updateCustomerById,
    deleteCustomerById,
};
