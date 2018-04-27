require(jQuery);
var translator = new Translator();
function translate(sentence, obj, callback, to){
	translator.translate(sentence, function(translated){
		if(!obj)
			obj={};	
		$.extend(obj, {translated:translated.translated, language:translated.language, play:translated.play});
        callback(obj);	
		console.log(obj);	
}, function(){
	
}, to);
}
function play(sentence, to){
	translator.play(sentence, to);
}