function Translator(){

function sM(a) {
  var b;
  if (null !== yr)
    b = yr;
  else {
    b = wr(String.fromCharCode(84));
    var c = wr(String.fromCharCode(75));
    b = [b(), b()];
    b[1] = c();
    b = (yr = window[b.join(c())] || "") || ""
  }
  var d = wr(String.fromCharCode(116))
      , c = wr(String.fromCharCode(107))
      , d = [d(), d()];
  d[1] = c();
  c = "&" + d.join("") + "=";
  d = b.split(".");
  b = Number(d[0]) || 0;
  for (var e = [], f = 0, g = 0; g < a.length; g++) {
    var l = a.charCodeAt(g);
    128 > l ? e[f++] = l : (2048 > l ? e[f++] = l >> 6 | 192 : (55296 == (l & 64512) && g + 1 < a.length && 56320 == (a.charCodeAt(g + 1) & 64512) ? (l = 65536 + ((l & 1023) << 10) + (a.charCodeAt(++g) & 1023),
        e[f++] = l >> 18 | 240,
        e[f++] = l >> 12 & 63 | 128) : e[f++] = l >> 12 | 224,
        e[f++] = l >> 6 & 63 | 128),
        e[f++] = l & 63 | 128)
  }
  a = b;
  for (f = 0; f < e.length; f++)
    a += e[f],
        a = xr(a, "+-a^+6");
  a = xr(a, "+-3^+b+-f");
  a ^= Number(d[1]) || 0;
  0 > a && (a = (a & 2147483647) + 2147483648);
  a %= 1E6;
  return c + (a.toString() + "." + (a ^ b))
}

var yr = null;
var wr = function (a) {
  return function () {
    return a
  }
}
    , xr = function (a, b) {
  for (var c = 0; c < b.length - 2; c += 3) {
    var d = b.charAt(c + 2)
        , d = "a" <= d ? d.charCodeAt(0) - 87 : Number(d)
        , d = "+" == b.charAt(c + 1) ? a >>> d : a << d;
    a = "+" == b.charAt(c) ? a + d & 4294967295 : a ^ d
  }
  return a
};

// END
/* eslint-enable */

var window = {
  TKK: localStorage['TKK'] || '0'
};

function updateTKK() {
  return new Promise(function (resolve, reject) {
    var now = Math.floor(Date.now() / 3600000);

    if (Number(window.TKK.split('.')[0]) === now) {
      resolve();
    } else {
      $.ajax({
        url: 'https://translate.google.com',
        type: 'GET',
        success: function (res, textStatus, jqXHR) {
          var code = res.match(/TKK=(.*?)\(\)\)'\);/g);

          if (code) {
            eval("window." + code[0]);
            /* eslint-disable no-undef */
            if (typeof TKK !== 'undefined') {
              window.TKK = TKK;
              localStorage['TKK'] = TKK;
            }
            /* eslint-enable no-undef */
          }

          /**
           * Note: If the regex or the eval fail, there is no need to worry. The server will accept
           * relatively old seeds.
           */

          resolve();
        }, error: function (jqXHR, textStatus, err) {
          var e = new Error();
          e.code = 'BAD_NETWORK';
          e.message = err.message;
          reject(e);
        }
      });
    }
  });
}

function getToken(text){
  return updateTKK().then(function () {
    var tk = sM(text);
    tk = tk.replace('&tk=', '');
    return {name: 'tk', value: tk};
  }).catch(function (err) {
    throw err;
  });
}
this.translate = function(sentence, success, error, to){
getToken(sentence).then(function(token) {
	var length = sentence.length;
	if(!to)
		to='en';var encodedSentence = encodeURIComponent(sentence);
	var params = 'client=t&sl=auto&tl='+to+'&hl=en&dt=at&dt=bd&dt=ex&dt=ld&dt=md&dt=qca&dt=rw&dt=rm&dt=ss&dt=t&tk='+token.value+'&q='+encodedSentence;
    $.ajax({
        type: 'GET',
        url:'https://translate.google.com/translate_a/single?'+params,
        success: function(response){
			success({translated:response[0][0][0], language:response[2], play:'https://translate.google.com/translate_tts?ie=UTF-8&q='+encodedSentence+'&tl='+to+'&total=1&idx=0&textlen='+String(length)+'&tk='+token.value+'&client=t'});
		},
		error:function(err){
			console.log(err);
			error(err);
		}
    });
});
};
this.play = function(sentence, to){
getToken(sentence).then(function(token) {
	var length = sentence.length;
	if(!to)
		to='en';var encodedSentence = encodeURIComponent(sentence);
		var audio = new Audio('https://translate.google.com/translate_tts?ie=UTF-8&q='+encodedSentence+'&tl='+to+'&total=1&idx=0&textlen='+String(length)+'&tk='+token.value+'&client=t');
		audio.play();	
});
};

}
/*https://translate.google.com/translate_a/single?client=t&sl=en&tl=es&hl=en&dt=at&dt=bd&dt=ex&dt=ld&dt=md&dt=qca&dt=rw&dt=rm&dt=ss&dt=t&ie=UTF-8&oe=UTF-8&otf=2&ssel=0&tsel=3&kc=2&tk=862099.743405&q=FUCKERS%20ARE%20A

//auto 
https://translate.google.com/translate_a/single?client=t&sl=auto&tl=en&hl=en&dt=at&dt=bd&dt=ex&dt=ld&dt=md&dt=qca&dt=rw&dt=rm&dt=ss&dt=t&ie=UTF-8&oe=UTF-8&pc=1&otf=2&ssel=0&tsel=4&kc=3&tk=838048.702943&q=ich%20liebe    



https://translate.google.com/translate_a/single?

client=t
sl=auto
tl=en
hl=en
dt=at
dt=bd
dt=ex
dt=ld
dt=md
dt=qca
dt=rw
dt=rm
dt=ss
dt=t




sl=auto
tl=en
hl=en
dt=at
dt=bd
dt=ex
dt=ld
dt=qca
dt=rw
dt=rm
ie=UTF-8
oe=UTF-8
tk=838048.702943
q=ich%20liebe


https://translate.google.com/translate_a/single?
client=t
sl=en
tl=es
hl=en
dt=at
dt=bd
dt=ex
dt=ld
dt=md
dt=qca
dt=rw
dt=rm
dt=ss
dt=t
ie=UTF-8
oe=UTF-8
otf=2
ssel=0
tsel=3
kc=2
tk=862099.743405
q=FUCKERS%20ARE%20A


https://translate.google.com/translate_a/single?
client=t
sl=auto
tl=en
hl=en
dt=at
dt=bd
dt=ex
dt=ld
dt=md
dt=qca
dt=rw
dt=rm
dt=ss
dt=t
ie=UTF-8
oe=UTF-8
otf=2
ssel=0
tsel=0
kc=7
tk=329048.226776&q=Du%20bist%20eine%20verdammte


https://translate.google.com/translate_a/single?client=t&sl=auto&tl=en&hl=en&dt=at&dt=bd&dt=ex&dt=ld&dt=md&dt=qca&dt=rw&dt=rm&dt=ss&dt=t&ie=UTF-8&oe=UTF-8&tk=329048.226776&q=Du%20bist%20eine%20verdammte

 })();*/