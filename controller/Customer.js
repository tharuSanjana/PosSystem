import {CustomerModel} from "../model/CustomerModel.js";
import {c, i} from "../db/db.js";



function addCustomerToTable() {
    $('#tbody').empty();
    c.map((item, index) => {
        var record = `<tr>
            <td id="colId">${item.id}</td>
            <td id="colName">${item.name}</td>
            <td id="colNic">${item.nic}</td>
            <td id="colEmail">${item.email}</td>
            <td id="colAddress">${item.address}</td>
            <td id="colTel">${item.tel}</td>
        </tr>`;
        $('#customerTable').append(record);
    });
}

let getIndex;
$('#customer-save').on('click', () => {
    let id = $('#id').val();
    let na = $('#name').val();
    let nic = $('#nic').val();
    let email = $('#email').val();
    let address = $('#address').val();
    let tel = $('#tel').val();

    if (!id) {
        alert('Please enter ID');
        clearInputFields();
        return;
    }

    if (!/^C00\d+$/.test(id)) {
        alert('ID should start with C00 and be followed by at least one digit');
        clearInputFields();
        return;
    }

    if (c.some(item => item.id === id)) {
        alert('ID already exists');
        clearInputFields();
        return;
    }

    if (!na) {
        alert('Please enter Name');
        return;
    }

    if (!/^[a-zA-Z\s]+$/.test(na)) {
        alert('Name can only contain letters and spaces');
        return;
    }

    if (!nic) {
        alert('Please enter NIC');
        return;
    }

    if (!/^[0-9A-Za-z]{12}$/.test(nic)) {
        alert('NIC should contain exactly 12 characters');
        return;
    }

    if (!email) {
        alert('Please enter email');
        return;
    }

    if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
        alert('Please enter a valid email address');
        return;
    }

    if (!address) {
        alert('Please enter address');
        return;
    }

    if (!/^[\w\s\-,.'#&()]+$/u.test(address)) {
        alert('Please enter a valid address');
        return;
    }

    if (!tel) {
        alert('Please enter Phone number');
        return;
    }

    if (!/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/.test(tel)) {
        alert('Please enter a valid phone number');
        return;
    }

    let customer = new CustomerModel(id, na, nic, email, address, tel);
    c.push(customer);

    addCustomerToTable();
    getCustomerCount(c);
    clearInputFields();
});
function clearInputFields() {
    $('#id').val('');
    $('#name').val('');
    $('#nic').val('');
    $('#email').val('');
    $('#address').val('');
    $('#tel').val('');
}

/*$('#tbody').on('click','tr',function () {
let index = $(this).index();
getIndex=index;
 let id = $(this).find('#colId').text();
 let name = $(this).find('#colName').text();
 let nic = $(this).find('#colNic').text();
 let email = $(this).find('#colEmail').text();
 let address = $(this).find('#colAddress').text();
 let tel = $(this).find('#colTel').text();

 console.log("clicked index: ",index);
 console.log("clicked id: ",id);
 console.log("clicked name: ",name);
 console.log("clicked nic: ",nic);
 console.log("clicked email: ",email);
 console.log("clicked address: ",address);
 console.log("clicked tel: ",tel);

 $('#id').val(id);
 $('#name').val(name);
 $('#nic').val(nic);
 $('#email').val(email);
 $('#address').val(address);
 $('#tel').val(tel);

});*/



$('#tbody').on('click', 'tr', function () {
    let index = $(this).index();
    getIndex = index;
    let id = $(this).find('#colId').text();
    let name = $(this).find('#colName').text();
    let nic = $(this).find('#colNic').text();
    let email = $(this).find('#colEmail').text();
    let address = $(this).find('#colAddress').text();
    let tel = $(this).find('#colTel').text();

    $('#id').val(id);
    $('#name').val(name);
    $('#nic').val(nic);
    $('#email').val(email);
    $('#address').val(address);
    $('#tel').val(tel);
});

$('#customer-update').on('click', () => {
    let id = $('#id').val();
    let na = $('#name').val();
    let nic = $('#nic').val();
    let email = $('#email').val();
    let address = $('#address').val();
    let tel = $('#tel').val();

    if (!id) {
        alert('Please enter ID');
        return;
    }

    if (!/^C00\d+$/.test(id)) {
        alert('ID should start with C00 and be followed by at least one digit');
        return;
    }

    if (!na) {
        alert('Please enter Name');
        return;
    }

    if (!/^[a-zA-Z\s]+$/.test(na)) {
        alert('Name can only contain letters and spaces');
        return;
    }

    if (!nic) {
        alert('Please enter NIC');
        return;
    }

    if (!/^[0-9A-Za-z]{12}$/.test(nic)) {
        alert('NIC should contain exactly 12 characters');
        return;
    }

    if (!email) {
        alert('Please enter email');
        return;
    }

    if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
        alert('Please enter a valid email address');
        return;
    }

    if (!address) {
        alert('Please enter address');
        return;
    }

    if (!/^[\w\s\-,.'#&()]+$/u.test(address)) {
        alert('Please enter a valid address');
        return;
    }

    if (!tel) {
        alert('Please enter Phone number');
        return;
    }

    if (!/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/.test(tel)) {
        alert('Please enter a valid phone number');
        return;
    }

    c[getIndex].id = id;
    c[getIndex].name = na;
    c[getIndex].nic = nic;
    c[getIndex].email = email;
    c[getIndex].address = address;
    c[getIndex].tel = tel;

    addCustomerToTable();
    clearInputFields();
});

$('#customer-delete').on('click', () => {
    if (getIndex !== undefined) {
        c.splice(getIndex, 1);
        addCustomerToTable();
        getCustomerCount(c);
        clearInputFields();
    } else {
        alert('Please select a customer to delete');
    }
});

function getCustomerCount(c) {
    let count = c.length;
    $('#customerCount').text(count);
    $('#customer-count').text(count);
    console.log("customer count: ", count);
}

document.addEventListener('DOMContentLoaded', (event) => {

    const searchCustomerButton = document.getElementById('searchBtn');
    const closePopupButton = document.getElementById('close');
    const searchCustomerPopup = document.getElementById('searchCustomer-popup');


    searchCustomerButton.addEventListener('click', () => {
        getSearchCustomer();
        searchCustomerPopup.style.display = 'block';
    });


    closePopupButton.addEventListener('click', () => {
        $('#searchCusField').val('');
        $('#searchTbody').empty();
        searchCustomerPopup.style.display = 'none';
    });
});

function getSearchCustomer() {
    let customerId = $('#searchCusField').val();

    $('#searchTbody').empty();

    const customer = c.find(item => item.id === customerId);
    if (customer) {
        const record = `
                    <tr>
                        <td>${customer.id}</td>
                        <td>${customer.name}</td>
                        <td>${customer.nic}</td>
                        <td>${customer.email}</td>
                        <td>${customer.address}</td>
                        <td>${customer.tel}</td>
                    </tr>
                `;
        $('#searchTbody').append(record);
    } else {
        $('#searchTbody').append('<tr><td colspan="6">Customer not found</td></tr>');
    }
}



