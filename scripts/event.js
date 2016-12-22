/**
*   Setup the page action (popup window) upon extension install or update
*/
chrome.runtime.onInstalled.addListener(function() {
    
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
      
    chrome.declarativeContent.onPageChanged.addRules([{
        
        conditions: [
            
            new chrome.declarativeContent.PageStateMatcher({ 
                pageUrl: { urlContains: "https://www.youtube.com/watch" } 
            }) 
        ],
        
        actions: [ 
            
            new chrome.declarativeContent.ShowPageAction() 
        ] 
        
    }]); 
  }); 
});


/**
*   Listen for a request from the extention popup to fetch the HLS URL
*/
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    
    if(!!request.FetchHls) {
        
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {

            if(tabs[0].url.indexOf("https://www.youtube.com/watch") != 0) {
                
                // If the current tab is not a Youtube video, let the popup window know
                
                sendResponse({ Error: true, message: "This is not a Youtube video" });
                
            } else if(!!request.FetchHls) {
            
                // If the request is valid, relay it to the content script for processing
                
                chrome.tabs.sendMessage(tabs[0].id, request);
            }
        });     
    }
    
    return true;
});
