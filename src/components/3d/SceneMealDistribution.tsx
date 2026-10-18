import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const SceneMealDistribution: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth || 600;
    const height = mount.clientHeight || 380;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 4, 7);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const cyanLight = new THREE.PointLight(0x38bdf8, 2.5, 20);
    cyanLight.position.set(3, 5, 4);
    scene.add(cyanLight);

    const limeLight = new THREE.PointLight(0xa3e635, 2, 15);
    limeLight.position.set(-3, 3, 3);
    scene.add(limeLight);

    // Platform Table
    const tableGeo = new THREE.BoxGeometry(8, 0.2, 5);
    const tableMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.2,
      metalness: 0.8,
    });
    const table = new THREE.Mesh(tableGeo, tableMat);
    table.position.y = -0.1;
    scene.add(table);

    // Holographic Circular Dispenser Ring
    const ringGeo = new THREE.TorusGeometry(2.4, 0.03, 16, 80);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.6 });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = 0.05;
    scene.add(ring);

    // 3 Food Trays (Modern Stainless Steel Meal Trays with 3 Compartments)
    const traysGroup = new THREE.Group();
    scene.add(traysGroup);

    const trayConfigs = [
      { x: -2.0, z: 0, status: 'issued', label: 'تم الصرف' },
      { x: 0, z: 0.3, status: 'ready', label: 'جاهز للاستلام' },
      { x: 2.0, z: 0, status: 'planned', label: 'مخطط وردية تالية' },
    ];

    const trayMeshes: THREE.Mesh[] = [];

    trayConfigs.forEach((cfg) => {
      const trayG = new THREE.Group();
      trayG.position.set(cfg.x, 0.15, cfg.z);

      // Tray Base (Stainless steel look)
      const baseGeo = new THREE.BoxGeometry(1.6, 0.12, 1.2);
      const baseMat = new THREE.MeshStandardMaterial({
        color: 0x334155,
        metalness: 0.9,
        roughness: 0.1,
      });
      const base = new THREE.Mesh(baseGeo, baseMat);
      trayG.add(base);

      // Food Portions (stylized low-poly meals)
      // Main Dish
      const mainGeo = new THREE.BoxGeometry(0.7, 0.15, 0.9);
      const mainMat = new THREE.MeshStandardMaterial({
        color: cfg.status === 'issued' ? 0x0284c7 : cfg.status === 'ready' ? 0xa3e635 : 0x64748b,
        roughness: 0.4
      });
      const mainDish = new THREE.Mesh(mainGeo, mainMat);
      mainDish.position.set(-0.35, 0.1, 0);
      trayG.add(mainDish);

      // Side Dish 1 (Salad / Veg)
      const side1Geo = new THREE.BoxGeometry(0.5, 0.15, 0.4);
      const side1Mat = new THREE.MeshStandardMaterial({ color: 0x22c55e, roughness: 0.5 });
      const side1 = new THREE.Mesh(side1Geo, side1Mat);
      side1.position.set(0.4, 0.1, -0.25);
      trayG.add(side1);

      // Side Dish 2 (Fruit / Bread)
      const side2Geo = new THREE.BoxGeometry(0.5, 0.15, 0.4);
      const side2Mat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.5 });
      const side2 = new THREE.Mesh(side2Geo, side2Mat);
      side2.position.set(0.4, 0.1, 0.25);
      trayG.add(side2);

      // Status Halo above tray
      const haloGeo = new THREE.RingGeometry(0.4, 0.44, 32);
      const haloMat = new THREE.MeshBasicMaterial({
        color: cfg.status === 'issued' ? 0x0284c7 : cfg.status === 'ready' ? 0xa3e635 : 0x94a3b8,
        side: THREE.DoubleSide
      });
      const halo = new THREE.Mesh(haloGeo, haloMat);
      halo.rotation.x = -Math.PI / 2;
      halo.position.set(0, 0.8, 0);
      trayG.add(halo);

      traysGroup.add(trayG);
    });

    // Central Verification Scanner Laser Beam
    const scanGeo = new THREE.CylinderGeometry(0.015, 0.015, 2.5, 8);
    const scanMat = new THREE.MeshBasicMaterial({ color: 0xa3e635, transparent: true, opacity: 0.8 });
    const scanner = new THREE.Mesh(scanGeo, scanMat);
    scanner.position.set(0, 1.25, 0.3);
    scene.add(scanner);

    // Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Camera soft sway
      camera.position.x = Math.sin(time * 0.4) * 0.8;
      camera.lookAt(0, 0.2, 0);

      // Floating gentle hover for middle ready tray
      if (traysGroup.children[1]) {
        traysGroup.children[1].position.y = 0.15 + Math.sin(time * 2.5) * 0.04;
      }

      ring.rotation.z = time * 0.2;

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
      <div className="absolute top-3 left-4 pointer-events-none text-xs text-slate-300 bg-slate-900/80 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-lime-500/30 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse"></span>
        <span className="font-semibold text-lime-300">تحقق الاستحقاق: 1 عامل = 1 وجبة مصرحة</span>
      </div>
    </div>
  );
};
