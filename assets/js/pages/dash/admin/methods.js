const methodsList = $('#methodsList').DataTable({
    ajax: {
        type: 'POST',
        url: baseUrl + 'dash/admin/methods/methodsList',
        data: {},
        headers: {'Content-type': 'application/x-www-form-urlencoded'},
        dataType: "json",
    },
    columns: [
        { "data": "methodName" },
        { "data": "methodFullName" },
        { "data": "methodType" },
        { "data": "methodSection" },
        { "data": "methodTime" },
        { "data": "methodSlots" },
        { "data": "methodPremium" },
        { "data": "actions" },
    ], 
});
$(document).on('click', '.methodsList', function() {
    methodsList.ajax.reload();
});
$(document).on('click', '.saveMethod', function() {
    const methodName = $('.methodName').val();
    const methodFullName = $('.methodFullName').val();
    const methodType = $('.methodType').val();
    const methodSection = $('.methodSection').val();
    const methodTime = $('.methodTime').val();
    const methodSlots = $('.methodSlots').val();
    const methodPremium = $('.methodPremium').val();
    $('.saveMethodButton').attr('style', 'display:none');
    $('.saveMethodInProgressButton').attr('style', 'display:inline');
    $.ajax({
        type: "POST",
        url: baseUrl + 'dash/admin/methods/saveMethod',
        data: {methodName: methodName, methodFullName: methodFullName, methodType: methodType, methodSection: methodSection, methodTime: methodTime, methodSlots: methodSlots, methodPremium: methodPremium},
        headers: {'Content-type': 'application/x-www-form-urlencoded'},
        dataType: "json",
        success: function(data) {
            if(data.success) {
                new swal({
                    title: "Success!",
                    text: data.message,
                    icon: "success",
                    closeOnClickOutside: true,
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true,
                });
                methodsList.ajax.reload();
                $('.saveMethodButton').attr('style', 'display:inline');
                $('.saveMethodInProgressButton').attr('style', 'display:none');
            } else {
                new swal({
                    title: "Error!",
                    text: data.message,
                    icon: "error",
                    closeOnClickOutside: true,
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true,
                });
                $('.saveMethodButton').attr('style', 'display:inline');
                $('.saveMethodInProgressButton').attr('style', 'display:none');
            }
        },
    });
});
function deleteMethod(methodName) {
    $.ajax({
        type: "POST",
        url: baseUrl + 'dash/admin/methods/deleteMethod',
        data: {methodName: methodName},
        headers: {'Content-type': 'application/x-www-form-urlencoded'},
        dataType: "json",
        success: function(data) {
            if(data.success) {
                new swal({
                    title: "Success!",
                    text: data.message,
                    icon: "success",
                    closeOnClickOutside: true,
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true,
                });
                methodsList.ajax.reload();
            } else {
                new swal({
                    title: "Error!",
                    text: data.message,
                    icon: "error",
                    closeOnClickOutside: true,
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true,
                });
            }
        },
    });
};