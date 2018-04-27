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