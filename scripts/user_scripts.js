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

var surveyRound = 1; 

function postToSheet(act, elemID, val) {
  
  var obj = {
    timestamp: new Date().getTime(),
    user_id: getUserID(),
    action: act,
    elem: elemID,
    value: val
  }
  
  var url = 'https://script.google.com/macros/s/AKfycbyUnuAXgDhKsDJ4sVeRpbWChn1EAAo15qse7rTeKkIW5Xs0bfgE/exec'
  
  var urlRound2 = 'https://script.google.com/macros/s/AKfycby3dLK8cMJglS-NdDt8TketPKasr94sL8xlNAgqwwACDuwF1ys/exec'
  
  if (surveyRound === 1) {
  var response = $.ajax(
    {
      url: url, 
      method: "GET",
      dataType: "json",
      data: obj,
    }).success();
  } else if (surveyRound === 2) {
    var response = $.ajax(
      {
        url: urlRound2, 
        method: "GET",
        dataType: "json",
        data: obj,
      }).success();
  }
}