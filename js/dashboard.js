var line = {};
var bankArr = [];
var bank;
var queryTokenNo;
$(function(){
  var lineOverview = $("#line-overview");
  var inputTokenNo = $("#input-token-no");
  var btnGo = $("#btn-go");
  //fetch the data
  queryTokenNo = +getTokenNo();
  line = JSON.parse(localStorage.getItem("line-data"));
  bankArr = JSON.parse(localStorage.getItem("bank"));
  bank = bankArr[0];
  getNotification();
  showNotifications();
  importantNotify();
  //getUserInfo
  getUserInfo(queryTokenNo);

  showApproxTime();

  showPeopleInLine(lineOverview,line,queryTokenNo);

  showMoreInfo($("#more-info"));

  btnGo.click(openClientPage);
  //functions
  function getTokenNo() {
    var no = localStorage.getItem("token-no");
    if(no){
      return no;
    }
  }

  function getUserInfo(id) {
    $("#user-info").empty().append(`
      <p>Token No: ${line[id]["token-no"]}</p>
      <p>Name: ${line[id].name}</p>
      <p>Adhaar No: ${line[id]["adhaar-no"]}</p>
      <p>Mobile No: ${line[id]["phone"]}</p>
      <p>Bank <span class="fa fa-bank"></bank>: ${bank.name}</p>
      <p>Branch: .${bank.branch}</p>
      `);
  }

  function showApproxTime(){
    var count = getPeopleBefore();
    var approxTime = bank.avgTime*(count);
    var approxHours = parseInt(approxTime / 60);
    var approxMinutes = approxTime % 60;
    var date = new Date();
    var hour = date.getHours() + +approxHours;
    var min = date.getMinutes() + +approxMinutes;
    //for updating Display for
    $("#display-for").empty().append(`Token No: ${queryTokenNo}`);

    if(hour > 16 || (hour >=0 && hour < 10)){
      approxHours = "N.A.";
      approxMinutes = "N.A.";
      hour = "Sorry! Wait for next Day! &#x2639";
      min = "";
    }
    $("#approx-time").empty().append(`
        <p>Time: ${approxHours} hours and ${approxMinutes} minutes</p>
        <p>Reach there by: ${hour}:${min}</p>
      `);
    }

    function showPeopleInLine(jqueryObj,data,tokenNo) {
      jqueryObj.empty();
      for(let prop in data) {
        if(tokenNo == prop){
          jqueryObj.append(`<span class="fa fa-user active" crowman-id="${prop}"
          data-toggle="tooltip" data-placement="left"
          title="You are Here">`);
        }
        else{
          jqueryObj.append(`<span class="fa fa-user" crowman-id="${prop}"
          data-toggle="tooltip" data-placement="left"
          title="cowman-id: ${prop}">`);
        }
      }
    }

    function getPeopleBefore() {
      var count = 0;
      for(let id in line) {
        if(id == queryTokenNo){
          break;
        }
        count++;
      }
      return count;
    }

    function showMoreInfo(jqueryObj) {
      jqueryObj.empty().append(`
          <p>No of people before you: ${getPeopleBefore()-1}</p>
          <p>Total No of People: ${bank.queue}</p>
          <p>Bank Lunch Time: ${bank["lunch-time"]}</p>
          <p>Bank Timimgs: ${bank.timings}</p>
        `);
    }

    function openClientPage() {
      var tokenNo = inputTokenNo.val();
      if(tokenNo in line){
        makeAlert("success","Opening dashboard for crowman-id: "+tokenNo,2000);
        localStorage.setItem("token-no",tokenNo);
        setTimeout(function(){
          window.open("dashboard.html","_top");
        });
      }
      else{
        makeAlert("danger","Sorry the given Id does not exist! Contact admin for Support.",3500);
      }
    }

});
