import {ItemModel} from "../model/ItemModel.js";
import {i} from "../db/db.js";
function addItemToTable(items) {
    $('#item-body').empty();
    i.map((item,index)=>{
    var record =
         `<tr>
            <td id="colId">${item.id}</td>
            <td id="colName">${item.name}</td>
            <td id="colQty">${item.q}</td>
            <td id="colPrice">${item.p}</td>
        </tr>`;


        $('#item-table').append(record);
    });


}

/*let i = [];*/
let getIndexNum;
$('#item-save').on('click', () => {
    let id = $('#item-id').val();
    let na = $('#item-name').val();
    let qty = $('#item-qty').val();
    let price = $('#item-price').val();

    if (!id) {
        alert('Please enter ID');
        clearInputFields();
        return;
    }


    if (!/^I00\d+$/.test(id)) {
        alert('ID should start with I00 and be followed by at least one digit');
        clearInputFields();
        return;
    }

    if (i.some(item => item.id === id)) {
        alert('ID already exists');
        clearInputFields();
        return;
    }

    if (!na) {
        alert('Please enter Name');
        clearInputFields();
        return;
    }

    if (!/^[a-zA-Z\s]+$/.test(na)) {
        alert('Name can only contain letters');
        clearInputFields();
        return;
    }

    if (!qty) {
        alert('Please enter Quantity');
        clearInputFields();
        return;
    }

    if (isNaN(qty) || qty <= 0) {
        alert('Quantity must be a positive number');
        clearInputFields();
        return;
    }

    if (!price) {
        alert('Please enter Price');
        clearInputFields();
        return;
    }

    if (isNaN(price) || price <= 0) {
        alert('Price must be a positive number');
        clearInputFields();
        return;
    }

    let items = new ItemModel(id, na, qty, price);
    i.push(items);
    addItemToTable(i);
    getItemCost(i);

    clearInputFields();

});

function clearInputFields() {
    $('#item-id').val('');
    $('#item-name').val('');
    $('#item-qty').val('');
    $('#item-price').val('');
}


$('#item-body').on('click','tr',function () {
    let index = $(this).index();
    getIndexNum=index;
    let id = $(this).find('#colId').text();
    let name = $(this).find('#colName').text();
    let qty = $(this).find('#colQty').text();
    let price = $(this).find('#colPrice').text();


    console.log("clicked index: ",index);
    console.log("clicked id: ",id);
    console.log("clicked name: ",name);
    console.log("clicked qty: ",qty);
    console.log("clicked price: ",price);


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
        clearInputFields();
        return;
    }


    if (!/^I00\d+$/.test(id)) {
        alert('ID should start with I00 and be followed by at least one digit');
        clearInputFields();
        return;
    }

    if (i.some(item => item.id === id)) {
        alert('ID already exists');
        clearInputFields();
        return;
    }

    if (!na) {
        alert('Please enter Name');
        clearInputFields();
        return;
    }

    if (!/^[a-zA-Z\s]+$/.test(na)) {
        alert('Name can only contain letters');
        clearInputFields();
        return;
    }

    if (!qty) {
        alert('Please enter Quantity');
        clearInputFields();
        return;
    }

    if (isNaN(qty) || qty <= 0) {
        alert('Quantity must be a positive number');
        clearInputFields();
        return;
    }

    if (!price) {
        alert('Please enter Price');
        clearInputFields();
        return;
    }

    if (isNaN(price) || price <= 0) {
        alert('Price must be a positive number');
        clearInputFields();
        return;
    }

    i[getIndexNum].id = id;
    i[getIndexNum].name = na;
    i[getIndexNum].q = qty;
    i[getIndexNum].p = price;

    addItemToTable(i[getIndexNum]);
    getItemCost(i);
    clearInputFields();

});

$('#item-delete').on('click',()=>{
    i.splice(getIndexNum,1);
   addItemToTable(i[getIndexNum]);
getItemCost(i);
    $('#item-id').val('');
    $('#item-name').val('');
    $('#item-qty').val('');
    $('#item-price').val('');

});




function getItemCost(i) {
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


