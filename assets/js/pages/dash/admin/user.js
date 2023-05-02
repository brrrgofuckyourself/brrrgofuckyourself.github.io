$(document).ready(function() {
    $(document).on('click', '.saveSettings', function() {
        const clientId = $('.clientId').val();
        const clientUsername = $('.clientUsername').val();
        const clientPassword = $('.clientPassword').val();
        const userPlan = $('.userPlan').val();
        const expirePlan = $('.expirePlan').val();
        $('.saveSettingsButton').attr('style', 'display:none');
        $('.saveSettingsInProgressButton').attr('style', 'display:inline');
        $.ajax({
            type: "POST",
            url: baseUrl + 'dash/admin/users/userSettings',
            data: {clientUsername: clientUsername, clientPassword: clientPassword, userPlan: userPlan, expirePlan: expirePlan, clientId: clientId},
            headers: {'Content-type': 'application/x-www-form-urlencoded'},
            dataType: "json",
            success: function(data) {
                if(data.success) {
                    location.reload();
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
                    $('.saveSettingsButton').attr('style', 'display:inline');
                    $('.saveSettingsInProgressButton').attr('style', 'display:none');
                }
            },
        });
    });
});