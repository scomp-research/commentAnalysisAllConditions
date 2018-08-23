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

function postToSheet(act, elemID, val) {
  
  elements = String(val).match(/.{1,5000}/g);
  if (elements.length == 1) {
    var obj = {
      timestamp: new Date().getTime(),
      user_id: getUserID(),
      action: act,
      elem: elemID,
      value: elements[0]
    }
    sendObj(obj);
  } else {
    for (var i=0; i<elements.length; i++) {
      var obj = {
        timestamp: new Date().getTime(),
        user_id: getUserID(),
        action: act,
        elem: elemID,
        value: "Elem-Piece<"+i+">: "+elements[i]
      }
      setTimeout(sendObj(obj), 20);
    }
  }
}

function sendObj(obj) {
    var response = $.ajax(
    {
      url: "https://script.google.com/macros/s/AKfycbyIVvplK5IjCD5Ng6fzzHDD1oSV51xvdqlCvh68dTBh4cw1CEM/exec", 
      method: "GET",
      dataType: "json",
      data: obj,
    }).success();
}

function getAttemptedInterventions(callback) {
  obj = {
    checkValue: true,  
  }
  
  response = $.ajax(
    {
      url: "https://script.google.com/macros/s/AKfycbyIVvplK5IjCD5Ng6fzzHDD1oSV51xvdqlCvh68dTBh4cw1CEM/exec", 
      method: "GET",
      dataType: "json",
      data: obj,
      success: callback,
    }).success();
  
}

function upValue(intervention) {
  obj = {
    upValue: true, 
    intervention: intervention, 
  }
  
  response = $.ajax(
    {
      url: "https://script.google.com/macros/s/AKfycbyIVvplK5IjCD5Ng6fzzHDD1oSV51xvdqlCvh68dTBh4cw1CEM/exec", 
      method: "GET",
      dataType: "json",
      data: obj,
    }).success();
  
}
