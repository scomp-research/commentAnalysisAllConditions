updateID(); 

function updateID() {
  var elem = document.getElementById("submission-code");
  elem.innerHTML = getUserID();
  postToSheet("Complete-Task", "N/A", "END");
}