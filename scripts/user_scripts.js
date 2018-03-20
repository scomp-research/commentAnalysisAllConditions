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

function postToSheet(act, elemID, val) {
  
  var obj = {
    timestamp: new Date().getTime(),
    user_id: getUserID(),
    action: act,
    elem: elemID,
    value: val
  }
  
  var url = 'https://script.google.com/macros/s/AKfycbxLaD-2vP94CApYvOiM4GCNAakGBmA-pFWFGB6G3wZ5PouayxCp/exec'
  
  var response = $.ajax(
  {
    url: url, 
    method: "GET",
    dataType: "json",
    data: obj,
  }).success();

}