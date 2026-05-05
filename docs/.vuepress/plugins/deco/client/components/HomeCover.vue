<template>
    <Teleport to=".hero-fullscreen.vp-blog-hero">
        <div>
            <div class="cover-wrap">
                <div ref="containerRef" />
            </div>
        </div>
    </Teleport>
</template>

<script setup lang="ts">
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { onBeforeUnmount, onMounted, ref } from "vue";

// --- 类型定义 ---
interface ParticleVelocity {
    x: number;
    y: number;
    z: number;
}

interface RingParticleParams {
    aSemis: number;
    bSemis: number;
    speed: number;
    phaseOffset: number;
    yAmp: number;
    yThick: number;
    radiusFactor: number;
}

// --- 组件实例 DOM 容器引用 ---
const containerRef = ref<HTMLDivElement | null>(null);

// --- Three.js 全局变量 ---
let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let renderer: THREE.WebGLRenderer;
let controls: OrbitControls;
let effectComposer: EffectComposer;
let bloomPass: UnrealBloomPass;

// 核心物体
let coreSphere: THREE.Mesh;
let glowSphere: THREE.Mesh;
let coreMat: THREE.MeshStandardMaterial;
let glowMat: THREE.MeshStandardMaterial;

// 粒子系统集合
let floatParticles: THREE.Points;
let redCloud: THREE.Points;
let blueCloud: THREE.Points;
let swarmParticles: THREE.Points;
let ringParticles: THREE.Points;
let dustRing: THREE.Points;
let stars: THREE.Points;

// 粒子动画数据
let floatVelocity: ParticleVelocity[] = [];
let redVel: ParticleVelocity[] = [];
let blueVel: ParticleVelocity[] = [];
let swarmVel: ParticleVelocity[] = [];
let ringParams: RingParticleParams[] = [];
let dustParams: RingParticleParams[] = [];

// 动画循环 ID
let animationId: number | null = null;

// 开场动画状态
let openingActive = true;
let startTime = 0;
let originalCamPos: THREE.Vector3;

// 光照动态时间累加器
let timeAcc = 0;

// 自定义缩放所需变量
let wheelHandler: ((e: WheelEvent) => void) | null = null;

// --- 辅助函数：生成圆形粒子纹理 ---
function createRoundTexture(): THREE.Texture {
    const canvas = document.createElement("canvas");
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext("2d")!;
    ctx.beginPath();
    ctx.arc(16, 16, 14, 0, 2 * Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();
    const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 14);
    gradient.addColorStop(0, "rgba(255,255,255,1)");
    gradient.addColorStop(0.5, "rgba(255,255,255,0.9)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 32, 32);
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
}

// --- 彩虹色生成 (用于背景漂浮粒子) ---
function getRainbowColor(): THREE.Color {
    const hue = Math.random();
    const saturation = 0.8 + Math.random() * 0.2;
    const lightness = 0.7 + Math.random() * 0.3;
    return new THREE.Color().setHSL(hue, saturation, lightness);
}

// --- 环带渐变色：内圈蓝紫 (t=0) -> 外圈红橙 (t=1) ---
function getGradientColor(t: number): THREE.Color {
    let hue: number;
    if (t < 0.5) {
        const p = t / 0.5;
        hue = 0.55 + p * 0.2;
    } else {
        const p = (t - 0.5) / 0.5;
        if (p < 0.6) {
            hue = 0.75 + p * 0.25;
        } else {
            hue = ((p - 0.6) / 0.4) * 0.08;
        }
    }
    return new THREE.Color().setHSL(hue, 0.9, 0.7);
}

// --- 创建粒子材质 (支持顶点颜色) ---
function getParticleMaterial(size: number, opacity = 1.0): THREE.PointsMaterial {
    const texture = createRoundTexture(); // 每个材质独立纹理，简单起见
    return new THREE.PointsMaterial({
        map: texture,
        size,
        vertexColors: true,
        transparent: true,
        blending: THREE.AdditiveBlending,
        opacity,
    });
}

// --- 更新椭圆星环粒子位置 (纵向∞形态) ---
function updateVerticalInfinity(particles: THREE.Points, paramsArray: RingParticleParams[]) {
    const positions = particles.geometry.attributes.position.array as Float32Array;
    const globalTime = performance.now() / 1000;
    for (let i = 0; i < paramsArray.length; i++) {
        const p = paramsArray[i];
        const theta = globalTime * p.speed + p.phaseOffset;
        const x = Math.cos(theta) * p.aSemis;
        const z = Math.sin(theta) * p.bSemis;
        const y = Math.sin(2 * theta) * p.yAmp + p.yThick;
        const idx = i * 3;
        positions[idx] = x;
        positions[idx + 1] = y;
        positions[idx + 2] = z;
    }
    particles.geometry.attributes.position.needsUpdate = true;
}

// --- 更新自然漂浮粒子运动 ---
function updateNaturalParticles(
    particles: THREE.Points,
    velocities: ParticleVelocity[],
    deltaTime: number,
) {
    const positions = particles.geometry.attributes.position.array as Float32Array;
    const count = positions.length / 3;
    for (let i = 0; i < count; i++) {
        const idx = i * 3;
        positions[idx] += velocities[i].x * deltaTime;
        positions[idx + 1] += velocities[i].y * deltaTime;
        positions[idx + 2] += velocities[i].z * deltaTime;
        if (Math.abs(positions[idx]) > 11) positions[idx] = (Math.random() - 0.5) * 11;
        if (Math.abs(positions[idx + 1]) > 8) positions[idx + 1] = (Math.random() - 0.5) * 8;
        if (Math.abs(positions[idx + 2]) > 10) positions[idx + 2] = (Math.random() - 0.5) * 10;
    }
    particles.geometry.attributes.position.needsUpdate = true;
}

// --- 动态光照动画 ---
function animateLighting(t: number) {
    const rInt = 1.1 + Math.sin(t * 2.3) * 0.25;
    const bInt = 1.4 + Math.cos(t * 2.0) * 0.3;
    const redLight = scene.children.find((c) => c.name === "redLight") as THREE.PointLight;
    const blueLight = scene.children.find((c) => c.name === "blueLight") as THREE.PointLight;
    const redFill = scene.children.find((c) => c.name === "redFill") as THREE.PointLight;
    const blueFill = scene.children.find((c) => c.name === "blueFill") as THREE.PointLight;
    const dynamicGlow = scene.children.find((c) => c.name === "dynamicGlow") as THREE.PointLight;
    const rimLight = scene.children.find((c) => c.name === "rimLight") as THREE.PointLight;
    if (redLight) redLight.intensity = rInt;
    if (blueLight) blueLight.intensity = bInt;
    if (redFill) redFill.intensity = 0.6 + Math.sin(t * 1.8) * 0.2;
    if (blueFill) blueFill.intensity = 0.75 + Math.cos(t * 2.1) * 0.25;
    if (dynamicGlow) dynamicGlow.intensity = 0.55 + Math.sin(t * 3.5) * 0.25;
    if (rimLight) rimLight.intensity = 0.5 + Math.sin(t * 1.2) * 0.1;
}

// --- 核心球体脉冲动画 ---
function animateCorePulse(t: number) {
    if (!openingActive && coreMat && glowMat && coreSphere && glowSphere) {
        const pulseIntensity = 0.55 + Math.sin(t * 3.2) * 0.35;
        coreMat.emissiveIntensity = pulseIntensity;
        glowMat.emissiveIntensity = 0.3 + Math.sin(t * 2.8) * 0.15;
        const scaleVal = 1 + Math.sin(t * 4.5) * 0.006;
        coreSphere.scale.set(scaleVal, scaleVal, scaleVal);
        glowSphere.scale.set(scaleVal, scaleVal, scaleVal);
    }
}

// --- 平滑开场动画逻辑 ---
function updateSmoothOpening() {
    if (!openingActive) return;
    const now = performance.now() / 1000;
    let elapsed = now - startTime;
    let t = Math.min(1.0, elapsed / 2.0);
    const ease = 1 - Math.pow(1 - t, 3);

    if (ease > 0) {
        coreSphere.visible = true;
        glowSphere.visible = true;
        coreMat.emissiveIntensity = ease * 0.8;
        glowMat.emissiveIntensity = ease * 0.5;
        coreSphere.scale.setScalar(0.9 + ease * 0.1);
        glowSphere.scale.setScalar(0.9 + ease * 0.1);
    }

    (floatParticles.material as THREE.PointsMaterial).opacity = ease * 0.55;
    (redCloud.material as THREE.PointsMaterial).opacity = ease;
    (blueCloud.material as THREE.PointsMaterial).opacity = ease;
    (swarmParticles.material as THREE.PointsMaterial).opacity = ease * 0.85;
    (ringParticles.material as THREE.PointsMaterial).opacity = ease * 0.95;
    (dustRing.material as THREE.PointsMaterial).opacity = ease * 0.7;

    camera.position.lerpVectors(startCamPos, originalCamPos, ease);
    controls.target.set(0, 0, 0);
    controls.update();

    bloomPass.strength = 0.5 + ease * 0.22;

    if (t >= 1.0) {
        openingActive = false;
        bloomPass.strength = 0.72;
        coreMat.emissiveIntensity = 0.6;
        glowMat.emissiveIntensity = 0.4;
        coreSphere.scale.set(1, 1, 1);
        glowSphere.scale.set(1, 1, 1);
        controls.enabled = true;
    }
}

// 开场初始相机位置
const startCamPos = new THREE.Vector3(-15, 10, 10);

// --- 自定义缩放实现（仅当 Ctrl 键按下时生效）---
function setupCustomZoom(canvas: HTMLCanvasElement) {
    if (wheelHandler) {
        canvas.removeEventListener("wheel", wheelHandler);
    }

    wheelHandler = (e: WheelEvent) => {
        // 当按住 Ctrl 键 或 按住鼠标左键时，执行缩放
        const isCtrlPressed = e.ctrlKey;
        const isLeftButtonPressed = e.buttons === 1; // 左键按下状态

        if (isCtrlPressed || isLeftButtonPressed) {
            e.preventDefault(); // 阻止页面滚动
            e.stopPropagation();

            // 缩放步长系数
            const zoomSpeed = 0.05;
            const delta = e.deltaY > 0 ? 1 + zoomSpeed : 1 - zoomSpeed;

            // 获取相机到目标点的方向向量
            const direction = new THREE.Vector3()
                .subVectors(camera.position, controls.target)
                .normalize();
            const distance = camera.position.distanceTo(controls.target);
            const newDistance = Math.max(1.5, Math.min(12, distance * delta));

            // 更新相机位置
            camera.position.copy(
                controls.target.clone().add(direction.multiplyScalar(newDistance)),
            );
            controls.update();
        }
        // 否则无修饰键且未按住左键，滚轮事件自然冒泡，页面正常滚动
    };

    canvas.addEventListener("wheel", wheelHandler, { passive: false });
}

// --- 主循环 (动画更新) ---
let lastTime = 0;
function mainLoop() {
    const now = performance.now();
    let delta = Math.min(0.033, (now - lastTime) / 1000);
    lastTime = now;
    timeAcc += delta;

    if (openingActive) {
        updateSmoothOpening();
    } else if (controls) {
        controls.update();
    }

    animateLighting(timeAcc);
    animateCorePulse(timeAcc);

    // 更新自然漂浮粒子
    updateNaturalParticles(floatParticles, floatVelocity, delta);
    updateNaturalParticles(redCloud, redVel, delta);
    updateNaturalParticles(blueCloud, blueVel, delta);
    updateNaturalParticles(swarmParticles, swarmVel, delta);

    // 更新椭圆星环粒子
    updateVerticalInfinity(ringParticles, ringParams);
    updateVerticalInfinity(dustRing, dustParams);

    // 旋转背景星星
    stars.rotation.y += 0.00015;

    effectComposer.render();
    animationId = requestAnimationFrame(mainLoop);
}

// --- 窗口适配 ---
function onWindowResize() {
    if (camera && renderer && effectComposer) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        effectComposer.setSize(window.innerWidth, window.innerHeight);
    }
}

// --- 初始化 Three.js 场景 ---
function initThree() {
    if (!containerRef.value) return;

    // 场景
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x010118);
    scene.fog = new THREE.FogExp2(0x010118, 0.008);

    // 相机
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(4.5, 3, 6);
    originalCamPos = camera.position.clone();
    camera.lookAt(0, 0, 0);

    // 渲染器
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.toneMapping = THREE.ReinhardToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.shadowMap.enabled = true;
    containerRef.value.appendChild(renderer.domElement);

    // 控制器 (开场时禁用)
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 1.0;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.8;
    controls.enableZoom = false; // ⚠️ 关键：禁用默认滚轮缩放，改用自定义 Ctrl+滚轮
    controls.enablePan = true;
    controls.target.set(0, 0, 0);
    controls.enabled = false; // 开场动画期间禁用交互

    // ⚡ 设置自定义 Ctrl+滚轮缩放（无修饰键时滚动页面）
    setupCustomZoom(renderer.domElement);

    // 后期特效 Bloom
    const renderScene = new RenderPass(scene, camera);
    bloomPass = new UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        1.0,
        0.3,
        0.75,
    );
    bloomPass.threshold = 0.1;
    bloomPass.strength = 0.72;
    bloomPass.radius = 0.5;
    effectComposer = new EffectComposer(renderer);
    effectComposer.addPass(renderScene);
    effectComposer.addPass(bloomPass);

    // 光照系统 (添加 name 便于动态控制)
    const ambientLight = new THREE.AmbientLight(0x111122, 0.5);
    scene.add(ambientLight);

    const redLight = new THREE.PointLight(0xff3366, 1.2);
    redLight.position.set(-2.2, -1.5, 1.6);
    redLight.name = "redLight";
    scene.add(redLight);

    const redFill = new THREE.PointLight(0xff4433, 0.65);
    redFill.position.set(-1.4, -1.0, 1.2);
    redFill.name = "redFill";
    scene.add(redFill);

    const blueLight = new THREE.PointLight(0x33aaff, 1.5);
    blueLight.position.set(2.2, 2.0, 1.8);
    blueLight.name = "blueLight";
    scene.add(blueLight);

    const blueFill = new THREE.PointLight(0x33ccff, 0.8);
    blueFill.position.set(1.5, 1.6, 1.4);
    blueFill.name = "blueFill";
    scene.add(blueFill);

    const rimLight = new THREE.PointLight(0x88aaff, 0.5);
    rimLight.position.set(0, 1.0, -2.0);
    rimLight.name = "rimLight";
    scene.add(rimLight);

    const dynamicGlow = new THREE.PointLight(0x2299ff, 0.6);
    dynamicGlow.position.set(0.5, 0.2, 1.2);
    dynamicGlow.name = "dynamicGlow";
    scene.add(dynamicGlow);

    // 核心球体
    coreMat = new THREE.MeshStandardMaterial({
        color: 0x3399ff,
        emissive: 0x1166cc,
        emissiveIntensity: 0.6,
        metalness: 0.85,
        roughness: 0.25,
    });
    coreSphere = new THREE.Mesh(new THREE.SphereGeometry(0.48, 64, 64), coreMat);
    coreSphere.castShadow = true;
    coreSphere.visible = false;
    scene.add(coreSphere);

    glowMat = new THREE.MeshStandardMaterial({
        color: 0x44aaff,
        emissive: 0x2288ff,
        emissiveIntensity: 0.4,
        transparent: true,
        opacity: 0.25,
        side: THREE.BackSide,
    });
    glowSphere = new THREE.Mesh(new THREE.SphereGeometry(0.58, 48, 48), glowMat);
    glowSphere.visible = false;
    scene.add(glowSphere);

    // --- 粒子系统初始化 (纹理 + 几何体) ---
    const roundTexture = createRoundTexture();

    // 辅助创建粒子几何体
    const createColoredPoints = (
        count: number,
        bounds: { x: number; y: number; z: number },
        colorGen: () => THREE.Color,
        velRange = 0.2,
    ) => {
        const geom = new THREE.BufferGeometry();
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        const velocities: ParticleVelocity[] = [];
        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * bounds.x;
            positions[i * 3 + 1] = (Math.random() - 0.5) * bounds.y;
            positions[i * 3 + 2] = (Math.random() - 0.5) * bounds.z;
            const col = colorGen();
            colors[i * 3] = col.r;
            colors[i * 3 + 1] = col.g;
            colors[i * 3 + 2] = col.b;
            velocities.push({
                x: (Math.random() - 0.5) * velRange,
                y: (Math.random() - 0.5) * velRange,
                z: (Math.random() - 0.5) * velRange,
            });
        }
        geom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        geom.setAttribute("color", new THREE.BufferAttribute(colors, 3));
        return { geom, velocities };
    };

    // 背景漂浮粒子
    const floatRes = createColoredPoints(1800, { x: 14, y: 10, z: 12 }, getRainbowColor, 0.2);
    floatParticles = new THREE.Points(floatRes.geom, getParticleMaterial(0.028, 0));
    floatVelocity = floatRes.velocities;
    scene.add(floatParticles);

    // 红色云状区域
    const redRes = createColoredPoints(1000, { x: 5.2, y: 4.8, z: 4 }, getRainbowColor, 0.15);
    redCloud = new THREE.Points(redRes.geom, getParticleMaterial(0.026, 0));
    redVel = redRes.velocities;
    scene.add(redCloud);

    // 蓝色云状区域
    const blueRes = createColoredPoints(1000, { x: 5.8, y: 5.0, z: 4 }, getRainbowColor, 0.15);
    blueCloud = new THREE.Points(blueRes.geom, getParticleMaterial(0.026, 0));
    blueVel = blueRes.velocities;
    scene.add(blueCloud);

    // 穿梭粒子群
    const swarmRes = createColoredPoints(1400, { x: 8, y: 7, z: 7 }, getRainbowColor, 0.28);
    swarmParticles = new THREE.Points(swarmRes.geom, getParticleMaterial(0.03, 0));
    swarmVel = swarmRes.velocities;
    scene.add(swarmParticles);

    // 椭圆主星环 (渐变:内圈蓝紫->外圈红橙)
    const ringCount = 6000;
    const ringGeom = new THREE.BufferGeometry();
    const ringPositions = new Float32Array(ringCount * 3);
    const ringColors = new Float32Array(ringCount * 3);
    ringParams = [];
    const maxYamp = 0.48 * 0.25; // coreRadius * 0.25
    for (let i = 0; i < ringCount; i++) {
        const bSemis = 0.88 + Math.random() * 0.7;
        const aSemis = bSemis * 1.5;
        const speed = 0.55 + Math.random() * 0.7;
        const phaseOffset = Math.random() * Math.PI * 2;
        const yAmp = maxYamp * (0.85 + Math.random() * 0.3);
        const yThick = (Math.random() - 0.5) * 0.12;
        const radialJitterA = (Math.random() - 0.5) * 0.1;
        const radialJitterB = (Math.random() - 0.5) * 0.08;
        const radiusFactor = (bSemis - 0.88) / 0.7;
        ringParams.push({
            aSemis: aSemis + radialJitterA,
            bSemis: bSemis + radialJitterB,
            speed,
            phaseOffset,
            yAmp,
            yThick,
            radiusFactor,
        });
        const col = getGradientColor(radiusFactor);
        ringColors[i * 3] = col.r;
        ringColors[i * 3 + 1] = col.g;
        ringColors[i * 3 + 2] = col.b;
    }
    ringGeom.setAttribute("position", new THREE.BufferAttribute(ringPositions, 3));
    ringGeom.setAttribute("color", new THREE.BufferAttribute(ringColors, 3));
    ringParticles = new THREE.Points(ringGeom, getParticleMaterial(0.042, 0));
    scene.add(ringParticles);

    // 外层稀薄晕环
    const dustCount = 2800;
    const dustGeom = new THREE.BufferGeometry();
    const dustPositions = new Float32Array(dustCount * 3);
    const dustColors = new Float32Array(dustCount * 3);
    dustParams = [];
    for (let i = 0; i < dustCount; i++) {
        const bSemis = 1.3 + Math.random() * 0.65;
        const aSemis = bSemis * 1.5;
        const speed = 0.5 + Math.random() * 0.65;
        const phaseOffset = Math.random() * Math.PI * 2;
        const yAmp = maxYamp * (0.9 + Math.random() * 0.3);
        const yThick = (Math.random() - 0.5) * 0.14;
        const radialJitterA = (Math.random() - 0.5) * 0.12;
        const radialJitterB = (Math.random() - 0.5) * 0.1;
        const radiusFactor = (bSemis - 1.3) / 0.65;
        dustParams.push({
            aSemis: aSemis + radialJitterA,
            bSemis: bSemis + radialJitterB,
            speed,
            phaseOffset,
            yAmp,
            yThick,
            radiusFactor,
        });
        const col = getGradientColor(radiusFactor);
        dustColors[i * 3] = col.r;
        dustColors[i * 3 + 1] = col.g;
        dustColors[i * 3 + 2] = col.b;
    }
    dustGeom.setAttribute("position", new THREE.BufferAttribute(dustPositions, 3));
    dustGeom.setAttribute("color", new THREE.BufferAttribute(dustColors, 3));
    dustRing = new THREE.Points(dustGeom, getParticleMaterial(0.032, 0));
    scene.add(dustRing);

    // 静态背景星点
    const starCount = 2000;
    const starGeom = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
        starPositions[i * 3] = (Math.random() - 0.5) * 40;
        starPositions[i * 3 + 1] = (Math.random() - 0.5) * 30;
        starPositions[i * 3 + 2] = (Math.random() - 0.5) * 25 - 5;
    }
    starGeom.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    const starMat = new THREE.PointsMaterial({
        color: 0xaaccff,
        map: roundTexture,
        size: 0.022,
        transparent: true,
        opacity: 0.4,
        blending: THREE.AdditiveBlending,
    });
    stars = new THREE.Points(starGeom, starMat);
    scene.add(stars);

    // 开场动画时间记录
    startTime = performance.now() / 1000;
    openingActive = true;
    controls.enabled = false;

    // 启动动画循环
    lastTime = performance.now();
    animationId = requestAnimationFrame(mainLoop);

    // 定义上移距离
    const Y_OFFSET = 0.8;

    // 1. 创建 Group 并收集所有需要上移的物体
    const group = new THREE.Group();
    const objectsToMove = [
        coreSphere,
        glowSphere,
        floatParticles,
        redCloud,
        blueCloud,
        swarmParticles,
        ringParticles,
        dustRing,
        stars, // 可选，背景星星也可一起移动
    ];
    objectsToMove.forEach((obj) => {
        if (obj) scene.remove(obj); // 从场景中移除
        if (obj) group.add(obj); // 添加到 group
    });
    scene.add(group); // 将 group 加入场景
    group.position.y = Y_OFFSET; // 整体上移

    // 调整相机和目标点（保持视觉中心一致）
    camera.position.y += Y_OFFSET;
    originalCamPos.y += Y_OFFSET;
    startCamPos.y += Y_OFFSET; // 若有开场动画
    controls.target.set(0, Y_OFFSET, 0);
}

// --- 资源清理函数 ---
function disposeScene() {
    if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
    }
    window.removeEventListener("resize", onWindowResize);

    // 移除自定义滚轮监听
    if (renderer && renderer.domElement && wheelHandler) {
        renderer.domElement.removeEventListener("wheel", wheelHandler);
        wheelHandler = null;
    }

    if (controls) controls.dispose();
    if (renderer) {
        renderer.dispose();
        renderer.domElement.remove();
    }
    if (effectComposer) effectComposer = null!;
    // 可选：遍历场景递归 dispose 材质、几何体等，简化起见清除容器内容
    if (containerRef.value && renderer?.domElement) {
        containerRef.value.innerHTML = "";
    }
}

// --- Vue 生命周期挂载 ---
onMounted(() => {
    if (containerRef.value) {
        initThree();
        window.addEventListener("resize", onWindowResize);
    }
});

onBeforeUnmount(() => {
    disposeScene();
});
</script>

<style lang="scss">
.cover-wrap {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    overflow: hidden; // 避免滚动条出现、遮盖下方的文章列表
    /* 置于所有普通流内容下方 */
    // pointer-events: none;
    /* 建议设为 none，避免干扰点击 */
}
</style>
