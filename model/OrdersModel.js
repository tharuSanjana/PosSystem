
export class OrdersModel {


    get date() {
        return this._date;
    }

    set date(value) {
        this._date = value;
    }

    get orderId() {
        return this._orderId;
    }

    set orderId(value) {
        this._orderId = value;
    }

    get customerId() {
        return this._customerId;
    }

    set customerId(value) {
        this._customerId = value;
    }

    get itemId() {
        return this._itemId;
    }

    set itemId(value) {
        this._itemId = value;
    }

    get itemName() {
        return this._itemName;
    }

    set itemName(value) {
        this._itemName = value;
    }

    get selectedQty() {
        return this._selectedQty;
    }

    set selectedQty(value) {
        this._selectedQty = value;
    }

    get cash() {
        return this._cash;
    }

    set cash(value) {
        this._cash = value;
    }

    get discount() {
        return this._discount;
    }

    set discount(value) {
        this._discount = value;
    }

    get total() {
        return this._total;
    }

    set total(value) {
        this._total = value;
    }

    get balance() {
        return this._balance;
    }

    set balance(value) {
        this._balance = value;
    }

    constructor(date,orderId,customerId,itemId,itemName,selectedQty,cash,discount,total,balance) {
        this._date = date;
        this._orderId = orderId;
        this._customerId = customerId;
        this._itemId = itemId;
        this._itemName = itemName;
        this._selectedQty = selectedQty;
        this._cash = cash;
        this._discount = discount;
        this._total = total;
        this._balance = balance;

    }


}