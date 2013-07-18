function game() {
	
	var that = {}
	that.renderer = new THREE.WebGLRenderer();
	that.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );
	that.scene = new THREE.Scene();
	that.render = false;
	
	var texture = {}
	var eventlisteners = {}
	
	that.addEventListener = function(event, func) {
		eventlisteners[event] = eventlisteners[event] || [];
		eventlisteners[event].push(func);
	}
	
	that.callevent = function(event) {
		eventlisteners[event] = eventlisteners[event] || [];
		eventlisteners[event].forEach(function(itm) {
			itm();
		});
	}
	
	that.texture = function(name) {
		texture[name] = texture[name] || THREE.ImageUtils.loadTexture(name);
		return texture[name];
	}
	
	function psudo_callevent_function(event) {
		return function() {
			that.callevent(event);
		};
	}
	
	function render_frame() {
		if(that.render) {
            that.renderer.render( that.scene, that.camera );
            requestAnimationFrame( psudo_callevent_function("render") );
		}
	}
	that.addEventListener("render", render_frame);
	
	that.start = function() {
		that.render = true;
		that.callevent("render");
	}
	that.stop = function() {
		that.render = false;
	}
	
	return that;
}