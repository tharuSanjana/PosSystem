
function addCustomerToTable(customer) {
    $('#tbody').empty();
    c.map((item,index)=>{

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
let c=[];
let getIndex;
$('#customer-save').on('click', () => {
    let id = $('#id').val();
    let na = $('#name').val();
    let nic = $('#nic').val();
    let email = $('#email').val();
    let address = $('#address').val();
    let tel = $('#tel').val();

    console.log("Id", id);
    console.log("name", na);
    console.log("nic", nic);
    console.log("email", email);
    console.log("address", address);
    console.log("tel", tel);


    let customer = {
        id: id,
        name: na,
        nic: nic,
        email:email,
        address: address,
        tel: tel,
        call: () => {
            console.log("saved");
        }
    };


    if (!id) {
        alert('Please enter ID');
        return;
    }

    if (!id.startsWith('C00')) {
        alert('ID should start with C00');
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
        alert('NIC should contain exactly 12 characters ');
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

    c.push(customer);
    addCustomerToTable(customer);
    getCustomerCount(c);

    $('#id').val('');
    $('#name').val('');
    $('#nic').val('');
    $('#email').val('');
    $('#address').val('');
    $('#tel').val('');
});

$('#tbody').on('click','tr',function () {
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

});

$('#customer-update').on('click',()=>{
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

    if (!id.startsWith('C00')) {
        alert('ID should start with C00');
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
        alert('NIC should contain exactly 12 characters ');
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


    c[getIndex].id=id;
c[getIndex].name=na;
c[getIndex].nic=nic;
c[getIndex].email=email;
c[getIndex].address=address;
c[getIndex].tel=tel;

    addCustomerToTable(c[getIndex]);
    $('#id').val('');
    $('#name').val('');
    $('#nic').val('');
    $('#email').val('');
    $('#address').val('');
    $('#tel').val('');

});

$('#customer-delete').on('click',()=>{
c.splice(getIndex,1);
    addCustomerToTable(c[getIndex]);
    getCustomerCount(c);



    $('#id').val('');
    $('#name').val('');
    $('#nic').val('');
    $('#email').val('');
    $('#address').val('');
    $('#tel').val('');
});


function getCustomerCount(c) {
    let count = c.length;
    $('#customerCount').text(count);
    $('#customer-count').text(count);
    console.log("customer count: ", count);
}

// function validateNIC()
// {
//     var nic = document.getElementById('nic');
//     var mesg = document.getElementById('msg');
//
//     if (nic.length != 3) {
//         msg.innerHTML="Length must be 14 characters";
//     } else{
//
//     }
// }

function validateNIC() {
    var nic = document.getElementById('nic');
    var mesg = document.getElementById('msg');

    if (nic.value.length < 3) {
        mesg.innerHTML = "Length must be at least 3 characters";
        return false; // Prevent further processing or form submission
    } else {

    }
}

/*
function validateId(id) {
    if (!id) {
        alert('Please enter ID');
        return;
    }

    if (!id.startsWith('C00')) {
        alert('ID should start with C00');
        return;
    }
}*/
