import './style.css'

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);


const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.setZ(30);

renderer.render(scene, camera);
const geometry = new THREE.OctahedronGeometry(10, 3, 16, 100)
const material = new THREE.MeshStandardMaterial( { color: 0xFF6347, wireframe:true});
const torus = new THREE.Mesh(geometry, material);

scene.add(torus)
const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5, 5, 5)

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight)


const controls = new OrbitControls(camera, renderer.domElement);

const css2dRenderer = new CSS2DRenderer();
css2dRenderer.setSize(window.innerWidth, window.innerHeight);
css2dRenderer.domElement.style.position = 'absolute';
css2dRenderer.domElement.style.top = '0';
document.body.appendChild(css2dRenderer.domElement);

const htmlTextElement = document.createElement('div');
htmlTextElement.className = 'html-text';
htmlTextElement.textContent = 'Hi! My name is Elyas Belkhir ';
htmlTextElement.style.color = '#ffffff';
htmlTextElement.style.fontSize = '24px';
htmlTextElement.style.fontWeight = 'bold';


const htmlTextObject = new CSS2DObject(htmlTextElement);
htmlTextObject.position.set(0, 20, 0); // Set the position of the HTML text object

scene.add(htmlTextObject);

function animate() {
  requestAnimationFrame(animate);
  torus.rotation.x += 0.001
  torus.rotation.y += 0.001
  torus.rotation.z += 0.001

  controls.update();
  renderer.render(scene, camera);
  css2dRenderer.render(scene, camera);

}


animate()