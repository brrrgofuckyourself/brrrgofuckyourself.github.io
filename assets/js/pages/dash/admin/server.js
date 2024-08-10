$(document).ready(function() {
    $(document).on('click', '.saveServer', function() {
        const serverId = $('.serverId').val();
        const apiName = $('.apiName').val();
        const apiUrl = $('.apiUrl').val();
        const apiType = $('.apiType').val();
        const apiStatus = $('.apiStatus').val();
        const apiMethods = $('.apiMethods').val();
        $('.saveServerButton').attr('style', 'display:none');
        $('.saveServerInProgressButton').attr('style', 'display:inline');
        $.ajax({
            type: "POST",
            url: baseUrl + 'dash/admin/servers/serverSettings',
            data: {serverId: serverId, apiName: apiName, apiUrl: apiUrl, apiType: apiType, apiStatus: apiStatus, apiMethods: apiMethods, stopUrl: stopUrl},
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
                    $('.saveServerButton').attr('style', 'display:inline');
                    $('.saveServerInProgressButton').attr('style', 'display:none');
                }
            },
        });
    });
});
