console.log("injecting into echat");

chromeMessageListener(function(message){	
switch(message.type){
	case 'translated':
		message.type='translation';
		window.postMessage(message, "*");
	break;
}	
});
		
window.addEventListener("message", function(event) {
	if (event.source != window)
	return;
	var message = event.data;
	switch(message.type){
					 case 'play':
					 case 'translate':
	chrome.runtime.sendMessage(message);
					 break;}
	}, false);
menuInjections();
dissableFriendJoinedNotificationUrl:
var iconUrls = {translate:chrome.extension.getURL('translate.png'), stopTranslate:chrome.extension.getURL('stop_translate.png'), converse:chrome.extension.getURL('converse.png'), play:chrome.extension.getURL('play.png'), playHover:chrome.extension.getURL('play_hover.png')};
window.postMessage({type:'iconUrls', iconUrls:iconUrls}, '*');