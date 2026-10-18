import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { soundManager } from '../../utils/audio';
import { useLanguage } from '../../context/LanguageContext';
import { 
  FileSpreadsheet, 
  Home, 
  Utensils, 
  Bus, 
  Lock, 
  RotateCcw,
  Eye,
  AlertTriangle,
  Sparkles
} from 'lucide-react';

export type ProblemType = 'archive' | 'housing' | 'catering' | 'transit' | 'governance';

export interface ProblemInfo {
  id: ProblemType;
  titleAr: string;
  titleEn: string;
  subtitleAr: string;
  subtitleEn: string;
  icon: typeof FileSpreadsheet;
  badgeAr: string;
  badgeEn: string;
  accentColor: string;
  threeColor: number;

  // Problem State Specs
  problemTitleAr: string;
  problemTitleEn: string;
  problemDescAr: string;
  problemDescEn: string;
  problemStatsAr: { label: string; value: string; sub: string }[];
  problemStatsEn: { label: string; value: string; sub: string }[];

  // Solution State Specs
  solutionTitleAr: string;
  solutionTitleEn: string;
  solutionDescAr: string;
  solutionDescEn: string;
  solutionStatsAr: { label: string; value: string; sub: string }[];
  solutionStatsEn: { label: string; value: string; sub: string }[];

  // Executive ROI
  roiMetricAr: string;
  roiMetricEn: string;
  annualValueAr: string;
  annualValueEn: string;
}

export const PROBLEMS_CATALOG: Record<ProblemType, ProblemInfo> = {
  archive: {
    id: 'archive',
    titleAr: '1. أزمة الأرشيف الورقي وتصاريح العمالة',
    titleEn: '1. Paper Dossier Bottleneck & Expired Clearances',
    subtitleAr: 'فقدان المستندات، بطء إصدار التصاريح، وغرامات الامتثال القانوني',
    subtitleEn: 'Lost documents, delayed work permits, and compounding regulatory fines',
    icon: FileSpreadsheet,
    badgeAr: 'مشكلة الوثائق والهوية',
    badgeEn: 'Dossier & Compliance Void',
    accentColor: '#06b6d4',
    threeColor: 0x06b6d4,

    problemTitleAr: 'فوضى الأوراق وشيتات الإكسيل المتناثرة',
    problemTitleEn: 'Paper Chaos & Disjointed Spreadsheets',
    problemDescAr: 'الملفات مبعثرة بين مكاتب المشرفين، انتهاء تصاريح وعقود لعمالة في الموقع دون سابق إنذار، واستغراق 3 إلى 5 أيام لاستخراج ملف عامل واحد عند التفتيش.',
    problemDescEn: 'Physical files scattered across multiple field offices; clearances expiring unmonitored; 3 to 5 days required to retrieve a single dossier during audits.',
    problemStatsAr: [
      { label: 'وقت البحث عن الملف', value: '3 - 5 أيام', sub: 'بحث يدوي بطيء' },
      { label: 'نسبة الملفات الناقصة', value: '28%', sub: 'وثائق مفقودة' },
      { label: 'مخاطر غرامات الامتثال', value: 'عالية جداً', sub: 'مساءلة قانونية' }
    ],
    problemStatsEn: [
      { label: 'Search Latency', value: '3 - 5 Days', sub: 'Slow manual retrieval' },
      { label: 'Incomplete Dossiers', value: '28%', sub: 'Missing compliance docs' },
      { label: 'Compliance Penalties', value: 'High Risk', sub: 'Legal liabilities' }
    ],

    solutionTitleAr: 'خزانة رقمية مشفرة بتقنية Worker ID الموحد',
    solutionTitleEn: 'Encrypted Digital Vault with Canonical Worker ID',
    solutionDescAr: 'تشفير AES-256 لكافة وثائق العامل، استدعاء الملف بالباركود خلال 0.8 ثانية، وتنبيهات ذكية مؤتمتة قبل انتهاء أي وثيقة بـ 30 يوماً مع منع نزول العامل للميدان إن لم يكن مستوفياً.',
    solutionDescEn: 'AES-256 cloud encryption binding all credentials to unique Worker ID; sub-second retrieval; proactive 30-day expiry engine automatically restricting unverified field deployment.',
    solutionStatsAr: [
      { label: 'زمن استرجاع الوثيقة', value: '0.8 ثانية', sub: 'بحث بيومتري فوري' },
      { label: 'دقة الامتثال القانوني', value: '100%', sub: 'مطابقة رقمية تامة' },
      { label: 'تنبيه انتهاء الأوراق', value: 'قبل 30 يوماً', sub: 'إشعار آلي مستمر' }
    ],
    solutionStatsEn: [
      { label: 'Retrieval Time', value: '0.8 Seconds', sub: 'Instant biometric lookup' },
      { label: 'Audit Compliance', value: '100%', sub: 'Total legal conformity' },
      { label: 'Automated Alerting', value: '30 Days Prior', sub: 'Proactive renewal queue' }
    ],

    roiMetricAr: 'صفر غرامات قانونية + توفير 40 ساعة إدارية أسبوعياً',
    roiMetricEn: 'Zero compliance fines + 40 administrative hours saved weekly',
    annualValueAr: 'وفر سنوي مباشر: 450,000 ج.م',
    annualValueEn: 'Direct Annual Savings: $28,000+'
  },

  housing: {
    id: 'housing',
    titleAr: '2. أزمة الأسرة الوهمية ونزيف إيجارات السكن',
    titleEn: '2. Phantom Beds & Camp Lease Capital Bleed',
    subtitleAr: 'حجز أسرة لعمال مسافرين أو متغيبين ودفع إيجارات لغرف فارغة فعلياً',
    subtitleEn: 'Paying camp rent for phantom absent workers while rooms sit physically empty',
    icon: Home,
    badgeAr: 'مشكلة السكن والغياب',
    badgeEn: 'Camp Housing Leakage',
    accentColor: '#84cc16',
    threeColor: 0x84cc16,

    problemTitleAr: 'أسرة محجوزة وهمياً ودفع إيجار لـ "أشباح"',
    problemTitleEn: 'Phantom Bed Reservations & Subsidizing Ghost Workers',
    problemDescAr: 'عامل يسافر أو يغيب، ومشرف السكن لا يعلم أو لا يُبلغ HR. النتيجة: السرير يظل "محجوزاً" على الورق لشهور، والشركة تدفع إيجاره كاملاً رغم خلوه، مع عجز في تسكين العمالة الجديدة.',
    problemDescEn: 'Workers depart or fail to report, but field camp supervisors do not notify HR. Bunks remain tagged as occupied for weeks; company pays full monthly lease on empty air.',
    problemStatsAr: [
      { label: 'نسبة الأسرة الوهمية', value: '18% - 22%', sub: 'حجز لعمال غائبين' },
      { label: 'متوسط الهدر بالسرير', value: '450 ج.م/شهر', sub: 'تكلفة إيجار مهدرة' },
      { label: 'زمن اكتشاف الغياب', value: '14 - 21 يوماً', sub: 'تأخر شفهي متكرر' }
    ],
    problemStatsEn: [
      { label: 'Phantom Bed Rate', value: '18% - 22%', sub: 'Reserved for absentees' },
      { label: 'Monthly Waste Per Bed', value: '$35 / bed', sub: 'Unused lease spend' },
      { label: 'Discovery Latency', value: '14 - 21 Days', sub: 'Late manual reports' }
    ],

    solutionTitleAr: 'خوارزمية الإخلاء الآلي الصارم بعد 10 أيام غياب',
    solutionTitleEn: '10-Day Automated Bed Release & Spatial HUD Matrix',
    solutionDescAr: 'ربط حساسات بوابات السكن بنواة HR. كل يوم غياب يسجل مؤقت (1 إلى 10). في اليوم العاشر، يقوم النظام بإخلاء السرير آلياً، إعادة تصنيفه "شاغر ومتاح"، وتوجيه عامل جديد فوراً.',
    solutionDescEn: 'Biometric camp turnstiles linked to core HR database. Live absence countdown (Days 1 to 10). On Day 10, bed is auto-vacated, re-listed as active vacancy, and re-assigned instantly.',
    solutionStatsAr: [
      { label: 'الأسرة الشاغرة المستردة', value: '100%', sub: 'إعادة تدوير فوري' },
      { label: 'خفض تكلفة إيجار السكن', value: '28%', sub: 'توفير عقود خارجية' },
      { label: 'زمن تطبيق سياسة الإخلاء', value: 'تلقائي (Day 10)', sub: 'صفر تدخل بشري' }
    ],
    solutionStatsEn: [
      { label: 'Recovered Bed Slots', value: '100%', sub: 'Instant inventory reuse' },
      { label: 'Camp Lease Reduction', value: '28%', sub: 'Fewer rented buildings' },
      { label: 'Policy Enforcement', value: 'Automated (Day 10)', sub: 'Zero manual bias' }
    ],

    roiMetricAr: 'استرداد 350+ سرير شهرياً وإلغاء استئجار عمارات سكنية إضافية',
    roiMetricEn: '350+ bunks reclaimed monthly; cancelling redundant lease contracts',
    annualValueAr: 'وفر سنوي مباشر: 1,850,000 ج.م',
    annualValueEn: 'Direct Annual Savings: $115,000+'
  },

  catering: {
    id: 'catering',
    titleAr: '3. أزمة هدر الوجبات وفواتير المطبخ المفتوحة',
    titleEn: '3. Kitchen Overproduction & Uncontrolled Catering Invoices',
    subtitleAr: 'طبخ مئات الوجبات الإضافية بناءً على تخمين شفهي ثم إلقاؤها بالقمامة',
    subtitleEn: 'Cooking hundreds of excess meal trays based on hunches then throwing them into trash',
    icon: Utensils,
    badgeAr: 'مشكلة الإعاشة والتغذية',
    badgeEn: 'Catering Capital Loss',
    accentColor: '#f59e0b',
    threeColor: 0xf59e0b,

    problemTitleAr: 'طبخ عشوائي.. ورمي مئات الوجبات بالقمامة يومياً',
    problemTitleEn: 'Blind Batch Cooking & Daily Mountains of Dumped Food',
    problemDescAr: 'المشرف يطلب طهي 2,000 وجبة بناء على الرقم التعاقدي الكامل، بينما الحضور الفعلي 1,600 فقط. تطبخ 400 وجبة زائدة يومياً، تفسد وترمى في القمامة، وتتحمل الشركة تكلفتها كاملة!',
    problemDescEn: 'Kitchen preps 2,000 full meal trays based on static roster headcount when only 1,600 workers are on duty. 400 surplus meals are discarded daily, fully billed to company accounts.',
    problemStatsAr: [
      { label: 'الوجبات المهدرة يومياً', value: '350 - 500 وجبة', sub: 'ترمي في المهملات' },
      { label: 'تكلفة الوجبة التالفة', value: '75 ج.م / وجبة', sub: 'مدفوعة للمقاول' },
      { label: 'نسبة الهدر المالي', value: '22% من الفاتورة', sub: 'هدر غير مسترد' }
    ],
    problemStatsEn: [
      { label: 'Dumped Trays / Day', value: '350 - 500 Meals', sub: 'Straight to trash' },
      { label: 'Cost Per Waste Meal', value: '$4.50 / tray', sub: 'Paid to caterers' },
      { label: 'Invoice Waste Margin', value: '22% of Total', sub: 'Unrecoverable loss' }
    ],

    solutionTitleAr: 'حوكمة الحصة الواحدة برمز QR المتزامن مع الحضور',
    solutionTitleEn: '1-Worker-1-Meal Turnstile Barcode Token Engine',
    solutionDescAr: 'أوامر الطبخ في المطبخ تسحب رقم الحضور الفعلي الموثق من البوابة قبل موعد الطهي بـ 3 ساعات. استلام الوجبة بمسح باركود الهوية، ومنع ازدواجية الصرف بنسبة 100%.',
    solutionDescEn: 'Kitchen cooking batch size is programmatically calculated 3h prior to meal service using live gate presence telemetry. Meal dispensed via 1-to-1 QR scan with zero duplicate claims.',
    solutionStatsAr: [
      { label: 'الوجبات المهدرة', value: '0 وجبة', sub: 'طبخ دقيق بالحبة' },
      { label: 'منع الصرف المزدوج', value: '100%', sub: 'تحقق بيومتري رقمي' },
      { label: 'تخفيض فاتورة التموين', value: '18% - 25%', sub: 'مطابقة فورية' }
    ],
    solutionStatsEn: [
      { label: 'Food Surplus Dump', value: '0 Meals', sub: 'Exact portion batching' },
      { label: 'Duplicate Prevention', value: '100%', sub: 'Digital QR lock' },
      { label: 'Catering Invoice Cut', value: '18% - 25%', sub: 'Strict reconciliation' }
    ],

    roiMetricAr: 'منع هدر 12,000 وجبة شهرياً وتدقيق فواتير المقاول بالمليم',
    roiMetricEn: '12,000 meals prevented from being discarded monthly; penny-accurate invoicing',
    annualValueAr: 'وفر سنوي مباشر: 1,100,000 ج.م',
    annualValueEn: 'Direct Annual Savings: $70,000+'
  },

  transit: {
    id: 'transit',
    titleAr: '4. أزمة الحافلات شبه الفارغة وهدر الوقود',
    titleEn: '4. Deadhead Empty Bus Runs & Fuel Inefficiency',
    subtitleAr: 'أتوبيسات تتحرك بـ 20% فقط من طاقتها الاستيعابية وخطوط سير مكررة',
    subtitleEn: 'Buses operating at 20% capacity, burning fuel and maintenance on empty seats',
    icon: Bus,
    badgeAr: 'مشكلة أسطول النقل',
    badgeEn: 'Transit Capacity Drain',
    accentColor: '#38bdf8',
    threeColor: 0x38bdf8,

    problemTitleAr: 'حافلات خالية تتحرك بالجداول القديمة بلا ركاب',
    problemTitleEn: 'Empty 50-Seat Coaches Running Fixed Ghost Routes',
    problemDescAr: 'جدول تحرك الأتوبيسات ثابت منذ سنوات؛ 10 حافلات تتحرك لنقل وردية فيها 120 عاملاً فقط (حاجة 3 أتوبيسات فقط). 7 أتوبيسات تتحرك خالية، تستهلك السولار وتكلف الشركة إيجارات باهظة.',
    problemDescEn: 'Fixed static schedules dispatch 10 full-sized 50-passenger coaches to service a shift where only 120 workers reported. 7 buses run empty, consuming fuel and inflating lease invoices.',
    problemStatsAr: [
      { label: 'نسبة ملء الأتوبيسات', value: '20% - 25%', sub: 'مقاعد خالية بالكامل' },
      { label: 'تكلفة الحافلة المستأجرة', value: '18,000 ج.م/شهر', sub: 'لكل حافلة زائدة' },
      { label: 'هدر السولار والصيانة', value: '35% فائض', sub: 'استهلاك غير مبرر' }
    ],
    problemStatsEn: [
      { label: 'Bus Fill Factor', value: '20% - 25%', sub: 'Vast majority empty' },
      { label: 'Charter Lease Waste', value: '$1,200 / bus / mo', sub: 'Redundant vehicles' },
      { label: 'Fuel & Maintenance Loss', value: '35% Excess', sub: 'Preventable wear' }
    ],

    solutionTitleAr: 'التوجيه الذكي ودمج حمولات الركاب وفق الحضور',
    solutionTitleEn: 'Smart Dispatch & AI Load Consolidation (94% Fill)',
    solutionDescAr: 'خوارزمية ذكية تقوم بحساب عدد العمال المؤكدين في السكنات والورديات، وتدمج المسارات آلياً لتقليص الأسطول إلى أقل عدد ممكن من الحافلات مع ملء كل حافلة بنسبة 94%.',
    solutionDescEn: 'Algorithmic dynamic dispatch aggregates confirmed shift headcounts from camp gates, merges intersecting routes, and consolidates riders into fully optimized buses running at 94% capacity.',
    solutionStatsAr: [
      { label: 'نسبة ملء الحافلات', value: '94%', sub: 'استغلال أمثل للطاقة' },
      { label: 'تقليص الحافلات المستأجرة', value: '30% وفر', sub: 'إلغاء عقود فائضة' },
      { label: 'خفض استهلاك السولار', value: '32%', sub: 'مسارات مدمجة ذكية' }
    ],
    solutionStatsEn: [
      { label: 'Passenger Load Factor', value: '94%', sub: 'Optimal fleet utilization' },
      { label: 'Fleet Lease Reduction', value: '30% Saved', sub: 'Cancelled redundant leases' },
      { label: 'Diesel Fuel Savings', value: '32%', sub: 'Consolidated corridors' }
    ],

    roiMetricAr: 'إلغاء 8 حافلات مستأجرة فائضة وتوفير آلاف لترات السولار شهرياً',
    roiMetricEn: 'Elimination of 8 redundant chartered buses + saving thousands of liters of fuel monthly',
    annualValueAr: 'وفر سنوي مباشر: 1,720,000 ج.م',
    annualValueEn: 'Direct Annual Savings: $108,000+'
  },

  governance: {
    id: 'governance',
    titleAr: '5. أزمة تشتت الإدارات وانعدام الرقابة والمسؤولية',
    titleEn: '5. Departmental Silos & Total Accountability Void',
    subtitleAr: 'شيتات إكسيل متناقضة، غياب سجل تدقيق، وتبادل اللوم عند النزيف المالي',
    subtitleEn: 'Contradicting Excel sheets, zero immutable audit trail, and finger-pointing over budget leaks',
    icon: Lock,
    badgeAr: 'مشكلة الحوكمة والرقابة',
    badgeEn: 'Governance & Silo Chaos',
    accentColor: '#a855f7',
    threeColor: 0xa855f7,

    problemTitleAr: 'جزر معزولة.. والجميع يلقي باللوم على الآخر',
    problemTitleEn: 'Isolated Data Islands & The Endless Blame Game',
    problemDescAr: 'شيت الإكسيل لدى مشرف السكن يختلف عن كشف مطعم الإعاشة وعن كشف حركة النقل وعن كشف HR. لا أحد يعلم من اعتمد خروج العامل، ومراجعة الفواتير تستغرق شهوراً وسط نزيف مالي مستمر.',
    problemDescEn: 'Camp supervisor’s spreadsheet contradicts kitchen numbers, which contradict bus logs and HR rosters. Zero immutable audit trail. Invoicing audits take months while losses continue unchecked.',
    problemStatsAr: [
      { label: 'زمن مطابقة الحسابات', value: '30 - 45 يوماً', sub: 'تأخر مالي مزمن' },
      { label: 'سجل التدقيق الرقمي', value: '0% (منعدم)', sub: 'لا يوجد تتبع' },
      { label: 'تضارب البيانات بين الأقسام', value: 'يومي ومتكرر', sub: 'أرقام متناقضة' }
    ],
    problemStatsEn: [
      { label: 'Reconciliation Delay', value: '30 - 45 Days', sub: 'Severe latency' },
      { label: 'Digital Audit Trail', value: '0% (Non-existent)', sub: 'Zero tracking' },
      { label: 'Inter-Dept Data Drift', value: 'Constant Daily', sub: 'Conflicting headcounts' }
    ],

    solutionTitleAr: 'النواة المركزية الموحدة (Single Source of Truth)',
    solutionTitleEn: 'Unified Single Source of Truth & Cryptographic Audit Ledger',
    solutionDescAr: 'قاعدة بيانات علائقية مركزية موحدة تسجل كل عملية وتغيير حالة بطابع زمني مشفر وهوية المشرف المسؤول. مطابقة مالية وتشغيلية لحظية بضغطة زر واحدة أمام مجلس الإدارة.',
    solutionDescEn: 'Centralized relational core recording every worker status change, leave, meal, and dispatch with cryptographically signed supervisor stamps. Instant 1-click audit reconciliation for the board.',
    solutionStatsAr: [
      { label: 'زمن المطابقة المالية', value: 'لحظي (0.3 ثانية)', sub: 'تقارير فورية' },
      { label: 'سجل التدقيق والحوكمة', value: '100% غير قابل للتلاعب', sub: 'مساءلة كاملة' },
      { label: 'تطابق بيانات الإدارات', value: '100% متزامن', sub: 'مرجع وحيد موثوق' }
    ],
    solutionStatsEn: [
      { label: 'Audit Speed', value: 'Instant (0.3s)', sub: 'Real-time telemetry' },
      { label: 'Audit Trail Tamper-Proof', value: '100% Immutable', sub: 'Full accountability' },
      { label: 'Data Synchronization', value: '100% Live', sub: 'Single source of truth' }
    ],

    roiMetricAr: 'إغلاق 100% من ثغرات التلاعب المالي وإصدار تقارير مراجعة فورية',
    roiMetricEn: '100% closure of financial leakage loopholes + instant board-level audit reports',
    annualValueAr: 'وفر سنوي مباشر: 850,000 ج.م',
    annualValueEn: 'Direct Annual Savings: $54,000+'
  }
};

export const PROBLEM_KEYS: ProblemType[] = ['archive', 'housing', 'catering', 'transit', 'governance'];

interface SceneProblemDeepDive3DProps {
  activeProblem: ProblemType;
  mode: 'problem' | 'solution';
  onToggleMode: () => void;
}

export const SceneProblemDeepDive3D: React.FC<SceneProblemDeepDive3DProps> = ({
  activeProblem,
  mode,
  onToggleMode,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  const [isRotating, setIsRotating] = useState<boolean>(true);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth || 750;
    const height = mount.clientHeight || 420;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x060918, 0.04);

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 6.5, 11);
    camera.lookAt(0, 0.8, 0);

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    mount.innerHTML = '';
    mount.appendChild(renderer.domElement);

    // 3. Cinematic Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x38bdf8, 2.5);
    keyLight.position.set(6, 12, 8);
    scene.add(keyLight);

    const redAlertLight = new THREE.PointLight(0xef4444, 3.5, 25);
    redAlertLight.position.set(0, 4, 2);
    scene.add(redAlertLight);

    const greenSolutionLight = new THREE.PointLight(0x10b981, 3.5, 25);
    greenSolutionLight.position.set(0, 4, 2);
    scene.add(greenSolutionLight);

    // 4. Base Cybernetic Stage
    const stageGeo = new THREE.CylinderGeometry(5.8, 6.2, 0.35, 48);
    const stageMat = new THREE.MeshStandardMaterial({
      color: 0x090e24,
      metalness: 0.85,
      roughness: 0.25,
    });
    const stageMesh = new THREE.Mesh(stageGeo, stageMat);
    stageMesh.position.y = -0.17;
    scene.add(stageMesh);

    const stageRingGeo = new THREE.RingGeometry(5.6, 5.9, 48);
    const stageRingMat = new THREE.MeshBasicMaterial({
      color: mode === 'problem' ? 0xef4444 : 0x06b6d4,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.7,
    });
    const stageRing = new THREE.Mesh(stageRingGeo, stageRingMat);
    stageRing.rotation.x = Math.PI / 2;
    stageRing.position.y = 0.02;
    scene.add(stageRing);

    const gridHelper = new THREE.GridHelper(11.5, 18, 0x0284c7, 0x1e293b);
    gridHelper.position.y = 0.03;
    scene.add(gridHelper);

    // Master Dynamic Content Group
    const contentGroup = new THREE.Group();
    scene.add(contentGroup);

    // Array to hold animated parts
    const animatables: {
      update: (elapsed: number) => void;
    }[] = [];

    // ==========================================
    // SCENE BUILDER ACCORDING TO activeProblem
    // ==========================================
    if (activeProblem === 'archive') {
      // ----------------------------------------------------
      // 1. ARCHIVE: Paper Chaos VS Biometric Hologram Vault
      // ----------------------------------------------------
      if (mode === 'problem') {
        // PROBLEM: Disorganized chaotic filing cabinets & falling papers
        const cabinetGeo = new THREE.BoxGeometry(2.4, 3.2, 1.4);
        const cabinetMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.6, roughness: 0.5 });
        const cabinet = new THREE.Mesh(cabinetGeo, cabinetMat);
        cabinet.position.set(0, 1.6, -0.5);
        contentGroup.add(cabinet);

        // Open drawers spilling papers
        for (let d = 0; d < 3; d++) {
          const drawerGeo = new THREE.BoxGeometry(2.2, 0.6, 1.5);
          const drawerMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.4 });
          const drawer = new THREE.Mesh(drawerGeo, drawerMat);
          drawer.position.set(0, 0.7 + d * 0.9, 0.3 + d * 0.15);
          contentGroup.add(drawer);
        }

        // Floating falling chaotic papers with red exclamation aura
        const paperGeo = new THREE.PlaneGeometry(0.5, 0.7);
        const paperMat = new THREE.MeshBasicMaterial({ color: 0xf87171, side: THREE.DoubleSide, transparent: true, opacity: 0.85 });
        const papers: THREE.Mesh[] = [];

        for (let i = 0; i < 16; i++) {
          const paper = new THREE.Mesh(paperGeo, paperMat);
          paper.position.set((Math.random() - 0.5) * 4.5, 0.5 + Math.random() * 3.5, (Math.random() - 0.5) * 3);
          paper.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
          contentGroup.add(paper);
          papers.push(paper);
        }

        // Red Warning Beacon on top
        const beaconGeo = new THREE.ConeGeometry(0.4, 0.8, 16);
        const beaconMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
        const beacon = new THREE.Mesh(beaconGeo, beaconMat);
        beacon.position.set(0, 3.6, -0.5);
        contentGroup.add(beacon);

        animatables.push({
          update: (t) => {
            beacon.rotation.y = t * 4;
            papers.forEach((p, idx) => {
              p.position.y -= 0.012;
              p.rotation.x += 0.02;
              p.rotation.z += 0.015;
              if (p.position.y < 0.2) p.position.y = 3.8 + (idx % 3) * 0.4;
            });
          }
        });

      } else {
        // SOLUTION: Encrypted Holographic Vault with spinning laser lock & biometric card
        const cardGeo = new THREE.BoxGeometry(1.8, 2.6, 0.15);
        const cardMat = new THREE.MeshStandardMaterial({
          color: 0x06b6d4,
          metalness: 0.8,
          roughness: 0.15,
          emissive: 0x0891b2,
          emissiveIntensity: 0.6
        });
        const cardMesh = new THREE.Mesh(cardGeo, cardMat);
        cardMesh.position.set(0, 2.0, 0);
        contentGroup.add(cardMesh);

        // Holographic Dual Cyber Rings
        const ringGeo1 = new THREE.TorusGeometry(2.2, 0.04, 16, 64);
        const ringMat1 = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.8 });
        const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
        ring1.position.set(0, 2.0, 0);
        contentGroup.add(ring1);

        const ringGeo2 = new THREE.TorusGeometry(2.6, 0.03, 16, 64);
        const ringMat2 = new THREE.MeshBasicMaterial({ color: 0x10b981, transparent: true, opacity: 0.7 });
        const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
        ring2.position.set(0, 2.0, 0);
        contentGroup.add(ring2);

        // Vertical Laser Scan Bar
        const scanGeo = new THREE.BoxGeometry(2.4, 0.05, 0.3);
        const scanMat = new THREE.MeshBasicMaterial({ color: 0xa5f3fc });
        const scanBar = new THREE.Mesh(scanGeo, scanMat);
        scanBar.position.set(0, 2.0, 0.1);
        contentGroup.add(scanBar);

        animatables.push({
          update: (t) => {
            cardMesh.rotation.y = Math.sin(t * 1.5) * 0.35;
            cardMesh.position.y = 2.0 + Math.sin(t * 2) * 0.12;
            ring1.rotation.z = t * 0.8;
            ring1.rotation.x = Math.sin(t * 0.5) * 0.4;
            ring2.rotation.z = -t * 0.6;
            ring2.rotation.y = Math.cos(t * 0.6) * 0.4;
            scanBar.position.y = 2.0 + Math.sin(t * 4) * 1.2;
          }
        });
      }

    } else if (activeProblem === 'housing') {
      // ----------------------------------------------------
      // 2. HOUSING: Ghost Beds & Money Bleed VS 10-Day Eviction
      // ----------------------------------------------------
      if (mode === 'problem') {
        // PROBLEM: Bunk bed with red phantom figure & dropping coins
        const bunkGroup = new THREE.Group();
        bunkGroup.position.set(0, 0, 0);
        contentGroup.add(bunkGroup);

        // Bed frame
        const frameMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.7, roughness: 0.4 });
        const mattressMat = new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.6 });

        // Lower bed
        const m1 = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.3, 4.2), mattressMat);
        m1.position.set(0, 0.6, 0);
        bunkGroup.add(m1);

        // Upper bed
        const m2 = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.3, 4.2), mattressMat);
        m2.position.set(0, 2.3, 0);
        bunkGroup.add(m2);

        // Four posts
        const postGeo = new THREE.BoxGeometry(0.15, 3.2, 0.15);
        [[-1.15, -2], [1.15, -2], [-1.15, 2], [1.15, 2]].forEach(([px, pz]) => {
          const post = new THREE.Mesh(postGeo, frameMat);
          post.position.set(px, 1.6, pz);
          bunkGroup.add(post);
        });

        // Phantom Red Ghost Floating
        const ghostGeo = new THREE.BoxGeometry(1.2, 1.8, 1.2);
        const ghostMat = new THREE.MeshBasicMaterial({ color: 0xf43f5e, wireframe: true, transparent: true, opacity: 0.7 });
        const ghost = new THREE.Mesh(ghostGeo, ghostMat);
        ghost.position.set(0, 1.3, 0);
        contentGroup.add(ghost);

        // Leaking Gold Currency Tokens falling to floor
        const coinGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.05, 16);
        const coinMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.9, roughness: 0.2 });
        const coins: THREE.Mesh[] = [];

        for (let c = 0; c < 10; c++) {
          const coin = new THREE.Mesh(coinGeo, coinMat);
          coin.position.set((Math.random() - 0.5) * 1.5, 0.2 + Math.random() * 2.2, (Math.random() - 0.5) * 2.5);
          contentGroup.add(coin);
          coins.push(coin);
        }

        animatables.push({
          update: (t) => {
            ghost.position.y = 1.3 + Math.sin(t * 3) * 0.15;
            ghost.rotation.y = t * 0.5;
            coins.forEach((c) => {
              c.position.y -= 0.025;
              c.rotation.x += 0.04;
              if (c.position.y < 0.1) c.position.y = 2.4;
            });
          }
        });

      } else {
        // SOLUTION: Laser Bed Scanner & 10-Day Available Bed Green Matrix
        const bunkGroup = new THREE.Group();
        contentGroup.add(bunkGroup);

        const frameMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.8, roughness: 0.3 });
        const mattressMat = new THREE.MeshStandardMaterial({ color: 0x10b981, roughness: 0.3, emissive: 0x059669, emissiveIntensity: 0.4 });

        const m1 = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.3, 4.2), mattressMat);
        m1.position.set(0, 0.6, 0);
        bunkGroup.add(m1);

        const m2 = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.3, 4.2), mattressMat);
        m2.position.set(0, 2.3, 0);
        bunkGroup.add(m2);

        const postGeo = new THREE.BoxGeometry(0.15, 3.2, 0.15);
        [[-1.15, -2], [1.15, -2], [-1.15, 2], [1.15, 2]].forEach(([px, pz]) => {
          const post = new THREE.Mesh(postGeo, frameMat);
          post.position.set(px, 1.6, pz);
          bunkGroup.add(post);
        });

        // 10-Day Laser Grid Shield
        const shieldGeo = new THREE.BoxGeometry(2.8, 3.4, 4.6);
        const shieldMat = new THREE.MeshBasicMaterial({ color: 0x84cc16, wireframe: true, transparent: true, opacity: 0.45 });
        const shield = new THREE.Mesh(shieldGeo, shieldMat);
        shield.position.set(0, 1.7, 0);
        contentGroup.add(shield);

        // Holographic Floating Verification Token
        const tokenGeo = new THREE.OctahedronGeometry(0.7, 0);
        const tokenMat = new THREE.MeshStandardMaterial({ color: 0xa3e635, emissive: 0x65a30d, emissiveIntensity: 0.8 });
        const token = new THREE.Mesh(tokenGeo, tokenMat);
        token.position.set(0, 3.7, 0);
        contentGroup.add(token);

        animatables.push({
          update: (t) => {
            token.rotation.y = t * 2;
            token.position.y = 3.7 + Math.sin(t * 3) * 0.15;
            shield.rotation.y = Math.sin(t * 0.5) * 0.05;
          }
        });
      }

    } else if (activeProblem === 'catering') {
      // ----------------------------------------------------
      // 3. CATERING: Meal Trays Dumped VS 1-Worker-1-Meal Turnstile
      // ----------------------------------------------------
      if (mode === 'problem') {
        // PROBLEM: Overproduction kitchen conveyor & trays dumping into red incinerator/waste chute
        const chuteGeo = new THREE.CylinderGeometry(1.4, 0.8, 1.8, 24);
        const chuteMat = new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.7, roughness: 0.4 });
        const chute = new THREE.Mesh(chuteGeo, chuteMat);
        chute.position.set(0, 0.9, 0);
        contentGroup.add(chute);

        // Waste chute red glow inside
        const glowChuteGeo = new THREE.CylinderGeometry(1.2, 0.6, 0.2, 24);
        const glowChuteMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
        const glowChute = new THREE.Mesh(glowChuteGeo, glowChuteMat);
        glowChute.position.set(0, 1.7, 0);
        contentGroup.add(glowChute);

        // Meal trays falling into chute
        const trayGeo = new THREE.BoxGeometry(0.9, 0.1, 0.6);
        const trayMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.3 });
        const trays: THREE.Mesh[] = [];

        for (let tr = 0; tr < 8; tr++) {
          const tray = new THREE.Mesh(trayGeo, trayMat);
          tray.position.set((Math.random() - 0.5) * 1.8, 1.9 + tr * 0.4, (Math.random() - 0.5) * 1.8);
          tray.rotation.set(Math.random() * 0.5, Math.random() * 0.5, Math.random() * 0.5);
          contentGroup.add(tray);
          trays.push(tray);
        }

        animatables.push({
          update: (t) => {
            glowChute.scale.setScalar(1.0 + Math.sin(t * 6) * 0.08);
            trays.forEach((tr, i) => {
              tr.position.y -= 0.02;
              tr.rotation.x += 0.02;
              if (tr.position.y < 1.7) {
                tr.position.y = 3.6 + (i % 2) * 0.3;
              }
            });
          }
        });

      } else {
        // SOLUTION: 1-Worker-1-Meal Biometric Turnstile with exact single sealed portion
        const kioskGeo = new THREE.BoxGeometry(1.2, 2.4, 0.8);
        const kioskMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.8, roughness: 0.2 });
        const kiosk = new THREE.Mesh(kioskGeo, kioskMat);
        kiosk.position.set(-1.4, 1.2, 0);
        contentGroup.add(kiosk);

        const screenGeo = new THREE.PlaneGeometry(0.8, 0.6);
        const screenMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
        const screen = new THREE.Mesh(screenGeo, screenMat);
        screen.position.set(-1.4, 1.7, 0.41);
        contentGroup.add(screen);

        // Precision Meal Dispenser Pod (Right side)
        const podGeo = new THREE.CylinderGeometry(0.9, 1.0, 1.4, 24);
        const podMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.7, roughness: 0.3 });
        const pod = new THREE.Mesh(podGeo, podMat);
        pod.position.set(1.2, 0.7, 0);
        contentGroup.add(pod);

        // Floating Golden Verified Meal Capsule
        const capsuleGeo = new THREE.BoxGeometry(1.0, 0.3, 0.7);
        const capsuleMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, emissive: 0xd97706, emissiveIntensity: 0.6 });
        const capsule = new THREE.Mesh(capsuleGeo, capsuleMat);
        capsule.position.set(1.2, 2.0, 0);
        contentGroup.add(capsule);

        // Holographic Barcode Beam between kiosk and meal
        const points = [new THREE.Vector3(-0.8, 1.7, 0.4), new THREE.Vector3(1.2, 2.0, 0)];
        const beamGeo = new THREE.BufferGeometry().setFromPoints(points);
        const beamMat = new THREE.LineBasicMaterial({ color: 0x10b981, linewidth: 2 });
        const beam = new THREE.Line(beamGeo, beamMat);
        contentGroup.add(beam);

        animatables.push({
          update: (t) => {
            capsule.position.y = 2.0 + Math.sin(t * 3) * 0.12;
            capsule.rotation.y = t * 1.5;
            beam.visible = Math.sin(t * 8) > -0.2;
          }
        });
      }

    } else if (activeProblem === 'transit') {
      // ----------------------------------------------------
      // 4. TRANSIT: Empty Buses VS AI Load Consolidation (94%)
      // ----------------------------------------------------
      if (mode === 'problem') {
        // PROBLEM: Multiple 3 empty buses with red smoke and high fuel burn
        const busGroup = new THREE.Group();
        contentGroup.add(busGroup);

        const makeSmallBus = (x: number, z: number, yRot: number) => {
          const b = new THREE.Group();
          b.position.set(x, 0.5, z);
          b.rotation.y = yRot;

          // Body
          const body = new THREE.Mesh(
            new THREE.BoxGeometry(1.1, 0.9, 2.6),
            new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.5 })
          );
          b.add(body);

          // Red Warning Roof Beacon
          const w = new THREE.Mesh(
            new THREE.BoxGeometry(0.3, 0.2, 0.3),
            new THREE.MeshBasicMaterial({ color: 0xef4444 })
          );
          w.position.y = 0.55;
          b.add(w);

          return b;
        };

        const b1 = makeSmallBus(-2.0, 0, 0);
        const b2 = makeSmallBus(0.2, -1.2, 0.3);
        const b3 = makeSmallBus(2.2, 0.8, -0.2);
        busGroup.add(b1, b2, b3);

        animatables.push({
          update: (t) => {
            b1.position.z = Math.sin(t * 1.5) * 0.4;
            b2.position.z = -1.2 + Math.cos(t * 1.2) * 0.4;
            b3.position.z = 0.8 + Math.sin(t * 1.8) * 0.3;
          }
        });

      } else {
        // SOLUTION: Single Grand Consolidated High-Tech Electric Coach (94% Fill)
        const coachGroup = new THREE.Group();
        coachGroup.position.set(0, 0.8, 0);
        contentGroup.add(coachGroup);

        // Streamlined Sleek Body
        const coachGeo = new THREE.BoxGeometry(1.8, 1.4, 4.6);
        const coachMat = new THREE.MeshStandardMaterial({
          color: 0x0284c7,
          metalness: 0.85,
          roughness: 0.15,
          emissive: 0x0369a1,
          emissiveIntensity: 0.3
        });
        const coach = new THREE.Mesh(coachGeo, coachMat);
        coachGroup.add(coach);

        // Panoramic Glass Windows
        const glassGeo = new THREE.BoxGeometry(1.84, 0.6, 4.2);
        const glassMat = new THREE.MeshPhysicalMaterial({
          color: 0xa5f3fc,
          transmission: 0.85,
          roughness: 0.1,
          transparent: true,
          opacity: 0.9
        });
        const glass = new THREE.Mesh(glassGeo, glassMat);
        glass.position.y = 0.2;
        coachGroup.add(glass);

        // Dynamic Cyan Laser Path on Ground
        const pathGeo = new THREE.BoxGeometry(0.3, 0.04, 8);
        const pathMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.7 });
        const pathLine = new THREE.Mesh(pathGeo, pathMat);
        pathLine.position.set(0, -0.65, 0);
        contentGroup.add(pathLine);

        // Headlight Beams
        const hl1 = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.15, 0.05), new THREE.MeshBasicMaterial({ color: 0x38bdf8 }));
        hl1.position.set(0.6, -0.2, 2.32);
        coachGroup.add(hl1);

        const hl2 = hl1.clone();
        hl2.position.set(-0.6, -0.2, 2.32);
        coachGroup.add(hl2);

        animatables.push({
          update: (t) => {
            coachGroup.position.z = Math.sin(t * 2) * 0.25;
            coachGroup.position.y = 0.8 + Math.sin(t * 5) * 0.03;
          }
        });
      }

    } else {
      // ----------------------------------------------------
      // 5. GOVERNANCE: Disconnected Silos VS Quantum Relational Core
      // ----------------------------------------------------
      if (mode === 'problem') {
        // PROBLEM: 4 isolated separate towers with snapping broken red cables
        const towersGroup = new THREE.Group();
        contentGroup.add(towersGroup);

        const towerGeo = new THREE.BoxGeometry(1.0, 2.6, 1.0);
        const towerMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.5, roughness: 0.4 });

        const positions: [number, number][] = [[-2.2, -1.5], [2.2, -1.5], [-2.2, 1.5], [2.2, 1.5]];
        positions.forEach(([tx, tz]) => {
          const tMesh = new THREE.Mesh(towerGeo, towerMat);
          tMesh.position.set(tx, 1.3, tz);
          towersGroup.add(tMesh);

          // Red alert on each tower
          const alertMesh = new THREE.Mesh(new THREE.SphereGeometry(0.25, 12, 12), new THREE.MeshBasicMaterial({ color: 0xef4444 }));
          alertMesh.position.set(tx, 2.8, tz);
          towersGroup.add(alertMesh);
        });

        // Broken sparking wire particles
        const sparkGeo = new THREE.BufferGeometry();
        const sparkCount = 40;
        const sparkPos = new Float32Array(sparkCount * 3);
        for (let s = 0; s < sparkCount; s++) {
          sparkPos[s * 3] = (Math.random() - 0.5) * 4.5;
          sparkPos[s * 3 + 1] = 0.5 + Math.random() * 2;
          sparkPos[s * 3 + 2] = (Math.random() - 0.5) * 3;
        }
        sparkGeo.setAttribute('position', new THREE.BufferAttribute(sparkPos, 3));
        const sparkMat = new THREE.PointsMaterial({ color: 0xef4444, size: 0.15 });
        const sparkSystem = new THREE.Points(sparkGeo, sparkMat);
        contentGroup.add(sparkSystem);

        animatables.push({
          update: (t) => {
            towersGroup.position.y = Math.sin(t * 2) * 0.05;
            sparkSystem.rotation.y = t * 1.5;
          }
        });

      } else {
        // SOLUTION: Central Quantum Relational Core (Single Source of Truth) + 4 Synchronous Nodes
        const coreGroup = new THREE.Group();
        contentGroup.add(coreGroup);

        // Radiant central core
        const coreGeo = new THREE.IcosahedronGeometry(1.4, 1);
        const coreMat = new THREE.MeshStandardMaterial({
          color: 0xa855f7,
          emissive: 0x7e22ce,
          emissiveIntensity: 0.7,
          metalness: 0.85,
          roughness: 0.15
        });
        const centralCore = new THREE.Mesh(coreGeo, coreMat);
        centralCore.position.set(0, 2.2, 0);
        coreGroup.add(centralCore);

        // Rotating wireframe cage
        const cageGeo = new THREE.IcosahedronGeometry(1.6, 1);
        const cageMat = new THREE.MeshBasicMaterial({ color: 0xd8b4fe, wireframe: true, transparent: true, opacity: 0.6 });
        const cage = new THREE.Mesh(cageGeo, cageMat);
        cage.position.set(0, 2.2, 0);
        coreGroup.add(cage);

        // 4 Connected Peripheral Sockets with Laser Conduits
        const socketGeo = new THREE.CylinderGeometry(0.5, 0.6, 0.4, 16);
        const socketMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, emissive: 0x0284c7, emissiveIntensity: 0.5 });

        const positions: [number, number][] = [[-2.5, -1.8], [2.5, -1.8], [-2.5, 1.8], [2.5, 1.8]];
        positions.forEach(([sx, sz]) => {
          const sMesh = new THREE.Mesh(socketGeo, socketMat);
          sMesh.position.set(sx, 0.3, sz);
          coreGroup.add(sMesh);

          // Laser conduit to central core
          const pts = [new THREE.Vector3(sx, 0.3, sz), new THREE.Vector3(0, 2.2, 0)];
          const line = new THREE.Line(
            new THREE.BufferGeometry().setFromPoints(pts),
            new THREE.LineBasicMaterial({ color: 0xa855f7, transparent: true, opacity: 0.8, linewidth: 2 })
          );
          coreGroup.add(line);
        });

        animatables.push({
          update: (t) => {
            centralCore.rotation.y = t * 1.2;
            centralCore.rotation.x = t * 0.6;
            cage.rotation.y = -t * 0.9;
            const sc = 1.0 + Math.sin(t * 3) * 0.06;
            centralCore.scale.setScalar(sc);
          }
        });
      }
    }

    // 5. Ambient Cyber Particles
    const pCount = 120;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 11;
      pPos[i * 3 + 1] = Math.random() * 5.5;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 11;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({
      color: mode === 'problem' ? 0xef4444 : 0x38bdf8,
      size: 0.1,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });
    const pSystem = new THREE.Points(pGeo, pMat);
    scene.add(pSystem);

    // Mouse Drag Rotation
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
      sceneYaw += deltaX * 0.007;
      contentGroup.rotation.y = sceneYaw;
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    renderer.domElement.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    // Resize
    const handleResize = () => {
      if (!mount) return;
      const nw = mount.clientWidth;
      const nh = mount.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener('resize', handleResize);

    // Render loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Lights oscillation
      if (mode === 'problem') {
        redAlertLight.intensity = 2.8 + Math.sin(elapsed * 5) * 1.2;
        greenSolutionLight.intensity = 0.1;
      } else {
        redAlertLight.intensity = 0.1;
        greenSolutionLight.intensity = 3.0 + Math.sin(elapsed * 2.5) * 0.8;
      }

      // Idle Rotation
      if (isRotating && !isDragging) {
        contentGroup.rotation.y += 0.004;
        sceneYaw = contentGroup.rotation.y;
      }

      // Update custom scene animations
      animatables.forEach((a) => a.update(elapsed));

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      renderer.domElement.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, [activeProblem, mode, isRotating]);

  return (
    <div className="relative w-full h-[370px] sm:h-[410px] lg:h-[440px] rounded-2xl overflow-hidden border border-slate-700/80 bg-gradient-to-b from-slate-950 via-[#070c20] to-slate-950 shadow-[0_15px_50px_rgba(0,0,0,0.7)] select-none">
      {/* Three.js Canvas */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Top Left: 3D Mode Toggle Switch (The Problem vs Strong Solution) */}
      <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20 flex flex-col gap-2">
        <div className="p-1.5 rounded-2xl bg-slate-950/85 border border-slate-700/80 backdrop-blur-xl flex items-center gap-1.5 shadow-2xl">
          <button
            onClick={() => {
              if (mode !== 'problem') {
                soundManager.playTrigger();
                onToggleMode();
              }
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              mode === 'problem'
                ? 'bg-rose-600 text-white shadow-[0_0_20px_rgba(244,63,94,0.7)] scale-105'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>{t('مشهد المشكلة 3D (الواقع المأزوم)', 'Problem 3D (Legacy Crisis)')}</span>
          </button>

          <button
            onClick={() => {
              if (mode !== 'solution') {
                soundManager.playTrigger();
                onToggleMode();
              }
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              mode === 'solution'
                ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-white shadow-[0_0_25px_rgba(16,185,129,0.7)] scale-105'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-lime-200" />
            <span>{t('مشهد الحل الخارق 3D (منظومة الفارابي)', 'Extreme Solution 3D (Alfarabi Core)')}</span>
          </button>
        </div>

        {/* Live HUD Badge */}
        <div className="px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-700/80 backdrop-blur-md text-[11px] flex items-center gap-2 self-start">
          <div className={`w-2 h-2 rounded-full ${mode === 'solution' ? 'bg-emerald-400 animate-pulse' : 'bg-rose-500 animate-ping'}`} />
          <span className="text-slate-200 font-mono font-semibold">
            {mode === 'solution'
              ? t('معالجة جذرية نشطة 100%', 'Engineered Solution Active')
              : t('نزيف مالي وهدر تشغيلي مستمر', 'Active Financial & Resource Waste')}
          </span>
        </div>
      </div>

      {/* Top Right: Rotation & 360 Hint */}
      <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 flex items-center gap-2">
        <button
          onClick={() => setIsRotating(prev => !prev)}
          className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold border backdrop-blur-md transition flex items-center gap-1.5 ${
            isRotating
              ? 'bg-slate-800/80 border-slate-600 text-cyan-300'
              : 'bg-slate-900/80 border-slate-700 text-slate-400'
          }`}
          title={t('إيقاف / تدوير النموذج 3D', 'Toggle Rotation')}
        >
          <RotateCcw className={`w-3 h-3 ${isRotating ? 'animate-spin' : ''}`} />
          <span className="hidden sm:inline">{t('تدوير 3D', 'Auto-Rotate')}</span>
        </button>

        <div className="px-2.5 py-1.5 rounded-xl bg-slate-900/80 border border-slate-700/80 text-[10px] text-slate-300 font-mono hidden md:flex items-center gap-1">
          <Eye className="w-3 h-3 text-cyan-400" />
          <span>{t('اسحب 360° للمعاينة الحرة', 'Drag 360° to Inspect')}</span>
        </div>
      </div>
    </div>
  );
};
