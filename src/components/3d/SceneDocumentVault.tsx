import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const SceneDocumentVault: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth || 600;
    const height = mount.clientHeight || 400;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const cyanLight = new THREE.PointLight(0x38bdf8, 3, 20);
    cyanLight.position.set(4, 3, 5);
    scene.add(cyanLight);

    const limeLight = new THREE.PointLight(0xa3e635, 2, 15);
    limeLight.position.set(-4, -2, 4);
    scene.add(limeLight);

    // Main Card Group
    const cardGroup = new THREE.Group();
    scene.add(cardGroup);

    // Floating Holographic ID Card Slab
    const cardGeo = new THREE.BoxGeometry(3.6, 2.2, 0.08);
    const cardMat = new THREE.MeshPhysicalMaterial({
      color: 0x0f172a,
      emissive: 0x0369a1,
      emissiveIntensity: 0.35,
      roughness: 0.1,
      metalness: 0.8,
      transmission: 0.6,
      transparent: true,
      opacity: 0.9,
    });
    const cardMesh = new THREE.Mesh(cardGeo, cardMat);
    cardGroup.add(cardMesh);

    // Glowing Cyan Border
    const borderGeo = new THREE.EdgesGeometry(cardGeo);
    const borderMat = new THREE.LineBasicMaterial({ color: 0x38bdf8, linewidth: 2 });
    const border = new THREE.LineSegments(borderGeo, borderMat);
    cardGroup.add(border);

    // Holographic Photo Frame on Card
    const photoGeo = new THREE.PlaneGeometry(0.9, 1.1);
    const photoMat = new THREE.MeshBasicMaterial({
      color: 0x1e293b,
      side: THREE.DoubleSide,
    });
    const photo = new THREE.Mesh(photoGeo, photoMat);
    photo.position.set(1.1, 0.2, 0.05);
    cardGroup.add(photo);

    // Hologram Chip Mesh
    const chipGeo = new THREE.BoxGeometry(0.45, 0.35, 0.02);
    const chipMat = new THREE.MeshStandardMaterial({
      color: 0xa3e635,
      emissive: 0x65a30d,
      emissiveIntensity: 0.5,
      metalness: 0.9,
      roughness: 0.1
    });
    const chip = new THREE.Mesh(chipGeo, chipMat);
    chip.position.set(-1.1, 0.4, 0.05);
    cardGroup.add(chip);

    // 3 Floating Secure Documents orbiting the card
    const docs = [
      { name: 'البطاقة', color: 0x38bdf8, offset: 0 },
      { name: 'الفيش الجنائي', color: 0xa3e635, offset: (Math.PI * 2) / 3 },
      { name: 'عقد العمل', color: 0x8b5cf6, offset: (Math.PI * 4) / 3 },
    ];

    const docMeshes: THREE.Group[] = [];

    docs.forEach((doc) => {
      const g = new THREE.Group();
      const docSlabGeo = new THREE.BoxGeometry(1.0, 1.3, 0.04);
      const docSlabMat = new THREE.MeshStandardMaterial({
        color: 0x0b1329,
        emissive: doc.color,
        emissiveIntensity: 0.4,
        roughness: 0.2,
        metalness: 0.5,
        transparent: true,
        opacity: 0.85
      });
      const slab = new THREE.Mesh(docSlabGeo, docSlabMat);
      g.add(slab);

      const slabEdge = new THREE.LineSegments(
        new THREE.EdgesGeometry(docSlabGeo),
        new THREE.LineBasicMaterial({ color: doc.color })
      );
      g.add(slabEdge);

      scene.add(g);
      docMeshes.push(g);
    });

    // Laser Scanner Beam
    const laserGeo = new THREE.PlaneGeometry(3.6, 0.04);
    const laserMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.9,
    });
    const laser = new THREE.Mesh(laserGeo, laserMat);
    laser.position.z = 0.06;
    cardGroup.add(laser);

    // Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Card gentle floating tilt
      cardGroup.rotation.y = Math.sin(time * 0.8) * 0.22;
      cardGroup.rotation.x = Math.cos(time * 0.6) * 0.12;
      cardGroup.position.y = Math.sin(time * 1.2) * 0.1;

      // Laser scanning up and down
      laser.position.y = Math.sin(time * 2.5) * 0.9;

      // Orbiting documents
      const orbitR = 2.8;
      docs.forEach((doc, i) => {
        const angle = time * 0.5 + doc.offset;
        const mesh = docMeshes[i];
        mesh.position.x = Math.cos(angle) * orbitR;
        mesh.position.z = Math.sin(angle) * 1.5;
        mesh.position.y = Math.sin(angle * 2) * 0.5;
        mesh.rotation.y = -angle + Math.PI / 2;
      });

      renderer.render(scene, camera);
    };

    animate();

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
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[350px] flex items-center justify-center">
      <div ref={mountRef} className="w-full h-full" />
      <div className="absolute top-3 right-4 pointer-events-none text-xs text-slate-300 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-cyan-500/30 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
        <span className="font-mono text-cyan-300">Worker-ID: WRK-08412</span>
        <span className="text-slate-400">|</span>
        <span className="text-emerald-400 font-semibold">وثائق معتمدة ومطابقة</span>
      </div>
    </div>
  );
};
