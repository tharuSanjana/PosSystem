    import {CustomerModel} from "../model/CustomerModel.js";
    import {ItemOfOrderModel} from "../model/ItemOfOrderModel.js";
    import {OrdersModel} from "../model/OrdersModel.js";
    import {c} from "../db/db.js";
    import {i} from "../db/db.js";
    import {orderItems} from "../db/db.js";
    import {orders} from "../db/db.js";
/*
    let orderId = generateOrderId();
    $('#inputOrderId').val(orderId);*/

   /* function generateOrderId() {
        const timestamp = Date.now();
        const randomNum = Math.floor(Math.random() * 1000);
        return `O00`;
    }*/

  /*  function generateOrderId() {
        // Extract the numerical part of the existing order IDs and find the maximum value
        let maxId = 0;
        orders.forEach(order => {
            if (order.orderId) {
                const currentIdNum = parseInt(order.orderId.slice(1), 10);
                if (currentIdNum > maxId) {
                    maxId = currentIdNum;
                }
            }
        });

        // Increment the maximum value by 1 to get the new order ID number
        const newIdNum = maxId + 1;

        // Format the new order ID number with leading zeros
        const newId = `O${newIdNum.toString().padStart(3, '0')}`;

        return newId;
    }*/

    // Example usage:
/*    console.log(generateOrderId());*/

    function generateRandomID() {
        return Math.random().toString(36).substr(2, 9);
    }

    const uniqueID = generateRandomID();
    $('#inputOrderId').val(uniqueID);
    $(document).ready(function() {

      /*  $('#inputOrderId').val(generateOrderId());*/
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

        $('#inputBalance').val("");
        $('#inputDiscount').val("");
        $('#inputCash').val("");
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



    $('#add-item-btn').on('click', () => {
        let itemId = $('#inputItemId').val();
        let itemName = $('#inputItemName').val();
        let itemPrice = $('#inputItemPrice').val();
        let itemQty = $('#inputItemQty').val();
        let selectedQty = parseFloat($('#inputItemSelectedQty').val());

        let existingItemIndex = orderItems.findIndex(item => item.id === itemId);

        if (existingItemIndex !== -1) {

            orderItems[existingItemIndex].selectedQty += selectedQty;
            updateOrderItemRow(existingItemIndex, orderItems[existingItemIndex]);
        } else {

            let itemOfOrder = new ItemOfOrderModel(itemId, itemName, itemPrice, itemQty, selectedQty);
            orderItems.push(itemOfOrder);
            addOrderItemToTable(itemOfOrder, calculateTotal(itemPrice, selectedQty));
        }

        setTotalIntoLabel(orderItems);
        clearFields();
       /* $('#inputItemId').val('');
        $('#inputItemName').val('');
        $('#inputItemPrice').val('');
        $('#inputItemQty').val('');
        $('#inputItemSelectedQty').val('');*/
    });

    function clearFields() {
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
    }

    function updateOrderItemRow(index, item) {

        let total = calculateTotal(item.q, item.selectedQty);
        orderItems[index].total = total;


        $(`#orderSelectedItem tr:eq(${index + 1}) td:nth-child(4)`).text(item.selectedQty);
        $(`#orderSelectedItem tr:eq(${index + 1}) td:nth-child(6)`).text(total.toFixed(2));

    }
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
        $('#countTotal').text("Total: Rs " + setTotal.toFixed(2));
      console.log(setTotal);

    }


    function calculateSubTotal(discount, total, cash) {
        if (!isNaN(discount) && !isNaN(total)) {
            let subTotal = total - (total * discount / 100);
            console.log("Subtotal: ", subTotal.toFixed(2));
            let balance = cash - subTotal;
            console.log("Balance: ", balance.toFixed(2));
            $('#countBalance').text("Balance: Rs " + balance.toFixed(2));
        } else {
            console.log("Invalid input");
             $('#inputBalance').val("");
        }
    }

    $('#placeOrder').on('click', () => {
        generateOrderId();
        let date = $('#date').val();
        let orderId = $('#inputOrderId').val();
        let customerId = $('#inputCustomerId').val();
        let customerName = $('#inputCustomerName').val();
        let itemId = $('#inputItemId').val();
        let itemName = $('#inputItemName').val();
        let selectedQty = parseFloat($('#inputItemSelectedQty').val());


        let discount = parseFloat($('#inputDiscount').val());
        let cash = parseFloat($('#inputCash').val());
        let total = parseFloat($('#countTotal').text().replace("Total: Rs ", ""));

        console.log("Discount: ", discount);
        console.log("Cash: ", cash);
        console.log("Total: ", total);

        let or = new OrdersModel(date,orderId,customerId,customerName,itemId,itemName,selectedQty,discount,cash,total);
        orders.push(or);
        console.log(orders);
        calculateSubTotal(discount, total, cash);
    });

