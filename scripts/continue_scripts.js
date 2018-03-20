function continueToEnd() {
  var checkBox = document.getElementById("instructions-checkbox");
  
  console.log(localStorage.getItem("commentComplete"));
  if (localStorage.getItem("commentComplete") === "complete") {
    window.location.replace('/pages/post-exercise.html');
  } else {
    alert('You must make a comment to continue.');
  }
}