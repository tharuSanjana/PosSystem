
function addItemToTable(items) {
    $('#item-body').empty();
    i.map((item,index)=>{
    var record =
         `<tr>
            <td id="colId">${item.id}</td>
            <td id="colName">${item.name}</td>
            <td id="colQty">${item.q}</td>
            <td id="colPrice">${item.p}</td>
        </tr>`;


        $('#item-table').append(record);
    });


}

let i = [];
$('#item-save').on('click', () => {
    let id = $('#item-id').val();
    let na = $('#item-name').val();
    let qty = $('#item-qty').val();
    let price = $('#item-price').val();

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


    addItemToTable(items);
getItemCost(i);

    $('#item-id').val('');
    $('#item-name').val('');
    $('#item-qty').val('');
    $('#item-price').val('');
});


$('#item-body').on('click','tr',function () {
    let index = $(this).index();
    getIndexNum=index;
    let id = $(this).find('#colId').text();
    let name = $(this).find('#colName').text();
    let qty = $(this).find('#colQty').text();
    let price = $(this).find('#colPrice').text();


    console.log("clicked index: ",index);
    console.log("clicked id: ",id);
    console.log("clicked name: ",name);
    console.log("clicked qty: ",qty);
    console.log("clicked price: ",price);


    $('#item-id').val(id);
    $('#item-name').val(name);
    $('#item-qty').val(qty);
    $('#item-price').val(price);


});


$('#item-update').on('click', () => {
    let id = $('#item-id').val();
    let na = $('#item-name').val();
    let qty = $('#item-qty').val();
    let price = $('#item-price').val();

    i[getIndexNum].id = id;
    i[getIndexNum].name = na;
    i[getIndexNum].q = qty;
    i[getIndexNum].p = price;

    addItemToTable(i[getIndexNum]);
    $('#item-id').val('');
    $('#item-name').val('');
    $('#item-qty').val('');
    $('#item-price').val('');
});

$('#item-delete').on('click',()=>{
    i.splice(getIndexNum,1);
   addItemToTable(i[getIndexNum]);

    $('#item-id').val('');
    $('#item-name').val('');
    $('#item-qty').val('');
    $('#item-price').val('');

});



function getItemCost(i) {

let totalCost=0;
    for (let j=0;j<i.length;j++){
        let cost = i[j].q*i[j].p;
        totalCost += cost ;
    }
    $('#cost').text(totalCost);
    console.log("Total cost : ", totalCost);
}
