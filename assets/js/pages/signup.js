$(document).ready(function(){
    $(document).on('click', '.refreshCaptcha', function() {
        $('.captchaImg').attr('src', baseUrl + 'dash/signup/generateCaptcha?' + Date.now());
    });
    $(document).on('click', '.signUp', function() {
        const clientUsername = $('.clientUsername').val();
        const clientEmail = $('.clientEmail').val();
        const clientPassword = $('.clientPassword').val();
        const captchaToken = $('.captchaToken').val();
        $.ajax({
            type: "POST",
            url: baseUrl + 'dash/signup/registerUser',
            data: {clientUsername: clientUsername, clientEmail: clientEmail, clientPassword: clientPassword, captchaToken: captchaToken},
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
                    $('.captchaImg').attr('src', baseUrl + 'dash/signup/generateCaptcha?' + Date.now());
                }
            },
        });
    });
});