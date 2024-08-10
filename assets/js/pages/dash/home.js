$(document).ready(function() {
    const homeStatistics = () => {
        $.ajax({
            type: 'POST',
            url: baseUrl + 'dash/home/homeStatistics',
            data: {},
            headers: {'Content-type': 'application/x-www-form-urlencoded'},
            dataType: "json",
            success: function(data) {
                $('.totalUsers').text(data.totalUsers);
                $('.totalBoots').text(data.totalBoots);
                $('.runningAttacks').text(data.runningAttacks);
                $('.totalServers').text(data.totalServers);
            }
        });
    }
    homeStatistics();
    const serverStatus = $('#serverStatus').DataTable({
        ajax: {
            type: 'POST',
            url: baseUrl + 'dash/home/serverStatus',
            data: {},
            headers: {'Content-type': 'application/x-www-form-urlencoded'},
            dataType: "json",
        },
        columns: [
            { "data": "id" },
            { "data": "apiName" },
            { "data": "apiStatus" },
        ], 
	});
    $(document).on('click', '.refreshServerStatus', function() {
        serverStatus.ajax.reload();
    });
});
