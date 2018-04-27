function chromeMessageListener(callback){
	chrome.runtime.onMessage.addListener(callback);
}

function escapeHtml(unsafe) {
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "\\&quot;")
         .replace(/'/g, "\\&#039;");
 }


function Iterator(array)
{
    var index=0;
    var length=array.length;
    this.next=function()
    {
        var next=array[index];
        index++;
        return next;
    };
    this.hasNext=function()
    {
      return index<length;
    };
    this.remove=function()
    {
        array.splice(index-1, 1);
        index--;
        length--;
    };
}

var langs = {    'auto': 'Automatic',
    'af': 'Afrikaans',
    'sq': 'Albanian',
    'am': 'Amharic',
    'ar': 'Arabic',
    'hy': 'Armenian',
    'az': 'Azerbaijani',
    'eu': 'Basque',
    'be': 'Belarusian',
    'bn': 'Bengali',
    'bs': 'Bosnian',
    'bg': 'Bulgarian',
    'ca': 'Catalan',
    'ceb': 'Cebuano',
    'ny': 'Chichewa',
    'zh-cn': 'Chinese Simplified',
    'zh-tw': 'Chinese Traditional',
    'co': 'Corsican',
    'hr': 'Croatian',
    'cs': 'Czech',	
    'da': 'Danish',
    'nl': 'Dutch',
    'en': 'English',
    'eo': 'Esperanto',
    'et': 'Estonian',
    'tl': 'Filipino',
    'fi': 'Finnish',
    'fr': 'French',
    'fy': 'Frisian',
    'gl': 'Galician',
    'ka': 'Georgian',
    'de': 'German',
    'el': 'Greek',
    'gu': 'Gujarati',
    'ht': 'Haitian Creole',
    'ha': 'Hausa',
    'haw': 'Hawaiian',
    'iw': 'Hebrew',
    'hi': 'Hindi',
    'hmn': 'Hmong',
    'hu': 'Hungarian',
    'is': 'Icelandic',
    'ig': 'Igbo',
    'id': 'Indonesian',
    'ga': 'Irish',
    'it': 'Italian',
    'ja': 'Japanese',
    'jw': 'Javanese',
    'kn': 'Kannada',
    'kk': 'Kazakh',
    'km': 'Khmer',
    'ko': 'Korean',
    'ku': 'Kurdish (Kurmanji)',
    'ky': 'Kyrgyz',
    'lo': 'Lao',
    'la': 'Latin',
    'lv': 'Latvian',
    'lt': 'Lithuanian',
    'lb': 'Luxembourgish',
    'mk': 'Macedonian',
    'mg': 'Malagasy',
    'ms': 'Malay',
    'ml': 'Malayalam',
    'mt': 'Maltese',
    'mi': 'Maori',
    'mr': 'Marathi',
    'mn': 'Mongolian',
    'my': 'Myanmar (Burmese)',
    'ne': 'Nepali',
    'no': 'Norwegian',
    'ps': 'Pashto',
    'fa': 'Persian',
    'pl': 'Polish',
    'pt': 'Portuguese',
    'ma': 'Punjabi',
    'ro': 'Romanian',
    'ru': 'Russian',
    'sm': 'Samoan',
    'gd': 'Scots Gaelic',
    'sr': 'Serbian',
    'st': 'Sesotho',
    'sn': 'Shona',
    'sd': 'Sindhi',
    'si': 'Sinhala',
    'sk': 'Slovak',
    'sl': 'Slovenian',
    'so': 'Somali',
    'es': 'Spanish',
    'su': 'Sundanese',
    'sw': 'Swahili',
    'sv': 'Swedish',
    'tg': 'Tajik',
    'ta': 'Tamil',
    'te': 'Telugu',
    'th': 'Thai',
    'tr': 'Turkish',
    'uk': 'Ukrainian',
    'ur': 'Urdu',
    'uz': 'Uzbek',
    'vi': 'Vietnamese',
    'cy': 'Welsh',
    'xh': 'Xhosa',
    'yi': 'Yiddish',
    'yo': 'Yoruba',
    'zu': 'Zulu'
};

var Cursors={grab:'url('+window.thePageUrl+'cursors/hand_move_grab.png)11 0, auto', hand:'url('+window.thePageUrl+'cursors/hand_move_no_grab.png)14 0, auto', pointer:'pointer'};

function addStyle(str){
	var s =document.createElement('style');
	s.innerHTML=str;
	document.body.appendChild(s);
}

function removeLinks(s){
        var div = document.createElement('div');
        div.innerHTML = s;
		function removeElements(ew){
        var es = div.getElementsByTagName(ew);
        var i = es.length;
        while (i--) {
            es[i].parentNode.removeChild(es[i]);
			}
		}
		removeElements('script');
		removeElements('a');
        return div.innerHTML;
}                         


 function Task(callback, done)
{
        this.run = function (c)
        {
    setTimeout(function() {
        try
        {
        callback();
        }catch(ex)
        {
         console.log(ex);
        }
                    if(done)
                    {
                        try
                        {
                     done();       
                        }
                        catch(ex)
                        {
         console.log(ex);
                        }
                    }
                    if(c)
                    {
                        try
                        {
                     c();       
                        }
                        catch(ex)
                        {
         console.log(ex);
                        }
                    }
    }, 0);

       };
}

function CurrentConversation(){
var oldOpenConversation = com.echat.shared.conversation.Controller.openConversation;
com.echat.shared.conversation.Controller.openConversation=function(userUuid){
oldOpenConversation(userUuid);
self.currentUserUuid = userUuid;
};
var oldFocusChatroom = com.echat.shared.chatroom.Controller.focusChatroom;
com.echat.shared.chatroom.Controller.focusChatroom=function(){
	self.currentUserUuid = undefined;
	oldFocusChatroom();
};
this.sendMessage = function(messageBody){
if(self.currentUserUuid)
{
		com.echat.shared.cometd.stream.outgoing.conversation.Controller.sendConversationMessage(self.currentUserUuid, messageBody);
}
else
{
	com.echat.shared.cometd.stream.outgoing.Chatrooms.sendMessage(messageBody);
}
};
this.getConversationUserUuid=function(){return self.currentUserUuid;};
}

function CallbacksClickedOff(){
	var paris =[];
	function add(callback, target){paris.push({callback:callback, target:target});}
window.addEventListener("mousedown", function(e) {			
	var iterator = new Iterator(paris);
	while(iterator.hasNext()){
	var pair = iterator.next();
	if(e.target==pair.target||isDescendant(pair.target, e.target)){
			var rect = pair.target.getBoundingClientRect();
			var x = e.pageX - rect.left; //x position within the element
			var y = e.pageY - rect.top;
			if(x<0||y<0||(x>rect.width+rect.left||y>rect.height+rect.y)){
				pair.callback();
				iterator.remove();
			}
			return;
		}	
		pair.callback();
		iterator.remove();
	}
}, false);
function isDescendant(parent, child) {
     var node = child.parentNode;
     while (node != null) {
         if (node == parent) {
             return true;
         }
         node = node.parentNode;
     }
     return false;
}
	return {add:add};
}


/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function Hover(element, callbackEnter, callbackLeave)
{
    var previousStyle;
    
    element.addEventListener('mouseenter', function(e){
        
                            if (!e) var e = window.event;
                             callbackEnter(e);
                        });
    element.addEventListener('mouseleave', function(e){
        
                            if (!e) var e = window.event;
                            if(callbackLeave){callbackLeave(e);}
                        });
}
function HoverAndClick(element, callbackEnter, callbackLeave, callbackMousedown, callbackMouseUp)
{
    var previousStyle;
    element.addEventListener('mouseenter', function(e){
        
                            if (!e) var e = window.event;
                            enter(e);
                        });
    element.addEventListener('mouseleave', function(e){
        
                            if (!e) var e = window.event;
                            leave(e);
                        });
    element.addEventListener('mousedown', function(e){
        
                            if (!e) var e = window.event;
                            if(callbackMousedown){leave(e);callbackMousedown(e);enter(e);}
                        });
    element.addEventListener('mouseup', function(e){
        
                            if (!e) var e = window.event;
                            if(callbackMouseUp){callbackMouseUp(e);}
                        });
    function enter(e)

    {
        previousStyle=element.style.cssText; if(callbackEnter)callbackEnter(e);
    }
    function leave(e)
    {
    element.style.cssText=previousStyle; if(callbackLeave){callbackLeave(e);}
    }
}

function AudioPlayer(){
this.play = function(url){
	try{
	new Audio(url).play();
	}
	catch(e){
		console.log(e);
	}
};
}

function LanguageOption(callback, option, parent){
	var div = document.createElement('div');
	div.style.position='relative';
	div.style.width=String(LanguageOption.WIDTH)+'px';
	div.style.height='26px';
	div.style.zIndex='1';
	div.style.float='left';
	div.style.padding='2px';
	div.style.border='1px solid black';
	div.style.margin='3px';
	div.style.fontWeight = 'bold';
	setText();
	div.style.textAlign='center';
	div.style.verticalAlign='middle';
	div.style.cursor=Cursors.pointer;
	div.style.boxSizing = "border-box";
	div.style.whiteSpace = 'nowrap';
    div.style.overflow='hidden';
    div.style.textOverflow='ellipsis';
	parent.appendChild(div);
	function setText(){
	div.textContent = option.text+(option.language&&option.showLanguage?'('+langs[option.language]+')':'');
	}
	new HoverAndClick(div, enter, leave, function(){callback(option);});
	function enter(){
	div.style.border='2px solid black';	}
	function leave(){
	div.style.border='1px solid black';
	}
	this.refresh=function(){
		setText();
	};
	this.destroy = function(){
		parent.removeChild(div);
	};
}
LanguageOption.WIDTH = 140;

function LanguagePopup(options, parent, setLanguage){
	var div = document.createElement('div');
	div.style.position='fixed';
	div.style.width=String((7*(LanguageOption.WIDTH+10)))+'px';
	div.style.height='auto';
	div.style.left='150px';
	div.style.zIndex='1000';
	div.style.backgroundColor='#F5F5F5';
	function hide(){
	div.style.display='none';
	}
	hide();
	parent.appendChild(div);
	setupOptions(options);
	var allOptions={};
	var languageOptions={};
	function setupOptions(options){
		var iterator = new Iterator(options);
		while(iterator.hasNext())
		{
				var option = iterator.next();
				new LanguageOption(callback, option, div);
		}
	}
	this.removeOption=function(option){
        languageOptions[option.value].destroy();
		delete languageOptions[option.value];
    };
	this.addOption=function(option){
		if(!languageOptions[option.value])
		languageOptions[option.value]=new LanguageOption(callback, option, div);
	};
	function show(bottomLeftDiv, selectedLanguage){
		div.style.display='inline';
		//var position = getFixedPosition(bottomLeftDiv);
		div.style.left = /*String(position.left-div.offsetWidth)*/+'10px';
		div.style.top = /*String(position.top-div.offsetHeight)*/+'10px';
		for(var i in languageOptions){
			var l = languageOptions[i];
			l.refresh();
		}
		new Task(function(){callbacksClickedOff.add(hide, div);}).run();
		
	}
	function setSelectedLang(lang){
		
	}
	this.show = show;
	function callback(option){
		hide();
		setLanguage(option);
	}
}

function UserInterface(setLanguage, setTranslateAll, getSelectedLanguage){
var options=[];
var mapUserUuidToOption={};
var translateAll = false;
options.push({text:"Default", language:undefined});
for(var language in langs){
	var obj = {text:langs[language], language:language};
	options.push(obj);
}
var buttonSelectStyle = ".buttonSelect{cursor: pointer;float: right;width: auto;height: 20px;color: #fff;background-color: #4b79A1;border: 1px solid #4b79A1;padding: 0px 10px;margin-right: 1px;}";
addStyle(buttonSelectStyle);
var languagePopup = new LanguagePopup(options, document.documentElement, setLanguage);
var buttonSelectLanguage = document.createElement('button');
buttonSelectLanguage.className+="buttonSelect";
buttonSelectLanguage.textContent='Lang';
buttonSelectLanguage.addEventListener('click', function(){
	languagePopup.show(buttonSelectLanguage, getSelectedLanguage());
});
var buttonAll = document.createElement('button');
buttonAll.className+="buttonSelect";
buttonAll.textContent='Translate all';
buttonAll.addEventListener('click', function(){
	translateAll=!translateAll;	
	buttonAll.textContent=translateAll?"Stop translating all":"Translate all";
	setTranslateAll(translateAll);
});
var inputTextOptions = document.getElementById('InputTextOptions')
inputTextOptions.appendChild(buttonSelectLanguage);
inputTextOptions.appendChild(buttonAll);
this.addUser=function(user){
	languagePopup.addOption(user);
};
this.removeUser=function(user){
	languagePopup.removeOption(user);
};
}

function PreviousMessages(){
	var regular = /((?:Popup\(event, this,')(.+)(?:'\);))/;
	this.get=function(userUuid){
		var returns =[];
		var divs = document.getElementsByClassName('echat-shared-chat-message-wrapper');
		var iterator = new Iterator(divs);
		var usersDivs =[];
		while(iterator.hasNext()){
			var div = iterator.next();
			var img=div.getElementsByTagName('img')[0];
			var click = String(img.onclick);
			var u = regular.exec(click)[2];
			if(userUuid==u)usersDivs.push(div);
		}
		var translateLength = /*usersDivs.length>10?10:*/usersDivs.length;
		if(translateLength>0){
			iterator = new Iterator(usersDivs.slice(usersDivs.length-translateLength));
			while(iterator.hasNext()){
				var div = iterator.next();
				try{
				if(!div.alreadyTranslated){
					if(!div.id)
						div.setAttribute('id',"to_append_"+String(messageUniqueId++));
					var messageBody = div.getElementsByClassName('echat-shared-chat-message-body')[0].textContent;
					returns.push({messageBody:messageBody, uniqueId:div.id});
					div.alreadyTranslated='true';
					}
				}
				catch(ex)
				{
					
				}
			}
		}
		console.log(returns);
		return returns;
	}
}

function replaceAll(str, search, replacement) {
    return str.split(search).join(replacement);
};


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

function menuInjections() {
    var script = document.createElement('script');
	function _MenuInjections(){
            window.addEventListener("message", function(event) {
                if (event.source != window)
                    return;
				var message=event.data;
				switch(message.type){
					case 'iconUrls':
					iconUrls = message.iconUrls;
					break;
				}
            }, false);
			var messageUniqueId=0;
			com.echat.shared.messages.Utils.getMessageHtml=function(message)
			{
				var uniqueIdString="to_append_"+String(messageUniqueId++);
				message.uniqueId=uniqueIdString;
				translateInjection.incoming(message);
				var userUuid = message.userUuid;
				var username = message.username;
				var avatarUrl = com.echat.shared.GlobalUtils.getAvatarUrl(userUuid);
				var messageBody = message.messageBody;
				var timestamp = message.timestamp;
//addNewMessageToConversation
				var populatedMessageBody = com.echat.shared.emoticons.Controller.parseEmotinconsFromPatterns(messageBody);

				var selfClassWrapperStyle = userUuid === com.echat.shared.context.Account.UserContext.userUuid
					? 'echat-shared-chat-message-wrapper-self' : '';

				var onClickString = 'com.echat.shared.popup.user.Controller.openMessagePopup(event, this,\''
					+ userUuid
					+ '\');';

				var isModerator = message.isModerator;
				var moderatorIconHtml = isModerator === true
					? '<img class="echat-shared-chat-moderator-icon" src="/Resources/Icons/Misc/ModeratorStar.png"/>' : '';

				var date = new Date(timestamp);
				var hours = date.getHours();
				var minutes = date.getMinutes();

				var minutesText = minutes.toString();
				if (minutes < 10)
					minutesText = '0' + minutes;

				var hoursText = hours.toString();
				if (hours < 10)
					hoursText = '0' + hours;

				var timePrependString = com.echat.shared.messages.Utils.getMessageTime(timestamp);
				var timeText = '(' + timePrependString + hoursText + ':' + minutesText + ')';

				var messageHtml = '<div class="echat-shared-chat-message-wrapper '
					+ selfClassWrapperStyle
					+ '", id="'+uniqueIdString+'">'
					+ '<img class="echat-shared-chat-message-avatar" src="'
					+ avatarUrl
					+ '" onclick="'
					+ onClickString
					+ '"/>'
					+ '<div class="echat-shared-chat-message-top-wrapper">'
					+ '<div class="echat-shared-chat-message-username" onclick="'
					+ onClickString
					+ '">'
					+ username
					+ '</div>'
					+ moderatorIconHtml
					+ '<div class="echat-shared-chat-message-time">'
					+ timeText
					+ '</div>'
					+ '</div>'
					+ '<div class="echat-shared-chat-message-body">'
					+ populatedMessageBody
					+ '</div>'
					+ '</div>';

				return messageHtml;
			};
						com.echat.shared.typebox.Controller.sendMessage=function(message){
							
		var scope = com.echat.shared.typebox.Controller;
		var utilsScope = com.echat.shared.typebox.Utils;

		var messageBody = scope.getCurrentText();
		if (!messageBody)
		{
			utilsScope.clearBox();
			return;
		}

		messageBody = com.echat.shared.emoticons.Controller.parseToCommonPatterns(messageBody);

		var isAntispamAllowed = com.echat.shared.messages.antispam.Controller.processMessageTimestamp();
		if (isAntispamAllowed === false)
		{
			com.echat.shared.notifications.Controller.displaySpamWarning();
		}
		else
		{
						translateInjection.translateAndSend(messageBody);
				utilsScope.clearBox();
		}
						};
	
			var username;
            var oldGetOptionsHtml = com.echat.shared.popup.user.Utils.getOptionsHtml;
            com.echat.shared.popup.user.Utils.getOptionsHtml = function(userUuid) {
                var optionsHtml = oldGetOptionsHtml(userUuid);
                    var isUserToTranslate = translateInjection.isTranslating(userUuid);
                    optionsHtml += "<div class=\"UserPopupOption\" onclick=\"" +
                       (isUserToTranslate ?(
                            "translateInjection.stop('"+ String(userUuid) +"');"
                        ):(
                            "translateInjection.start('"+ String(userUuid) +"','"+escapeHtml(username)+"');"
                        ) ) +
                        "com.echat.shared.popup.user.Controller.refreshPopupOptions('" + String(userUuid) + "');\"><img src=\"" +
                        (isUserToTranslate ?
                            iconUrls.stopTranslate + "\"/><span>Stop Translating</span>":
                            iconUrls.translate + "\"/><span>Translate</span>") +
                        "</div><div class=\"UserPopupOption\" onclick=\"translateInjection.converse('"+String(userUuid)+"','"+escapeHtml(username)+"');com.echat.shared.popup.user.Controller.refreshPopupOptions('" + String(userUuid) + "');\"><img src=\""+
						iconUrls.converse+"\"/><span>Converse</span></div>";
                return optionsHtml;
            };
			var oldPopulatePopupContext=com.echat.shared.popup.user.Controller.populatePopupContext;
			 com.echat.shared.popup.user.Controller.populatePopupContext=function(userContext)
	{
		username=userContext.username;
		oldPopulatePopupContext(userContext);
	};
	/*function changeUsername(name, captcha)
	{
		var url = '/authentication/guest';
		var params =
			{
				u: name,
				g: captcha 
			};
		$.ajax(
		{
			url: url,
			method: 'POST',
			data: params,
			success: function(jsonReply)
			{
				var reply = JSON.parse(jsonReply);		
				console.log(reply);
			},
			complete: function()
			{
				streamOpened = true;
				if (!reloading)
				{
					grecaptcha.reset();
				}
			},
			error: displayGenericError
		});
	}
	}*/
}
console.log('injecting injecting');
	var strs =[String(Iterator),
	'var langs = '+JSON.stringify(langs)+';',
	'var Cursors = '+JSON.stringify(Cursors)+';',
	String(escapeHtml),
	String(addStyle), 
	String(removeLinks),
	String(Task),
	String(CurrentConversation),
	String(CallbacksClickedOff),
	String(HoverAndClick),
	String(AudioPlayer),
	String(LanguageOption),
	String(LanguagePopup),
	String(UserInterface),
	String(PreviousMessages),
	String(replaceAll),
	String(TranslateInject),
	String.raw`var iconUrls={}; var currentConversation = new CurrentConversation();var callbacksClickedOff = new CallbacksClickedOff(); var translateInjection=new TranslateInject(currentConversation.sendMessage, currentConversation.getConversationUserUuid);`,
	String(_MenuInjections),
    String.raw`_MenuInjections();`];
	var str = '';
	for(var i=0; i<strs.length; i++){
		str+=strs[i];
	}
    script.innerHTML = str;
    document.body.appendChild(script);

}

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
