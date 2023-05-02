const plansList = $('#plansList').DataTable({
    ajax: {
        type: 'POST',
        url: baseUrl + 'dash/admin/plans/plansList',
        data: {},
        headers: {'Content-type': 'application/x-www-form-urlencoded'},
        dataType: "json",
    },
    columns: [
        { "data": "planName" },
        { "data": "planFullName" },
        { "data": "planPrice" },
        { "data": "planSlots" },
        { "data": "planTime" },
        { "data": "planPremium" },
        { "data": "planApi" },
        { "data": "planStatus" },
        { "data": "planActions" },
    ], 
});
$(document).on('click', '.refreshPlansList', function() {
    plansList.ajax.reload();
});
$(document).on('click', '.savePlan', function() {
    const planName = $('.planName').val();
    const planFullName = $('.planFullName').val();
    const planPrice = $('.planPrice').val();
    const planSlots = $('.planSlots').val();
    const planTime = $('.planTime').val();
    const planPremium = $('.planPremium').val();
    const planApi = $('.planApi').val();
    const planStatus = $('.planStatus').val();
    $('.savePlanButton').attr('style', 'display:none');
    $('.savePlanInProgressButton').attr('style', 'display:inline');
    $.ajax({
        type: "POST",
        url: baseUrl + 'dash/admin/plans/savePlan',
        data: {planName: planName, planFullName: planFullName, planPrice: planPrice, planSlots: planSlots, planTime: planTime, planPremium: planPremium, planApi: planApi, planStatus: planStatus},
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
                plansList.ajax.reload();
                $('.savePlanButton').attr('style', 'display:inline');
                $('.savePlanInProgressButton').attr('style', 'display:none');
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
                $('.savePlanButton').attr('style', 'display:inline');
                $('.savePlanInProgressButton').attr('style', 'display:none');
            }
        },
    });
});
function deletePlan(planName) {
    $.ajax({
        type: "POST",
        url: baseUrl + 'dash/admin/plans/deletePlan',
        data: {planName: planName},
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
                plansList.ajax.reload();
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
};