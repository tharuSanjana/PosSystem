import {CustomerModel} from "../model/CustomerModel.js";
import { c } from '../db/db.js';


function logCArray() {
    console.log(c[0]);
}

// Call the function to log c array
logCArray();

document.addEventListener('newDataAdded', function(event) {
    const newData = event.detail;
    console.log("New data received in Orders.js:", newData);
});































/*
function addOrdersToTable(orders) {
   $('#order-tbody').empty();
   o.map((item,index)=>{

      var record = `<tr>

         <td id="colOId">${item.oId}</td>
         <td id="colCId">${item.cId}</td>
         <td id="colCName">${item.cName}</td>
         <td id="colCEmail">${item.cEmail}</td>
         <td id="colCNic">${item.cNic}</td>
         <td id="colCAddress">${item.cAddress}</td>
         <td id="colIId">${item.iId}</td>
         <td id="colIName">${item.iName}</td>
         <td id="colQty">${item.qty}</td>
         <td id="colTotal">${item.total}</td>

      </tr>`;
      $('#orderTable').append(record);
   });
}




let o=[];
let getOrderIndex;
$('#placeOrder').on('click',()=>{
   let cId = $('#cId').val();
   let cName = $('#cName').val();
   let cEmail = $('#cEmail').val();
   let cNic = $('#cNic').val();
   let cAddress = $('#cAddress').val();
   let iId = $('#iId').val();
   let qty = $('#qty').val();
   let iName = $('#itemName').val();
   let oId = $('#oId').val();
   let total = $('#total').val();

   console.log("cId", cId);
   console.log("cName", cName);
   console.log("cEmail", cEmail);
   console.log("cNic", cNic);
   console.log("cAddress", cAddress);
   console.log("iId", iId);
   console.log("qty", qty);
   console.log("iName", iName);
   console.log("oId", oId);
   console.log("total", total);

   let orders = {
      cId: cId,
      cName: cName,
      cEmail: cEmail,
      cNic:cNic,
      cAddress: cAddress,
      iId: iId,
      qty: qty,
      iName: iName,
      oId: oId,
      total: total,
      call: () => {
         console.log("saved");
      }
   };
   o.push(orders);
   addOrdersToTable(orders);
   getOrdersCount(o);

   $('#cId').val('');
   $('#cName').val('');
   $('#cEmail').val('');
   $('#cNic').val('');
   $('#cAddress').val('');
   $('#iId').val('');
   $('#itemName').val('');
   $('#qty').val('');
   $('#oId').val('');
   $('#total').val('');
});

$('#order-tbody').on('click','tr',function () {
   let index = $(this).index();
   getOrderIndex=index;
   let oId = $(this).find('#colOId').text();
   let cId = $(this).find('#colCId').text();
   let cName = $(this).find('#colCName').text();
   let cEmail = $(this).find('#colCEmail').text();
   let cNic = $(this).find('#colCNic').text();
   let cAddress = $(this).find('#colCAddress').text();
   let iId = $(this).find('#colIId').text();
   let iName = $(this).find('#colIName').text();
   let qty = $(this).find('#colQty').text();
   let total = $(this).find('#colTotal').text();


   $('#cId').val(cId);
   $('#cName').val(cName);
   $('#cEmail').val(cEmail);
   $('#cNic').val(cNic);
   $('#cAddress').val(cAddress);
   $('#iId').val(iId);
   $('#itemName').val(iName);
   $('#qty').val(qty);
   $('#oId').val(oId);
   $('#total').val(total);

});

$('#update').on('click',()=>{
   let cId = $('#cId').val();
   let cName = $('#cName').val();
   let cEmail = $('#cEmail').val();
   let cNic = $('#cNic').val();
   let cAddress = $('#cAddress').val();
   let iId = $('#iId').val();
   let qty = $('#qty').val();
   let iName = $('#itemName').val();
   let oId = $('#oId').val();
   let total = $('#total').val();

   o[getOrderIndex].cId=cId;
   o[getOrderIndex].cName=cName;
   o[getOrderIndex].cEmail=cEmail;
   o[getOrderIndex].cNic=cNic;
   o[getOrderIndex].cAddress=cAddress;
   o[getOrderIndex].iName=iId;
   o[getOrderIndex].qty=qty;
   o[getOrderIndex].iName=iName;
   o[getOrderIndex].oId=oId;
   o[getOrderIndex].total=total;


   addOrdersToTable(o[getOrderIndex])
   $('#cId').val('');
   $('#cName').val('');
   $('#cEmail').val('');
   $('#cNic').val('');
   $('#cAddress').val('');
   $('#iId').val('');
   $('#itemName').val('');
   $('#qty').val('');
   $('#oId').val('');
   $('#total').val('');

});

$('#delete').on('click',()=>{
   o.splice(getOrderIndex,1);

   addOrdersToTable(o[getIndex]);
   getOrdersCount(o);
   $('#cId').val('');
   $('#cName').val('');
   $('#cEmail').val('');
   $('#cNic').val('');
   $('#cAddress').val('');
   $('#iId').val('');
   $('#itemName').val('');
   $('#qty').val('');
   $('#oId').val('');
   $('#total').val('');

})

function getOrdersCount(o) {
   let count = o.length;
   $('#count').text(count);
   $('#orderOrder').text(count);
   console.log("Orders count: ", count);
}*/
