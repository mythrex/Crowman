var line = {};
var bankArr = [];
var bank;
$(function(){
  //fetch the data
  line = JSON.parse(localStorage.getItem("line-data"));
  bankArr = JSON.parse(localStorage.getItem("bank"));
  bank = bankArr[0];
  getNotification();
  showNotifications();
  //getUserInfo
  getUserInfo(40101);

  //functions
  function getUserInfo(id) {
    console.log(line[id]);
    $("#user-info").empty().append(`
      <p>Token No: ${line[id]["token-no"]}</p>
      <p>Name: ${line[id].name}</p>
      <p>Adhaar No: ${line[id]["adhaar-no"]}</p>
      <p>Mobile No: ${line[id]["phone"]}</p>
      <p>Bank <span class="fa fa-bank"></bank>: ${bank.name}</p>
      <p>Branch: .${bank.branch}</p>
      `);
  }
});
