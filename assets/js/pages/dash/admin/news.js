const newsList = $('#newsList').DataTable({
    ajax: {
        type: 'POST',
        url: baseUrl + 'dash/admin/news/newsList',
        data: {},
        headers: {'Content-type': 'application/x-www-form-urlencoded'},
        dataType: "json",
    },
    columns: [
        { "data": "title" },
        { "data": "text" },
        { "data": "date" },
        { "data": "actions" },
    ], 
});
$(document).on('click', '.refreshNewsList', function() {
    newsList.ajax.reload();
});
$(document).on('click', '.saveNews', function() {
    const text = $('.text').val();
    const title = $('.title').val();
    $('.saveNewsButton').attr('style', 'display:none');
    $('.saveNewsInProgressButton').attr('style', 'display:inline');
    $.ajax({
        type: "POST",
        url: baseUrl + 'dash/admin/news/saveNews',
        data: {title: title, text: text},
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
                newsList.ajax.reload();
                $('.saveNewsButton').attr('style', 'display:inline');
                $('.saveNewsInProgressButton').attr('style', 'display:none');
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
                $('.saveNewsButton').attr('style', 'display:inline');
                $('.saveNewsInProgressButton').attr('style', 'display:none');
            }
        },
    });
});
function deleteNews(id) {
    $.ajax({
        type: "POST",
        url: baseUrl + 'dash/admin/news/deleteNews',
        data: {id: id},
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
                newsList.ajax.reload();
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