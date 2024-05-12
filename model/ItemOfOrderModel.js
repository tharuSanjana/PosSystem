export class ItemOfOrderModel {
    get selectedQty() {
        return this._selectedQty;
    }

    set selectedQty(selectedQty) {
        this._selectedQty = selectedQty;
    }
    get id() {
        return this._id;
    }

    set id(id) {
        this._id = id;
    }

    get name() {
        return this._name;
    }

    set name(name) {
        this._name = name;
    }

    get q() {
        return this._q;
    }

    set q(q) {
        this._q = q;
    }

    get p() {
        return this._p;
    }

    set p(p) {
        this._p = p;
    }


    constructor(id,name,q,p,selectedQty) {
        this._id = id;
        this._name = name;
        this._q = q;
        this._p = p;
        this._selectedQty = selectedQty;
    }
}