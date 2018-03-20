function getUserID() {
    if (localStorage.getItem('user_id') === null) {
        var new_id = makeUserID(); 
        localStorage.setItem('user_id', new_id);
    }
    return localStorage.getItem('user_id'); 
}

function makeUserID () {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  for (var i = 0; i < USER_ID_LENGTH; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}