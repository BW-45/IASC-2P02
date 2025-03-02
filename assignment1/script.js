import * as THREE from "three"
import * as dat from "lil-gui"
import { OrbitControls } from "OrbitControls"

console.log(THREE)
console.log(dat)
console.log(OrbitControls)

/* SET UP */

// Sizes
const sizes = {
    width: window.innerWidth * 0.4,
    height: window.innerHeight ,
    aspectRatio: window.innerWidth * 0.4 / window.innerHeight
}


/***********
 ** SCENE **
 ***********/

// Canvas
const canvas = document.querySelector('.webgl')

// Scene
const scene = new THREE.Scene() 
//scene.background = new THREE.Color('black')

// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    sizes.aspectRatio,
    0.1,
    100
) 
scene.add(camera)
camera.position.set(10, 2, 7.5)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha : true
})
renderer.setSize(sizes.width, sizes.height)
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PSFSoftShadowMap

//Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true


/************
 ** MESHES **
 ***********/


//Cave
const caveGeometry = new THREE.PlaneGeometry(15.5, 7.5)
const caveMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('white'),
    side: THREE.DoubleSide
})
const cave = new THREE.Mesh(caveGeometry,caveMaterial)
cave.rotation.y= Math.PI * 0.5
cave.receiveShadow = true
scene.add(cave)


//Objects

//Box
const BoxGeometry = new THREE.BoxGeometry()
const BoxMaterial = new THREE.MeshNormalMaterial()
const Box1= new THREE.Mesh(BoxGeometry,BoxMaterial)
Box1.position.set(15, 3, 0)
Box1.castShadow = true
scene.add(Box1)
Box1.scale.x=1.5
Box1.scale.y=1.5
Box1.scale.z=1.5

const Box2= new THREE.Mesh(BoxGeometry,BoxMaterial)
Box2.position.set(12, 2.4, 0)
Box2.castShadow = true
scene.add(Box2)
Box2.scale.x=1.5
Box2.scale.y=1.5
Box2.scale.z=1.5

const Box3= new THREE.Mesh(BoxGeometry,BoxMaterial)
Box3.position.set(17, 3.4, 0)
Box3.castShadow = true
scene.add(Box3)
Box3.scale.x=1.5
Box3.scale.y=1.5
Box3.scale.z=1.5

//Lights

//Ambient Light
//const ambientLight = new THREE.AmbientLight(
//    new THREE.Color('white')
//)
//scene.add(ambientLight)

//Directional Light
const directionalLight = new THREE.DirectionalLight(
    new THREE.Color('white'),
    0.5
)
scene.add(directionalLight)
directionalLight.position.set(20, 4.1, 0)
directionalLight.target = cave
directionalLight.castShadow = true
directionalLight.shadow.mapSize.width = 2048
directionalLight.shadow.mapSize.height = 2048

//Directional Light Helper
//const helper = new THREE.DirectionalLightHelper( directionalLight );
//scene.add( helper );

/**********************
 ** DOM INTERACTIONS **
***********************/
const domObject = {
    part: 1,
    firstChange: false,
    secondChange: false,
    thirdChange: false,
    fourthChange: false,
}

// part one
document.querySelector('#part-one').onclick = function() {
    domObject.part = 1

}

// part two
document.querySelector('#part-two').onclick = function() {
    domObject.part = 2
}

// first-change
document.querySelector('#first-change').onclick = function() {
    domObject.firstChange = true
}
// second-change
document.querySelector('#second-change').onclick = function() {
    domObject.secondChange = true
}
// third-change
document.querySelector('#third-change').onclick = function() {
    domObject.thirdChange = true
}
// fourth-change
document.querySelector('#fourth-change').onclick = function() {
    domObject.fourthChange = true
}


/* UI */
//UI
/*
const ui =new dat.GUI()
const lightPositionFolder = ui.addFolder('Light Position')

lightPositionFolder
    .add(directionalLight.position, 'y')
    .min(-10)
    .max(10)
    .step(0.1)
    .name('Y')

    lightPositionFolder
    .add(directionalLight.position, 'z')
    .min(-10)
    .max(10)
    .step(0.1)
    .name('Z')
*/

/********************
 ** ANIMATION LOOP **
********************/
const clock = new THREE.Clock()

const animation = () =>
{
    //Return elapsedTime
    const elapsedTime = clock.getElapsedTime()

    console.log(camera.position)

    // part-one
    if(domObject.part === 1)
    {
        camera.position.set(6, 0, 0)
        camera.lookAt(0, 0, 0)
    }
    // part-two
    if(domObject.part === 2)
    {
        camera.position.set(25, 1, 0)
        camera.lookAt(0, 0, 0)
    }

    // first-change
    if(domObject.firstChange)
    {
        Box2.rotation.x = elapsedTime * 1.5
        Box3.rotation.x = -elapsedTime * 1.5
    }
    // second-change
    if(domObject.secondChange)
    {
        Box2.position.z = (Math.sin(elapsedTime)+1)* 1.5
        Box3.position.z = (Math.sin(-elapsedTime)-1)* 1.5
    }
    // third-change
    if(domObject.thirdChange)
    {
        Box2.position.y = (Math.cos(elapsedTime)+2.5)
        Box3.position.y = (Math.cos(elapsedTime)+3.5) 
    }
    // fourth-change
    if(domObject.fourthChange)
    {
        Box1.rotation.x = elapsedTime * 1.5
        Box1.rotation.y = -elapsedTime * 1.5
        Box1.rotation.z = elapsedTime * 1.5
        Box1.position.y = (Math.sin(elapsedTime)+3)
        Box2.rotation.y = elapsedTime * 1.5
        Box3.rotation.y = elapsedTime * 1.5
        Box2.rotation.z = -elapsedTime * 1.5
        Box3.rotation.z = elapsedTime * 1.5
    }
    //Update directionalLightHelper
    //helper.update()
    
    //Update OrbitControls
    controls.update()

    //Renderer
    renderer.render(scene, camera)

    //Request next frame
    window.requestAnimationFrame(animation)
}

animation()