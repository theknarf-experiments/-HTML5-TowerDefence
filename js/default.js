(function() {
    
    var js_folder = "js/";
    var lib_folder = js_folder + "lib/";
    var helper_folder = js_folder + "helper/";
    
    var deps = [
    	// Library dependencies
        	lib_folder + "three.min.js"
        ,	lib_folder + "dat.gui.min.js"
        ,	lib_folder + "stats.min.js"
        ,	lib_folder + "jquery-1.8.2.min.js"
        
        // Helper dependencies
        ,	helper_folder + "keys.js"
        ,	helper_folder + "game.js"
    ];
    
    require(deps,function() {
    	var g = new game();
    	var hKeys = new keys();
    	
        var gui = new dat.GUI();
        var fps = {show: true}, stats;
        var position = {x: 0, y: 0, z: 500};
        
        (function () {
            with(THREE) {
                // Initializing canvas, camera and the scene
                g.renderer.setSize( window.innerWidth, window.innerHeight );
                
                with(g.renderer.domElement.style)
                {
                    position = 'fixed';
                    zIndex = "-100";
                }
                
                document.body.appendChild( g.renderer.domElement );

                g.camera.position = position;

                // Adding a stone graphic
                var stonemesh = new Mesh( new PlaneGeometry(64*3, 64*4, 1, 1),
                                  new MeshBasicMaterial( {map: g.texture("img/hyptosis_tile-art-batch-1.png"), height: 64} ));
                stonemesh.position.x = -500;
                g.scene.add(stonemesh);
                
                // Adding stats / fps
                stats = new Stats();
                stats.domElement.style.position = 'fixed';
                stats.domElement.style.top = '0px';
                stats.domElement.style.zIndex = 100;
                document.documentElement.appendChild( stats.domElement );
                
                // adding gui
                gui.add(g.camera.position, 'z', 100, 600);
                gui.add(fps, 'show');
            }
        })();

        var animate = function () {
                g.camera.position = position;
                
                if(fps.show)
                {
                    stats.domElement.style.display='block';
                    stats.update();
                }
                else
                {
                    stats.domElement.style.display='none';
                }

				if(hKeys.keycode(37)) { // left
	                position.x+=10;
	            }
	            if(hKeys.keycode(38)) { // Up
		            position.y-=10;
	            }
	            if(hKeys.keycode(39)) { // right
	                position.x-=10;
	            }
	            if(hKeys.keycode(40)) { // Down
		            position.y+=10;
	            }
        }
        
        g.addEventListener("render", animate);
        g.start();
    });
    
    
})();