import * as THREE from "three"
import * as dat from "lil-gui"
import { OrbitControls } from "OrbitControls"

console.log(THREE)
console.log(dat)
console.log(OrbitControls)

/* SET UP */

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
    aspectRatio: window.innerWidth / window.innerHeight
}


/***********
 ** SCENE **
 ***********/

// Canvas
const canvas = document.querySelector('.webgl')

// Scene
const scene = new THREE.Scene() 
scene.background = new THREE.Color('black')

// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    sizes.aspectRatio,
    0.1,
    100
) 
scene.add(camera)
camera.position.set(-2, 3, 5)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)

//Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true


/************
 ** MESHES **
 ***********/

 //icosahedron
const icosahedronGeometry = new THREE.IcosahedronGeometry(0.5)
const icosahedronMaterial = new THREE.MeshBasicMaterial({
    color: new THREE.Color('aqua'),
    wireframe: true
})
const icosahedron = new THREE.Mesh(icosahedronGeometry, icosahedronMaterial)

scene.add(icosahedron)
icosahedron.position.set(0, 1.5, 0)

//Plane
const planeGeometry = new THREE.PlaneGeometry( 10, 10, 50, 50 );
const planeMaterial = new THREE.MeshBasicMaterial( {
    color: new THREE.Color('lightgreen'),
    side: THREE.DoubleSide,
    wireframe: true 
} );
const plane = new THREE.Mesh( planeGeometry, planeMaterial );
plane.rotation.x = Math.PI * 0.5
scene.add( plane );



/* UI */
//UI
const ui =new dat.GUI()

//UI Object
const uiObject = {
    speed: 1,
    distance: 1
}

//icosahedron UI
const icosahedronfolder = ui.addFolder( 'Icosahedron' );

icosahedronfolder
    .add(icosahedronMaterial,'wireframe')
    .name('Toggle Wrieframe')
    
//icosahedronfolder
    //.add(icosahedron.position,'y')
    //.min( 0 )
    //max( 5 )
    //.step( 0.5 ) 
icosahedronfolder
    .add(icosahedron.position,'x')
    .min( -5 )
    .max( 5 )
    .step( 0.5 )
icosahedronfolder
    .add(uiObject,'speed')
    .min( 0 )
    .max( 10 )
    .step( 0.5 )
    .name('Speed')
icosahedronfolder
    .add(uiObject,'distance')
    .min( 0 )
    .max( 5 )
    .step( 0.5 )
    .name('Distance')

//plane UI
const planefolder = ui.addFolder( 'Plane' );

planefolder
    .add(planeMaterial,'wireframe')
    .name('Toggle Wrieframe')

/********************
 ** ANIMATION LOOP **
********************/
const clock = new THREE.Clock()

const animation = () =>
{
    //Return elapsedTime
    const elapsedTime = clock.getElapsedTime()
    console.log(elapsedTime)

    //Animate icosahedron
    icosahedron.position.y = Math.sin(elapsedTime * uiObject.speed) * uiObject.distance

    //Update OrbitControls
    controls.update()

    //Renderer
    renderer.render(scene, camera)

    //Request next frame
    window.requestAnimationFrame(animation)
}

animation()