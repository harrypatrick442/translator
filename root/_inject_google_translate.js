if(!window.injectedIt){
	require(jQuery);
  chromeMessageListener(function(request, sender) {
	  console.log(request);
    switch(request.type)
	{	case "translate":
			translate(request.sentence, request, function(obj){
				request.translated=obj.translated;
				request.language = obj.language;
				request.type='translated';
				chromeSendMessage(request);
			}, request.to);
		break;
		case "play":
			play(request.sentence, request.to);
		break;
	}
  });	
console.log('injecTED ITT ');
window.injectedIt = true;
}

