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
//for removing an element after some time
