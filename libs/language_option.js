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