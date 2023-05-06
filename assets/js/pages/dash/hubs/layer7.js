$(document).ready(function() {

    $(document).on('click', '.stopAllAttacks', function() {
        $.ajax({
            type: "POST",
            url: baseUrl + 'dash/hubs/layer7/stopAllAttacks',
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
    $(document).on('click', '.sendAttack', function() {
        const ipAddress = $('.ipAddress').val();
        const time = $('.time').val();
        const attackMethod = $('.attackMethod').val();
        const requestType =  $('.requestType').val();
        const rateLimit = $('.rateLimit').val();
        const cookie = $('.cookie').val();
        const postData = $('.postData').val();
        const geolocation = $('.geolocation').val();
        $('.sendAttackButton').attr('style', 'display:none');
        $('.attackInProgressButton').attr('style', 'display:inline');
        sendReqAttack(ipAddress, time, attackMethod, requestType, rateLimit, cookie, postData, geolocation);
    });
    setInterval(() => {
        $.ajax({
            url: baseUrl + 'dash/hubs/layer7/attacksList',
            dataType: 'HTML',
            success: function(data) {
                $('.attacksList').html(data);
            }
        });
    }, 1000);
});
function sendReqAttack(ipAddress, time, attackMethod, requestType, rateLimit, cookie, postData, geolocation) {
        $.ajax({
            type: "POST",
            url: baseUrl + 'dash/hubs/layer7/sendAttack',
            data: {ipAddress: ipAddress, time: time, attackMethod: attackMethod, requestType: requestType, rateLimit: rateLimit, cookie: cookie, postData: postData, geolocation: geolocation},
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
                    if (data.message == "No server is available or online at the moment, please renew your request within minutes.") {
                        setTimeout(sendReqAttack(ipAddress, time, attackMethod, requestType, rateLimit, cookie, postData, geolocation), 3000);
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
                }
                $('.attackInProgressButton').attr('style', 'display:none');
                $('.sendAttackButton').attr('style', 'display:inline');
            },
        });
}

function stopAttack(attackId) {
    $.ajax({
        type: "POST",
        url: baseUrl + 'dash/hubs/layer7/stopAttack',
        data: {attackId: attackId},
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
}
