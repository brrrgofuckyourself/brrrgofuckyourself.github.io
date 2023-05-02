const serversList = $('#serversList').DataTable({
    ajax: {
        type: 'POST',
        url: baseUrl + 'dash/admin/servers/serversList',
        data: {},
        headers: {'Content-type': 'application/x-www-form-urlencoded'},
        dataType: "json",
    },
    columns: [
        { "data": "name" },
        { "data": "type" },
        { "data": "status" },
        { "data": "actions" },
    ], 
});
$(document).on('click', '.refreshServersList', function() {
    serversList.ajax.reload();
});
$(document).on('click', '.saveServer', function() {
    const apiName = $('.apiName').val();
    const apiUrl = $('.apiUrl').val();
    const type = $('.type').val();
    $('.saveServerButton').attr('style', 'display:none');
    $('.saveServerInProgressButton').attr('style', 'display:inline');
    $.ajax({
        type: "POST",
        url: baseUrl + 'dash/admin/servers/saveServer',
        data: {apiName:apiName, apiUrl: apiUrl, type: type},
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
                serversList.ajax.reload();
                $('.saveServerButton').attr('style', 'display:inline');
                $('.saveServerInProgressButton').attr('style', 'display:none');
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
                $('.saveServerButton').attr('style', 'display:inline');
                $('.saveServerInProgressButton').attr('style', 'display:none');
            }
        },
    });
});
function deleteServer(id) {
    $.ajax({
        type: "POST",
        url: baseUrl + 'dash/admin/servers/deleteServer',
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
                serversList.ajax.reload();
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