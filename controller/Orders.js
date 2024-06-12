    import {CustomerModel} from "../model/CustomerModel.js";
    import {ItemOfOrderModel} from "../model/ItemOfOrderModel.js";
    import {OrdersModel} from "../model/OrdersModel.js";
    import {c} from "../db/db.js";
    import {i} from "../db/db.js";
    import {orderItems} from "../db/db.js";
    import {orders} from "../db/db.js";


    $(document).ready(function() {

        $('#inputOrderId').val('');
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

    let currentOrderItems = [];
    $('#add-item-btn').on('click', () => {
        let orderId = $('#inputOrderId').val();
        let itemId = $('#inputItemId').val();
        let itemName = $('#inputItemName').val();
        let itemPrice = parseFloat($('#inputItemPrice').val());
        let itemQty = parseFloat($('#inputItemQty').val());
        let selectedQty = parseFloat($('#inputItemSelectedQty').val());

        if (isNaN(itemPrice) || isNaN(itemQty) || isNaN(selectedQty)) {
            alert('Please enter valid numbers for item price, quantity, and selected quantity.');
            return;
        }

        if (!orderId || !itemId || !itemName || isNaN(itemPrice) || isNaN(itemQty) || isNaN(selectedQty)) {
            alert('Please fill out all fields correctly.');
            return;
        }

        if (selectedQty > itemQty|| selectedQty<=0) {
            alert('Selected quantity exceeds available stock.');
            return;
        }

        let itemOfOrder = new ItemOfOrderModel(orderId,itemId, itemName, itemPrice, itemQty, selectedQty);
        orderItems.push(itemOfOrder);
        addOrderItemToTable(itemOfOrder, calculateTotal(itemPrice, selectedQty));
        console.log("aaaaaaaaaaaaaaaa");
        setTotalIntoLabel(orderItems,orderId);
        updateItemQty(itemId,selectedQty);

       /* clearFields();*/
    });

    function clearFields() {
       /* $('#inputItemId').val('');
        $('#inputItemName').val('');
        $('#inputItemPrice').val('');
        $('#inputItemQty').val('');
        $('#inputItemSelectedQty').val('');*/

         $('#getDate').val('');
         $('#inputOrderId').val('');
         $('#inputCustomerId').val('');
        $('#inputCustomerName').val('');
        $('#inputCustomerNic').val('');
        $('#inputCustomerEmail').val('');
        $('#inputCustomerAddress').val('');
        $('#inputCustomerTel').val('');
        $('#inputItemId').val('');
        $('#inputItemName').val('');
        $('#inputItemSelectedQty').val('');
        $('#inputItemPrice').val('');
        $('#inputItemQty').val('');
        $('#inputDiscount').val('');
        $('#inputCash').val('');
        $('#countTotal').val('');
        $('#countBalance').val('');
    }

    function addOrderItemToTable(item, total) {
        var record = `<tr>
        <td>${item.id}</td>
        <td>${item.name}</td>
         <td>${item.p}</td>
        <td>${item.selectedQty}</td>
        <td>${item.q}</td>
        
        
        <td>${total}</td>
    </tr>`;
        $('#orderSelectedItem').append(record);

    }

    function calculateTotal(itemPrice, selectedQty) {
        let total = itemPrice * selectedQty;
        console.log("total: ", total);
        return total;
    }

   /* function setTotalIntoLabel(orderItems,orderId) {
        let setTotal = 0;
        for (let j = 0; j < orderItems.length; j++) {
            if(orderItems[j].oId == orderId){
                let itemPrice = orderItems[j].p;
                let selectedQty = orderItems[j].selectedQty;
                setTotal += itemPrice * selectedQty;
            }
            /!*let itemPrice = orderItems[j].p;
            let selectedQty = orderItems[j].selectedQty;
            setTotal += itemPrice * selectedQty;*!/
        }
        $('#countTotal').text("Total: Rs " + setTotal.toFixed(2));
        console.log(setTotal);
    }*/
    function setTotalIntoLabel(orderItems, orderId) {
        let setTotal = 0;
        orderItems.forEach(item => {
            if (item.oId === orderId) {
                setTotal += item.p * item.selectedQty;
            }
        });
        $('#countTotal').text("Total: Rs " + setTotal.toFixed(2));
        console.log("Total for order ID " + orderId + ": " + setTotal);
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
        let date = $('#getDate').val();
        let orderId = $('#inputOrderId').val();
        let customerId = $('#inputCustomerId').val();
        let customerName = $('#inputCustomerName').val();
        let itemId = $('#inputItemId').val();
        let itemName = $('#inputItemName').val();
        let selectedQty = parseFloat($('#inputItemSelectedQty').val());
        let discount = parseFloat($('#inputDiscount').val());
        let cash = parseFloat($('#inputCash').val());
        let total = parseFloat($('#countTotal').text().replace("Total: Rs ", ""));
       /* let balance = parseFloat($('#countBalance').text().replace("Balance: Rs ", ""));*/

        /*if (isNaN(discount) || isNaN(cash) || isNaN(total) || isNaN(balance)) {
            alert('Please ensure all monetary fields are valid numbers.');
            return;
        }*/
       /* if(isNaN(discount)){
            alert('Please ensure all monetary fields are valid numbers. discount');
            return;
        }if(isNaN(cash)){
            alert('Please ensure all monetary fields are valid numbers. cash');
            return;
        } if(isNaN(total)){
        alert('Please ensure all monetary fields are valid numbers. total');
        return;
    }if(isNaN(balance)){
            alert('Please ensure all monetary fields are valid numbers. balance');
            return;
        }*/

        /*let or = new OrdersModel(date, orderId, customerId, itemId, itemName, selectedQty, cash, discount, total, balance);
        orders.push(or);
        console.log(orders);*/

        if (!customerId) {
            alert('Please enter Customer ID');
            return;
        }

        if (!itemId) {
            alert('Please enter Item ID');
            return;
        }

        if (!cash) {
            alert('Please enter Cash');
            return;
        }

        if (!discount) {
            alert('Please enter Discount');
            return;
        }

        if (!selectedQty) {
            alert('Please enter item Selected Qty');
            return;
        }

        if (!orderId) {
            alert('Please enter order ID');
            return;
        }

        if (!/^O00\d+$/.test(orderId)) {
            alert('ID should start with O00 and be followed by at least one digit');
            return;
        }

        if (orders.some(item => item.id === orderId)) {
            alert('ID already exists');
            clearInputFields();
            return;
        }

        if (isNaN(discount) || isNaN(cash) || isNaN(total)) {
            alert('Please ensure all monetary fields are valid numbers.');
            return;
        }

        let subTotal = total - (total * discount / 100);
        let balance = cash - subTotal;
        $('#countBalance').text("Balance: Rs " + balance.toFixed(2));

        if (isNaN(balance)) {
            alert('Please ensure all monetary fields are valid numbers.');
            return;
        }
       /* calculateSubTotal(discount, total, cash);*/
        let or = new OrdersModel(date, orderId, customerId, itemId, itemName, selectedQty, cash, discount, total, balance);
        orders.push(or);
        console.log(orders);
        getOrderCount(orders);
        clearFields();
        $('#orderItem').empty();


    });

    function resetTotal() {
        $('#countTotal').text("Total: Rs 0.00");
        $('#countBalance').text("Balance: Rs 0.00");
    }

    document.addEventListener('DOMContentLoaded', (event) => {
        const viewOrdersButton = document.getElementById('viewOrders');
        const closePopupButton = document.getElementById('closePopup');
        const allOrdersViewPopup = document.getElementById('allOrdersView-popup');
        const searchOrderButton = document.getElementById('searchOrderBtn');
        const closePopupBtn = document.getElementById('closeOrder-popup');
        const searchOrderPopup = document.getElementById('searchOrder-popup');

        searchOrderButton.addEventListener('click', () => {
            getSearchOrder();
            searchOrderPopup.style.display = 'block';
        });

        closePopupBtn.addEventListener('click', () => {
            $('#searchOrderField').val('');
            $('#searchOrderTbody').empty();
            searchOrderPopup.style.display = 'none';
        });

        viewOrdersButton.addEventListener('click', () => {
            addAllOrdersInToTable();
            allOrdersViewPopup.style.display = 'block';
        });

        closePopupButton.addEventListener('click', () => {
            allOrdersViewPopup.style.display = 'none';
        });
    });

    function addAllOrdersInToTable() {
        $('#ordersTbody').empty();
        orders.forEach(order => {
            var recordAllOrders = `
        <tr>
            <td>${order.date}</td>
            <td>${order.orderId}</td>
            <td>${order.customerId}</td>
            <td>${order.cash}</td>
            <td>${order.discount}</td>
            <td>${order.total}</td>
            <td>${order.balance}</td>
        </tr>`;
            $('#ordersTbody').append(recordAllOrders);
        });
    }

    function getSearchOrder() {
        let orderId = $('#searchOrderField').val();
        $('#searchOrderTbody').empty();
        const order = orders.find(item => item.orderId === orderId);
        if (order) {
            const record = `
                <tr>
                    <td>${order.date}</td>
                    <td>${order.orderId}</td>
                    <td>${order.customerId}</td>
                    <td>${order.cash}</td>
                    <td>${order.discount}</td>
                    <td>${order.total}</td>
                    <td>${order.balance}</td>
                </tr>`;
            $('#searchOrderTbody').append(record);
        } else {
            $('#searchOrderTbody').append('<tr><td colspan="7">Order not found</td></tr>');
        }
    }


    function updateItemQty(itemId, selectedQty) {
        let itemFound = false;
        i.forEach(item => {
            if (item.id === itemId) {
                item.q -= selectedQty;
                itemFound = true;
                console.log(`Updated item: id=${item.id}, new qty=${item.q}`);
            }
        });

        if (!itemFound) {
            console.error(`Item with id ${itemId} not found.`);
        }

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

    function getOrderCount(orders) {
        let count = orders.length;
        $('#count').text(count);
        $('#orderOrder').text(count);
        console.log("customer count: ", count);
    }