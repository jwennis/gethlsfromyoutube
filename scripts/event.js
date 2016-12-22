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