/*code pop up animation
document.addEventListener('DOMContentLoaded', () => {
  const animateElements = document.querySelectorAll('[data-animate]');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          observer.unobserve(entry.target); // Stop observing once animated
        }
      });
    },
    { threshold: 0.5 } // Trigger when 50% of the element is visible
  );

  animateElements.forEach((el) => observer.observe(el));
});


/*code pop up animation*/





import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";
import { gsap } from 'https://cdn.skypack.dev/gsap';
// Create a new camera with positions and angles
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 100;
camera.position.x = 50;
camera.position.y = 50;

// Create a Three.JS Scene
const scene = new THREE.Scene();

let eye;

// Instantiate a loader for the .gltf file
const loader = new GLTFLoader();

let mixer;
// Load the "eye" model (car)
loader.load('/eye.glb',
  function (gltf) {
    console.log('Loaded Eye GLTF:', gltf);
    eye = gltf.scene;
    eye.position.y = 0;
    eye.rotation.y = -1;
    eye.rotation.x = 0;
    eye.position.x = 100;
    eye.rotation.z = 0;
    eye.position.z = 0;
    eye.scale.x = 1.4;
    eye.scale.y =  1.6;
    eye.scale.z = 1.8;
    scene.add(eye);
  

  }

);

// Instantiate a new renderer and set its size
const renderer = new THREE.WebGLRenderer({ alpha: true }); // Alpha: true allows for the transparent background
renderer.setSize(window.innerWidth, window.innerHeight);

// Add the renderer to the DOM
document.getElementById("container3D").appendChild(renderer.domElement);

// Add lights to the scene, so we can actually see the 3D model
const ambientLight = new THREE.AmbientLight(0x333333, 5);
scene.add(ambientLight);

const topLight = new THREE.DirectionalLight(0xffffff, 2); // (color, intensity)
topLight.position.set(-500, -500, -500); // top-left-ish
scene.add(topLight);



const reRender3D = () => {
    requestAnimationFrame(reRender3D);
    renderer.render(scene, camera);

};
reRender3D();

let arrPositionModel = [
  {
    id: 'first',
    position: {x: 100, y: 0, z: 0},
    rotation: {x: 0, y: -1, z: 0}
  },
  {
    id: 'second',
    position: {x: 94, y: 0, z: 0},
    rotation: {x: 0, y: - 0.75, z: 0}
  },
  {
    id: 'mid1',
    position: {x: 88, y: 0, z: 0},
    rotation: {x: 0, y: -0.48, z: 0}
  },
  {
    id: 'mid2',
    position: {x: 82, y: 0, z: 0},
    rotation: {x: 0, y: -0.22, z: 0}
  },
  {
    id: 'mid3',
    position: {x: 75, y: 0, z: 0},
    rotation: {x: 0, y: 0.1286, z: 0}
  },
  {
    id: 'mid4',
    position: {x: 65, y: 0, z: 0},
    rotation: {x: 0, y: 0.2857, z: 0}
  },
  {
    id: 'third',
    position: {x: 55, y: -2, z: 0},
    rotation: {x: 0, y: 0.3429, z: 0}
  },
  {
    id: 'fourth',
    position: {x: 45, y: -5, z: 0},
    rotation: {x: 0, y: 0.55, z: 0}
  },
];

const modelMove = () => {
  const segments = document.querySelectorAll('.segment');
  let currentSegment;
  segments.forEach((segment) => {
    const rect = segment.getBoundingClientRect();
    if(rect.top <= window.innerHeight/3){
        currentSegment = segment.id;
    }
  });

  let position_active = arrPositionModel.findIndex(
      (val) => val.id == currentSegment
  );
  if (position_active >= 0) {
    let new_coordinates = arrPositionModel[position_active];
    gsap.to(eye.position, {
      x: new_coordinates.position.x,
      y: new_coordinates.position.y,
      z: new_coordinates.position.z,
      duration: 1,
      ease: "power1.out"
    })

    gsap.to(eye.rotation, {
      x: new_coordinates.rotation.x,
      y: new_coordinates.rotation.y,
      z: new_coordinates.rotation.z,
      duration: 1,
      ease: "power1.out"
    })

  }
}  

window.addEventListener('scroll', () => {
  if(eye) {
    modelMove();
  }
})

window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth, window.innerHeight;
  camera.updateProjectionMatrix();
})
