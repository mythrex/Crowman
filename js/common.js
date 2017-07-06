var notifArr = [];

//making an alert box
function makeAlert(type,msg,time=3000){
  var alert = $(`
    <div class="alert alert-${type}" role="alert">
      <strong>${msg}</strong>
    </div>
    `);
  $('body').prepend(alert);
  setTimeout(function(){
    alert = alert.addClass('fade');
    setTimeout(function(){
      alert.remove();
    },100);
  },time);
}
//Save data to localStorage
function saveData(bankArr,dataObj){
  localStorage.setItem("bank",JSON.stringify(bankArr));
  localStorage.setItem("line-data",JSON.stringify(dataObj));
}
//fetch data from localStorage
function fetchData(bankArr,dataObj){
  let localData = localStorage.getItem("line-data");
  let bankData = localStorage.getItem("bank");
  if(localData){
    dataObj = JSON.parse(localData);
  }
  if(bankData){
    bankArr = JSON.parse(bankData);
  }
}
//add people to  line
function addPeopleToLine(jqueryObj,data){
  for(let prop in data) {
    jqueryObj.append(`<span class="fa fa-user" crowman-id="${prop}"
    data-toggle="tooltip" data-placement="left"
    title="cowman-id: ${prop}">`);
  }
}

//send and getNotification
function showNotifications(){
  var envelope = $("#envelope");
  if(notifArr.length > 0){
    envelope.addClass('active');
    var notif  = $("#notifications");
    notif.empty();
    for (var index in notifArr) {
      notif.append(`
          <a href="#" class="dropdown-item">${notifArr[index]}</a>
        `);
    }
  }
  if(envelope.hasClass('active')){
    envelope.parent().click(function(event) {
      envelope.removeClass('active');
    });
  }
}

function sendNotification(text){
  notifArr.splice(0,0,text);
  localStorage.setItem('notification',notifArr.join(","));
  showNotifications();
}
function getNotification(){
  let notifString = localStorage.getItem("notification");
  if(notifString){
    notifArr = notifString.split(",");
  }
}

//function to notify people about the Detaails
function importantNotify(){
  var date = new Date();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  if(hours >= 14 && (minutes >= 0 || minutes <=30)){
    makeAlert("warning","Lunch Time in Bank",3500);
    sendNotification("Lunch Time in Bank");
  }
  else if(hours == 15){
    makeAlert("warning","Bank is about to close in "+ (60 - minutes) +" minutes",3500);
    sendNotification("Bank is about to close in "+ (60 - minutes) +" minutes");
  }
  else if(hours >= 16){
    makeAlert("danger","Bank is closed now.",3500);
    sendNotification("Bank is closed now.");
  }
}
