import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

export const SceneSecurityShield3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    const width = currentMount.clientWidth || 400;
    const height = currentMount.clientHeight || 350;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    currentMount.appendChild(renderer.domElement);

    // 2. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x38bdf8, 3, 50);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const purpleLight = new THREE.PointLight(0xa855f7, 2.5, 50);
    purpleLight.position.set(-5, -3, 3);
    scene.add(purpleLight);

    const limeLight = new THREE.PointLight(0xa3e635, 2, 50);
    limeLight.position.set(0, 4, -2);
    scene.add(limeLight);

    // 3. Central Security Vault / Holographic Core (Icosahedron + Wireframe)
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    const coreGeo = new THREE.IcosahedronGeometry(1.6, 1);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x0c1b33,
      metalness: 0.9,
      roughness: 0.2,
      emissive: 0x0369a1,
      emissiveIntensity: 0.4,
      wireframe: false,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreGroup.add(coreMesh);

    // Wireframe Glow Shell
    const wireGeo = new THREE.IcosahedronGeometry(1.68, 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    coreGroup.add(wireMesh);

    // 4. Concentric Orbital Defense Rings (RBAC / Encryption / Audit)
    const ringsGroup = new THREE.Group();
    scene.add(ringsGroup);

    const createRing = (radius: number, color: number, tiltX: number, tiltY: number) => {
      const ringGeo = new THREE.TorusGeometry(radius, 0.04, 16, 100);
      const ringMat = new THREE.MeshStandardMaterial({
        color,
        emissive: color,
        emissiveIntensity: 0.7,
        metalness: 0.8,
        roughness: 0.2,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = tiltX;
      ringMesh.rotation.y = tiltY;
      ringsGroup.add(ringMesh);
      return ringMesh;
    };

    const ring1 = createRing(2.4, 0x38bdf8, Math.PI / 3, 0); // Cyan Ring (OAuth 2.0)
    const ring2 = createRing(2.8, 0xa3e635, -Math.PI / 4, Math.PI / 6); // Lime Ring (RBAC Roles)
    const ring3 = createRing(3.2, 0xc084fc, Math.PI / 6, -Math.PI / 4); // Purple Ring (AES-256 Vault)

    // 5. Orbiting Security Nodes (Representing Super Admin, Camp Manager, Field Scanner, Auditor)
    const nodesGroup = new THREE.Group();
    scene.add(nodesGroup);

    const nodeColors = [0x38bdf8, 0xa3e635, 0xf59e0b, 0xc084fc];
    const nodeMeshes: THREE.Mesh[] = [];

    for (let i = 0; i < 4; i++) {
      const nodeGeo = new THREE.OctahedronGeometry(0.3, 0);
      const nodeMat = new THREE.MeshStandardMaterial({
        color: nodeColors[i],
        emissive: nodeColors[i],
        emissiveIntensity: 0.8,
        metalness: 0.8,
      });
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      nodesGroup.add(nodeMesh);
      nodeMeshes.push(nodeMesh);
    }

    // 6. Floating Particles
    const particleCount = 120;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 12;
      particlePositions[i + 1] = (Math.random() - 0.5) * 12;
      particlePositions[i + 2] = (Math.random() - 0.5) * 8;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.08,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 7. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Core rotation
      coreGroup.rotation.y = elapsedTime * 0.35;
      coreGroup.rotation.x = Math.sin(elapsedTime * 0.2) * 0.15;

      // Defense Rings Counter-rotation
      ring1.rotation.z = elapsedTime * 0.4;
      ring2.rotation.z = -elapsedTime * 0.35;
      ring3.rotation.z = elapsedTime * 0.25;

      // Orbiting security nodes position
      for (let i = 0; i < 4; i++) {
        const angle = elapsedTime * 0.8 + (i * Math.PI) / 2;
        const radius = 2.6 + Math.sin(elapsedTime + i) * 0.2;
        nodeMeshes[i].position.x = Math.cos(angle) * radius;
        nodeMeshes[i].position.y = Math.sin(angle) * radius * 0.6;
        nodeMeshes[i].position.z = Math.sin(angle * 1.5) * 1.2;
        nodeMeshes[i].rotation.x += 0.02;
        nodeMeshes[i].rotation.y += 0.03;
      }

      // Particles gentle drift
      particles.rotation.y = elapsedTime * 0.04;

      renderer.render(scene, camera);
    };

    animate();

    // 8. Resize Handler
    const handleResize = () => {
      if (!currentMount) return;
      const newWidth = currentMount.clientWidth;
      const newHeight = currentMount.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="w-full h-full relative flex items-center justify-center">
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
      <div className="absolute bottom-2 text-center text-[10px] text-cyan-400 font-mono tracking-wider bg-slate-950/80 px-2.5 py-1 rounded-full border border-cyan-500/30">
        SECURITY ENGINE 3D: RBAC & ZERO-TRUST VAULT
      </div>
    </div>
  );
};
