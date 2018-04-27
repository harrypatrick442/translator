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