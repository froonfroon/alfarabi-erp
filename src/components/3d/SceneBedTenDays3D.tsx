import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface SceneProps {
  dayCounter: number;
}

export const SceneBedTenDays3D: React.FC<SceneProps> = ({ dayCounter }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const bedMeshRef = useRef<THREE.Mesh | null>(null);
  const bedGlowRef = useRef<THREE.PointLight | null>(null);
  const ringMeshRef = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    const width = currentMount.clientWidth || 400;
    const height = currentMount.clientHeight || 300;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    camera.position.set(4, 3.5, 5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    currentMount.appendChild(renderer.domElement);

    // 2. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(5, 8, 5);
    scene.add(dirLight);

    const bedGlow = new THREE.PointLight(0x38bdf8, 2.5, 8);
    bedGlow.position.set(0, 1.2, 0);
    scene.add(bedGlow);
    bedGlowRef.current = bedGlow;

    // 3. Room Floor & Walls Grid
    const roomGroup = new THREE.Group();
    scene.add(roomGroup);

    const floorGeo = new THREE.PlaneGeometry(6, 6);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x070b1a,
      roughness: 0.8,
      metalness: 0.2,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.5;
    roomGroup.add(floor);

    // Grid Floor Overlay
    const gridHelper = new THREE.GridHelper(6, 12, 0x38bdf8, 0x1e293b);
    gridHelper.position.y = -0.49;
    roomGroup.add(gridHelper);

    // 4. The 3D Bed Frame & Mattress (The Target Bed)
    const bedGroup = new THREE.Group();
    roomGroup.add(bedGroup);

    // Bed Frame (Steel/Wood)
    const frameGeo = new THREE.BoxGeometry(1.6, 0.25, 2.4);
    const frameMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.8, roughness: 0.4 });
    const frame = new THREE.Mesh(frameGeo, frameMat);
    frame.position.y = -0.3;
    bedGroup.add(frame);

    // Bed Legs
    const legGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.4);
    const legMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.9 });
    const legPositions = [
      [-0.7, -0.4, -1.0],
      [0.7, -0.4, -1.0],
      [-0.7, -0.4, 1.0],
      [0.7, -0.4, 1.0],
    ];
    legPositions.forEach(([x, y, z]) => {
      const leg = new THREE.Mesh(legGeo, legMat);
      leg.position.set(x, y, z);
      bedGroup.add(leg);
    });

    // Mattress (The Active Target element with dynamic material)
    const mattressGeo = new THREE.BoxGeometry(1.45, 0.35, 2.2);
    const mattressMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      emissive: 0x0284c7,
      emissiveIntensity: 0.5,
      roughness: 0.3,
    });
    const mattress = new THREE.Mesh(mattressGeo, mattressMat);
    mattress.position.y = 0;
    bedGroup.add(mattress);
    bedMeshRef.current = mattress;

    // Pillow
    const pillowGeo = new THREE.BoxGeometry(1.1, 0.15, 0.5);
    const pillowMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0 });
    const pillow = new THREE.Mesh(pillowGeo, pillowMat);
    pillow.position.set(0, 0.25, -0.75);
    bedGroup.add(pillow);

    // 5. Status Holographic Aura Ring above Bed
    const ringGeo = new THREE.TorusGeometry(1.2, 0.03, 16, 60);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.8,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = 0.8;
    bedGroup.add(ring);
    ringMeshRef.current = ring;

    // 6. Neighboring Beds (Ghost/Occupied background context)
    const neighbor1 = bedGroup.clone();
    neighbor1.position.x = -2.3;
    roomGroup.add(neighbor1);

    const neighbor2 = bedGroup.clone();
    neighbor2.position.x = 2.3;
    roomGroup.add(neighbor2);

    // 7. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Gentle room rotation
      roomGroup.rotation.y = Math.sin(elapsedTime * 0.3) * 0.15;

      // Holographic Ring float & pulse
      if (ringMeshRef.current) {
        ringMeshRef.current.position.y = 0.8 + Math.sin(elapsedTime * 2.5) * 0.08;
        ringMeshRef.current.rotation.z += 0.015;
      }

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

  // Update dynamic colors based on dayCounter prop
  useEffect(() => {
    let colorHex = 0x38bdf8; // Default Cyan (Day 1-3)
    let emissiveHex = 0x0284c7;

    if (dayCounter > 3 && dayCounter <= 7) {
      colorHex = 0xf59e0b; // Amber (Day 4-7)
      emissiveHex = 0xd97706;
    } else if (dayCounter > 7 && dayCounter < 10) {
      colorHex = 0xf97316; // Orange (Day 8-9)
      emissiveHex = 0xea580c;
    } else if (dayCounter === 10) {
      colorHex = 0xf43f5e; // Rose/Red (Day 10)
      emissiveHex = 0xe11d48;
    }

    if (bedMeshRef.current) {
      (bedMeshRef.current.material as THREE.MeshStandardMaterial).color.setHex(colorHex);
      (bedMeshRef.current.material as THREE.MeshStandardMaterial).emissive.setHex(emissiveHex);
    }

    if (bedGlowRef.current) {
      bedGlowRef.current.color.setHex(colorHex);
    }

    if (ringMeshRef.current) {
      (ringMeshRef.current.material as THREE.MeshBasicMaterial).color.setHex(colorHex);
    }
  }, [dayCounter]);

  return (
    <div className="w-full h-full relative flex items-center justify-center">
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
      <div className="absolute top-2 right-2 text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-950/80 border border-slate-700 text-slate-300">
        3D TELEMETRY BED SENSOR
      </div>
    </div>
  );
};
