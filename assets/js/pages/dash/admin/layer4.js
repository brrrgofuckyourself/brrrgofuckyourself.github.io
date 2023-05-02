const list = $('#list').DataTable({
    ajax: {
        type: 'POST',
        url: baseUrl + 'dash/admin/layer4/list',
        data: {},
        headers: {'Content-type': 'application/x-www-form-urlencoded'},
        dataType: "json",
    },
    columns: [
        { "data": "clientId" },
        { "data": "clientUsername" },
        { "data": "attackId" },
        { "data": "ipAddress" },
        { "data": "port" },
        { "data": "time" },
        { "data": "attackMethod" },
        { "data": "attackStatus" },
        { "data": "attackStarted" },
        { "data": "actions" },
    ], 
});
$(document).on('click', '.refreshList', function() {
    list.ajax.reload();
});
$(document).on('click', '.stopAttacks', function() {
    $.ajax({
        type: "POST",
        url: baseUrl + 'dash/admin/layer4/stopAllAttacks',
        data: {},
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
                list.ajax.reload();
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
});
$(document).on('click', '.truncateList', function() {
    $.ajax({
        type: "POST",
        url: baseUrl + 'dash/admin/layer4/truncateList',
        data: {},
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
                list.ajax.reload();
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
});
function stopAttack(id) {
    $.ajax({
        type: "POST",
        url: baseUrl + 'dash/admin/layer4/stopAttack',
        data: {id: id},
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
                list.ajax.reload();
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