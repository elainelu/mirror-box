;(function () {

    // https://threejs.org/examples/webgl_mirror.html
    // https://threejs.org/examples/#webgl_lights_pointlights

    if (!Detector.webgl) Detector.addGetWebGLMessage();

    var WIDTH = window.innerWidth;
    var HEIGHT = window.innerHeight;
    var VIEW_ANGLE = 30;
    var ASPECT = WIDTH / HEIGHT;
    var NEAR = 1;
    var FAR = 600;

    //vars
    var camera, scene, renderer;
    var cameraControls;
    var frontMirror, groundMirror, leftMirror, rightMirror, ceilingMirror, backMirror;
    var light1, light2, light3, light4, light5,  light6, light7, light8, light9;
    var lightMaterial1, lightMaterial2, lightMaterial3;
    var icosahedron;
    var text;

    function init() {
        renderer = new THREE.WebGLRenderer( {antialias: true} );
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( WIDTH, HEIGHT );

        scene = new THREE.Scene();

        camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
        camera.position.set( 0, 50, 2000 );

        cameraControls = new THREE.OrbitControls(camera, renderer.domElement);
        cameraControls.target.set( 0, 40, 0);
        cameraControls.maxDistance = 400;
        cameraControls.minDistance = 10;
        cameraControls.update();
        var container = document.getElementById( 'container' );
        container.appendChild( renderer.domElement );
    }

    function fillScene() {

        var planeGeo = new THREE.PlaneBufferGeometry( 100, 100 );

        groundMirror = new THREE.Mirror( renderer, camera, { clipBias: 0.003, textureWidth: WIDTH, textureHeight: HEIGHT, color: 0x666666 } );
        var floorMirrorMesh = new THREE.Mesh( planeGeo, groundMirror.material );
        floorMirrorMesh.add( groundMirror );
        floorMirrorMesh.position.y = 0.95;
        floorMirrorMesh.rotateX( - Math.PI / 2 );
        scene.add( floorMirrorMesh );

        //ceiling
        ceilingMirror = new THREE.Mirror( renderer, camera, { clipBias: 0.003, textureWidth: WIDTH, textureHeight: HEIGHT, color: 0x777777 } );
        var ceilingMirrorMesh = new THREE.Mesh( planeGeo, ceilingMirror.material );
        ceilingMirrorMesh.add( ceilingMirror );
        ceilingMirrorMesh.position.y = 919.9;
        ceilingMirrorMesh.rotateX( Math.PI / 2 );
        scene.add( ceilingMirrorMesh );

        //back
        backMirror = new THREE.Mirror( renderer, camera, { clipBias: 0.003, textureWidth: WIDTH, textureHeight: HEIGHT, color: 0x777777 } );
        var backMirrorMesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 99, 99 ), backMirror.material );
        backMirrorMesh.add( backMirror );
        backMirrorMesh.position.y = 49.95;
        backMirrorMesh.position.z = 49.95;
        backMirrorMesh.rotateY(Math.PI);
        scene.add( backMirrorMesh );

        //front
        frontMirror = new THREE.Mirror( renderer, camera, { clipBias: 0.003, textureWidth: WIDTH, textureHeight: HEIGHT, color: 0x777777 } );
        var frontMirrorMesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 99, 99 ), frontMirror.material );
        frontMirrorMesh.add( frontMirror );
        frontMirrorMesh.position.y = 49.95;
        frontMirrorMesh.position.z = -49.95;
        scene.add( frontMirrorMesh );

        //left
        leftMirror = new THREE.Mirror( renderer, camera, { clipBias: 0.003, textureWidth: WIDTH, textureHeight: HEIGHT, color: 0x777777 } );
        var leftMirrorMesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 99, 99 ), leftMirror.material );
        leftMirrorMesh.add( leftMirror );
        leftMirrorMesh.position.y = 49.95;
        leftMirrorMesh.position.x = -49.95;
        leftMirrorMesh.rotateY(Math.PI / 2);
        scene.add( leftMirrorMesh );

        //right
        rightMirror = new THREE.Mirror( renderer, camera, { clipBias: 0.003, textureWidth: WIDTH, textureHeight: HEIGHT, color: 0x777777 } );
        var rightMirrorMesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 99, 99 ), rightMirror.material );
        rightMirrorMesh.add( rightMirror );
        rightMirrorMesh.position.y = 49.95;
        rightMirrorMesh.position.x = 49.95;
        rightMirrorMesh.rotateY(3*Math.PI / 2);
        scene.add( rightMirrorMesh );

        var geometry = new THREE.IcosahedronGeometry( 0, 0 );
        var material = new THREE.MeshPhongMaterial( { color: 0xffffff, emissive: 0xa42121, shading: THREE.FlatShading, wireframe: false } );
        icosahedron = new THREE.Mesh( geometry, material );
        icosahedron.position.y = 10;
        icosahedron.position.x = 20;
        // scene.add(icosahedron);

        //back
        var planeBack = new THREE.Mesh( planeGeo, new THREE.MeshPhongMaterial( { color: 0xffffff } ) );
        planeBack.position.z = -50;
        planeBack.position.y = 50;
        scene.add( planeBack );
        //front
        var planeFront = new THREE.Mesh( planeGeo, new THREE.MeshPhongMaterial( { color: 0xffffff } ) );
        planeFront.position.z = 50;
        planeFront.position.y = 50;
        planeFront.rotateY( Math.PI );
        scene.add( planeFront );
        //right
        var planeRight = new THREE.Mesh( planeGeo, new THREE.MeshPhongMaterial( { color: 0xffffff } ) );
        planeRight.position.x = 50;
        planeRight.position.y = 50;
        planeRight.rotateY( - Math.PI / 2 );
        scene.add( planeRight );
        //left
        var planeLeft = new THREE.Mesh( planeGeo, new THREE.MeshPhongMaterial( { color: 0xffffff } ) );
        planeLeft.position.x = -50;
        planeLeft.position.y = 50;
        planeLeft.rotateY( Math.PI / 2 );
        scene.add( planeLeft );
        //bottom
        var planeBottom = new THREE.Mesh( planeGeo, new THREE.MeshPhongMaterial( { color: 0xffffff } ) );
        scene.add( planeBottom );
        planeBottom.rotateX( - Math.PI / 2 );
        //top
        var planeTop = new THREE.Mesh( planeGeo, new THREE.MeshPhongMaterial( { color: 0xffffff } ) );
        scene.add( planeTop );
        planeTop.position.y = 100;
        planeTop.rotateX( Math.PI / 2 );


        // LIGHTS
        //sphere geometry to attach on lights
        var sphere = new THREE.SphereGeometry( 3.5, 4, 8 );

        lightMaterial1 = new THREE.MeshBasicMaterial( { color: 0x441491 } );
        lightMaterial2 = new THREE.MeshBasicMaterial( { color: 0xFF7F50 } );
        lightMaterial3 = new THREE.MeshBasicMaterial( { color: 0x000099 } )

        //light points
        light1 = new THREE.PointLight( 0x3c3939, 1, 150 );
        light1.add( new THREE.Mesh( sphere, lightMaterial1 ) );
        light1.position.set(0, 50, 40);
        scene.add( light1 );
        light2 = new THREE.PointLight( 0x122225, 1, 150 );
        light2.add( new THREE.Mesh( sphere, lightMaterial2 ) );
        light2.position.set(0, 90, -0);
        scene.add( light2 );
        light3 = new THREE.PointLight( 0x441491, 1, 150 );
        light3.add( new THREE.Mesh( sphere,  lightMaterial3) );
        light3.position.set(0, 10, -40);
        scene.add( light3 );

        //more light points
        light4 = new THREE.PointLight( 0x3c3939, 1, 150 );
        light4.add( new THREE.Mesh( sphere, lightMaterial1 ) );
        light4.position.set(40, 50, 40);
        scene.add( light4 );
        light5 = new THREE.PointLight( 0x122225, 1, 150 );
        light5.add( new THREE.Mesh( sphere, lightMaterial2 ) );
        light5.position.set(40, 10, 0);
        scene.add( light5 );
        light6 = new THREE.PointLight( 0x441491, 1, 150 );
        light6.add( new THREE.Mesh( sphere, lightMaterial3 ) );
        light6.position.set(40, 90, -40);
        scene.add( light6 );

        //even more light points
        light7 = new THREE.PointLight( 0x3c3939, 1, 150 );
        light7.add( new THREE.Mesh( sphere, lightMaterial1 ) );
        light7.position.set(-40, 90, 40);
        scene.add( light7 );
        light8 = new THREE.PointLight( 0x122225, 1, 150 );
        light8.add( new THREE.Mesh( sphere, lightMaterial2 ) );
        light8.position.set(-40, 50, 0);
        scene.add( light8 );
        light9 = new THREE.PointLight( 0x441491, 1, 150 );
        light9.add( new THREE.Mesh( sphere, lightMaterial3 ) );
        light9.position.set(-40, 10, 40);
        scene.add( light9 );
    }

    function render() {
        groundMirror.render();
        leftMirror.render();
        rightMirror.render();
        backMirror.render();
        frontMirror.render();
        ceilingMirror.render();
        renderer.render(scene, camera);
    }

    function update() {
        requestAnimationFrame( update );

        //new position timer
        var timer = Date.now() * 0.01;
        icosahedron.position.set(
            Math.cos( timer * 0.1 ) * 10,
            50,
            Math.sin( timer * 0.1 ) * 10
        );

        //lights timer
        var time = Date.now() * 0.0005;

        //move lights inside box
        light1.position.x = (Math.sin( time * 0.7 ) * -49);
        light1.position.y = Math.abs(Math.cos( time * 1.3 ) * 99);
        light1.position.z = (Math.cos( time * 0.8 ) * -49);
        light2.position.x = (Math.cos( time * 1.0 ) * 49);
        light2.position.y = Math.abs(Math.sin( time * 0.7 ) * 99);
        light2.position.z = (Math.sin( time * 0.6 ) * -49);
        light3.position.x = (Math.sin( time * 0.7 ) * 49);
        light3.position.y = Math.abs(Math.sin( time * 0.5 ) * 99);
        light3.position.z = (Math.cos( time * 0.8 ) * 49);

        light4.position.x = (Math.sin( time * 1.2 ) * 49);
        light4.position.y = Math.abs(Math.cos( time * 0.9 ) * 99);
        light4.position.z = (Math.cos( time * 0.5 ) * 49);
        light5.position.x = (Math.cos( time * 0.8 ) * -49);
        light5.position.y = Math.abs(Math.sin( time * 0.7 ) * 99);
        light5.position.z = (Math.sin( time * 1.2 ) * -49);
        light6.position.x = (Math.sin( time * 0.7 ) * 49);
        light6.position.y = Math.abs(Math.sin( time * 0.5 ) * 99);
        light6.position.z = (Math.cos( time * 0.8 ) * -49);

        light7.position.x = (Math.sin( time * 1.1 ) * 49);
        light7.position.y = Math.abs(Math.cos( time * 1.1 ) * 99);
        light7.position.z = (Math.cos( time * 1.6 ) * -49);
        light8.position.x = (Math.cos( time * 1.3 ) * -49);
        light8.position.y = Math.abs(Math.sin( time * 0.7 ) * 99);
        light8.position.z = (Math.sin( time * 0.9 ) * 49);
        light9.position.x = (Math.sin( time * 0.7 ) * 49);
        light9.position.y = Math.abs(Math.sin( time * 0.5 ) * 99);
        light9.position.z = (Math.cos( time * 0.8 ) * 49);

        render();
    }

    function initGUI() {
    }
    function onWindowResize() {
    }
    function loadInfo() {
    }
    function hideInfo() {
    }
    window.addEventListener('resize', onWindowResize, false);
    window.addEventListener('load', loadInfo, false);
    TweenMax.set('#controls_message', {scale: 0,opacity: 0});
    init();
    fillScene();
    initGUI();
    update();

})();
