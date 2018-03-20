var DOWNVOTE_ON = "../resources/downvote_on.png";
var DOWNVOTE_OFF = "../resources/downvote.png";
var UPVOTE_ON = "../resources/upvote_on.png";
var UPVOTE_OFF = "../resources/upvote.png";
var REPORT_ON = "../resources/flag_on.png";
var REPORT_OFF = "../resources/flag.png"; 

var REPORT_ON_RGB = "rgb(240, 108, 9)";
var REPORT_OFF_RGB = "rgb(155, 155, 155)"; 

var REPLY_COLOR = "#16A085";
var CANCEL_COLOR = "#F06C09";

var STANDARD_USER = "0444"; 
var USER_ID_LENGTH = 8;
var currentCommentNum = 5; 
var currentReplyNum = 1; 

localStorage.setItem("commentComplete", "not_complete");

function buttonClicked(buttonType, callerObject) { 
  if (buttonType==="downvote") {
    fireDownvote(callerObject); 
  } else if (buttonType==="upvote") {
    fireUpvote(callerObject); 
  } else if (buttonType==="report") {
    fireReport(callerObject); 
  } else if (buttonType==="reply") {
    fireReply(callerObject); 
  } else if (buttonType==="comment-submit") {
    fireComment(callerObject); 
  } else if (buttonType==="reply-submit") {
    fireReplySubmit(callerObject); 
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
      postToSheet('downvote', elemID, 'OFF'); 
    } else {
      elem.src = DOWNVOTE_ON; 
      counterpartElem.src = UPVOTE_OFF; 
      postToSheet('downvote', elemID, 'ON'); 
      postToSheet('upvote', elemID, 'OFF');
    }
}

function fireUpvote(callerObject) {
    var elements = callerObject.getElementsByTagName("IMG");
    var elem = elements[0]; 
    var elemID = elem.id; 
    var counterpartID = elemID.replace('upvote', 'downvote'); 
  console.log(counterpartID);
    var counterpartElem = document.getElementById(counterpartID); 
    console.log(counterpartElem);
    
    if (elem.src.includes(UPVOTE_ON)) {
      elem.src = UPVOTE_OFF;
      postToSheet('upvote', elemID, 'OFF'); 
    } else {
      elem.src = UPVOTE_ON;  
      counterpartElem.src = DOWNVOTE_OFF;
      postToSheet('upvote', elemID, 'ON');
      postToSheet('downvote', elemID, 'OFF'); 
    }
  
    return elemID
}

function fireReport(callerObject) {
    var elements = callerObject.getElementsByTagName("IMG");
    var elem = elements[0]; 
    var elemID = callerObject.id;
  
    if (elem.src.includes(REPORT_ON)) {
      elem.src = REPORT_OFF;
      postToSheet('report', elemID, 'OFF'); 
    } else {
      elem.src = REPORT_ON;  
      postToSheet('report', elemID, 'ON'); 
    }
    
    return elemID
}

function fireReply(callerObject) {
  var elemID = callerObject.id; 
  var counterpartID = elemID.replace('reply-button', 'reply-area'); 
  
  var replyArea = document.getElementById(counterpartID); 
  

  
  var replyVis = replyArea.style.visibility
  if (replyVis === 'hidden' || replyVis==="") {
    replyArea.style.visibility = 'visible';
    replyArea.style.display = 'flex';
    callerObject.innerHTML = "Cancel";
    callerObject.style.color = CANCEL_COLOR; 
    postToSheet('reply', elemID, 'ON'); 
  } else {
    replyArea.style.visibility = 'hidden'; 
    replyArea.style.display = 'none';
    callerObject.innerHTML = "Reply";
    callerObject.style.color = REPLY_COLOR;
    postToSheet('reply', elemID, 'OFF'); 
  }
    
  return elemID

}

function fireReplySubmit(callerObject) {
  var elemID = callerObject.id; 
  var counterpartID = elemID.replace("reply-submit-button-", "comment");
  var textAreaID = elemID.replace("reply-submit-button", "reply-textarea");
  var replyButtonID = elemID.replace("reply-submit-button", "reply-button"); 
  console.log(replyButtonID); 
  var replyButton = document.getElementById(replyButtonID); 
  var counterpartElem = document.getElementById(counterpartID); 
  
  var replyTextArea = document.getElementById(textAreaID);
  var replyText = replyTextArea.value; 
  
  if (isIllegalString(replyText)) {
    return; 
  }
  
  var replyHTML = `
  <div id="replyComNum" class="reply-submission"> 
    <div class="comment-username user-username">User UserNum</div>
    <div class="comment-time">DateAndTime</div>
    <div class="comment-text">ComText</div>
    <div class="comment-interactions secondary-interactions">
      <button id="downvote-button-ComNum" class="response-button" onclick="buttonClicked('downvote', this);"> 
        <img id="downvote-comment-icon-ComNum" class="button-icon" src='../resources/downvote.png'>Downvote</button>
      <button id="upvote-button-ComNum" class="response-button" onclick="buttonClicked('upvote', this);"> 
        <img id="upvote-comment-icon-ComNum" class="button-icon" src='../resources/upvote.png'>Upvote</button>
    </div>
    <div class="comment-spacer"> </div>
  </div>
  `
  
  replyHTML = replyHTML.replace(new RegExp("UserNum", "g"), STANDARD_USER);
  replyHTML = replyHTML.replace(new RegExp("ComNum", "g"), currentReplyNum.toString());
  var date = new Date();

  replyHTML = replyHTML.replace(new RegExp("DateAndTime", "g"), getDate());
  replyHTML = replyHTML.replace(new RegExp("ComText", "g"), replyText); 
  
  // Add Comment
  counterpartElem.innerHTML = counterpartElem.innerHTML + replyHTML; 
  
  postToSheet('reply-submit', elemID, replyText); 
  replyTextArea.value = '';
  
  replyButton.innerHTML = "Reply";
  replyButton.style.color = REPLY_COLOR;
  
  fireReply(replyButton);
  return elemID; 
}

function fireComment(callerObject) {
  var commentText = makeComment(); 
  postToSheet('comment-submit', "comment-submit-button", commentText); 
}


function unhideSecondaryInteractions() {
  var elems = document.getElementsByClassName("secondary-interactions"); 

  for (var i=0; i<elems.length; i++) {
    elems[i].style.display = 'block'; 
    elems[i].style.visibility = 'visible';
  }
}

function makeComment() {
  var commentTextArea = document.getElementById("comment-textarea");
  var commentText = commentTextArea.value.trim(); 
  
  // Check if the comment is legal. 
  if (isIllegalString(commentText)) {
    return;
  }
  
  var commentHTML = `
  <div id="commentComNum" class="comment-box user-comment"> 
    <div class="comment-username user-username">User UserNum</div>
    <div class="comment-time">DateAndTime</div>
    <div class="comment-text">ComText</div>
    <div class="comment-interactions secondary-interactions">
      <button id="downvote-button-ComNum" class="response-button" onclick="buttonClicked('downvote', this);"> 
        <img id="downvote-comment-icon-ComNum" class="button-icon" src='../resources/downvote.png'>Downvote</button>
      <button id="upvote-button-ComNum" class="response-button" onclick="buttonClicked('upvote', this);"> 
        <img id="upvote-comment-icon-ComNum" class="button-icon" src='../resources/upvote.png'>Upvote</button>
    </div>
    <div class="comment-spacer"> </div>
  </div>
  `
  
  
  commentHTML = commentHTML.replace(new RegExp("UserNum", "g"), STANDARD_USER);
  commentHTML = commentHTML.replace(new RegExp("ComNum", "g"), currentCommentNum.toString());
  var date = new Date();

  commentHTML = commentHTML.replace(new RegExp("DateAndTime", "g"), getDate());
  commentHTML = commentHTML.replace(new RegExp("ComText", "g"), commentText); 
  
  // Add Comment
  commentSection = document.getElementById("comment-section"); 
  commentSection.innerHTML = commentSection.innerHTML + commentHTML; 
  
  // Increment Comment Number
  currentCommentNum += 1;
  
  // Empty text area
  commentTextArea.value = ""; 
  
  // Show rest of the page; 
  unhideSecondaryInteractions();
  
  localStorage.setItem("commentComplete", "complete");
  document.getElementById("exercise-continue").style.display = "block";

  return commentText
}

// https://stackoverflow.com/questions/12409299/how-to-get-current-formatted-date-dd-mm-yyyy-in-javascript-and-append-it-to-an-i#12409344
function getDate() {
  var today = new Date();
  
  //https://stackoverflow.com/questions/9070604/how-to-convert-datetime-from-the-users-timezone-to-est-in-javascript
  //EST
  offset = -5.0
  utc = today.getTime() + (today.getTimezoneOffset() * 60000);
  serverDate = new Date(utc + (3600000*offset));
  
  return serverDate.toLocaleString([], {day:'numeric', month: 'numeric', year: 'numeric', hour: '2-digit', minute:'2-digit'}).replace(",", "") + " EST";
}

function isEmpty (input) {
  if (input === "") {
    alert("Empty comments are not allowed."); 
    return true;
  }
}

function containsIllegalCharacter (input) {
  if (input.includes("<") || input.includes(">")) {
    alert("Cannot use '<' or '>' characters in your comments!");
    return true; 
  }
}

function isIllegalString(input) {
  if(isEmpty(input) || containsIllegalCharacter(input)) {
    return true; 
  }
}