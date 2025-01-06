// Floating particles background with Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('threejs-bg').appendChild(renderer.domElement);

// Particle Geometry
const particleCount = 1000;
const particlesGeometry = new THREE.BufferGeometry();
const particlesMaterial = new THREE.PointsMaterial({
  color: 0x555555, // Changed to a single, neutral color
  size: 0.08,      // Smaller particle size for subtlety
  transparent: true,
  opacity: 0.4     // Lower opacity for a more subdued effect
});

// Creating fixed particle positions within a tighter space
const particlesArray = new Float32Array(particleCount * 3);
for (let i = 0; i < particleCount * 3; i++) {
  particlesArray[i] = (Math.random() - 0.5) * 10; // Reduced spread for uniformity
}
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(particlesArray, 3));

// Adding particles to the scene
const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);

camera.position.z = 5;

// Animation function to give particles a subtle floating effect
function animateParticles() {
  requestAnimationFrame(animateParticles);

  particles.rotation.x += 0.0001; // Slower rotation for less visible movement
  particles.rotation.y += 0.0001;
  
  renderer.render(scene, camera);
}

// Adjust canvas size on window resize
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

animateParticles();

function toggleMenu() {
  const navbar = document.querySelector('.navbar');
  navbar.classList.toggle('active');  // Toggles the 'active' class to show/hide the menu
}