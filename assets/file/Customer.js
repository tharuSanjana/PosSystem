
function addCustomerToTable(customer) {
    c.map((item,index)=>{

        var record = `<tr>
        <td>${item.id}</td>
        <td>${item.name}</td>
        <td>${item.nic}</td>
        <td>${item.address}</td>
        <td>${item.tel}</td>
    </tr>`;
        $('#customerTable').append(record);
    });


}
let c=[];
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
});

