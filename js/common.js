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

//send and getNotification
function sendNotification(text,notifArr){
  notifArr.push(text);
  localStorage.setItem('notification',notifArr);
}
function getNotification(notifArr){
  let arr = localStorage.getItem('notification');
  if(arr){
    notifArr = arr;
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
