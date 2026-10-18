import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { soundManager } from '../../utils/audio';

export const SceneTransportationFleet: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeBus, setActiveBus] = useState<{ id: string; name: string; capacity: number; assigned: number; route: string; status: string }>({
    id: 'BUS-01',
    name: 'أتوبيس 1 - خط وردية السويس',
    capacity: 50,
    assigned: 48,
    route: 'سكن النخيل -> مصنع القطاع أ',
    status: 'جاهز للإقلاع (96% إشغال)',
  });

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth || 700;
    const height = mount.clientHeight || 400;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(6, 6, 8);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0x38bdf8, 2.5);
    dirLight.position.set(5, 10, 5);
    scene.add(dirLight);

    const purpleLight = new THREE.PointLight(0x8b5cf6, 2, 20);
    purpleLight.position.set(-6, 3, -4);
    scene.add(purpleLight);

    // Terminal Asphalt Base
    const roadGeo = new THREE.BoxGeometry(10, 0.2, 7);
    const roadMat = new THREE.MeshStandardMaterial({
      color: 0x090d16,
      roughness: 0.8,
      metalness: 0.2,
    });
    const road = new THREE.Mesh(roadGeo, roadMat);
    road.position.y = -0.1;
    scene.add(road);

    // Road Lane markings
    const lineGeo = new THREE.BoxGeometry(0.12, 0.02, 6.2);
    const lineMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.6 });
    for (let x of [-2.4, 0, 2.4]) {
      const l = new THREE.Mesh(lineGeo, lineMat);
      l.position.set(x, 0.02, 0);
      scene.add(l);
    }

    // Bus Data
    const busesData = [
      { id: 'BUS-01', name: 'أتوبيس 1 - خط وردية السويس', capacity: 50, assigned: 48, route: 'سكن النخيل -> مصنع القطاع أ', status: 'جاهز للإقلاع (96% إشغال)', x: -2.4, z: 0.5, color: 0x0284c7 },
      { id: 'BUS-02', name: 'أتوبيس 2 - خط وردية العاشر', capacity: 50, assigned: 45, route: 'سكن الياسمين -> ورش الصيانة', status: 'جاهز للإقلاع (90% إشغال)', x: 0, z: -0.8, color: 0x0284c7 },
      { id: 'BUS-03', name: 'أتوبيس 3 - خط وردية المساء', capacity: 32, assigned: 12, route: 'القطاع ج -> المجمع السكني', status: 'تنبيه: دمج مقترح لمنع الهدر', x: 2.4, z: 0.2, color: 0xf59e0b },
    ];

    const busMeshes: THREE.Group[] = [];

    busesData.forEach((bus) => {
      const busGroup = new THREE.Group();
      busGroup.position.set(bus.x, 0, bus.z);
      busGroup.userData = bus;

      // Bus Main Body
      const bodyGeo = new THREE.BoxGeometry(1.4, 1.2, 3.4);
      const bodyMat = new THREE.MeshStandardMaterial({
        color: 0x0f172a,
        metalness: 0.7,
        roughness: 0.2,
      });
      const body = new THREE.Mesh(bodyGeo, bodyMat);
      body.position.y = 0.8;
      busGroup.add(body);

      // Glass Windshield & Windows
      const winGeo = new THREE.BoxGeometry(1.44, 0.5, 3.2);
      const winMat = new THREE.MeshPhysicalMaterial({
        color: bus.color,
        transmission: 0.8,
        transparent: true,
        opacity: 0.8,
        roughness: 0.1,
      });
      const win = new THREE.Mesh(winGeo, winMat);
      win.position.y = 1.05;
      busGroup.add(win);

      // Headlights & Tail Lights
      const headlightGeo = new THREE.BoxGeometry(0.3, 0.15, 0.05);
      const headlightMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
      const hl1 = new THREE.Mesh(headlightGeo, headlightMat);
      hl1.position.set(-0.45, 0.5, -1.72);
      busGroup.add(hl1);
      const hl2 = new THREE.Mesh(headlightGeo, headlightMat);
      hl2.position.set(0.45, 0.5, -1.72);
      busGroup.add(hl2);

      // Tail lights (red)
      const tailMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
      const tl1 = new THREE.Mesh(headlightGeo, tailMat);
      tl1.position.set(-0.45, 0.5, 1.72);
      busGroup.add(tl1);
      const tl2 = new THREE.Mesh(headlightGeo, tailMat);
      tl2.position.set(0.45, 0.5, 1.72);
      busGroup.add(tl2);

      // Wheels
      const wheelGeo = new THREE.CylinderGeometry(0.28, 0.28, 0.2, 16);
      const wheelMat = new THREE.MeshStandardMaterial({ color: 0x050505, roughness: 0.9 });
      const wheelPositions = [
        [-0.75, 0.28, -1.1],
        [0.75, 0.28, -1.1],
        [-0.75, 0.28, 1.1],
        [0.75, 0.28, 1.1],
      ];
      wheelPositions.forEach(([wx, wy, wz]) => {
        const w = new THREE.Mesh(wheelGeo, wheelMat);
        w.rotation.z = Math.PI / 2;
        w.position.set(wx, wy, wz);
        busGroup.add(w);
      });

      // Roof Beacon Antenna
      const beaconGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.4, 8);
      const beaconMat = new THREE.MeshBasicMaterial({ color: bus.color });
      const beacon = new THREE.Mesh(beaconGeo, beaconMat);
      beacon.position.set(0, 1.6, 0);
      busGroup.add(beacon);

      scene.add(busGroup);
      busMeshes.push(busGroup);
    });

    // Raycaster for click interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleClick = (e: MouseEvent) => {
      const rect = mount.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(busMeshes, true);

      if (intersects.length > 0) {
        let parent = intersects[0].object.parent;
        while (parent && !parent.userData.id && parent !== scene) {
          parent = parent.parent;
        }
        if (parent && parent.userData.id) {
          soundManager.playClick();
          setActiveBus(parent.userData as typeof activeBus);
        }
      }
    };

    mount.addEventListener('click', handleClick);

    // Animation loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Camera soft sway
      camera.position.x = 6 + Math.sin(time * 0.3) * 0.4;
      camera.position.z = 8 + Math.cos(time * 0.3) * 0.4;
      camera.lookAt(0, 0.5, 0);

      // Gentle engine vibration
      busMeshes.forEach((mesh, idx) => {
        mesh.position.y = Math.sin(time * 8 + idx) * 0.015;
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      mount.removeEventListener('click', handleClick);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[380px] rounded-2xl overflow-hidden flex flex-col justify-between">
      <div ref={mountRef} className="w-full h-[280px] cursor-pointer" />

      {/* Selected Bus Inspection Card */}
      <div className="p-3.5 bg-slate-900/85 backdrop-blur-xl border-t border-slate-700/60 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-white text-sm">{activeBus.name}</span>
            <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 font-mono border border-cyan-800/50">{activeBus.id}</span>
          </div>
          <div className="text-slate-300 mt-0.5">المسار: <span className="text-slate-100 font-medium">{activeBus.route}</span></div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-slate-400">الحمولة المقررة:</div>
            <div className="font-bold text-cyan-300 text-sm">{activeBus.assigned} / {activeBus.capacity} راكب</div>
          </div>

          <div className={`px-3 py-1.5 rounded-lg border font-semibold ${
            activeBus.id === 'BUS-03'
              ? 'bg-amber-950/50 border-amber-500/40 text-amber-300'
              : 'bg-emerald-950/50 border-emerald-500/40 text-emerald-300'
          }`}>
            {activeBus.status}
          </div>
        </div>
      </div>
    </div>
  );
};
