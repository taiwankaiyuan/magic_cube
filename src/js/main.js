import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as Cube from './cube.js';
import { shuffle, restore } from './cube.js';
import { log } from './logger.js';
import '../css/style.css';

// 初始化渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x9f9d9d);
document.getElementById('container').appendChild(renderer.domElement);

const scene = new THREE.Scene();

// 初始化魔術方塊並加入場景
const cubeGroup = Cube.initCube();
scene.add(cubeGroup);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(4, 4, 6);
camera.lookAt(0, 0, 0);
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// 綁定打亂按鈕
document.getElementById('shuffleBtn').addEventListener('click', () => {
    log('點擊 shuffle');
    try { shuffle(); log('shuffle 執行完畢'); } catch(err) { log(`[shuffle ERROR] ${err.stack}`); }
});

// 綁定還原按鈕
document.getElementById('restoreBtn').addEventListener('click', () => {
    log('點擊 restore');
    try { restore(); log('restore 執行完畢'); } catch(err) { log(`[restore ERROR] ${err.stack}`); }
});

// 動畫循環
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// 全域錯誤攔截
window.onerror = (msg, url, line, col, err) => {
    log(`[ERROR] ${msg} at ${url}:${line}:${col}\n${err?.stack}`);
};
