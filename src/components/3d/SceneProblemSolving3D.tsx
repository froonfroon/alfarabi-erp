import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { soundManager } from '../../utils/audio';
import { useLanguage } from '../../context/LanguageContext';
import { 
  AlertTriangle, 
  CheckCircle2, 
  ShieldCheck, 
  FileSpreadsheet, 
  Home, 
  Utensils, 
  Bus, 
  Lock, 
  Sparkles,
  Zap,
  TrendingUp,
  RefreshCw,
  Eye
} from 'lucide-react';

export type PillarKey = 'docs' | 'housing' | 'catering' | 'transit' | 'governance';

export interface ProblemSolutionDetail {
  id: PillarKey;
  titleAr: string;
  titleEn: string;
  icon: typeof FileSpreadsheet;
  color: string;
  threeColor: number;
  position: [number, number, number];
  
  // The Friction / Legacy Problem
  problemAr: string;
  problemEn: string;
  problemRootAr: string;
  problemRootEn: string;
  problemCostAr: string;
  problemCostEn: string;
  
  // The Alfarabi Advanced 3D Solution
  solutionAr: string;
  solutionEn: string;
  solutionTechAr: string;
  solutionTechEn: string;
  solutionRoiAr: string;
  solutionRoiEn: string;
  
  // Live KPI metrics
  metricBefore: string;
  metricAfter: string;
  metricLabelAr: string;
  metricLabelEn: string;
}

export const PILLARS_DATA: Record<PillarKey, ProblemSolutionDetail> = {
  docs: {
    id: 'docs',
    titleAr: 'أرشيف وهوية العمالة',
    titleEn: 'Workforce ID & Dossiers',
    icon: FileSpreadsheet,
    color: '#06b6d4', // cyan
    threeColor: 0x06b6d4,
    position: [-3.4, 0.9, -1.6],
    problemAr: 'أوراق مبعثرة، فيشات جنائية منتهية، وفقدان ملفات العمالة وتعدد الأرقام الوهمية.',
    problemEn: 'Scattered paper files, expired security clearances, lost dossiers, and duplicate phantom identities.',
    problemRootAr: 'الاعتماد على أرشيف ورقي وشيتات إكسيل فردية غير محمية وغياب التنبيه الآلي.',
    problemRootEn: 'Reliance on fragile paper archives and unsecured spreadsheets with zero predictive alerts.',
    problemCostAr: 'غرامات امتثال متكررة، تأخير استخراج التصاريح، ومخاطر قانونية بالغة.',
    problemCostEn: 'Compounding compliance fines, weeks of clearance delays, and severe audit liabilities.',
    solutionAr: 'خزانة رقمية مشفرة برقم موحد (Worker ID) مع تدقيق بيومتري وتنبيه تلقائي قبل 30 يوماً.',
    solutionEn: 'Zero-Knowledge Encrypted Vault keyed to unique canonical Worker ID with automated 30-day alerts.',
    solutionTechAr: 'تشفير AES-256 + فحص تطابق الوثائق بالذكاء الاصطناعي + ربط آلي بملف الإقامة.',
    solutionTechEn: 'AES-256 vaulting + automated AI document validation + live residency cross-checks.',
    solutionRoiAr: '100% نسبة الامتثال + خفض وقت البحث عن الملفات من 3 أيام إلى 2 ثانية.',
    solutionRoiEn: '100% Legal compliance + record retrieval slashed from 3 days to under 2 seconds.',
    metricBefore: '3 أيام بحث يدوي',
    metricAfter: '0.8 ثانية استرجاع',
    metricLabelAr: 'زمن الوصول للملف',
    metricLabelEn: 'Dossier Retrieval Time',
  },
  housing: {
    id: 'housing',
    titleAr: 'السكنات والأسرة الوهمية',
    titleEn: 'Camp Housing & Ghost Beds',
    icon: Home,
    color: '#84cc16', // lime
    threeColor: 0x84cc16,
    position: [3.4, 0.9, -1.6],
    problemAr: 'أسرة محجوزة وهمياً لعمال مسافرين أو متغيبين، ودفع إيجارات باهظة لغرف خالية فعلياً.',
    problemEn: 'Ghost beds reserved for departed or absent workers, funding rental leases for empty rooms.',
    problemRootAr: 'انقطاع الاتصال بين مشرف السكن وإدارة الموارد البشرية، وغياب جرد الأسرة الميداني.',
    problemRootEn: 'Total telemetry disconnection between camp supervisors and HR; zero live vacancy tracking.',
    problemCostAr: 'هدر سنوي يتجاوز 18-25% من ميزانية عقود إيجار السكنات العمالية.',
    problemCostEn: '18% to 25% annual capital leakage directly wasted on leased phantom bunks.',
    solutionAr: 'نظام إدارة الأسرة ثلاثي الأبعاد مع تطبيق قاعدة الـ 10 أيام للإخلاء الآلي التلقائي.',
    solutionEn: 'Spatial 3D Bed Matrix with automated 10-Day Retention & auto-release vacation policy.',
    solutionTechAr: 'حساسية التواجد + خوارزمية إخلاء آلي وإشعار HR فوري وتسكين البديل الذكي.',
    solutionTechEn: 'Presence telemetry + automated bed release algorithm + instant re-allocation dispatch.',
    solutionRoiAr: 'توفير 28% من تكاليف استئجار السكنات + استرداد 100% من الأسرة المهدرة.',
    solutionRoiEn: '28% Camp lease expenditure recovered + 100% phantom bed elimination.',
    metricBefore: '22% أسرة مهدرة',
    metricAfter: '0% أسرة وهمية',
    metricLabelAr: 'نسبة الهدر في الأسرة',
    metricLabelEn: 'Bed Capacity Leakage',
  },
  catering: {
    id: 'catering',
    titleAr: 'الإعاشة والهدر الغذائي',
    titleEn: 'Catering & Food Governance',
    icon: Utensils,
    color: '#f59e0b', // amber
    threeColor: 0xf59e0b,
    position: [3.6, 0.9, 1.8],
    problemAr: 'طبخ مئات الوجبات الإضافية يومياً بناءً على تخمين شفهي وسوء تقدير المشرفين.',
    problemEn: 'Cooking hundreds of excess meals daily based on verbal guesses and arbitrary orders.',
    problemRootAr: 'المطبخ يطبخ للعدد الكلي المسجل في الدفاتر دون معرفة من غادر أو من في إجازة.',
    problemRootEn: 'Kitchen cooks for total roster headcount blind to actual shift presence or sick leaves.',
    problemCostAr: 'رمي أطنان من الوجبات الجاهزة يومياً وتكاليف تموين باهظة تُسدد لمقاولي الإعاشة.',
    problemCostEn: 'Tons of food discarded daily; astronomical catering invoices paid without accountability.',
    solutionAr: 'حوكمة الحصة الواحدة (1 عامل = 1 وجبة) برمز QR/باركود متزامن مع بوابات الحضور.',
    solutionEn: 'Strict 1-Worker-1-Meal digital token governance linked directly to gate turnstiles.',
    solutionTechAr: 'تكامل فوري بين بصمة الحضور وأوامر الطبخ في المطبخ قبل التجهيز بـ 3 ساعات.',
    solutionTechEn: 'Real-time sync between gate presence and kitchen cooking batches 3h prior to prep.',
    solutionRoiAr: 'إيقاف 100% من الوجبات المكررة + خفض فاتورة التغذية بنسبة 22%.',
    solutionRoiEn: '100% Duplicate meal suppression + 22% net catering cost savings.',
    metricBefore: '350 وجبة تُرمى يومياً',
    metricAfter: '0 وجبة مهدرة',
    metricLabelAr: 'معدل الهدر اليومي',
    metricLabelEn: 'Daily Discarded Meals',
  },
  transit: {
    id: 'transit',
    titleAr: 'أسطول النقل والأتوبيسات',
    titleEn: 'Fleet Transit & Dispatch',
    icon: Bus,
    color: '#38bdf8', // sky
    threeColor: 0x38bdf8,
    position: [-3.6, 0.9, 1.8],
    problemAr: 'أتوبيسات تتحرك بـ 20% فقط من طاقتها الاستيعابية، وخطوط سير مكررة واستهلاك وقود عشوائي.',
    problemEn: 'Buses departing at 20% capacity, overlapping routes, unmonitored deadheading, and fuel waste.',
    problemRootAr: 'جداول تحرك ثابتة لا تتكيف مع الغيابات الفعلية أو انتهاء مناوبات الورديات.',
    problemRootEn: 'Rigid static timetables unresponsive to shift fluctuations, absenteeism, or route density.',
    problemCostAr: 'تكاليف صيانة باهظة، هدر سولار، ودفع قيمة استئجار حافلات فائضة بلا مبرر.',
    problemCostEn: 'Excessive fuel and charter bus lease costs running under-utilized vehicles.',
    solutionAr: 'توجيه ديناميكي للأسطول (Dynamic Dispatch) ودمج حمولات الركاب وفق الحضور الفعلي.',
    solutionEn: 'AI Capacity Balancing & Dynamic Dispatching consolidating loads based on live rosters.',
    solutionTechAr: 'خوارزمية دمج المسارات الآلية + تتبع أجهزة GPS + إخطار السائقين الذكي.',
    solutionTechEn: 'Dynamic route consolidation heuristics + GPS geofencing + digital driver manifests.',
    solutionRoiAr: 'رفع نسبة إشغال الأتوبيسات إلى 92% + خفض أسطول الحافلات المستأجرة بنسبة 30%.',
    solutionRoiEn: 'Fleet load factor boosted to 92% + 30% reduction in third-party charter leases.',
    metricBefore: '24% نسبة الإشغال',
    metricAfter: '94% سعة مستغلة',
    metricLabelAr: 'كفاءة ملء الحافلات',
    metricLabelEn: 'Bus Load Factor',
  },
  governance: {
    id: 'governance',
    titleAr: 'الحوكمة وسجل التدقيق المركزي',
    titleEn: 'Central Core & Audit Trail',
    icon: Lock,
    color: '#a855f7', // purple
    threeColor: 0xa855f7,
    position: [0, 3.2, 0],
    problemAr: 'جزر بيانات منعزلة؛ كل إدارة تلقي اللوم على الأخرى عند حدوث عجز أو خطأ مالي.',
    problemEn: 'Isolated silos; finger-pointing between camp, kitchen, and transport over financial shortages.',
    problemRootAr: 'غياب سجل تاريخي غير قابل للتعديل (Immutable Audit Log) يوثق من اعتمد كل حركة.',
    problemRootEn: 'Absence of an immutable audit trail documenting who approved leaves, meals, or extra buses.',
    problemCostAr: 'استحالة تدقيق الفواتير مع مقاولي الباطن والشركاء، وتسرب ملايين الجنيهات سنويًا.',
    problemCostEn: 'Zero contractor reconciliation auditability leading to unchecked recurring overbilling.',
    solutionAr: 'نواة تشغيلية مركزية واحدة (Single Source of Truth) تسجل كل حركة بطابع زمني مشفر.',
    solutionEn: 'Single Source of Truth enterprise core recording every micro-action with cryptotime logs.',
    solutionTechAr: 'سجلات تدقيق غير قابلة للتلاعب + صلاحيات RBAC دقيقة + تقارير مطابقة فورية.',
    solutionTechEn: 'Tamper-evident event streaming + strict RBAC tiering + instant reconciliation engine.',
    solutionRoiAr: 'مطابقة مالية فورية 100% بنقرة واحدة + إغلاق كافة منافذ التلاعب والنزيف المالي.',
    solutionRoiEn: '100% Instant financial reconciliation in 1-click + total fraud prevention.',
    metricBefore: 'صفر سجل تدقيق',
    metricAfter: '100% شفافية مطلقة',
    metricLabelAr: 'نسبة الشفافية والمساءلة',
    metricLabelEn: 'Audit Transparency',
  },
};

export const PILLAR_KEYS: PillarKey[] = ['docs', 'housing', 'catering', 'transit', 'governance'];

interface SceneProblemSolving3DProps {
  onSelectPillar?: (pillar: PillarKey) => void;
  selectedPillarKey?: PillarKey;
}

export const SceneProblemSolving3D: React.FC<SceneProblemSolving3DProps> = ({
  onSelectPillar,
  selectedPillarKey = 'housing',
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const { isArabic, t } = useLanguage();

  // Mode: 'legacy' (problem & chaos) vs 'solution' (Alfarabi 3D Engine)
  const [engineMode, setEngineMode] = useState<'legacy' | 'solution'>('solution');
  const [activePillar, setActivePillar] = useState<PillarKey>(selectedPillarKey);
  const [isRotating, setIsRotating] = useState<boolean>(true);

  // Sync external pillar prop
  useEffect(() => {
    if (selectedPillarKey) {
      setActivePillar(selectedPillarKey);
    }
  }, [selectedPillarKey]);

  // Handle pillar selection
  const handlePillarChange = useCallback((key: PillarKey) => {
    soundManager.playClick();
    setActivePillar(key);
    if (onSelectPillar) {
      onSelectPillar(key);
    }
  }, [onSelectPillar]);

  // Handle engine mode toggle
  const toggleEngineMode = () => {
    soundManager.playTrigger();
    setEngineMode(prev => (prev === 'legacy' ? 'solution' : 'legacy'));
  };

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth || 800;
    const height = mount.clientHeight || 500;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x060919, 0.04);

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 7.5, 12);
    camera.lookAt(0, 0.5, 0);

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    mount.innerHTML = '';
    mount.appendChild(renderer.domElement);

    // 3. Cinematic Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const mainSpot = new THREE.SpotLight(0x38bdf8, 3.5, 40, Math.PI / 4, 0.5);
    mainSpot.position.set(0, 14, 6);
    scene.add(mainSpot);

    const redChaosLight = new THREE.PointLight(0xef4444, 2.5, 30);
    redChaosLight.position.set(0, 4, 0);
    scene.add(redChaosLight);

    const greenSolutionLight = new THREE.PointLight(0x10b981, 3, 30);
    greenSolutionLight.position.set(0, 4, 0);
    scene.add(greenSolutionLight);

    // 4. Cybernetic Base Floor
    const floorGeo = new THREE.CylinderGeometry(6.5, 6.8, 0.3, 48);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x0a1026,
      metalness: 0.9,
      roughness: 0.25,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.position.y = -0.15;
    scene.add(floor);

    // Outer Glowing Ring on Floor
    const floorRingGeo = new THREE.RingGeometry(6.3, 6.6, 64);
    const floorRingMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.6,
    });
    const floorRing = new THREE.Mesh(floorRingGeo, floorRingMat);
    floorRing.rotation.x = Math.PI / 2;
    floorRing.position.y = 0.02;
    scene.add(floorRing);

    // Grid on Floor
    const grid = new THREE.GridHelper(13, 20, 0x0284c7, 0x1e293b);
    grid.position.y = 0.03;
    scene.add(grid);

    // 5. Central Quantum Core Group
    const coreGroup = new THREE.Group();
    coreGroup.position.set(0, 1.2, 0);
    scene.add(coreGroup);

    // Central Core 3D Mesh
    const coreGeo = new THREE.IcosahedronGeometry(1.3, 1);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      metalness: 0.85,
      roughness: 0.2,
      emissive: 0x0284c7,
      emissiveIntensity: 0.6,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreGroup.add(coreMesh);

    // Core Wireframe Cage
    const wireGeo = new THREE.IcosahedronGeometry(1.45, 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xa5f3fc,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    coreGroup.add(wireMesh);

    // Dual Orbital Rings around Core
    const orbitRing1Geo = new THREE.TorusGeometry(2.1, 0.04, 16, 64);
    const orbitRingMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.7,
    });
    const orbitRing1 = new THREE.Mesh(orbitRing1Geo, orbitRingMat);
    orbitRing1.rotation.x = Math.PI / 3;
    coreGroup.add(orbitRing1);

    const orbitRing2 = new THREE.Mesh(orbitRing1Geo, orbitRingMat.clone());
    orbitRing2.rotation.y = Math.PI / 4;
    orbitRing2.rotation.x = -Math.PI / 5;
    coreGroup.add(orbitRing2);

    // 6. Five Pillar Satellite Nodes
    const nodesGroup = new THREE.Group();
    scene.add(nodesGroup);

    const nodeMeshes: {
      key: PillarKey;
      group: THREE.Group;
      baseMesh: THREE.Mesh;
      glowRing: THREE.Mesh;
      beamLine?: THREE.Line;
    }[] = [];

    PILLAR_KEYS.forEach((key) => {
      const data = PILLARS_DATA[key];
      const nGroup = new THREE.Group();
      nGroup.position.set(...data.position);

      // Node Pedestal / Base
      const baseGeo = new THREE.CylinderGeometry(0.65, 0.75, 0.35, 24);
      const baseMat = new THREE.MeshStandardMaterial({
        color: 0x0f172a,
        metalness: 0.8,
        roughness: 0.2,
      });
      const base = new THREE.Mesh(baseGeo, baseMat);
      base.position.y = -0.3;
      nGroup.add(base);

      // Node Floating Geometric Symbol
      let symbolGeo: THREE.BufferGeometry;
      if (key === 'docs') symbolGeo = new THREE.BoxGeometry(0.8, 1.1, 0.3);
      else if (key === 'housing') symbolGeo = new THREE.BoxGeometry(1.0, 0.8, 1.0);
      else if (key === 'catering') symbolGeo = new THREE.CylinderGeometry(0.6, 0.5, 0.9, 16);
      else if (key === 'transit') symbolGeo = new THREE.BoxGeometry(0.7, 0.6, 1.4);
      else symbolGeo = new THREE.OctahedronGeometry(0.8, 0);

      const symbolMat = new THREE.MeshStandardMaterial({
        color: data.threeColor,
        metalness: 0.7,
        roughness: 0.3,
        emissive: data.threeColor,
        emissiveIntensity: 0.5,
      });
      const symbolMesh = new THREE.Mesh(symbolGeo, symbolMat);
      symbolMesh.position.y = 0.4;
      nGroup.add(symbolMesh);

      // Outer Glow Pulse Ring
      const ringGeo = new THREE.RingGeometry(0.8, 0.95, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: data.threeColor,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.8,
      });
      const glowRing = new THREE.Mesh(ringGeo, ringMat);
      glowRing.rotation.x = Math.PI / 2;
      glowRing.position.y = -0.1;
      nGroup.add(glowRing);

      // Data Conduit / Laser Beam to Core
      const linePoints = [
        new THREE.Vector3(data.position[0], data.position[1], data.position[2]),
        new THREE.Vector3(0, 1.2, 0)
      ];
      const lineGeo = new THREE.BufferGeometry().setFromPoints(linePoints);
      const lineMat = new THREE.LineBasicMaterial({
        color: data.threeColor,
        transparent: true,
        opacity: 0.65,
        linewidth: 2,
      });
      const beamLine = new THREE.Line(lineGeo, lineMat);
      scene.add(beamLine);

      nodesGroup.add(nGroup);

      nodeMeshes.push({
        key,
        group: nGroup,
        baseMesh: symbolMesh,
        glowRing,
        beamLine,
      });
    });

    // 7. Ambient Floating Cyber Particles
    const particleCount = 180;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSpeeds = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 12;
      particlePositions[i * 3 + 1] = Math.random() * 6;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 12;
      particleSpeeds[i] = 0.01 + Math.random() * 0.02;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.12,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // 8. Raycasting for Clicking Nodes
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handlePointerDown = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const allObjects: THREE.Object3D[] = [];
      nodeMeshes.forEach(n => allObjects.push(n.baseMesh, n.glowRing));

      const intersects = raycaster.intersectObjects(allObjects, false);
      if (intersects.length > 0) {
        const hit = intersects[0].object;
        const matched = nodeMeshes.find(n => n.baseMesh === hit || n.glowRing === hit);
        if (matched) {
          handlePillarChange(matched.key);
        }
      }
    };

    renderer.domElement.addEventListener('pointerdown', handlePointerDown);

    // Mouse drag rotation support
    let isDragging = false;
    let prevMouseX = 0;
    let sceneYaw = 0;

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      prevMouseX = e.clientX;
      sceneYaw += deltaX * 0.006;
      nodesGroup.rotation.y = sceneYaw;
      coreGroup.rotation.y = sceneYaw * 1.2;
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    renderer.domElement.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    // 9. Resize Listener
    const handleResize = () => {
      if (!mount) return;
      const nw = mount.clientWidth;
      const nh = mount.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener('resize', handleResize);

    // 10. Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Mode-dependent visual dynamics
      const isLegacy = engineMode === 'legacy';

      if (isLegacy) {
        // Red Chaos Mode
        redChaosLight.intensity = 2.8 + Math.sin(elapsedTime * 6) * 1.2;
        greenSolutionLight.intensity = 0.1;
        coreMat.color.setHex(0xef4444);
        coreMat.emissive.setHex(0xb91c1c);
        wireMat.color.setHex(0xf87171);
        particleMat.color.setHex(0xef4444);
        floorRingMat.color.setHex(0xef4444);
      } else {
        // Alfarabi 3D Solution Engine Mode
        redChaosLight.intensity = 0.1;
        greenSolutionLight.intensity = 2.4 + Math.sin(elapsedTime * 3) * 0.8;
        coreMat.color.setHex(0x06b6d4);
        coreMat.emissive.setHex(0x0891b2);
        wireMat.color.setHex(0xa5f3fc);
        particleMat.color.setHex(0x38bdf8);
        floorRingMat.color.setHex(0x10b981);
      }

      // Smooth idle rotation
      if (isRotating && !isDragging) {
        const rotSpeed = isLegacy ? 0.008 : 0.004;
        nodesGroup.rotation.y += rotSpeed;
        coreGroup.rotation.y += rotSpeed * 1.5;
        sceneYaw = nodesGroup.rotation.y;
      }

      // Pulse Core geometry
      const scaleBase = isLegacy ? 1.0 + Math.sin(elapsedTime * 8) * 0.06 : 1.0 + Math.sin(elapsedTime * 2.5) * 0.04;
      coreMesh.scale.set(scaleBase, scaleBase, scaleBase);
      wireMesh.scale.set(scaleBase * 1.08, scaleBase * 1.08, scaleBase * 1.08);

      orbitRing1.rotation.z += 0.015;
      orbitRing2.rotation.z -= 0.012;

      // Update Node geometry and glow
      nodeMeshes.forEach((item) => {
        const isSelected = item.key === activePillar;

        // Hover bobbing
        item.baseMesh.position.y = 0.4 + Math.sin(elapsedTime * 2.5 + item.group.position.x) * 0.08;
        item.baseMesh.rotation.y += 0.01;

        if (isSelected) {
          item.baseMesh.scale.set(1.25, 1.25, 1.25);
          item.glowRing.scale.set(1.3, 1.3, 1.3);
          (item.glowRing.material as THREE.MeshBasicMaterial).opacity = 0.95;
          if (item.beamLine) {
            (item.beamLine.material as THREE.LineBasicMaterial).opacity = isLegacy ? 0.4 : 0.95;
          }
        } else {
          item.baseMesh.scale.set(1.0, 1.0, 1.0);
          item.glowRing.scale.set(1.0, 1.0, 1.0);
          (item.glowRing.material as THREE.MeshBasicMaterial).opacity = 0.45;
          if (item.beamLine) {
            (item.beamLine.material as THREE.LineBasicMaterial).opacity = isLegacy ? 0.2 : 0.4;
          }
        }

        // If in legacy mode, flicker beams like broken connections
        if (isLegacy && item.beamLine) {
          (item.beamLine.material as THREE.LineBasicMaterial).opacity = (Math.sin(elapsedTime * 15 + item.group.position.z) > 0.3) ? 0.6 : 0.1;
        }
      });

      // Animate floating particles
      const positions = particleGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        const idx = i * 3 + 1;
        if (isLegacy) {
          // Particles leak downwards into the void
          positions[idx] -= particleSpeeds[i] * 1.8;
          if (positions[idx] < -0.5) positions[idx] = 5.5;
        } else {
          // Particles flow upwards into the core
          positions[idx] += particleSpeeds[i];
          if (positions[idx] > 5.5) positions[idx] = 0;
        }
      }
      particleGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      renderer.domElement.removeEventListener('pointerdown', handlePointerDown);
      renderer.domElement.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, [engineMode, activePillar, isRotating, handlePillarChange]);

  const currentData = PILLARS_DATA[activePillar];
  const IconComponent = currentData.icon;

  return (
    <div className="w-full h-full flex flex-col justify-between gap-3 relative select-none">
      {/* 3D Canvas Container */}
      <div className="relative w-full h-[360px] sm:h-[400px] lg:h-[420px] rounded-2xl overflow-hidden border border-slate-700/80 bg-gradient-to-b from-slate-950 via-[#070b1e] to-slate-950 shadow-[0_12px_40px_rgba(0,0,0,0.6)]">
        {/* Three.js Viewport */}
        <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

        {/* Top-Left Engine Mode Switcher HUD */}
        <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20 flex flex-col gap-2">
          <div className="glass-panel p-1.5 rounded-xl border border-slate-700/80 bg-slate-950/80 backdrop-blur-md flex items-center gap-1 shadow-lg">
            <button
              onClick={toggleEngineMode}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                engineMode === 'legacy'
                  ? 'bg-rose-600 text-white shadow-[0_0_15px_rgba(244,63,94,0.6)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>{t('الواقع التقليدي (الفوضى والهدر)', 'Legacy Friction')}</span>
            </button>

            <button
              onClick={toggleEngineMode}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                engineMode === 'solution'
                  ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-white shadow-[0_0_18px_rgba(16,185,129,0.5)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-lime-200" />
              <span>{t('معالجة الفارابي 3D المتطورة', 'Alfarabi 3D Solution')}</span>
            </button>
          </div>

          {/* Quick HUD Metrics Badge */}
          <div className="px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-700/60 backdrop-blur-md text-[11px] flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${engineMode === 'solution' ? 'bg-emerald-400 animate-pulse' : 'bg-rose-500 animate-ping'}`} />
            <span className="text-slate-300 font-medium">
              {engineMode === 'solution'
                ? t('الحالة: منظومة مترابطة ومحمية 100%', 'Core Status: Active & 100% Synchronized')
                : t('الحالة: جزر منعزلة وتسرب مالي نشط', 'Core Status: Data Silos & Capital Bleeding')}
            </span>
          </div>
        </div>

        {/* Top-Right Quick Controls: Auto-Rotate & Hint */}
        <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 flex items-center gap-2">
          <button
            onClick={() => setIsRotating(prev => !prev)}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold border backdrop-blur-md transition flex items-center gap-1.5 ${
              isRotating
                ? 'bg-slate-800/80 border-slate-600 text-cyan-300'
                : 'bg-slate-900/80 border-slate-700 text-slate-400'
            }`}
            title={t('إيقاف / تدوير النموذج 3D', 'Toggle 3D Rotation')}
          >
            <RefreshCw className={`w-3 h-3 ${isRotating ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">{t('دوران تلقائي', 'Auto-Rotate')}</span>
          </button>

          <div className="px-2.5 py-1.5 rounded-lg bg-slate-900/80 border border-slate-700/70 text-[10px] text-slate-400 font-mono hidden md:flex items-center gap-1">
            <Eye className="w-3 h-3 text-cyan-400" />
            <span>{t('اسحب للفحص 360° • انقر للعقدة', 'Drag 360° • Click Node')}</span>
          </div>
        </div>

        {/* Bottom Pillar Selector Strip inside 3D Viewport */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 w-[95%] max-w-2xl">
          <div className="flex items-center justify-between gap-1 sm:gap-2 p-1.5 rounded-2xl bg-slate-950/85 border border-slate-700/80 backdrop-blur-xl shadow-2xl overflow-x-auto">
            {PILLAR_KEYS.map((key) => {
              const item = PILLARS_DATA[key];
              const isSelected = activePillar === key;
              const ItemIcon = item.icon;

              return (
                <button
                  key={key}
                  onClick={() => handlePillarChange(key)}
                  className={`flex-1 min-w-[70px] sm:min-w-[90px] px-2 py-1.5 rounded-xl text-[11px] font-bold transition-all flex flex-col sm:flex-row items-center justify-center gap-1 text-center whitespace-nowrap ${
                    isSelected
                      ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-[0_0_15px_rgba(6,182,212,0.6)] scale-105'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <ItemIcon className="w-3.5 h-3.5" />
                  <span>{isArabic ? item.titleAr : item.titleEn}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Deep-Dive Problem vs Solution Resolution Card */}
      <div className="w-full rounded-2xl border border-slate-700/80 bg-slate-900/90 backdrop-blur-xl p-4 lg:p-5 shadow-xl transition-all">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg transition-transform hover:scale-105"
              style={{ backgroundColor: `${currentData.color}25`, color: currentData.color }}
            >
              <IconComponent className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
                  {t('تحليل الأثر الهندسي', 'Engineering Impact Diagnostic')}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">
                  {currentData.id.toUpperCase()}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-white">
                {isArabic ? currentData.titleAr : currentData.titleEn}
              </h3>
            </div>
          </div>

          {/* Quick Metric Ribbon */}
          <div className="flex items-center gap-3 bg-slate-950/70 border border-slate-800 px-3.5 py-1.5 rounded-xl">
            <div className="text-right">
              <div className="text-[10px] text-slate-400">{isArabic ? currentData.metricLabelAr : currentData.metricLabelEn}</div>
              <div className="flex items-center gap-2 font-mono font-bold text-xs">
                <span className="text-rose-400 line-through">{currentData.metricBefore}</span>
                <span className="text-slate-500">➔</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {currentData.metricAfter}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Dual Comparison Grid: Problem vs Solution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* Legacy Problem Card */}
          <div className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-500/30 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-rose-400 font-bold mb-1.5 text-xs">
                <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0" />
                <span>{t('المشكلة والأثر الميداني السلبي', 'Legacy Bottleneck & Operational Friction')}</span>
              </div>
              <p className="text-slate-300 leading-relaxed mb-2 font-medium">
                {isArabic ? currentData.problemAr : currentData.problemEn}
              </p>
              <div className="text-[11px] text-rose-300/90 bg-rose-950/40 p-2 rounded-lg border border-rose-900/50">
                <span className="font-bold">{t('جذر المشكلة: ', 'Root Cause: ')}</span>
                {isArabic ? currentData.problemRootAr : currentData.problemRootEn}
              </div>
            </div>
            <div className="mt-3 pt-2 border-t border-rose-900/40 text-rose-400 font-bold flex items-center justify-between">
              <span>{t('الهدر المالي المباشر:', 'Compounding Cost:')}</span>
              <span className="font-mono">{isArabic ? currentData.problemCostAr : currentData.problemCostEn}</span>
            </div>
          </div>

          {/* Alfarabi Engineered Solution Card */}
          <div className="p-3.5 rounded-xl bg-emerald-950/25 border border-emerald-500/40 flex flex-col justify-between shadow-[0_0_20px_rgba(16,185,129,0.1)]">
            <div>
              <div className="flex items-center gap-2 text-emerald-400 font-bold mb-1.5 text-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{t('الحل المتطور من منظومة الفارابي ERP', 'Engineered Alfarabi 3D Solution')}</span>
              </div>
              <p className="text-slate-200 leading-relaxed mb-2 font-medium">
                {isArabic ? currentData.solutionAr : currentData.solutionEn}
              </p>
              <div className="text-[11px] text-emerald-300/90 bg-emerald-950/40 p-2 rounded-lg border border-emerald-900/50 flex items-start gap-1.5">
                <Zap className="w-3.5 h-3.5 text-lime-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">{t('الآلية التقنية: ', 'Tech Mechanism: ')}</span>
                  {isArabic ? currentData.solutionTechAr : currentData.solutionTechEn}
                </div>
              </div>
            </div>
            <div className="mt-3 pt-2 border-t border-emerald-900/40 text-emerald-300 font-bold flex items-center justify-between">
              <span className="flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                <span>{t('العائد الاستثماري (ROI):', 'Proven Executive ROI:')}</span>
              </span>
              <span className="font-mono text-white bg-emerald-700/40 px-2 py-0.5 rounded border border-emerald-500/30">
                {isArabic ? currentData.solutionRoiAr : currentData.solutionRoiEn}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
