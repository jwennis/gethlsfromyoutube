// The duration in millis to wait for a result 
// before throwing a timeout error
var TIMEOUT_DURATION = 10 * 1000;

// Indicate whether a response (successful or otherwise)
// was received to know if a timeout error is necessary
var responseReceived;


/**
*   One time initializer upon loading the popup window
*/
$(function () {
    
    init();
    
    $("#error span.retry").click(function () {
        
        $("#error").css({ display: "none" });
        $("#loader").css({ display: "block" });

        init();      
    });  
});


/**
*   Listen for a request from the content script to display the result
*/
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    
    if(!!request.ReturnHls) {
        
        responseReceived = true;
        
        displayResult(request.message);
        
    } else if(!!request.Error) {
        
        responseReceived = true;
        
        throwError(request.message);        
    }
});


/**
*   Send a request to the content script to fetch the HLS URL
*/
function init() {
    
    responseReceived = false;
    
    chrome.tabs.getSelected(null, function(tab) {
        
        chrome.tabs.sendMessage(tab.id, { FetchHls: true }, function(response) {
        
            if(!!response && !!response.Error) {

                // The content script will indicate if the 
                // current tab is not a Youtube video

                responseReceived = true;

                throwError(response.message);
            }
        });
    });
    
    setTimeout(throwTimeout, TIMEOUT_DURATION);
}


/**
*   Upon success, show the HLS URL in the popup
*/
function displayResult(hlsUrl) {
    
    $("#loader").hide();
        
    $("#content").append(hlsUrl);    
    $("#content").click(function () {

        var range = document.createRange();
        range.selectNode($("#content")[0]);
        window.getSelection().addRange(range);
    });
    
    $("#copy").click(function () {
                
        document.oncopy = function(event) {
            
            event.clipboardData.setData("text/plain", hlsUrl);
            event.preventDefault();
        };
        
        document.execCommand("Copy", false, null);
        
        $("#copy").text("Copied!").css({ "background-color": "#268417" });
    });
    
    $("#result").css({ display: "block" });
}


/**
*   Initialize a timeout error if no response is received
*   within a given amount of time
*/
function throwTimeout() {
    
  if(!responseReceived) {
      
      throwError("The request timed out.");
  }
}


/**
*   Show the given error in the popup window
*/
function throwError(message) {
    
    $("#loader").css({ display: "none" });
    
    $("#error span.message").text(message);    
    $("#error").css({ display: "block" });      
}