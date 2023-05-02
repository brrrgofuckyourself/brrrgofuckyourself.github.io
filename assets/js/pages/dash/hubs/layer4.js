$(document).ready(function() {
    $(document).on('click', '.stopAllAttacks', function() {
        $.ajax({
            type: "POST",
            url: baseUrl + 'dash/hubs/layer4/stopAllAttacks',
            data: {},
            headers: {'Content-type': 'application/x-www-form-urlencoded'},
            dataType: "json",
            success: function(data) {
                if(data.success) {
                    new swal({
                        title: "Success!",
                        text: data.message,
                        type: "success",
                        closeOnClickOutside: true,
                        showConfirmButton: false,
                        timer: 2000,
                        timerProgressBar: true,
                    });
                } else {
                    new swal({
                        title: "Error!",
                        text: data.message,
                        type: "error",
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
        const port = $('.port').val();
        const time = $('.time').val();
        const attackMethod = $('.attackMethod').val();
        const geolocation = $('.geolocation').val();
        $('.sendAttackButton').attr('style', 'display:none');
        $('.attackInProgressButton').attr('style', 'display:inline');
        $.ajax({
            type: "POST",
            url: baseUrl + 'dash/hubs/layer4/sendAttack',
            data: {ipAddress: ipAddress, port: port, time: time, attackMethod: attackMethod, geolocation: geolocation},
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
                $('.attackInProgressButton').attr('style', 'display:none');
                $('.sendAttackButton').attr('style', 'display:inline');
            },
        });
    });
    setInterval(() => {
        $.ajax({
            url: baseUrl + 'dash/hubs/layer4/attacksList',
            dataType: 'HTML',
            success: function(data) {
                $('.attacksList').html(data);
            }
        });
    }, 1000);
});
function stopAttack(attackId) {
    $.ajax({
        type: "POST",
        url: baseUrl + 'dash/hubs/layer4/stopAttack',
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