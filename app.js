
var accent_fold = (function () {
    var accent_map = {
	'à': 'a', 'á': 'a', 'â': 'a', 'ã': 'a', 'ä': 'a', 'å': 'a', // a
	'ç': 'c',                                                   // c
	'è': 'e', 'é': 'e', 'ê': 'e', 'ë': 'e',                     // e
	'ì': 'i', 'í': 'i', 'î': 'i', 'ï': 'i',                     // i
	'ñ': 'n',                                                   // n
	'ò': 'o', 'ó': 'o', 'ô': 'o', 'õ': 'o', 'ö': 'o', 'ø': 'o', // o
	'ß': 's',                                                   // s
	'ù': 'u', 'ú': 'u', 'û': 'u', 'ü': 'u',                     // u
	'ÿ': 'y'                                                    // y
    };

    return function accent_fold(s) {
	if (!s) { return ''; }
	var ret = '';
	for (var i = 0; i < s.length; i++) {
	    ret += accent_map[s.charAt(i)] || s.charAt(i);
	}
	return ret;
    };
} ());

function encrypt(key, msg){
    var result = '';
    for(index=0; index < msg.length;
	index++){
	myChar = msg[index];
	indexOnKey = key.indexOf(accent_fold(myChar.toLowerCase()));
	if(indexOnKey < 0){
	    result += myChar;
	}
	else{
	    result += indexOnKey;
	}
    }
    return result;
}

var MainControl = function(){
    this.control = "";
};

MainControl.prototype = {
    setStrategy: function(control){
	this.control = control;
    },

    execute: function(key, msg, output){
	return this.control(key, msg, output);
    }
}

var Commands = {
    simple: function(key, msg, output){
	return encrypt(key, msg, output);
    },
    style: function(key, msg, output){
	output.removeClass();
	output.addClass(key);
	return msg;
    },
    murcielago: function(key, msg, output){
	return Commands.simple(key, msg, output);
    },
    abuelito: function(key, msg, output){
	return Commands.simple(key, msg, output);
    },
    semaforo: function(key, msg, output){
	return Commands.style(key, msg, output);
    },
    morse: function(key, msg, output){
	return Commands.style(key, msg, output);
    }
}

function init_js(){
    var output = $('#output');
    var msg = document.getElementById('msg').value;
    var key_control = document.getElementById('clave');
    var key = key_control.options[key_control.selectedIndex].value;
    var result = '';
    var main = new MainControl();
    var strategy = Commands[key];
    main.setStrategy(strategy);
    result = main.execute(key, msg, output);
    output.text(result)
}

window.init_js = init_js;
