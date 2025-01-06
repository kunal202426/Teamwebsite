let container, scene, camera, renderer, particles = [], mouseX = 0, mouseY = 0;

init();
animate();

function init() {
    container = document.getElementById('container');
    
    // Scene setup
    scene = new THREE.Scene();
    
    // Camera setup
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 100;

    // Renderer setup
    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // Reduce particle count for a more minimal effect
    let particleCount = 300;  // Reduced number of particles
    let geometry = new THREE.BufferGeometry();
    let positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() * 2 - 1) * 200;
        positions[i * 3 + 1] = (Math.random() * 2 - 1) * 200;
        positions[i * 3 + 2] = (Math.random() * 2 - 1) * 200;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    // Updated material to use circular particles and light color
    let sprite = new THREE.TextureLoader().load('https://threejs.org/examples/textures/sprites/disc.png');
    let material = new THREE.PointsMaterial({
        color: 0xdddddd,  // Light grey color
        size: 4,  // Size of particles
        map: sprite,  // Circular sprite texture for particles
        blending: THREE.AdditiveBlending,
        transparent: true,
        depthTest: false
    });
    
    particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Event listeners
    window.addEventListener('resize', onWindowResize);
    document.addEventListener('mousemove', onDocumentMouseMove);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onDocumentMouseMove(event) {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
}

function animate() {
    requestAnimationFrame(animate);
    particles.rotation.x += 0.002;
    particles.rotation.y += 0.002;

    // Mouse interaction
    particles.rotation.x += (mouseY * 0.1 - particles.rotation.x) * 0.05;
    particles.rotation.y += (mouseX * 0.1 - particles.rotation.y) * 0.05;

    renderer.render(scene, camera);
}
