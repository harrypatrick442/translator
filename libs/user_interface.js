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