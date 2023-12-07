// Importar Three.js
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Crear la escena
const scene = new THREE.Scene();

// Crear una cámara
const camera = new THREE.PerspectiveCamera(25, window.innerWidth / window.innerHeight, 0.1, 10000);

// Crear un renderizador
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Crear controles de órbita
const controls = new OrbitControls(camera, renderer.domElement);

// Crear un objeto geométrico, en este caso un cubo
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Cargar el modelo .glb
const loader = new GLTFLoader();
let glbModel;

loader.load(
  './modelo3D/bodaciousLappi.glb',
  function (gltf) {
    glbModel = gltf.scene;
    scene.add(glbModel);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

// Posicionar la cámara
camera.position.z = 5;

// Función de animación
function animate() {
    requestAnimationFrame(animate);

    // Actualizar los controles de órbita
    controls.update();

    // Rotar el cubo
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    // Rotar el modelo .glb
    if (glbModel) {
      glbModel.rotation.x += 0.01;
      glbModel.rotation.y += 0.01;
    }

    // Renderizar la escena
    renderer.render(scene, camera);
}

// Llamar a la función de animación
animate();
