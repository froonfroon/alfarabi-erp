import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { soundManager } from '../../utils/audio';

interface BedInfo {
  id: string;
  room: string;
  bedNum: number;
  workerName: string;
  workerId: string;
  status: 'occupied' | 'absent' | 'vacant' | 'reserved' | 'review';
  daysAbsent?: number;
}

export const SceneBedManagement: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedBed, setSelectedBed] = useState<BedInfo>({
    id: 'B-204-02',
    room: 'غرفة 204 - مبنى النخيل B',
    bedNum: 2,
    workerName: 'محمود عبد الرازق السيد',
    workerId: 'WRK-8924',
    status: 'absent',
    daysAbsent: 7,
  });

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth || 700;
    const height = mount.clientHeight || 450;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(7, 8, 9);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0x38bdf8, 2.5);
    dirLight.position.set(6, 12, 8);
    scene.add(dirLight);

    const pointLight = new THREE.PointLight(0xa3e635, 1.5, 20);
    pointLight.position.set(-5, 5, -3);
    scene.add(pointLight);

    // Base Floor / Platform
    const floorGeo = new THREE.BoxGeometry(9, 0.3, 7);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      metalness: 0.8,
      roughness: 0.3,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.position.y = -0.15;
    scene.add(floor);

    // Grid helper on floor
    const grid = new THREE.GridHelper(9, 12, 0x38bdf8, 0x1e293b);
    grid.position.y = 0.01;
    scene.add(grid);

    // Wall dividers (low glass partitions)
    const wallMat = new THREE.MeshPhysicalMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.25,
      roughness: 0.1,
      metalness: 0.1,
      transmission: 0.8,
    });

    const dividerGeo = new THREE.BoxGeometry(0.1, 1.2, 6.4);
    const divider1 = new THREE.Mesh(dividerGeo, wallMat);
    divider1.position.set(0, 0.6, 0);
    scene.add(divider1);

    const crossGeo = new THREE.BoxGeometry(8.4, 1.2, 0.1);
    const divider2 = new THREE.Mesh(crossGeo, wallMat);
    divider2.position.set(0, 0.6, 0);
    scene.add(divider2);

    // Beds Generation
    // 4 Rooms, each with 2 or 3 beds
    const bedsData: Array<BedInfo & { x: number; z: number }> = [
      // Room A (Upper Left)
      { id: 'B-201-01', room: 'غرفة 201', bedNum: 1, workerName: 'أحمد كمال الدين', workerId: 'WRK-1021', status: 'occupied', x: -3.2, z: -2 },
      { id: 'B-201-02', room: 'غرفة 201', bedNum: 2, workerName: 'إبراهيم حسن سالم', workerId: 'WRK-1022', status: 'occupied', x: -1.4, z: -2 },
      // Room B (Upper Right)
      { id: 'B-202-01', room: 'غرفة 202', bedNum: 1, workerName: 'شاغر جاهز للتسكين', workerId: '---', status: 'vacant', x: 1.4, z: -2 },
      { id: 'B-202-02', room: 'غرفة 202', bedNum: 2, workerName: 'حجز مؤقت معتمد', workerId: 'REQ-409', status: 'reserved', x: 3.2, z: -2 },
      // Room C (Lower Left)
      { id: 'B-203-01', room: 'غرفة 203', bedNum: 1, workerName: 'محمود عبد الرازق', workerId: 'WRK-8924', status: 'absent', daysAbsent: 7, x: -3.2, z: 2 },
      { id: 'B-203-02', room: 'غرفة 203', bedNum: 2, workerName: 'سامح فوزي مرسي', workerId: 'WRK-3341', status: 'occupied', x: -1.4, z: 2 },
      // Room D (Lower Right)
      { id: 'B-204-01', room: 'غرفة 204', bedNum: 1, workerName: 'ياسر محمد جاد', workerId: 'WRK-7719', status: 'review', daysAbsent: 10, x: 1.4, z: 2 },
      { id: 'B-204-02', room: 'غرفة 204', bedNum: 2, workerName: 'شاغر جاهز للتسكين', workerId: '---', status: 'vacant', x: 3.2, z: 2 },
    ];

    const bedMeshes: THREE.Group[] = [];
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const getStatusColor = (st: BedInfo['status']) => {
      switch (st) {
        case 'occupied': return 0x0284c7; // cyan blue
        case 'absent': return 0xf59e0b;   // amber warning
        case 'vacant': return 0x10b981;   // emerald green
        case 'reserved': return 0x8b5cf6; // purple
        case 'review': return 0xef4444;   // red alert
      }
    };

    bedsData.forEach((bed) => {
      const bedGroup = new THREE.Group();
      bedGroup.position.set(bed.x, 0, bed.z);
      bedGroup.userData = bed;

      // Bed Frame
      const frameGeo = new THREE.BoxGeometry(1.2, 0.35, 1.9);
      const frameMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.6 });
      const frame = new THREE.Mesh(frameGeo, frameMat);
      frame.position.y = 0.18;
      bedGroup.add(frame);

      // Mattress
      const matGeo = new THREE.BoxGeometry(1.1, 0.25, 1.8);
      const color = getStatusColor(bed.status);
      const mattressMat = new THREE.MeshStandardMaterial({
        color: color,
        emissive: color,
        emissiveIntensity: bed.status === 'absent' || bed.status === 'review' ? 0.6 : 0.2,
        roughness: 0.3
      });
      const mattress = new THREE.Mesh(matGeo, mattressMat);
      mattress.position.y = 0.38;
      bedGroup.add(mattress);

      // Pillow
      const pillowGeo = new THREE.BoxGeometry(0.8, 0.12, 0.4);
      const pillowMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.8 });
      const pillow = new THREE.Mesh(pillowGeo, pillowMat);
      pillow.position.set(0, 0.52, -0.6);
      bedGroup.add(pillow);

      // Status Beacon / Hologram Marker
      if (bed.status === 'absent' || bed.status === 'review') {
        const beaconGeo = new THREE.CylinderGeometry(0.08, 0.08, 1.2, 16);
        const beaconMat = new THREE.MeshBasicMaterial({
          color: bed.status === 'review' ? 0xef4444 : 0xf59e0b,
          transparent: true,
          opacity: 0.85
        });
        const beacon = new THREE.Mesh(beaconGeo, beaconMat);
        beacon.position.set(0, 1.1, 0);
        bedGroup.add(beacon);

        // Halo Ring
        const ringGeo = new THREE.TorusGeometry(0.4, 0.02, 8, 24);
        const ringMat = new THREE.MeshBasicMaterial({ color: beaconMat.color });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.rotation.x = Math.PI / 2;
        ring.position.set(0, 1.6, 0);
        bedGroup.add(ring);
      }

      scene.add(bedGroup);
      bedMeshes.push(bedGroup);
    });

    // Click handler for 3D beds
    const handleClick = (e: MouseEvent) => {
      const rect = mount.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(bedMeshes, true);

      if (intersects.length > 0) {
        let parent = intersects[0].object.parent;
        while (parent && !parent.userData.id && parent !== scene) {
          parent = parent.parent;
        }
        if (parent && parent.userData.id) {
          soundManager.playClick();
          setSelectedBed(parent.userData as BedInfo);
        }
      }
    };

    mount.addEventListener('click', handleClick);

    // Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Gentle camera sway
      camera.position.x = 7 + Math.sin(time * 0.25) * 0.5;
      camera.position.z = 9 + Math.cos(time * 0.25) * 0.5;
      camera.lookAt(0, 0.4, 0);

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
    <div className="relative w-full h-full min-h-[420px] rounded-2xl overflow-hidden flex flex-col justify-between">
      <div ref={mountRef} className="w-full h-[320px] cursor-pointer" />

      {/* Selected Bed Quick Inspection HUD */}
      <div className="p-4 bg-slate-900/80 backdrop-blur-xl border-t border-slate-700/60 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className={`w-3.5 h-3.5 rounded-full ${
            selectedBed.status === 'occupied' ? 'bg-cyan-400 shadow-[0_0_12px_#38bdf8]' :
            selectedBed.status === 'absent' ? 'bg-amber-400 shadow-[0_0_12px_#f59e0b]' :
            selectedBed.status === 'review' ? 'bg-rose-500 shadow-[0_0_12px_#f43f5e]' :
            selectedBed.status === 'reserved' ? 'bg-purple-400 shadow-[0_0_12px_#a855f7]' :
            'bg-emerald-400 shadow-[0_0_12px_#34d399]'
          }`} />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-white text-sm">{selectedBed.room}</span>
              <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-cyan-300 font-mono">{selectedBed.id}</span>
            </div>
            <div className="text-xs text-slate-300">الشاغل: <span className="text-slate-100 font-medium">{selectedBed.workerName}</span> ({selectedBed.workerId})</div>
          </div>
        </div>

        {selectedBed.status === 'absent' && (
          <div className="flex items-center gap-3 bg-amber-950/40 border border-amber-600/40 px-3 py-1.5 rounded-lg">
            <div className="text-right">
              <div className="text-[11px] text-amber-300 font-bold">تطبيق سياسة الـ 10 أيام</div>
              <div className="text-xs text-amber-200">غياب: {selectedBed.daysAbsent} أيام | المتبقي للإنذار: {10 - (selectedBed.daysAbsent || 0)} أيام</div>
            </div>
            <div className="w-9 h-9 rounded-full border-2 border-amber-400 flex items-center justify-center font-bold text-amber-300 text-xs">
              {selectedBed.daysAbsent}/10
            </div>
          </div>
        )}

        {selectedBed.status === 'review' && (
          <div className="bg-rose-950/50 border border-rose-500/50 px-3 py-1.5 rounded-lg text-rose-300 text-xs flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
            <span>تجاوز 10 أيام غياب - معلق بانتظار اعتماد مدير العمليات</span>
          </div>
        )}

        <div className="text-xs text-slate-400 flex items-center gap-3">
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-cyan-400"></span> مشغول</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-amber-400"></span> غائب مؤقتًا</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-emerald-400"></span> شاغر</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-purple-400"></span> محجوز</span>
        </div>
      </div>
    </div>
  );
};
