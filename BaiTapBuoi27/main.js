import {
    renderTable,
    loadTable,
    headers,
    renderDialog,
    openDialog,
} from "./utils/index.js";
import { getCustomers, getCustomerById } from "./api/customer.js";

const init = async () => {
    // render table
    await loadTable();

    // render popup
    document.body.append(renderDialog());

    // add new
    const addNew = document.querySelector(".btn-add");

    addNew.addEventListener("click", () => {
        openDialog();
    });
};

init();
