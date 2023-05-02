$(document).ready(function() {
    const homeStatistics = () => {
        $.ajax({
            type: 'POST',
            url: baseUrl + 'dash/home/homeStatistics',
            data: {},
            headers: {'Content-type': 'application/x-www-form-urlencoded'},
            dataType: "json",
            success: function(data) {
                $('.registeredUsers').text(data.registeredUsers);
                $('.attacksToday').text(data.attacksToday);
                $('.runningAttacks').text(data.runningAttacks);
                $('.totalActivePlans').text(data.totalActivePlans);
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