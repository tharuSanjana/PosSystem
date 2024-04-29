$(document).ready(() =>{

    $('#customerPage').hide();
    $('#itemPage').hide();
    $('#ordersPage').hide();
    $('#dashboardPage').show();


    $('#nav-customer').on('click', () =>{
        event.preventDefault();
        $('#dashboardPage').hide();
        $('#itemPage').hide();
        $('#ordersPage').hide();
        $('#customerPage').show();
    });


    $('#nav-dash').on('click', () =>{
        event.preventDefault();
        $('#customerPage').hide();
        $('#itemPage').hide();
        $('#ordersPage').hide();
        $('#dashboardPage').show();
    });

    $('#nav-item').on('click', () =>{
        event.preventDefault();
        $('#customerPage').hide();
        $('#ordersPage').hide();
        $('#dashboardPage').hide();
        $('#itemPage').show();
    });

    $('#nav-orders').on('click', () =>{
        event.preventDefault();
        $('#customerPage').hide();
        $('#itemPage').hide();
        $('#dashboardPage').hide();
        $('#ordersPage').show();
    });
});