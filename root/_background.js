////------------remove embedding preventation------------------------
//removeEmbeddingPreventation(['<all_urls>']);
////------------------------------------------------------------------

var googleTranslatePage = new GoogleTranslatePage();
var tabIdsEChat=[];
chromeMessageListener(function(request, sender){
	switch(request.type){
		
		
			case 'translate':
			case 'play':
		console.log(request);
			request.tabId = sender.tab.id;
					if(googleTranslatePage.tabId!=undefined)
						chrome.tabs.sendMessage(googleTranslatePage.tabId,request);
			break;
			case 'translated':
			        chrome.tabs.sendMessage(request.tabId, request);
			break;
		}
});
chromeTabOpened(function(tabId, changeInfo, tab){
		  console.log(tab.url);
		  if(isEchat(tab.url))
		  {
			  tabIdsEChat.push(tabId);
			  chrome.tabs.executeScript(tab.id, {file: 'inject_echat.js'});
		  }
});
chromeTabClosed(function(tabId, removed) {
	var index = tabIdsEChat.indexOf(tabId);
	if(index>=0)
	{
		tabIdsEChat.splice(index, 1);
	}
});