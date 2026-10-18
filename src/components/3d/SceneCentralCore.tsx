import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface SceneCentralCoreProps {
  activeModule?: number; // 0: all, 1: Docs, 2: Accom, 3: Food, 4: Transport
  interactive?: boolean;
}

export const SceneCentralCore: React.FC<SceneCentralCoreProps> = ({ activeModule = 0, interactive = true }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth || 800;
    const height = mount.clientHeight || 500;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 1.5, 9);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // Ambient & Point Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const cyanLight = new THREE.PointLight(0x38bdf8, 3, 20);
    cyanLight.position.set(3, 4, 4);
    scene.add(cyanLight);

    const purpleLight = new THREE.PointLight(0x8b5cf6, 3, 20);
    purpleLight.position.set(-3, -2, 3);
    scene.add(purpleLight);

    const limeLight = new THREE.PointLight(0xa3e635, 2, 15);
    limeLight.position.set(0, 3, -3);
    scene.add(limeLight);

    // Central Core Group
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // Central Core: Glowing Icosahedron & Wireframe Cage
    const coreGeo = new THREE.IcosahedronGeometry(1.3, 1);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: 0x0c1e3d,
      emissive: 0x0284c7,
      emissiveIntensity: 0.6,
      roughness: 0.1,
      metalness: 0.8,
      wireframe: false,
      transparent: true,
      opacity: 0.88,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreGroup.add(coreMesh);

    // Wireframe Outer Shell
    const wireGeo = new THREE.IcosahedronGeometry(1.6, 2);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    coreGroup.add(wireMesh);

    // Orbital Rings
    const ring1Geo = new THREE.TorusGeometry(2.3, 0.025, 16, 100);
    const ring1Mat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.6 });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 2.5;
    coreGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(2.8, 0.02, 16, 100);
    const ring2Mat = new THREE.MeshBasicMaterial({ color: 0xa3e635, transparent: true, opacity: 0.5 });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = -Math.PI / 3;
    ring2.rotation.y = Math.PI / 6;
    coreGroup.add(ring2);

    // 4 Satellite Pillar Nodes
    const nodeConfigs = [
      { name: 'الوثائق', color: 0x38bdf8, angle: 0 },
      { name: 'السكن', color: 0xa3e635, angle: Math.PI / 2 },
      { name: 'التغذية', color: 0xf59e0b, angle: Math.PI },
      { name: 'النقل', color: 0x8b5cf6, angle: (3 * Math.PI) / 2 }
    ];

    const nodesGroup = new THREE.Group();
    coreGroup.add(nodesGroup);

    const satelliteMeshes: THREE.Mesh[] = [];
    const orbitRadius = 3.6;

    nodeConfigs.forEach((cfg, idx) => {
      const nodeGeo = new THREE.OctahedronGeometry(0.42, 0);
      const isHighlighted = activeModule === 0 || activeModule === (idx + 1);
      const nodeMat = new THREE.MeshStandardMaterial({
        color: cfg.color,
        emissive: cfg.color,
        emissiveIntensity: isHighlighted ? 0.9 : 0.2,
        metalness: 0.7,
        roughness: 0.2
      });
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      const x = Math.cos(cfg.angle) * orbitRadius;
      const z = Math.sin(cfg.angle) * orbitRadius;
      nodeMesh.position.set(x, 0, z);
      nodesGroup.add(nodeMesh);
      satelliteMeshes.push(nodeMesh);

      // Connecting luminous beam line to center
      const lineGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(x, 0, z)
      ]);
      const lineMat = new THREE.LineBasicMaterial({
        color: cfg.color,
        transparent: true,
        opacity: isHighlighted ? 0.75 : 0.25
      });
      const line = new THREE.Line(lineGeo, lineMat);
      nodesGroup.add(line);
    });

    // Particle Cloud of Data Packets
    const particleCount = 180;
    const particleGeo = new THREE.BufferGeometry();
    const posArray = new Float32Array(particleCount * 3);
    const colorArray = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const radius = 1.8 + Math.random() * 3.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;

      posArray[i * 3] = radius * Math.cos(phi) * Math.cos(theta);
      posArray[i * 3 + 1] = radius * Math.sin(phi);
      posArray[i * 3 + 2] = radius * Math.cos(phi) * Math.sin(theta);

      // Alternate cyan, lime and purple
      const c = i % 3 === 0 ? new THREE.Color(0x38bdf8) : (i % 3 === 1 ? new THREE.Color(0xa3e635) : new THREE.Color(0x8b5cf6));
      colorArray[i * 3] = c.r;
      colorArray[i * 3 + 1] = c.g;
      colorArray[i * 3 + 2] = c.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      transparent: true,
      opacity: 0.85
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    coreGroup.add(particles);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      const rect = mount.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    };

    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth camera parallax
      targetX += (mouseX * 0.8 - targetX) * 0.05;
      targetY += (mouseY * 0.5 - targetY) * 0.05;
      camera.position.x = targetX * 1.5;
      camera.position.y = 1.5 + targetY * 0.8;
      camera.lookAt(0, 0, 0);

      // Rotations
      coreMesh.rotation.y = elapsedTime * 0.35;
      coreMesh.rotation.x = elapsedTime * 0.15;

      wireMesh.rotation.y = -elapsedTime * 0.2;
      wireMesh.rotation.z = elapsedTime * 0.1;

      ring1.rotation.z = elapsedTime * 0.4;
      ring2.rotation.z = -elapsedTime * 0.3;

      nodesGroup.rotation.y = elapsedTime * 0.18;

      satelliteMeshes.forEach((mesh, idx) => {
        mesh.rotation.y = elapsedTime * 0.8 + idx;
        mesh.rotation.x = elapsedTime * 0.5;
      });

      particles.rotation.y = -elapsedTime * 0.09;

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (interactive) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [activeModule, interactive]);

  return (
    <div className="relative w-full h-full min-h-[380px] flex items-center justify-center overflow-hidden">
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
      <div className="absolute bottom-3 left-4 pointer-events-none text-xs text-slate-400 bg-slate-900/60 backdrop-blur-md px-3 py-1 rounded-full border border-slate-700/50 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
        <span>نموذج 3D تفاعلي للقلب الرقمي ERP</span>
      </div>
    </div>
  );
};
