    import {CustomerModel} from "../model/CustomerModel.js";
    import {ItemOfOrderModel} from "../model/ItemOfOrderModel.js";
    import {c} from "../db/db.js";
    import {i} from "../db/db.js";
    import {orderItems} from "../db/db.js";

    $(document).ready(function() {

        $('#inputCustomerId').val('');
        $('#inputCustomerName').val('');
        $('#inputCustomerNic').val('');
        $('#inputCustomerEmail').val('');
        $('#inputCustomerAddress').val('');
        $('#inputCustomerTel').val('');

        $('#inputItemId').val('');
        $('#inputItemName').val('');
        $('#inputItemPrice').val('');
        $('#inputItemQty').val('');
        $('#inputItemSelectedQty').val('');
    });

    $('#inputCustomerId').on('click', () => {
        getAllCustomerId();
    });

    $('#inputCustomerId').on('input', function() {
        var selectedId = $(this).val();
        setCustomerDataFromList(selectedId);
    });

    function getAllCustomerId() {
        var dataListForCustomerId = $("#listForCustomerId");
        dataListForCustomerId.empty();

        c.forEach((item) => {
            dataListForCustomerId.append($("<option>", { value: item.id }));
        });
    }

    function setCustomerDataFromList(id) {
        var selectedCustomer = c.find(function(item) {
            return item.id == id;
        });

        if (selectedCustomer) {
            $('#inputCustomerName').val(selectedCustomer.name);
            $('#inputCustomerNic').val(selectedCustomer.nic);
            $('#inputCustomerEmail').val(selectedCustomer.email);
            $('#inputCustomerAddress').val(selectedCustomer.address);
            $('#inputCustomerTel').val(selectedCustomer.tel);
        } else {
            $('#inputCustomerName').val('');
            $('#inputCustomerNic').val('');
            $('#inputCustomerEmail').val('');
            $('#inputCustomerAddress').val('');
            $('#inputCustomerTel').val('');
        }
    }


    $('#inputItemId').on('click', () => {
        getAllItemId();
    });

    $('#inputItemId').on('input', function() {
        var selectedId = $(this).val();
        setItemDataFromList(selectedId);
    });
    function getAllItemId() {
        var dataListForItemId = $("#listForItemId");
       dataListForItemId.empty();

        i.forEach((item) => {
            dataListForItemId.append($("<option>", { value: item.id }));
        });
    }

    function setItemDataFromList(id) {
        var selectedItem = i.find(function(item) {
            return item.id == id;
        });

        if (selectedItem) {
            $('#inputItemName').val(selectedItem.name);
            $('#inputItemPrice').val(selectedItem.p);
            $('#inputItemQty').val(selectedItem.q);

        } else {

            $('#inputItemName').val('');
            $('#inputItemPrice').val('');
            $('#inputItemQty').val('');
        }
    }

   /* let oi = [];*/
/*
$('#add-item-btn').on('click',()=>{
    let itemId  = $('#inputItemId').val();
    let itemName  =$('#inputItemName').val();
    let itemPrice = $('#inputItemPrice').val();
    let itemQty = $('#inputItemQty').val();
    let selectedQty = $('#inputItemSelectedQty').val();

    let itemOfOrder = new ItemOfOrderModel(itemId,itemName,itemPrice,itemQty,selectedQty);
    orderItems.push(itemOfOrder);

    orderItems.push(itemOfOrder);
addOrderItemToTable(itemOfOrder);



     $('#inputItemId').val('');
    $('#inputItemName').val('');
    $('#inputItemPrice').val('');
     $('#inputItemQty').val('');
    $('#inputItemSelectedQty').val('');
});

function addOrderItemToTable() {
    $('#orderItem').empty();
    orderItems.map((item,index)=>{
        $('#orderItem').empty();
        var record =`  <tr>
            <td >${item.id}</td>
            <td>${item.name}</td>
            <td>${item.p}</td>
            <td>${item.q}</td>
            <td>${item.selectedQty}</td>
            
        </tr>`
        $('#orderSelectedItem').append(record);
    });


}
*/
    $('#add-item-btn').on('click',()=>{
        let itemId  = $('#inputItemId').val();
        let itemName  =$('#inputItemName').val();
        let itemPrice = $('#inputItemPrice').val();
        let itemQty = $('#inputItemQty').val();
        let selectedQty = $('#inputItemSelectedQty').val();

        let itemOfOrder = new ItemOfOrderModel(itemId, itemName, itemPrice, itemQty, selectedQty);
        orderItems.push(itemOfOrder);
        var total = calculateTotal(itemPrice,selectedQty);

        addOrderItemToTable(itemOfOrder,total);
        setTotalIntoLabel(orderItems);
        /*calculateTotal(itemPrice,selectedQty);*/

        // Clear input fields after adding the item to the table
        $('#inputItemId').val('');
        $('#inputItemName').val('');
        $('#inputItemPrice').val('');
        $('#inputItemQty').val('');
        $('#inputItemSelectedQty').val('');
    });

    function addOrderItemToTable(item,total) {
        var record = `<tr>
        <td>${item.id}</td>
        <td>${item.name}</td>
         <td>${item.q}</td>
         <td>${item.selectedQty}</td>
        <td>${item.p}</td>
        <td>${total}</td>
       
       
    </tr>`;
        $('#orderSelectedItem').append(record);
    }

    function calculateTotal(itemPrice,selectedQty) {
        let total = itemPrice*selectedQty;
        console.log("total: ",total);

        return total;
    }

    function setTotalIntoLabel(orderItems) {
      let setTotal = 0;

      for (let j=0;j<orderItems.length;j++){
          let itemPrice = orderItems[j].q;
          let selectedQty = orderItems[j].selectedQty;

          setTotal += itemPrice*selectedQty;


      }
        $('#countTotal').text("Rs " + setTotal.toFixed(2));
      console.log(setTotal);
    }