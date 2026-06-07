import { openDialog } from "../dialog/index.js";
import { getCustomers, deleteCustomerById } from "../../api/customer.js";
import { headers } from "../../utils/index.js";

const renderTable = (headers, rows, className = null) => {
    const div = document.createElement("div");

    if (className) div.classList = className;

    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");

    const headerRow = document.createElement("tr");

    for (const header of headers) {
        const th = document.createElement("th");
        th.innerText = header.text;
        headerRow.append(th);
    }
    const actionC = document.createElement("th");
    actionC.innerText = "Action";
    headerRow.append(actionC);
    thead.append(headerRow);

    for (const row of rows) {
        const tr = document.createElement("tr");

        for (const header of headers) {
            const td = document.createElement("td");
            td.innerText = row[header.key];
            tr.append(td);
        }

        const action = document.createElement("td");
        action.className = "actions";

        // edit button
        const editBtn = document.createElement("label");
        editBtn.className = "action-icon btn-edit";
        editBtn.title = "Edit";
        editBtn.innerText = "✎";

        editBtn.addEventListener("click", () => {
            openDialog(row.id);
        });

        // delete button
        const deleteBtn = document.createElement("span");
        deleteBtn.className = "action-icon delete";
        deleteBtn.title = "Delete";
        deleteBtn.innerText = "🗑";

        deleteBtn.addEventListener("click", async () => {
            try {
                const isConfirm = confirm("Bạn có chắc muốn xóa customer này?");
                if (isConfirm) {
                    await deleteCustomerById(row.id);
                    loadTable();
                }
            } catch (error) {
                console.log(error);
            }
        });

        // append
        action.append(editBtn, deleteBtn);
        tr.append(action);

        tbody.append(tr);
    }

    table.append(thead);
    table.append(tbody);

    div.append(table);

    return div;
};

const loadTable = async () => {
    const customers = await getCustomers();
    const tableContainer = document.querySelector(".table-container");
    tableContainer.innerHTML = "";
    tableContainer.append(renderTable(headers, customers));
};

export { renderTable, loadTable };
