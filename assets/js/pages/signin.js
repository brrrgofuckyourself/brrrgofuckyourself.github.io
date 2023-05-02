$(document).ready(function(){
    $(document).on('click', '.signIn', function() {
        const clientUsername = $('.clientUsername').val();
        const clientPassword = $('.clientPassword').val();
        $.ajax({
            type: "POST",
            url: baseUrl + 'dash/signin/loginUser',
            data: {clientUsername: clientUsername, clientPassword: clientPassword},
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
                    setTimeout(() => {
                        $(location).attr('href', baseUrl + 'dash/home');
                    }, 2100);
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
});