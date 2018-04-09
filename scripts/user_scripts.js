var USER_ID_LENGTH = 8;

function getUserID() {
    if (localStorage.getItem('commentForum_user_id') === null) {
        var new_id = makeUserID(); 
        localStorage.setItem('commentForum_user_id', new_id);
    }
    return localStorage.getItem('commentForum_user_id'); 
}

function makeUserID () {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  for (var i = 0; i < USER_ID_LENGTH; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

var surveyRound = 2; 

function postToSheet(act, elemID, val) {
  
  var obj = {
    timestamp: new Date().getTime(),
    user_id: getUserID(),
    action: act,
    elem: elemID,
    value: val
  }

  var response = $.ajax(
    {
      url: "https://script.google.com/macros/s/AKfycbyaSKc9UdNrRG3o_42ZFq4-Ys3Ges3nzWI0DtTjUkNZeDCLG40R/exec", 
      method: "GET",
      dataType: "json",
      data: obj,
    }).success();
  
}