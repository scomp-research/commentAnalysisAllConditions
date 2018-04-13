function continueToEnd() {
  var checkBox = document.getElementById("instructions-checkbox");
  
  if (localStorage.getItem("commentComplete") === "complete") {
    window.location.replace('../pages/post-survey.html');
  } else {
    alert('You must make a comment to continue.');
  }
}