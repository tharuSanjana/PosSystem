function addItemToTable(items) {
    $('#item-body').empty();
    i.map((item,index)=>{

        var record = `  <tr>
            <td scope="col">${item.id}</td>
            <td scope="col">${item.name}</td>
            <td scope="col">${item.q}</td>
            <td scope="col">${item.p}</td>

        </tr>`;

        $('#item-table').append(record);
    });


}
let i=[];
$('#item-save').on('click', () => {
    let id = $('#item-id').val();
    let na = $('#item-name').val();
    let qty = $('#item-qty').val();
    let price = $('#item-price').val();


    console.log("Id", id);
    console.log("name", na);
    console.log("nic", qty);
    console.log("address", price);



    let items = {
        id: id,
        name: na,
        q: qty,
        p: price,

        call: () => {
            console.log("saved");
        }
    };
    i.push(items);
   addItemToTable(items)


    $('#item-id').val('');
    $('#item-name').val('');
    $('#item-qty').val('');
    $('#item-price').val('');

});