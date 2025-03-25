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

// Resizing
window.addEventListener('resize', () => 
{
     //Update size
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    sizes.aspectRatio = window.innerWidth / window.innerHeight
    
    //Update camera
    camera.aspect = sizes.aspectRatio
    camera.updateProjectionMatrix()
    
    //Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio,  2))
})

/***********
 ** SCENE **
 ***********/

// Canvas
const canvas = document.querySelector('.webgl')

// Scene
const scene = new THREE.Scene() 
scene.background = new THREE.Color('gray')

// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    sizes.aspectRatio,
    0.1,
    100
) 
scene.add(camera)
camera.position.set(0, 12, -20)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/************
 ** Lights **
 ************/
//Directional Light
const directionalLight = new THREE.DirectionalLight(0x404040, 100)
scene.add(directionalLight)

/************
 ** MESHES **
 ***********/

// Cube Geometry
const cubeGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)

const drawCube = (height, params) =>
{
    // Create cube material
    const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(params.color)
    })

    // Create cube
    const cube = new THREE.Mesh(cubeGeometry, material)

    // Position cube
    cube.position.x = (Math.random() - 0.5) * params.diameter
    cube.position.z = (Math.random() - 0.5) * params.diameter
    cube.position.y = height - 10
    // dynamic diameter
    if(params.dynamicDiameterUp)
    {
        cube.position.x = (Math.random() - 0.5) * params.diameter * height * 0.1
        cube.position.z = (Math.random() - 0.5) * params.diameter * height * 0.1
    }

    if(params.dynamicDiameterDown)
        {
            cube.position.x = (Math.random() - 0.5) * params.diameter / (height+2) * 2
            cube.position.z = (Math.random() - 0.5) * params.diameter / (height+2) * 2
        }



    // Scale cube
    cube.scale.x = params.scale
    cube.scale.y = params.scale
    cube.scale.z = params.scale

    // Randomize cube
    if(params.randomized){
        cube.rotation.x = Math.random() * 2 * Math.PI
        cube.rotation.y = Math.random() * 2 * Math.PI
        cube.rotation.z = Math.random() * 2 * Math.PI
    }
    
    //add cube to group
    params.group.add(cube)
}

//drawCube(0, 'red')
//drawCube(1, 'yellow')
//drawCube(2, 'green')
//drawCube(3, 'blue')

/*******
** UI ** 
********/
// UI
const ui =new dat.GUI()

let preset = {}

// Groups
const group1 = new THREE.Group()
scene.add(group1)
const group2 = new THREE.Group()
scene.add(group2)
const group3 = new THREE.Group()
scene.add(group3)

const uiObj = {
	sourceText:" ",
    saveSourceText() {
        saveSourceText()
    },
    term1:{
        term: 'light',
        color: '#4dc9ff',
        dynamicDiameterUp: false,
        dynamicDiameterDown: false,
        diameter: 5,
        group: group1,
        nCubes: 25,
        randomized: true,
        scale: 1
    },
    term2:{
        term: 'darkness',
        color: '#ff0f0f',
        dynamicDiameterUp: false,
        dynamicDiameterDown: true,
        diameter: 30,
        group: group2,
        nCubes: 50,
        randomized: true,
        scale: 1
    },
    term3:{
        term: 'witness',
        color: '#0d0d0d',
        dynamicDiameterUp: true,
        dynamicDiameterDown: false,
        diameter: 10,
        group: group3,
        nCubes: 10,
        randomized: false,
        scale: 1        
    },

    saveTerms() {
        saveTerms()
    },
    rotateCamera: false
}

// UI Functions
const saveSourceText = () =>
{
    // UI
   preset = ui.save()
   textFolder.hide()
   termsFolder.show()
   visualizedFolder.show()
   
    // Text Analysis
    tokenizeSourceText(uiObj.sourceText)
}

const saveTerms = () =>
{
    //UI
    preset = ui.save
    visualizedFolder.hide()
    cameraFolder.show()

    // Text Analysis
    findSearchTermInTokenizedText(uiObj.term1)
    findSearchTermInTokenizedText(uiObj.term2)
    findSearchTermInTokenizedText(uiObj.term3)
}

// Text Folder
const textFolder = ui.addFolder("Source Text")

textFolder
    .add(uiObj,'sourceText')
    .name("Source Text")

textFolder
    .add(uiObj,'saveSourceText')
    .name("Save")

// Terms, Visualize and Camera Folders
const termsFolder = ui.addFolder("Search Terms")
const visualizedFolder = ui.addFolder("Visualize")
const cameraFolder = ui.addFolder("Camera")

termsFolder
    .add(uiObj.term1, 'term')
    .name("Term 1")

termsFolder
    .add(group1, 'visible')
    .name("Term 1 Visibility")

termsFolder
    .addColor(uiObj.term1, 'color')
    .name("Term 1 Color")

termsFolder
    .add(uiObj.term2, 'term')
    .name("Term 2")

termsFolder
    .add(group2, 'visible')
    .name("Term 2 Visibility")

termsFolder
    .addColor(uiObj.term2, 'color')
    .name("Term 2 Color")

termsFolder
    .add(uiObj.term3, 'term')
    .name("Term 3")

termsFolder
    .add(group3, 'visible')
    .name("Term 3 Visibility")

termsFolder
    .addColor(uiObj.term3, 'color')
    .name("Term 3 Color")

visualizedFolder
    .add(uiObj,'saveTerms')
    .name("Visualize")

cameraFolder
    .add(uiObj, 'rotateCamera')
    .name('Turntable')

// Terms and Visualize Folders are hidden by deafault
termsFolder.hide()
visualizedFolder.hide()
cameraFolder.hide()

/*******************
 ** TEXT ANALYSIS **
 *******************/

// Variables
let parsedText, tokenizedText

// Parse and Tokenize sourceText
const tokenizeSourceText = (sourceText) =>
{
    // Strip periods and downcase sourceText
    parsedText = sourceText.replaceAll(".", "").toLowerCase()

    // Tokenize text
    tokenizedText = parsedText.split(/[^\w']+/)
    console.log(tokenizedText)
}

// Find searchTerm in tokenizedText
const findSearchTermInTokenizedText = (params) =>
{
    // Use a for loop to go through the tokenizedText array
    for (let i = 0; i < tokenizedText.length; i++)
    {
        //If tokenizedText[i] matches our searchTerm, then we draw a cube
        if(tokenizedText[i] === params.term){
            // convert i into height. which is between 1 and 20
            const height = (100 / tokenizedText.length) * i * 0.2
            // call drawCube function 100 times using converted height value
            for(let a = 0; a < params.nCubes; a++)
            {
                drawCube(height, params)
            }
            
        }
    }
}

//findSearchTermInTokenizedText("char","red")
//findSearchTermInTokenizedText("amuro","blue")
//findSearchTermInTokenizedText("axis","black")

/********************
 ** ANIMATION LOOP **
********************/
const clock = new THREE.Clock()

const animation = () =>
{
    // Return elapsedTime
    const elapsedTime = clock.getElapsedTime()
   
    // Update OrbitControls
    controls.update()

    // Rotate Darkness(Group 2)
    group2.rotation.y = elapsedTime * 0.5

    // Rotate Wistness(Group 3)
    group3.rotation.y = -elapsedTime * 0.1

    // Floating group 3
    group3.position.y = Math.sin(elapsedTime)

    // Rotate Camera
    if(uiObj.rotateCamera)
    {
        camera.position.x = Math.sin(elapsedTime * 0.1) * 20
        camera.position.z = Math.cos(elapsedTime * 0.1) * 20
        camera.position.y = 5
        camera.lookAt(0, 0, 0)
    }

    // Renderer
    renderer.render(scene, camera)

    // Request next frame
    window.requestAnimationFrame(animation)
}

animation()