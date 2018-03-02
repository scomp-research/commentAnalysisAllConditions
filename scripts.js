var DOWNVOTE_ON = "resources/downvote_on.png";
var DOWNVOTE_OFF = "resources/downvote.png";
var UPVOTE_ON = "resources/upvote_on.png";
var UPVOTE_OFF = "resources/upvote.png";

var REPORT_ON = "F06C09";
var REPORT_OFF = "#9B9B9B"; 

function buttonClicked(buttonType, callerObject) {
  
  if (buttonType=="downvote") {
    var elements = callerObject.getElementsByTagName("IMG");
    var elem = elements[0]; 
    var elemID = elem.id; 
    var counterpartID = elemID.replace('downvote', 'upvote'); 
    var counterpartElem = document.getElementById(counterpartID); 
    
    if (elem.src.includes(DOWNVOTE_ON)) {
      elem.src = DOWNVOTE_OFF;
    } else {
      elem.src = DOWNVOTE_ON; 
      counterpartElem.src = UPVOTE_OFF; 
    }
  } else if (buttonType=="upvote") {
    var elements = callerObject.getElementsByTagName("IMG");
    var elem = elements[0]; 
    var elemID = elem.id; 
    var counterpartID = elemID.replace('upvote', 'downvote'); 
    var counterpartElem = document.getElementById(counterpartID); 
    
    if (elem.src.includes(UPVOTE_ON)) {
      elem.src = UPVOTE_OFF;
    } else {
      elem.src = UPVOTE_ON;  
      counterpartElem.src = DOWNVOTE_OFF;
    }
  } else if (buttonType=="report") {
    console.log("Reporting");
    console.log(callerObject.style.color);
    console.log(callerObject.style);
    if (callerObject.style.color == REPORT_ON) {
      console.log("ON"); 
      callerObject.style.color = REPORT_OFF;
    } else {
      console.log("OFF"); 
      callerObject.style.color = REPORT_ON;
    }
  }
  
  
  
}
