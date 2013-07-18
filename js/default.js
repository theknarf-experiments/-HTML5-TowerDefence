(function() {
    
    var deps = [
        "js/three.min.js",
        "js/dat.gui.min.js",
        "js/stats.min.js",
        "js/jquery-1.8.2.min.js"
    ];
    
    require(deps,function() {
        var camera, scene, renderer;
        var geometry, material, mesh, rotationSpeed;
        var gui = new dat.GUI();
        var fps = {show: true}, stats;
        var position = {x: 0, y: 0, z: 500};
        
        $("body").keydown(function(e) {
            if(e.keyCode == 37) { // left
                position.x+=10;
            }
            if(e.keyCode == 39) { // right
                position.x-=10;
            }
        });
        
        (function () {
            with(THREE) {
                // Initializing canvas, camera and the scene
                renderer = new WebGLRenderer();
                renderer.setSize( window.innerWidth, window.innerHeight );
                
                with(renderer.domElement.style)
                {
                    position = 'fixed';
                    zIndex = "-100";
                }
                
                document.body.appendChild( renderer.domElement );

                var ratio = window.innerWidth / window.innerHeight;
                camera = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );
                /*
                camera = new OrthographicCamera(-1000 * ratio,
                                                1000 * ratio,
                                                1000,
                                                -1000,
                                                0, 1000);/**/
                camera.position = position;

                scene = new Scene();

                // Adding the rotating cube
                geometry = new CubeGeometry( 200, 200, 200 );
                material = new MeshBasicMaterial( { color: 0xFF0000, wireframe: true, wireframeLinewidth: 5 } );

                mesh = new Mesh( geometry, material );
                scene.add( mesh );
                
                rotationSpeed = {x: 0.005, y: 0.0001};
                
                // Adding a stone graphic
                var stonemosaic, stonemesh;
                stonemosaic = ImageUtils.loadTexture("img/stonemosaic.jpg");

                stonemesh = new Mesh( new PlaneGeometry(500, 500, 500, 500),
                                      new MeshBasicMaterial( { map: stonemosaic, wireframe: false } ));
                stonemesh.position.x = -500;
                scene.add(stonemesh);
                
                // Adding stats / fps
                
                stats = new Stats();
                stats.domElement.style.position = 'fixed';
                stats.domElement.style.top = '0px';
                stats.domElement.style.zIndex = 100;
                document.documentElement.appendChild( stats.domElement );
                
                // adding gui
                gui.add(camera.position, 'z', 300, 500);
                gui.add(material, 'wireframe');
                gui.add(rotationSpeed, 'x');
                gui.add(rotationSpeed, 'y');
                gui.add(fps, 'show');
            }
        })();

        var animate = function () {
                mesh.rotation.x = Date.now() * rotationSpeed.x;
                mesh.rotation.y = Date.now() * rotationSpeed.y;
                camera.position = position;
                
                if(fps.show)
                {
                    stats.domElement.style.display='block';
                    stats.update();
                }
                else
                {
                    stats.domElement.style.display='none';
                }

                renderer.render( scene, camera );
                requestAnimationFrame( animate );
        }
        
        animate();
    });
    
    
})();