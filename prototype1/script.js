import * as THREE from "three"

/***********
 ** SCENE **
 ***********/

// Canvas
const canvas = document.querySelector('.webgl')

// Scene
const scene = new THREE.Scene() 
scene.background = new THREE.Color('lightblue')

// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100
) 
scene.add(camera)
camera.position.set(0, 0, 5)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(window.innerWidth,window.innerHeight)

/************
 ** MESHES **
 ***********/

 //testSphere
const sphereGeometry = new THREE.SphereGeometry(1)
const sphereMaterial = new THREE.MeshNormalMaterial()
const testSphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
//second
const torusKnotGeometry = new THREE.TorusKnotGeometry(1)
const torusKnotMaterial = new THREE.MeshNormalMaterial()
const torusKnot = new THREE.Mesh(torusKnotGeometry, torusKnotMaterial)

scene.add(testSphere)
testSphere.position.set(0, 0, 0)

scene.add(torusKnot)

/********************
 ** ANIMATION LOOP **
********************/
const clock = new THREE.Clock()

const animation = () =>
{
    //Return elapsedTime
    const elapsedTime = clock.getElapsedTime()

    //Animate testsphere
    console.log(Math.sin(elapsedTime))
    testSphere.position.y = Math.sin(elapsedTime)
    torusKnot.position.x = Math.sin(elapsedTime)

    //Renderer
    renderer.render(scene, camera)

    //Request next frame
    window.requestAnimationFrame(animation)
}

animation()