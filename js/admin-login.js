var line = {};

$(function() {
  var adminUsername = $('#admin-username');
  var adminPassword = $('#admin-password');
  var adminLogin = $('#admin-btn-login');
  var inputTokenNo = $('#input-token-no');
  var btnClientLogin = $('#btn-client-login');

  line = JSON.parse(localStorage.getItem("line-data"));
  //admin-btn-click
  adminLogin.click(openAdminPage);
  //client-btn-click
  btnClientLogin.click(openClientPage);


  //opens the admin Page
  function openAdminPage(){
    if (adminUsername.val() == "mythrex" ||adminUsername.val() == "Mythrex") {
      if(adminPassword.val() == "12345"){
          makeAlert("success","Logging in as Admin",1000);
          setTimeout(function (){
            window.open("admin-dashboard.html","_top");
          },500);
      }
      else {
        makeAlert("danger","Wrong Username or Password");
      }
    }
    else {
      makeAlert("danger","Wrong Username or Password");
    }
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
