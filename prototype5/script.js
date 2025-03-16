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

//Controls
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

const drawCube = (height, color) =>
{
    //Create cube material
    const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(color)
    })

    //Create cube
    const cube = new THREE.Mesh(cubeGeometry, material)

    //Position cube
    cube.position.x = (Math.random() - 0.5) * 10
    cube.position.z = (Math.random() - 0.5) * 10
    cube.position.y = height - 10

    // Randomize cube ratation
    cube.rotation.x = Math.random() * 2 * Math.PI
    cube.rotation.y = Math.random() * 2 * Math.PI
    cube.rotation.z = Math.random() * 2 * Math.PI


    //add cube to scene
    scene.add(cube)
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

const uiObj = {
	sourceText:"Here is my Source Text.",
    saveSourceText() {
        saveSourceText()
    },
    term1: 'here',
    color1: '#aa00ff',
    term2: 'text',
    color2: '#00ffaa',
    term3: '',
    color3: '',

    saveTerms() {
        saveTerms()
    }

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

    // Text Analysis
    findSearchTermInTokenizedText(uiObj.term1, uiObj.color1)
    findSearchTermInTokenizedText(uiObj.term2, uiObj.color2)
    findSearchTermInTokenizedText(uiObj.term3, uiObj.color3)
}

// Text Folder
const textFolder = ui.addFolder("Source Text")

textFolder
    .add(uiObj,'sourceText')
    .name("Source Text")

textFolder
    .add(uiObj,'saveSourceText')
    .name("Save")

// Terms and Visualize Folders
const termsFolder = ui.addFolder("Search Terms")
const visualizedFolder = ui.addFolder("Visualize")

termsFolder
    .add(uiObj, 'term1')
    .name("Term 1")

termsFolder
    .addColor(uiObj, 'color1')
    .name("Term 1 Color")

termsFolder
    .add(uiObj, 'term2')
    .name("Term 2")

termsFolder
    .addColor(uiObj, 'color2')
    .name("Term 2 Color")

termsFolder
    .add(uiObj, 'term3')
    .name("Term 3")

termsFolder
    .addColor(uiObj, 'color3')
    .name("Term 3 Color")

visualizedFolder
    .add(uiObj,'saveTerms')
    .name("Visualize")

// Terms and Visualize Folders are hidden by deafault
termsFolder.hide()
visualizedFolder.hide()


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
const findSearchTermInTokenizedText = (term,color) =>
{
    // Use a for loop to go through the tokenizedText array
    for (let i = 0; i < tokenizedText.length; i++)
    {
        //If tokenizedText[i] matches our searchTerm, then we draw a cube
        if(tokenizedText[i] === term){
            // convert i into height. which is between 1 and 20
            const height = (100 / tokenizedText.length) * i * 0.2
            // call drawCube function 100 times using converted height value
            for(let a = 0; a < 100; a++)
            {
                drawCube(height,color)
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
    //Return elapsedTime
    const elapsedTime = clock.getElapsedTime()
   

    //Update OrbitControls
    controls.update()

    //Renderer
    renderer.render(scene, camera)

    //Request next frame
    window.requestAnimationFrame(animation)
}

animation()