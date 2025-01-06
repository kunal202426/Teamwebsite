// Create scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 50;

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("threejs-canvas").appendChild(renderer.domElement);

// Create particle geometry and material
const particleCount = 1500;
const particlesGeometry = new THREE.BufferGeometry();
const particlesMaterial = new THREE.PointsMaterial({
  color: 0x0077ff,
  size: 0.15,
  transparent: true,
  opacity: 0.8
});

// Initialize particle positions
const particlesArray = new Float32Array(particleCount * 3);
for (let i = 0; i < particleCount * 3; i++) {
  particlesArray[i] = (Math.random() - 0.5) * 100;
}
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(particlesArray, 3));

// Create particle system
const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);

// Animate particles with slight rotation
function animateParticles() {
  requestAnimationFrame(animateParticles);

  particles.rotation.y += 0.001; // Slow rotation for a subtle effect
  particles.rotation.x += 0.0005;

  renderer.render(scene, camera);
}
animateParticles();

// Handle window resizing
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

function toggleMenu() {
  const navbar = document.querySelector('.navbar');
  navbar.classList.toggle('active');  // Toggles the 'active' class to show/hide the menu
}

function toggleDropUpMenu() {
  const menu = document.getElementById('dropUpMenu');
  menu.classList.toggle('show');
}