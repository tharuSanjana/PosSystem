import {ItemModel} from "../model/ItemModel.js";
import {c, i} from "../db/db.js";


function addItemToTable() {
    $('#item-body').empty();
    i.map((item, index) => {
        var record =
            `<tr>
                <td id="colItemId_${index}">${item.id}</td>
                <td id="colItemName_${index}">${item.name}</td>
                <td id="colItemQty_${index}">${item.q}</td>
                <td id="colItemPrice_${index}">${item.p}</td>
            </tr>`;
        $('#item-body').append(record);
    });
}

let getIndexNum;
$('#item-save').on('click', () => {
    let id = $('#item-id').val();
    let na = $('#item-name').val();
    let qty = $('#item-qty').val();
    let price = $('#item-price').val();

    if (!id) {
        alert('Please enter ID');
        return;
    }

    if (!/^I00\d+$/.test(id)) {
        alert('ID should start with I00 and be followed by at least one digit');
        return;
    }

    if (i.some(item => item.id === id)) {
        alert('ID already exists');
        return;
    }

    if (!na) {
        alert('Please enter Name');
        return;
    }

    if (!/^[a-zA-Z\s]+$/.test(na)) {
        alert('Name can only contain letters');
        return;
    }

    if (!qty) {
        alert('Please enter Quantity');
        return;
    }

    if (isNaN(qty) || qty <= 0) {
        alert('Quantity must be a positive number');
        return;
    }

    if (!price) {
        alert('Please enter Price');
        return;
    }

    if (isNaN(price) || price <= 0) {
        alert('Price must be a positive number');
        return;
    }

    let items = new ItemModel(id, na, qty, price);
    i.push(items);
    addItemToTable();
    getItemCost();
    clearInputFields();
});

function clearInputFields() {
    $('#item-id').val('');
    $('#item-name').val('');
    $('#item-qty').val('');
    $('#item-price').val('');
}



$('#item-body').on('click', 'tr', function () {
    let index = $(this).index();
    getIndexNum = index;
    let id = $(`#colItemId_${index}`).text();
    let name = $(`#colItemName_${index}`).text();
    let qty = $(`#colItemQty_${index}`).text();
    let price = $(`#colItemPrice_${index}`).text();

    $('#item-id').val(id);
    $('#item-name').val(name);
    $('#item-qty').val(qty);
    $('#item-price').val(price);
});

$('#item-update').on('click', () => {
    let id = $('#item-id').val();
    let na = $('#item-name').val();
    let qty = $('#item-qty').val();
    let price = $('#item-price').val();

    if (!id) {
        alert('Please enter ID');
        return;
    }

    if (!/^I00\d+$/.test(id)) {
        alert('ID should start with I00 and be followed by at least one digit');
        return;
    }

    if (!na) {
        alert('Please enter Name');
        return;
    }

    if (!/^[a-zA-Z\s]+$/.test(na)) {
        alert('Name can only contain letters');
        return;
    }

    if (!qty) {
        alert('Please enter Quantity');
        return;
    }

    if (isNaN(qty) || qty <= 0) {
        alert('Quantity must be a positive number');
        return;
    }

    if (!price) {
        alert('Please enter Price');
        return;
    }

    if (isNaN(price) || price <= 0) {
        alert('Price must be a positive number');
        return;
    }

    i[getIndexNum].id = id;
    i[getIndexNum].name = na;
    i[getIndexNum].q = qty;
    i[getIndexNum].p = price;

    addItemToTable();
    getItemCost();
    clearInputFields();
});

$('#item-delete').on('click', () => {
    if (getIndexNum !== undefined) {
        i.splice(getIndexNum, 1);
        addItemToTable();
        getItemCost();
        clearInputFields();
    } else {
        alert('Please select an item to delete');
    }
});

function getItemCost() {
    let totalCost = 0;
    for (let j = 0; j < i.length; j++) {
        let qty = parseFloat(i[j].q);
        let price = parseFloat(i[j].p);
        if (!isNaN(qty) && !isNaN(price)) {
            totalCost += qty * price;
        } else {
            console.error("Quantity or price is not a valid number for item at index " + j);
        }
    }
    $('#cost').text("Rs " + totalCost.toFixed(2));
    console.log("Total cost: ", totalCost);
}

document.addEventListener('DOMContentLoaded', (event) => {

    const searchItemButton = document.getElementById('searchItemBtn');
    const closePopupButton = document.getElementById('closeItem-popup');
    const searchItemPopup = document.getElementById('searchItem-popup');


    searchItemButton.addEventListener('click', () => {
        getSearchItem();
      searchItemPopup.style.display = 'block';
    });


    closePopupButton.addEventListener('click', () => {
        $('#searchItemField').val('');
        $('#searchItemTbody').empty();
        searchItemPopup.style.display = 'none';
    });
});

function getSearchItem() {
    let itemId = $('#searchItemField').val();

    $('#searchItemTbody').empty();

    const items = i.find(item => item.id === itemId);
    if (items) {
        const record = `
                    <tr>
                        <td>${items.id}</td>
                        <td>${items.name}</td>
                        <td>${items.q}</td>
                        <td>${items.p}</td>
                       
                    </tr>
                `;
        $('#searchItemTbody').append(record);
    } else {
        $('#searchItemTbody').append('<tr><td colspan="4">Item not found</td></tr>');
    }
}
