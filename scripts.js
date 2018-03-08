var DOWNVOTE_ON = "resources/downvote_on.png";
var DOWNVOTE_OFF = "resources/downvote.png";
var UPVOTE_ON = "resources/upvote_on.png";
var UPVOTE_OFF = "resources/upvote.png";

var REPORT_ON = "#F06C09";
var REPORT_ON_RGB = "rgb(240, 108, 9)";
var REPORT_OFF = "#9B9B9B"; 
var REPORT_OFF_RGB = "rgb(155, 155, 155)"; 

var REPLY_COLOR = "#16A085";
var CANCEL_COLOR = "#F06C09";

function buttonClicked(buttonType, callerObject) {
  
  if (buttonType==="downvote") {
    fireDownvote(callerObject); 
  } else if (buttonType==="upvote") {
    fireUpvote(callerObject); 
  } else if (buttonType==="report") {
    fireReport(callerObject); 
  } else if (buttonType==="reply") {
    fireReply(callerObject); 
  }
 
}

function fireDownvote(callerObject) {
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
}

function fireUpvote(callerObject) {
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
  
}

function fireReport(callerObject) {
    var objectColor = callerObject.style.color;
  
    var elemID = callerObject.id;
    var counterpartID = elemID.replace("button","area"); 
  
    var reportArea = document.getElementById(counterpartID); 
    var reportAreaVis = reportArea.style.visibility; 
 
    if (reportAreaVis==='hidden' || reportAreaVis==="") {
      callerObject.style.color = CANCEL_COLOR;
      callerObject.innerHTML = "Cancel";
      reportArea.style.visibility = 'visible';
    } else {
      callerObject.style.color = REPORT_OFF;
      callerObject.innerHTML = "Report"; 
      reportArea.style.visibility = 'hidden'; 
    }
}

function fireReply(callerObject) {
  var elemID = callerObject.id; 
  var counterpartID = elemID.replace('reply-button', 'reply-area'); 
  
  var replyArea = document.getElementById(counterpartID); 
  

  
  var replyVis = replyArea.style.visibility
  if (replyVis === 'hidden' || replyVis==="") {
    replyArea.style.visibility = 'visible';
    callerObject.innerHTML = "Cancel";
    callerObject.style.color = CANCEL_COLOR; 
  } else {
    replyArea.style.visibility = 'hidden'; 
    callerObject.innerHTML = "Reply";
    callerObject.style.color = REPLY_COLOR; 
  }

}


function unhideSecondaryInteractions() {
  var elems = document.getElementsByClassName("secondary-interactions"); 

  for (var i=0; i<elems.length; i++) {
    elems[i].style.visibility = 'visible';
  }
}