const blacklistList = $('#blacklistList').DataTable({
    ajax: {
        type: 'POST',
        url: baseUrl + 'dash/admin/blacklist/blacklistList',
        data: {},
        headers: {'Content-type': 'application/x-www-form-urlencoded'},
        dataType: "json",
    },
    columns: [
        { "data": "ipAddress" },
        { "data": "type" },
        { "data": "actions" },
    ], 
});
$(document).on('click', '.refreshBlacklistList', function() {
    blacklistList.ajax.reload();
});
$(document).on('click', '.saveMethod', function() {
    const ipAddress = $('.ipAddress').val();
    const type = $('.type').val();
    $('.saveBlacklistButton').attr('style', 'display:none');
    $('.saveBlacklistInProgressButton').attr('style', 'display:inline');
    $.ajax({
        type: "POST",
        url: baseUrl + 'dash/admin/blacklist/saveBlacklist',
        data: {ipAddress: ipAddress, type: type},
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
                blacklistList.ajax.reload();
                $('.saveBlacklistButton').attr('style', 'display:inline');
                $('.saveBlacklistInProgressButton').attr('style', 'display:none');
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
                $('.saveBlacklistButton').attr('style', 'display:inline');
                $('.saveBlacklistInProgressButton').attr('style', 'display:none');
            }
        },
    });
});
function deleteBlacklist(id) {
    $.ajax({
        type: "POST",
        url: baseUrl + 'dash/admin/blacklist/deleteBlacklist',
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
                blacklistList.ajax.reload();
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