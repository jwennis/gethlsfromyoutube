/**
*   Listen for a request from the event page to fetch the HLS URL
*/
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        
    if(!!request.FetchHls) {
        
        fetch("https://www.youtube.com/get_video_info?&video_id="
                + getParam("v") + "&el=info&ps=default&eurl=&gl=US&hl=en");
    }
});


/**
*   Send an ajax GET request for the VideoInfo endpoint
*/
function fetch(getVideoInfoUrl) {
    
    $.ajax({
        
        type: "GET", url: getVideoInfoUrl,

        success: function(response) {

            resolve(response);
        },

        error: function() {
            
            chrome.runtime.sendMessage({ 
                
                Error: true, 
                message: "The request was unsuccessful" 
            });
            
            console.error(arguments);
        }
    });
};


/**
*   Process the response from the ajax request 
*   and send the result to the popup window
*/
function resolve(videoInfo) {

    var hlsvp = getParam("hlsvp", videoInfo); 
    var hlsUrl = decode(hlsvp);

    var request = { };

    if(!!hlsUrl && hlsUrl != "undefined") {

        request.ReturnHls = true; 
        request.message = hlsUrl;

    } else {

        request.Error = true;
        request.message = "The request does not appear to be a live stream";
    }

    chrome.runtime.sendMessage(request);
}


/**
*   Parses the querystring for a given parameter
*/
function getParam(key, querystring) {
    
    querystring = querystring || window.location.search.substring(1);
    
    var queries = querystring.split("&"),
        param = { };
    
    for(var index in queries) {
        
        var q = queries[index].split("=");
        
        param[ q[0] ] = q[1];
    }
    
    return param[ key ];
}


/**
*   Recursively decodes the URL. One pass doesn't fully decode; 
*   two has worked for every test so far, but recurse until a 
*   final result is achieved just in case.
*/
function decode(url) {
    
    var decodedUrl = decodeURIComponent(url);
    
    return decodedUrl != url ? decode(decodedUrl) : url;
}
