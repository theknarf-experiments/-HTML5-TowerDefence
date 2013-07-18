function keys() {
	that = {}
	keys = {}
		
	$("body").keydown(function(e) {
        keys[e.keyCode] = true;
    });
    
    $("body").keyup(function(e) {
	    keys[e.keyCode] = false;
    });
    
    that.keycode = function(code) {
	    return keys[code] || false;
    }
	
	return that;
}