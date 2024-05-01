
function addCustomerToTable(customer) {
    $('#tbody').empty();
    c.map((item,index)=>{

        var record = `<tr>
        <td id="colId">${item.id}</td>
        <td id="colName">${item.name}</td>
        <td id="colNic">${item.nic}</td>
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
    let address = $('#address').val();
    let tel = $('#tel').val();

    console.log("Id", id);
    console.log("name", na);
    console.log("nic", nic);
    console.log("address", address);
    console.log("tel", tel);


    let customer = {
        id: id,
        name: na,
        nic: nic,
        address: address,
        tel: tel,
        call: () => {
            console.log("saved");
        }
    };
    c.push(customer);
    addCustomerToTable(customer);


    $('#id').val('');
    $('#name').val('');
    $('#nic').val('');
    $('#address').val('');
    $('#tel').val('');
});

$('#tbody').on('click','tr',function () {
let index = $(this).index();
getIndex=index;
 let id = $(this).find('#colId').text();
 let name = $(this).find('#colName').text();
 let nic = $(this).find('#colNic').text();
 let address = $(this).find('#colAddress').text();
 let tel = $(this).find('#colTel').text();

 console.log("clicked index: ",index);
 console.log("clicked id: ",id);
 console.log("clicked name: ",name);
 console.log("clicked nic: ",nic);
 console.log("clicked address: ",address);
 console.log("clicked tel: ",tel);

 $('#id').val(id);
 $('#name').val(name);
 $('#nic').val(nic);
 $('#address').val(address);
 $('#tel').val(tel);

});

$('#customer-update').on('click',()=>{
    let id = $('#id').val();
    let na = $('#name').val();
    let nic = $('#nic').val();
    let address = $('#address').val();
    let tel = $('#tel').val();

c[getIndex].id=id;
c[getIndex].name=na;
c[getIndex].nic=nic;
c[getIndex].address=address;
c[getIndex].tel=tel;

    addCustomerToTable(c[getIndex]);
    $('#id').val('');
    $('#name').val('');
    $('#nic').val('');
    $('#address').val('');
    $('#tel').val('');

});

$('#customer-delete').on('click',()=>{
c.splice(getIndex,1);
    addCustomerToTable(c[getIndex]);
    $('#id').val('');
    $('#name').val('');
    $('#nic').val('');
    $('#address').val('');
    $('#tel').val('');
});

