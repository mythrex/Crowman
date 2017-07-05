var line = {};
var bank;
var notifArr = [];

function dispBankDet(ul,bankObj){
  var date = new Date();
  ul.append(`
    <li>${date.getHours()+":"+date.getMinutes()}</li>
    <li>${bankObj.name}</li>
    <li>No of People: ${bankObj.queue}</li>
    <li>Avg. Time: ${bankObj.avgTime}</li>
    `);
}
//Notification function

//add to queue
function addToActivity(msg){
  $("#last-activity").append(`
      <li>${msg}</li>
    `);
}


$(function(){
  //loading bank.json and data.json
  var bankUl = $('#bank-data');
  $.getJSON('data/bank.json', function(bankData) {
      $.getJSON('data/data.json',function(lineData,stat) {
        line = lineData;
        bank = bankData[0];
        //display Bank Details
        dispBankDet(bankUl,bank);
        //onclick event send the Notification
        $("#notification-send").click(function(event) {
          var message = $("#notification-message").val();
          $("#modal-notification").modal('hide');
          addToActivity( "\""+ message + "\": Notification was Sent!")
          makeAlert('info','Notification Sent!');
          sendNotification(message,notifArr);
        });
        //add People to line
        var lineOverview = $("#line-overview");
        refreshLineOverview(lineOverview);

        //add By admin
        addByAdmin();

        //refresh line
        function refreshLineOverview(lineOverview){
          $(lineOverview).empty();
          addPeopleToLine(lineOverview,line);
          $(".fa-user").click(removePeople);
        }

        //remove People On click
        function removePeople(event) {
          let id = $(event.target).attr('crowman-id');
          var res = window.confirm("Are you sure you want to delete person with ID: "+id);
          if(res){
            delete line[id];
            makeAlert("danger","Deleted Crowman-id: "+id,2000);
            addToActivity("Crowman-id: "+id+" removed!");
            //saving data
            bankData[0] = bank;
            saveData(bankData,line);
            //refreshing line
            refreshLineOverview(lineOverview,id);
          }
        }
        //show last added
        function showLastAdded(id,name,phoneNo,adhaarNo){
          $("#last-added").empty().append(`
              <p><strong>Id: </strong>${id}</p>
              <p><strong>Name: </strong>${name}</p>
              <p><strong>Phone No: </strong>${phoneNo}</p>
              <p><strong>adhaarNo: </strong>${adhaarNo}</p>
            `);
        }
        //function to add by Admin
        function addByAdmin(){
          var name = $("#add-name").val();
          var phoneNo = $("#add-phone-no").val();
          var adhaarNo = $("#add-adhaar-no").val();
          var addBtn = $("#admin-add");
          var id;
          for(id in line){}
          addBtn.click(function(){
              showLastAdded((+id)+1,name,phoneNo,adhaarNo);
          });
        }

      });
  });
});
