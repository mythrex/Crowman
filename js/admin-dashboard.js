var line = {};
var banlArr = [];
var bank;
var lastAdded = {};

function Person(id,name,phone,adhaarNo,next=null){
  this["token-no"] = id;
  this.name = name;
  this["adhaar-no"] = adhaarNo;
  this.phone = phone;
  this.next = next;
}


$(function loadPage(){
  //loading bank.json and data.json
  var bankUl = $('#bank-data');
  var lineOverview = $("#line-overview");
  line = JSON.parse(localStorage.getItem("line-data"));
  bankArr =  JSON.parse(localStorage.getItem("bank"));
  if(line == null || bankArr == null){
    $.getJSON('data/bank.json', function(bankData) {
        $.getJSON('data/data.json',function(lineData,stat) {
          console.log("Empty");
          saveData(bankData,lineData);
          loadPage();
        });
    });
  }
  else{
    bank = bankArr[0];
  }
        //display Bank Details
        dispBankDet(bankUl,bank);
        //onclick event send the Notification
        $("#notification-send").click(function(event) {
          var message = $("#notification-message").val();
          $("#modal-notification").modal('hide');
          addToActivity( "\""+ message + "\": Notification was Sent!")
          makeAlert('info','Notification Sent!');
          sendNotification(message);
        });

        //add People to line
        refreshLineOverview(lineOverview);

        //add By admin
        addByAdmin();

        //showing notifications
        getNotification();
        showNotifications();
        importantNotify();

        //showLastAdded
        fetchLastAdded();
        showLastAdded(lastAdded["token-no"],lastAdded["name"],lastAdded["phone"],lastAdded["adhaar-no"]);


          //functions
        function dispBankDet(ul,bankObj){
          var date = new Date();
          ul.empty().append(`
            <li>${date.getHours()+":"+date.getMinutes()}</li>
            <li>${bankObj.name}</li>
            <li>No of People: ${bankObj.queue}</li>
            <li>Avg. Time: ${bankObj.avgTime}</li>
            `);
        }
        //Notification function

        //add to queue
        function addToActivity(msg){
          var date = new Date();
          $("#last-activity").append(`
              <li>${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} : ${msg}</li>
            `);
        }
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
            bank.queue--;
            bankArr[0] = bank;
            saveData(bankArr,line);
            //refreshing line
            refreshLineOverview(lineOverview,id);
            dispBankDet(bankUl,bank);
          }
        }
        //show last added
        function showLastAdded(id,name,phoneNo,adhaarNo){
          localStorage.setItem("last-added",JSON.stringify(new Person(id,name,phoneNo,adhaarNo)));
          $("#last-added").empty().append(`
              <p><strong>Id: </strong>${id}</p>
              <p><strong>Name: </strong>${name}</p>
              <p><strong>Phone No: </strong>${phoneNo}</p>
              <p><strong>adhaarNo: </strong>${adhaarNo}</p>
            `);
        }

        //function to add by Admin
        function addByAdmin(){
          var addBtn = $("#admin-add");
          addBtn.click(function(){
            var name = $("#add-name").val();
            var phoneNo = $("#add-phone-no").val();
            var adhaarNo = $("#add-adhaar-no").val();

            var id;
            //traverse to last id
            for(id in line){}
              bank.queue++;
              bankArr[0] = bank;
              dispBankDet(bankUl,bank);
              id = +id + 1;
              console.log(id,name,phoneNo,adhaarNo);
              showLastAdded(id,name,phoneNo,adhaarNo);
              line[id - 1].next = id;
              line[id] = new Person(""+ id,name,phoneNo,adhaarNo);
              //save data
              saveData(bankArr,line);
              //update the lineOverview
              refreshLineOverview(lineOverview,line);
              //alert
              makeAlert("success","New Person with crowman-id: +"+id+" added!",2000);
              //update the addToActivity
              addToActivity("New Person with crowman-id: +"+id+" added!");
          });
        }

        function fetchLastAdded(){
          var str = localStorage.getItem("last-added");
          if(str){
            lastAdded = JSON.parse(str);
          }
        }

});
