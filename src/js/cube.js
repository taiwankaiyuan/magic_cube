import * as THREE from 'three';
import { log } from './logger.js';

const moveHistory = [];
let cubeGroup = null;

/**
 * 隨機打亂魔術方塊，並記錄每一步操作。
 * 預設生成 20 步隨機操作。
 */
export function shuffle() {
    log('shuffle 開始');
    try {
        moveHistory.length = 0;
        const moves = ['U', "U'", 'D', "D'", 'L', "L'", 'R', "R'", 'F', "F'", 'B', "B'"];
        const shuffleCount = 20;
        for (let i = 0; i < shuffleCount; i++) {
            const move = moves[Math.floor(Math.random() * moves.length)];
            moveHistory.push(move);
            applyMove(move);
        }
        log('shuffle 完成');
    } catch(err) {
        log(`[shuffle ERROR] ${err.stack}`);
    }
}

/**
 * 根據記錄的打亂序列，反向執行還原步驟。
 */
export function restore() {
    log('restore 開始');
    try {
        for (let i = moveHistory.length - 1; i >= 0; i--) {
            const inverse = invertMove(moveHistory[i]);
            applyMove(inverse);
        }
        moveHistory.length = 0;
        log('restore 完成');
    } catch(err) {
        log(`[restore ERROR] ${err.stack}`);
    }
}

/**
 * 取得反向操作。
 * 例如 'R' -> "R'", "U'" -> 'U'.
 */
function invertMove(move) {
    return move.endsWith("'") ? move.slice(0, -1) : move + "'";
}

/**
 * 實際執行某個操作 (旋轉對應面)。
 */
function applyMove(move) {
    if (!cubeGroup) {
        console.error('applyMove: cubeGroup 尚未初始化');
        return;
    }
    const moves = {
        U: { axis: 'y', index: 1, angle: -Math.PI / 2 },
        "U'": { axis: 'y', index: 1, angle: Math.PI / 2 },
        D: { axis: 'y', index: -1, angle: Math.PI / 2 },
        "D'": { axis: 'y', index: -1, angle: -Math.PI / 2 },
        F: { axis: 'z', index: 1, angle: -Math.PI / 2 },
        "F'": { axis: 'z', index: 1, angle: Math.PI / 2 },
        B: { axis: 'z', index: -1, angle: Math.PI / 2 },
        "B'": { axis: 'z', index: -1, angle: -Math.PI / 2 },
        R: { axis: 'x', index: 1, angle: -Math.PI / 2 },
        "R'": { axis: 'x', index: 1, angle: Math.PI / 2 },
        L: { axis: 'x', index: -1, angle: Math.PI / 2 },
        "L'": { axis: 'x', index: -1, angle: -Math.PI / 2 }
    };
    const config = moves[move];
    if (!config) {
        console.error(`applyMove: 未知的操作 ${move}`);
        return;
    }
    const axisVec = new THREE.Vector3(
        config.axis === 'x' ? 1 : 0,
        config.axis === 'y' ? 1 : 0,
        config.axis === 'z' ? 1 : 0
    );
    cubeGroup.children.forEach(mesh => {
        if (mesh.userData.cubeCoord[config.axis] === config.index) {
            mesh.position.applyAxisAngle(axisVec, config.angle);
            mesh.rotateOnWorldAxis(axisVec, config.angle);
            // 更新 userData.cubeCoord
            const oldCoord = mesh.userData.cubeCoord;
            const coordVec = new THREE.Vector3(oldCoord.x, oldCoord.y, oldCoord.z);
            coordVec.applyAxisAngle(axisVec, config.angle);
            mesh.userData.cubeCoord = {
                x: Math.round(coordVec.x),
                y: Math.round(coordVec.y),
                z: Math.round(coordVec.z)
            };
        }
    });
}

/**
 * 初始化 3x3 魔術方塊群組，使用標準 Rubik’s Cube 配色
 */
export function initCube() {
    const group = new THREE.Group();
    cubeGroup = group;
    const size = 1;
    const gap = 0.1;
    const positions = [-1, 0, 1];
    const colors = { U: 0xffffff, D: 0xffff00, F: 0x00ff00, B: 0x0000ff, R: 0xff0000, L: 0xffa500 };
    const mats = {
        U: new THREE.MeshBasicMaterial({ color: colors.U }),
        D: new THREE.MeshBasicMaterial({ color: colors.D }),
        F: new THREE.MeshBasicMaterial({ color: colors.F }),
        B: new THREE.MeshBasicMaterial({ color: colors.B }),
        R: new THREE.MeshBasicMaterial({ color: colors.R }),
        L: new THREE.MeshBasicMaterial({ color: colors.L }),
        default: new THREE.MeshBasicMaterial({ color: 0x000000 })
    };
    for (let x of positions) {
        for (let y of positions) {
            for (let z of positions) {
                const geo = new THREE.BoxGeometry(size, size, size);
                const faceMats = [
                    x === 1 ? mats.R : mats.default,
                    x === -1 ? mats.L : mats.default,
                    y === 1 ? mats.U : mats.default,
                    y === -1 ? mats.D : mats.default,
                    z === 1 ? mats.F : mats.default,
                    z === -1 ? mats.B : mats.default
                ];
                const mesh = new THREE.Mesh(geo, faceMats);
                mesh.position.set(x * (size + gap), y * (size + gap), z * (size + gap));
                mesh.userData.cubeCoord = { x, y, z };
                group.add(mesh);
            }
        }
    }
    return group;
}
