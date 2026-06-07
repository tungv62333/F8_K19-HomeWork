import { renderTable, headers, loadTable } from "../../utils/index.js";

import {
    getCustomers,
    getCustomerById,
    createCustomer,
    updateCustomerById,
    deleteCustomerById,
} from "../../api/customer.js";

const renderDialog = () => {
    const overlay = document.createElement("div");
    overlay.className = "popup-overlay";

    const popupContent = document.createElement("div");
    popupContent.setAttribute("class", "panel popup-content");

    const panelHeader = document.createElement("div");
    panelHeader.setAttribute("class", "panel-header");
    panelHeader.setAttribute(
        "style",
        "border-bottom: none; padding-bottom: 0;",
    );

    const panelTitle = document.createElement("h2");
    panelTitle.setAttribute("class", "panel-title");
    panelTitle.innerText = "Customer Details";
    panelHeader.append(panelTitle);

    const popupBody = document.createElement("div");
    popupBody.setAttribute("class", "popup-body");

    const formGrid = document.createElement("div");
    formGrid.setAttribute("class", "form-grid");

    // Company Name
    const companyGroup = document.createElement("div");
    companyGroup.className = "form-group full-width";

    const companyLabel = document.createElement("label");
    companyLabel.className = "form-label";
    companyLabel.innerText = "Company Name *";

    // company name input
    const companyInput = document.createElement("input");
    companyInput.type = "text";
    companyInput.className = "form-input company-input";
    companyInput.placeholder = "e.g. Cty TNHH F8";

    // Email
    const emailGroup = document.createElement("div");
    emailGroup.className = "form-group";

    const emailLabel = document.createElement("label");
    emailLabel.className = "form-label";
    emailLabel.innerText = "Email Address";

    // email input
    const emailInput = document.createElement("input");
    emailInput.type = "email";
    emailInput.className = "form-input email-input";
    emailInput.placeholder = "contact@example.com";

    // Phone
    const phoneGroup = document.createElement("div");
    phoneGroup.className = "form-group";

    const phoneLabel = document.createElement("label");
    phoneLabel.className = "form-label";
    phoneLabel.innerText = "Phone Number";

    // phone input
    const phoneInput = document.createElement("input");
    phoneInput.type = "tel";
    phoneInput.className = "form-input phone-input";
    phoneInput.placeholder = "0987 654 321";

    // Tax ID
    const taxGroup = document.createElement("div");
    taxGroup.className = "form-group";

    const taxLabel = document.createElement("label");
    taxLabel.className = "form-label";
    taxLabel.innerText = "Tax ID (Mã số thuế)";

    // tax id input
    const taxInput = document.createElement("input");
    taxInput.type = "text";
    taxInput.className = "form-input tax-input";
    taxInput.placeholder = "018381123412";

    // Status
    const statusGroup = document.createElement("div");
    statusGroup.className = "form-group";

    // label
    const statusLabel = document.createElement("label");
    statusLabel.className = "form-label";
    statusLabel.innerText = "Status";

    // select
    const statusSelect = document.createElement("select");
    statusSelect.className = "form-input status-input";

    // active option
    const activeOption = document.createElement("option");
    activeOption.value = "Active";
    activeOption.innerText = "Active";

    // inactive option
    const inactiveOption = document.createElement("option");
    inactiveOption.value = "Inactive";
    inactiveOption.innerText = "Inactive";

    // Address
    const addressGroup = document.createElement("div");
    addressGroup.className = "form-group full-width";

    const addressLabel = document.createElement("label");
    addressLabel.className = "form-label";
    addressLabel.innerText = "Physical Address";

    // address input
    const addressInput = document.createElement("input");
    addressInput.type = "text";
    addressInput.className = "form-input address-input";
    addressInput.placeholder = "Enter full address...";

    companyGroup.append(companyLabel, companyInput);
    emailGroup.append(emailLabel, emailInput);
    phoneGroup.append(phoneLabel, phoneInput);
    taxGroup.append(taxLabel, taxInput);
    statusSelect.append(activeOption, inactiveOption);
    statusGroup.append(statusLabel, statusSelect);
    addressGroup.append(addressLabel, addressInput);

    // formGrid append all
    formGrid.append(
        companyGroup,
        emailGroup,
        phoneGroup,
        taxGroup,
        statusGroup,
        addressGroup,
    );

    // popupBody append formGrid
    popupBody.append(formGrid);

    // popupFooter
    const popupFooter = document.createElement("div");
    popupFooter.className = "popup-footer";

    // Cancel button
    const cancelBtn = document.createElement("label");
    cancelBtn.setAttribute("for", "popup-toggle");
    cancelBtn.className = "btn btn-cancel";
    cancelBtn.innerText = "Cancel";

    cancelBtn.addEventListener("click", () => {
        closeDialog();
    });

    // Save button
    const saveBtn = document.createElement("button");
    saveBtn.type = "button";
    saveBtn.className = "btn btn-save";
    saveBtn.innerText = "Save Customer";

    // append
    popupFooter.append(cancelBtn, saveBtn);

    popupContent.append(panelHeader, popupBody, popupFooter);

    overlay.append(popupContent);

    return overlay;
};

const openDialog = async (id = null) => {
    const popupOverlay = document.querySelector(".popup-overlay");
    const popupContent = document.querySelector(".popup-content");
    const companyInput = document.querySelector(".company-input");
    const emailInput = document.querySelector(".email-input");
    const phoneInput = document.querySelector(".phone-input");
    const taxInput = document.querySelector(".tax-input");
    const statusInput = document.querySelector(".status-input");
    const addressInput = document.querySelector(".address-input");
    const saveBtn = document.querySelector(".btn-save");

    let data = null;

    if (id) {
        const customer = await getCustomerById(id);
        companyInput.value = customer.companyName;
        emailInput.value = customer.email;
        phoneInput.value = customer.phone;
        taxInput.value = customer.taxId;
        statusInput.value = customer.status;
        addressInput.value = customer.address;
        data = customer;
    } else {
        companyInput.value = "";
        emailInput.value = "";
        phoneInput.value = "";
        taxInput.value = "";
        statusInput.value = "Active";
        addressInput.value = "";
    }

    popupOverlay.classList.add("show");
    popupContent.classList.add("show");

    saveBtn.onclick = async () => {
        try {
            data = {
                companyName: companyInput.value,
                email: emailInput.value,
                phone: phoneInput.value,
                taxId: taxInput.value,
                status: statusInput.value,
                address: addressInput.value,
            };
            if (id) {
                await updateCustomerById(id, data);
            } else await createCustomer(data);

            closeDialog();
            loadTable();
        } catch (error) {
            console.log(error);
        }
    };
};

const closeDialog = () => {
    const popupOverlay = document.querySelector(".popup-overlay");
    const popupContent = document.querySelector(".popup-content");
    popupOverlay.classList.remove("show");
    popupContent.classList.remove("show");
};

export { renderDialog, openDialog, closeDialog };
