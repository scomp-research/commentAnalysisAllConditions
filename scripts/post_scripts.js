updateID(); 

function updateID() {
  var elem = document.getElementById("submission-code");
  var id = getUserID();
  
  if (id) {
    elem.innerHTML = id; 
    postToSheet("Complete-Task", "N/A", "END");
  } else {
    postToSheet("Complete-Task (NO ID)", "N/A", "END");
  }
}