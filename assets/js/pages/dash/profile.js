$(document).ready(function() {
    $(document).on('click', '.updatePassword', function() {
        const clientPassword = $('.clientPassword').val();
        const clientNewPassword = $('.clientNewPassword').val();
        const clientConfirmPassword = $('.clientConfirmPassword').val();
        $.ajax({
            type: "POST",
            url: baseUrl + 'dash/profile/changePassword',
            data: {clientPassword: clientPassword, clientNewPassword: clientNewPassword, clientConfirmPassword: clientConfirmPassword},
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
    const orderList = $('#orderHistory').DataTable({
        ajax: {
            type: 'POST',
            url: baseUrl + 'dash/profile/orderHistory',
            data: {},
            headers: {'Content-type': 'application/x-www-form-urlencoded'},
            dataType: "json",
        },
        columns: [
            { "data": "id" },
            { "data": "plan" },
            { "data": "status" },
            { "data": "date" },
            { "data": "actions" },
        ], 
	});
    $(document).on('click', '.orderHistory', function() {
        usersList.ajax.reload();
    });
});