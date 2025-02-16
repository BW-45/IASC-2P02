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
camera.position.set(10, 2, 7.5)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
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

//TorusKnot (Eye 1)
const torusKnotGeometry = new THREE.TorusKnotGeometry(1,0.2)
const torusKnotMaterial = new THREE.MeshNormalMaterial()
const torusKnot = new THREE.Mesh(torusKnotGeometry,torusKnotMaterial)
torusKnot.position.set(6, 1, -1)
torusKnot.castShadow = true
scene.add(torusKnot)
torusKnot.scale.x=0.5
torusKnot.scale.y=0.5
torusKnot.scale.z=0.5

//Icosahedron 2(Eye 2)
const icosahedronGeometry = new THREE.IcosahedronGeometry()
const icosahedronMaterial = new THREE.MeshNormalMaterial()
const icosahedron = new THREE.Mesh(icosahedronGeometry,icosahedronMaterial)
icosahedron.position.set(6, 1, 1)
icosahedron.castShadow = true
scene.add(icosahedron)
icosahedron.scale.x=0.5
icosahedron.scale.y=0.5
icosahedron.scale.z=0.5

//Mouth
const mouthGeometry = new THREE.CylinderGeometry(0.2,0.2,3)
const mouthMaterial =new THREE.MeshNormalMaterial()
const mouth = new THREE.Mesh(mouthGeometry, mouthMaterial)
//scene.add(mouth)
mouth.position.set(6,-1,0)
mouth.rotation.x= Math.PI * 0.5
mouth.castShadow = true

//Smiley
const smileyGeometry = new THREE.TorusGeometry(1.25,0.2,12,48,Math.PI)
const smileyMaterial = new THREE.MeshNormalMaterial()
const smiley = new THREE.Mesh(smileyGeometry, smileyMaterial)
smiley.castShadow = true
scene.add(smiley)
smiley.position.set(6,0,0)
smiley.rotation.y= Math.PI * 0.5
smiley.rotation.x =Math.PI

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
const helper = new THREE.DirectionalLightHelper( directionalLight );
scene.add( helper );

/* UI */
//UI
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

/********************
 ** ANIMATION LOOP **
********************/
const clock = new THREE.Clock()

const animation = () =>
{
    //Return elapsedTime
    const elapsedTime = clock.getElapsedTime()

    //Animation objects
    torusKnot.rotation.y = elapsedTime
    icosahedron.rotation.x = elapsedTime

    //Update directionalLightHelper
    helper.update()
    
    //Update OrbitControls
    controls.update()

    //Renderer
    renderer.render(scene, camera)

    //Request next frame
    window.requestAnimationFrame(animation)
}

animation()