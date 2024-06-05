export class OrdersModel {
    get date() {
        return this._date;
    }

    set date(date) {
        this._date = date;
    }

    get orderId() {
        return this._orderId;
    }

    set orderId(orderId) {
        this._orderId = orderId;
    }

    get customerId() {
        return this._customerId;
    }

    set customerId(customerId) {
        this._customerId = customerId;
    }

    get customerName() {
        return this._customerName;
    }

    set customerName(customerName) {
        this._customerName = customerName;
    }

    get itemId() {
        return this._itemId;
    }

    set itemId(itemId) {
        this._itemId = itemId;
    }

    get itemName() {
        return this._itemName;
    }

    set itemName(itemName) {
        this._itemName = itemName;
    }

    get selectedQty() {
        return this._selectedQty;
    }

    set selectedQty(selectedQty) {
        this._selectedQty = selectedQty;
    }

    get cash() {
        return this._cash;
    }

    set cash(cash) {
        this._cash = cash;
    }

    get discount() {
        return this._discount;
    }

    set discount(discount) {
        this._discount = discount;
    }

    get total() {
        return this._total;
    }

    set total(total) {
        this._total = total;
    }

    get balance() {
        return this._balance;
    }

    set balance(balance) {
        this._balance = balance;
    }



    constructor(date, orderId, customerId, customerName, itemId, itemName, selectedQty, cash, discount, total, balance) {
        this.date = date;
        this.orderId = orderId;
        this.customerId = customerId;
        this.customerName = customerName;
        this.itemId = itemId;
        this.itemName = itemName;
        this.selectedQty = selectedQty;
        this.cash = cash;
        this.discount = discount;
        this.total = total;
        this.balance = balance;

    }


}