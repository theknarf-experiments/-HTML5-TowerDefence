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
    	
        var geometry, material, mesh, rotationSpeed;
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
                var stonemosaic, stonemesh;
                stonemosaic = g.texture("img/stonemosaic.jpg");
                stonemesh = new Mesh( new PlaneGeometry(500, 500, 1, 1),
                                  new MeshBasicMaterial( { map: stonemosaic, wireframe: false } ));
                stonemesh.position.x = -500;
                g.scene.add(stonemesh);
                
                rotationSpeed = {x: 0.005, y: 0.0001};
                
                
                // Adding stats / fps
                stats = new Stats();
                stats.domElement.style.position = 'fixed';
                stats.domElement.style.top = '0px';
                stats.domElement.style.zIndex = 100;
                document.documentElement.appendChild( stats.domElement );
                
                // adding gui
                gui.add(g.camera.position, 'z', 300, 500);
                gui.add(rotationSpeed, 'x');
                gui.add(rotationSpeed, 'y');
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
	            if(hKeys.keycode(39)) { // right
	                position.x-=10;
	            }
        }
        
        g.addEventListener("render", animate);
        g.start();
    });
    
    
})();