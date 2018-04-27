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