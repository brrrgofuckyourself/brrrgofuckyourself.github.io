$(document).ready(function() {
    const usersList = $('#usersList').DataTable({
        ajax: {
            type: 'POST',
            url: baseUrl + 'dash/admin/users/usersList',
            data: {},
            "dataSrc": function ( json ) {
              for ( var i=0, ien=json.data.length ; i<ien ; i++ ) {
                // Client Status
                if(json.data[i]["clientStatus"] == 0){
                  json.data[i]["clientStatus"] = '<button type="button" class="btn btn-sm btn-lime">Active</button>';
                }
                else if(json.data[i]["clientStatus"] == 1){
                  json.data[i]["clientStatus"] = '<button type="button" class="btn btn-sm btn-red">Banned</button>';
                }
                else{
                  json.data[i]["clientStatus"] = '<button type="button" class="btn btn-sm btn-red">Unknown</button>';
                }
                
                // Plan name
                if(!json.data[i]["planName"]){
                  json.data[i]["planName"] = "N/A";
                }
                else{
                  json.data[i]["planName"] = json.data[i]["planName"];
                }
                json.data[i]["planName"] = "<b>" + json.data[i]["planName"] + "</b>";

                // Expiration Date
                var cd = new Date(parseInt(json.data[i]["clientCreated"])*1000);
                json.data[i]["clientCreated"] = cd.getHours().toString().padStart(2, '0') + ":" + cd.getMinutes().toString().padStart(2, '0') + ":" + cd.getSeconds().toString().padStart(2, '0') + " " + cd.getDate().toString().padStart(2, '0') + "/" + (cd.getMonth()+1).toString().padStart(2, '0') + "/" + cd.getFullYear();
                
                if(!json.data[i]["planExpire"]){
                  json.data[i]["planExpire"] = "Never";
                }
                else{
                  var pe = new Date(parseInt(json.data[i]["planExpire"])*1000);
                  json.data[i]["planExpire"] = pe.getHours().toString().padStart(2, '0') + ":" + pe.getMinutes().toString().padStart(2, '0') + ":" + pe.getSeconds().toString().padStart(2, '0') + " " + pe.getDate().toString().padStart(2, '0') + "/" + (pe.getMonth()+1).toString().padStart(2, '0') + "/" + pe.getFullYear();
                }
                
              }
              return json.data;
            },
            headers: {'Content-type': 'application/x-www-form-urlencoded'},
            dataType: "json",
        },
        columns: [
            { "data": "clientId" },
            { "data": "clientUsername" },
            { "data": "clientStatus" },
            { "data": "planName" },
            { "data": "planExpire" },
            { "data": "clientCreated" },
            { "data": "clientActions" },
        ], 
	});
    $(document).on('click', '.refreshUserList', function() {
        usersList.ajax.reload();
    });
});
function deleteUser(clientId) {
    $.ajax({
        type: "POST",
        url: baseUrl + 'dash/admin/users/deleteUser',
        data: {clientId: clientId},
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
                location.reload();
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
}
function unbanUser(clientId) {
  $.ajax({
      type: "POST",
      url: baseUrl + 'dash/admin/users/unbanUser',
      data: {clientId: clientId},
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
          }
      },
  });
}