export class CustomerModel{
    get id() {
        return this._id;
    }

    set id(id) {
        this._id = id;
    }

    get na() {
        return this._na;
    }

    set na(na) {
        this._na = na;
    }

    get nic() {
        return this._nic;
    }

    set nic(nic) {
        this._nic = nic;
    }

    get email() {
        return this._email;
    }

    set email(value) {
        this._email = value;
    }

    get address() {
        return this._address;
    }

    set address(address) {
        this._address = address;
    }

    get tel() {
        return this._tel;
    }

    set tel(tel) {
        this._tel = tel;
    }

    constructor(id,na,nic,email,address,tel) {

        this._id = id;
        this.name = na;
        this._nic = nic;
        this._email = email;
        this._address = address;
        this._tel = tel;
    }
}