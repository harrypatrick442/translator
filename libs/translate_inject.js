
			function TranslateInject(send, getConversationUserUuid){
				var translateAll=false;
				var ui = new UserInterface(setLanguage, setTranslateAll, getSelectedLanguage);
				var audioPlayer = new AudioPlayer();
				var previousMessages = new PreviousMessages();
window.addEventListener("message", function(event) {
	if (event.source != window)
	return;
	var message = event.data;
	switch(message.type){
		 case 'translation':
		 switch(message.translatedType){
			 case'append':
			appendTranslation(message);
			break;
			case 'send':
			readdEmoticons(message);
			send(message.translated);
			break;
		 }
		 break;
		}
	}, false);
	var self = this;
	var mapConverssationUserUuidToLang={};
	var usersToTranslate={};
	function isTranslating(userUuid){
		return usersToTranslate[userUuid];
	};
	this.isTranslating = isTranslating;
	this.start = function(userUuid, username){
		if(!isTranslating(userUuid))
		{
			var obj = {text:username, value:userUuid, showLanguage:true};
			usersToTranslate[userUuid]=obj;
		    ui.addUser(obj);
		    new Task(function(){ translatePrevious(userUuid);}).run();
		}
	};
	this.stop=function(userUuid){
		if(isTranslating(userUuid))
		{
			ui.removeUser(usersToTranslate[userUuid]);
			delete usersToTranslate[userUuid];
		}
	};
	function scrapeEmoticons(obj){
		obj.emoticonsToAddBack=[];
		var sentence=obj.sentence;
    var emoticons=com.echat.shared.emoticons.Controller.emoticons;
	var iterator = new Iterator(emoticons);
	while(iterator.hasNext()){
		var emoticon = '/'+iterator.next();
		if(sentence.indexOf(emoticon)>=0){
			obj.emoticonsToAddBack.push(emoticon);
		sentence = replaceAll(sentence, emoticon, "")
		}
	}
	obj.sentence = sentence;
	}
	function translatePrevious(userUuid){
		var messages = previousMessages.get(userUuid);
		var iterator = new Iterator(messages);
		while(iterator.hasNext()){
			var message = iterator.next();
			_translate(message);
		}
	}
	function readdEmoticons(obj){
		var iterator = new Iterator(obj.emoticonsToAddBack);
		while(iterator.hasNext()){
			var emoticon = iterator.next();
			obj.translated+=emoticon;
		}
	}
	this.converse=function(userUuid, username){
		self.start(userUuid, username);
		window.postMessage({ type: 'showTranslateSender', userUuid:userUuid}, "*");
	};
	this.incoming = function(message){
			if(!translateAll)
			if(isTranslating(message.userUuid))
				usersToTranslate[message.userUuid].language=message.language;
			else
				return;
			_translate(message);
	}
	function _translate(message){
			message.type='translate';
			message.translatedType = 'append';
			message.sentence=removeLinks(message.messageBody);
			scrapeEmoticons(message);
			window.postMessage(message, '*');
	}
	function getSelectedLanguage(){
		var languageObj=mapConverssationUserUuidToLang[getConversationUserUuid()];
		var to = languageObj?languageObj.language:undefined;
		return to;
	}
	this.translateAndSend=function(sentence){
var to = getSelectedLanguage();
		if(to!=undefined){
			var message={type:'translate',translatedType:'send',sentence:sentence, to:to};
			scrapeEmoticons(message);
			console.log('sending to outer page code');
			window.postMessage(message, '*');
		}
		else
			send(sentence);
	};
	function setLanguage(langObj){
		mapConverssationUserUuidToLang[getConversationUserUuid()]=langObj;
	}
	function setTranslateAll(b){
		translateAll=b;
	}
	function appendTranslation(message){
		console.log(message);
		if(isTranslating(message.userUuid))
			usersToTranslate[message.userUuid].language=message.language;
		
		var scope = com.echat.website.display.Chatroom;
		var messagesUtilsScope = com.echat.shared.messages.Utils;
try{
	
		var conversationUserUuid = getConversationUserUuid();
		if(conversationUserUuid){
			var $chatWindow = com.echat.website.display.Conversation.conversationDomHandles[conversationUserUuid].messagesHandle;
		}
		else{
			var $chatWindow = scope.getChatroomMessagesLayer();
			messagesUtilsScope.cropChatWindowMessagesIfRequired($chatWindow);
		}
		var isWindowScrolledToBottom = messagesUtilsScope.isChatWindowScrolledToBottom($chatWindow);
		var messageDiv = getMessageDiv(message.uniqueId);
		var div = document.createElement('div');
		div.className='echat-shared-chat-message-body';
		div.textContent=message.translated;
		div.style.color='blue';
		var imgPlay = document.createElement('img');
		imgPlay.style.cursor=Cursors.pointer;
		imgPlay.src=iconUrls.play;
		new(function(url){
		HoverAndClick(imgPlay, function(){
		imgPlay.src=iconUrls.playHover;
		}, function(){
		imgPlay.src=iconUrls.play;
		}, function(){
		window.postMessage({type:'play', sentence:message.sentence, to:message.language}, "*");
		});})(message.play);
		div.appendChild(imgPlay);
		messageDiv.appendChild(div);
		if(conversationUserUuid){
			
		}
		else{
			
		}
		if (isWindowScrolledToBottom === true)
		{
			messagesUtilsScope.scrollChatWindowToBottom($chatWindow);
		}
		if (scope.isChatroomWrapperFocused() === false)
		{
			scope.showWrapperEnvelope();
		}
}
catch(e)
{
	console.log(e);
}
	}
	function getMessageDiv(uniqueId){
		return document.getElementById(uniqueId);
	}
}