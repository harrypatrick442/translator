// this is the code which will be injected into a given page...
//added 23/04
//if friends never ignore.
//temporary ignore before server replies.
//name ignore option for repeated username different uuid.
//stop clicking noise.
console.log("inject");
console.log("new verrsion 23/04/2017");
var manifest = chrome.runtime.getManifest();
var settings;
var lastMessageHistory={};
settings = new Settings("all");
window.addEventListener("message", function(event) {
    if (event.source != window)
    return;
interpret(event.data);}, false);

new Timer(function(){
translator.translate('Du bist ein verdammter', function(){});}, 1000, 1);