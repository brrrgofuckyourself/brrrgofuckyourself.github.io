$(document).ready(function() {
    $(document).on('click', '.saveSettings', function() {
        const planId = $('.planId').val();
        const planName = $('.planName').val();
        const planFullName = $('.planFullName').val();
        const planPrice = $('.planPrice').val();
        const planSlots = $('.planSlots').val();
        const planTime = $('.planTime').val();
        const planApi = $('.planApi').val();
        const planPremium = $('.planPremium').val();
        const planStatus = $('.planStatus').val();
        $('.saveSettingsButton').attr('style', 'display:none');
        $('.saveSettingsInProgressButton').attr('style', 'display:inline');
        $.ajax({
            type: "POST",
            url: baseUrl + 'dash/admin/plans/planSettings',
            data: {planId: planId, planName: planName, planFullName: planFullName, planPrice: planPrice, planSlots: planSlots, planTime: planTime, planApi: planApi, planPremium: planPremium, planStatus: planStatus},
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