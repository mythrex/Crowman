$(function() {
  var adminUsername = $('#admin-username');
  var adminPassword = $('#admin-password');
  var adminLogin = $('#admin-btn-login');

  //opens the admin Page
  function openAdminPage(){
    if (adminUsername.val() == "mythrex" ||adminUsername.val() == "Mythrex") {
      if(adminPassword.val() == "12345"){
          makeAlert("success","Logging in as Admin",1000);
          setTimeout(function (){
            window.open("admin-dashboard.html","_top");
          },500);
      }
    }
    else {
      makeAlert("danger","Wrong Username or Password");
    }
  }

  adminLogin.click(openAdminPage);

});
