import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { VRButton } from 'three/examples/jsm/webxr/VRButton';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xadd8e6); // Light blue color for background

// Camera setup
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Renderer setup
const renderer = new THREE.WebGLRenderer();
renderer.xr.enabled = true; // Enabled XR support
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//WebXRManager


// VR button setup
document.body.appendChild(VRButton.createButton(renderer));

// Controls setup
const controls = new OrbitControls(camera, renderer.domElement);

// Geometry setup
const geometry = new THREE.BoxGeometry();
const redMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // Red color material

// Static cube setup
const staticCube = new THREE.Mesh(geometry, redMaterial);
staticCube.position.set(2, 0, 0); // Set position
scene.add(staticCube);

// Function to generate random position near the rotating cube
function generateRandomPosition() {
    const radius = 5; // Adjust this value as needed
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.random() * Math.PI * 2;
    const x = rotatingCube.position.x + radius * Math.sin(theta) * Math.cos(phi);
    const y = rotatingCube.position.y + radius * Math.sin(theta) * Math.sin(phi);
    const z = rotatingCube.position.z + radius * Math.cos(theta);
    return new THREE.Vector3(x, y, z);
}

// Rotating cube setup
const rotatingCube = new THREE.Mesh(geometry, redMaterial);
scene.add(rotatingCube);

// Spawn 10 cubes in random locations near the rotating cube
const spawnCubes = () => {
    const cubes = [];
    for (let i = 0; i < 10; i++) {
        const cube = new THREE.Mesh(geometry, redMaterial);
        cube.position.copy(generateRandomPosition());
        scene.add(cube);
        cubes.push(cube);
    }
    return cubes;
};

const cubes = spawnCubes();

// Resize event listener
window.addEventListener('resize', onWindowResize, false);
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    render();
}

// Animation loop
function animate() {
    //requestAnimationFrame(animate);
    renderer.setAnimationLoop(animate);

    rotatingCube.rotation.x += 0.01;
    rotatingCube.rotation.y += 0.01;

    controls.update();

    render();
}

// Render function
function render() {
    renderer.render(scene, camera);
}

// Start animation loop
animate();
