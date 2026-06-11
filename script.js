// --- 1. EFEK POINTER MENYALA ---
const cursor = document.querySelector('.cursor-glow');

document.addEventListener('mousemove', (e) => {
    // Memperbarui posisi div glow sesuai dengan koordinat mouse
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
});

// --- 2. SETUP THREE.JS UNTUK BACKGROUND 3D ---
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
    alpha: true // Membuat background transparan agar warna CSS terlihat
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

// --- 3. MEMBUAT OBJEK 3D (Tema Perhiasan / Jewelry CAD) ---
// Objek 1: Cincin (Torus)
const ringGeometry = new THREE.TorusGeometry(10, 1.5, 16, 100);
// Objek 2: Permata (Octahedron)
const gemGeometry = new THREE.OctahedronGeometry(7, 0);

// Material garis emas yang elegan
const material = new THREE.MeshStandardMaterial({ 
    color: 0xffd700, 
    wireframe: true 
});

const ring = new THREE.Mesh(ringGeometry, material);
const gem = new THREE.Mesh(gemGeometry, material);

// Mengatur posisi awal
ring.position.set(-15, -5, -10);
gem.position.set(15, 5, -5);

scene.add(ring, gem);

// --- 4. PENCAHAYAAN ---
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// --- 5. ANIMASI SAAT SCROLL ---
function moveCamera() {
    // Mengambil nilai seberapa jauh halaman di-scroll
    const t = document.body.getBoundingClientRect().top;
    
    // Memutar objek berdasarkan scroll
    ring.rotation.x += 0.05;
    ring.rotation.y += 0.075;
    ring.rotation.z += 0.05;

    gem.rotation.y += 0.05;
    gem.rotation.z += 0.05;

    // Kamera sedikit bergerak mendekat/menjauh
    camera.position.z = t * -0.01 + 30;
    camera.position.x = t * -0.0002;
    camera.position.y = t * -0.0002;
}
// Memicu fungsi setiap kali user melakukan scroll
document.body.onscroll = moveCamera;

// --- 6. ANIMASI LOOP (Pergerakan konstan) ---
function animate() {
    requestAnimationFrame(animate);

    // Rotasi pelan secara konstan meskipun tidak di-scroll
    ring.rotation.x += 0.005;
    ring.rotation.y += 0.005;
    
    gem.rotation.x -= 0.005;
    gem.rotation.y -= 0.005;

    renderer.render(scene, camera);
}
animate();

// --- 7. RESPONSIVE RESIZE ---
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});