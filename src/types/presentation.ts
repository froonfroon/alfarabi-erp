export interface SlideData {
  id: number;
  sectionAr: string;
  sectionEn: string;
  titleAr: string;
  titleEn: string;
  subtitleAr: string;
  subtitleEn: string;
  executiveTagAr: string;
  executiveTagEn: string;
  presenterNotesAr: string[];
  presenterNotesEn: string[];
}

export const SLIDES_CONFIG: SlideData[] = [
  {
    id: 1,
    sectionAr: "الافتتاحية",
    sectionEn: "Keynote Opening",
    titleAr: "من التشغيل التقليدي إلى الإدارة الذكية",
    titleEn: "From Legacy Field Operations to Intelligent Enterprise ERP",
    subtitleAr: "منظومة ERP متكاملة ومترابطة لإدارة العمالة والسكن والتغذية والنقل بشركة الفارابي",
    subtitleEn: "An Integrated Enterprise Platform Orchestrating Workforce, Accommodation, Catering, and Transportation for Alfarabi",
    executiveTagAr: "عرض تقديمي استراتيجي للإدارة العليا",
    executiveTagEn: "Executive Strategic Keynote for Board of Directors",
    presenterNotesAr: [
      "الترحيب بالحضور من قيادات الشركة والإدارة التنفيذية والشركاء الدوليين.",
      "التأكيد على أن الهدف هو الانتقال من جزر البيانات المعزولة إلى منصة موحدة تعطي تحكمًا كاملًا في تكاليف الموارد اليومية.",
      "توضيح ركائز المنظومة الأربع: وثائق العمالة، إدارة السكنات، الإعاشة والتغذية، والحركة والنقل."
    ],
    presenterNotesEn: [
      "Welcome executive board members and senior operational directors.",
      "Highlight the primary objective: transitioning from disconnected data silos to a unified digital data plane that controls daily resource costs.",
      "Introduce the 4 operational pillars: Workforce Records, Accommodation, Catering Governance, and Fleet Transportation."
    ]
  },
  {
    id: 2,
    sectionAr: "الرؤية التنفيذية",
    sectionEn: "Executive Vision",
    titleAr: "منظومة واحدة.. رؤية تشغيلية موحدة",
    titleEn: "Single Data Plane — Unified Operational Vision",
    subtitleAr: "ربط أربعة قطاعات حيوية في قاعدة بيانات مركزية تضمن تدفق البيانات بدون فجوات",
    subtitleEn: "Unifying Four Critical Operational Pillars Under One Relational Core to Eliminate Blind Spots and Decision Latency",
    executiveTagAr: "التكامل التشغيلي المقترح",
    executiveTagEn: "Proposed Architectural Integration",
    presenterNotesAr: [
      "شرح فكرة الربط: تغيير الحالة في أي قسم ينعكس لحظيًا على بقية الأقسام.",
      "التأكيد على أن هذا حل مقترح ومدروس هندسيًا وليس نظامًا مسبق الصنع غير مرن.",
      "توضيح القيمة: إيقاف الهدر الناتج عن تأخر المعلومة بين السكن والمطبخ والأتوبيسات."
    ],
    presenterNotesEn: [
      "Explain real-time cross-pillar propagation: a status update in accommodation instantly impacts catering demand and bus seating.",
      "Emphasize that this is an engineered, tailor-made architecture designed specifically for Alfarabi's operating environment.",
      "Clarify the executive ROI: stopping financial waste caused by delayed handoffs between camps, kitchens, and transit dispatch."
    ]
  },
  {
    id: 3,
    sectionAr: "تحديات الوضع الراهن",
    sectionEn: "Operational Friction",
    titleAr: "أين نفقد الوقت والدقة والمال؟",
    titleEn: "Where Value, Capital, and Operational Time Are Leaked",
    subtitleAr: "التحديات الخمسة التي تواجه العمليات اليومية وتستنزف الميزانية والمجهود",
    subtitleEn: "Diagnostic Breakdown of the 5 Core Systemic Inefficiencies in Legacy Spreadsheet Operations",
    executiveTagAr: "تشخيص واقع العمليات",
    executiveTagEn: "Field Inefficiency Diagnostics",
    presenterNotesAr: [
      "تفعيل المحاكاة ثلاثية الأبعاد (3D Hologram) واستعراض الفارق بين وضع الفوضى التقليدية (Legacy) ووضع معالجة الفارابي (Solution Engine).",
      "الضغط على العقد ثلاثية الأبعاد لشرح معالجة كل ركيزة: أزمة الأرشيف الورقي، الأسرة الوهمية بالسكن، هدر الوجبات بالمطبخ، والحافلات غير المستغلة.",
      "استعراض حاسبة استرداد رأس المال لتوضيح كيف يوفر حل هذه المشكلات ملايين الجنيهات سنويًا لشركة الفارابي."
    ],
    presenterNotesEn: [
      "Engage the interactive 3D Hologram to demonstrate the immediate structural contrast between Legacy Chaos and Alfarabi Solution Engine.",
      "Click each 3D node to drill down into root-cause resolution: paper archives, phantom beds, catering waste, and deadhead transit dispatch.",
      "Switch to the Value Recovery tab to demonstrate the compounding millions saved annually through unified data orchestration."
    ]
  },
  {
    id: 4,
    sectionAr: "المعمارية المقترحة",
    sectionEn: "System Architecture",
    titleAr: "قلب رقمي واحد يربط كل العمليات",
    titleEn: "The Digital Core: A Unified Operational Nerve Center",
    subtitleAr: "معمارية برمجية سحابية آمنة تربط معرف العامل الموحد (Worker ID) بكافة الخدمات",
    subtitleEn: "Enterprise Cloud-Native Architecture Centered on a Unique Worker ID Binding Identity, Bed, Meal, and Transit",
    executiveTagAr: "الهندسة التقنية للمنظومة",
    executiveTagEn: "Cloud-Native Relational Architecture",
    presenterNotesAr: [
      "شرح مفهوم Worker ID كخيط ناظم لكل بيانات العامل: وثائق، سرير، وجبة، ومقعد أتوبيس.",
      "توضيح دور قاعدة البيانات المركزية وأمان البيانات.",
      "التأكيد على أن لوحة الإدارة العليا تسحب بيانات حقيقية لحظية وليست تقارير ورقية متأخرة."
    ],
    presenterNotesEn: [
      "Explain the Worker ID as the canonical thread connecting compliance files, bed slots, meal authorizations, and transport seats.",
      "Demonstrate the relational database layer and event-driven API triggers.",
      "Reiterate that executive cockpits consume live transactional data, not compiled post-facto spreadsheets."
    ]
  },
  {
    id: 5,
    sectionAr: "وثائق العمالة",
    sectionEn: "Workforce Dossier",
    titleAr: "من أرشيف ورقي مشتت إلى ملف رقمي موحد لكل عامل",
    titleEn: "Pillar 1: Workforce Identity, Digital Dossier & Compliance",
    subtitleAr: "ملف رقمي تفاعلي مشفر يجمع البطاقة الشخصية، الفيش الجنائي، وعقود العمل برقم موحد",
    subtitleEn: "Encrypted 3D Digital Worker Dossier Consolidating National IDs, Police Clearance, and Contracts Under a Single ID",
    executiveTagAr: "إدارة الهوية والوثائق",
    executiveTagEn: "Digital Identity & Regulatory Compliance",
    presenterNotesAr: [
      "استعراض المشاكل السابقة في فقدان صور البطاقات وتكرار البحث اليدوي.",
      "استعراض بروفايل العامل الرقمي ومؤشرات اكتمال الوثائق وتواريخ الصلاحية.",
      "توضيح سجل التعديلات (Audit Trail) الذي يسجل اسم الموظف وتاريخ كل إضافة."
    ],
    presenterNotesEn: [
      "Review historical pain: misplaced photo IDs, lost criminal records, and repeated manual document hunting.",
      "Showcase the 3D digital profile showing validity status, expiration beacons, and compliance checks.",
      "Highlight the immutable audit trail tracking who uploaded, verified, or approved each record."
    ]
  },
  {
    id: 6,
    sectionAr: "أتمتة الأرشيف",
    sectionEn: "Document Automation",
    titleAr: "من رفع المستند إلى الأرشفة.. بدون فوضى يدوية",
    titleEn: "Automated Document Lifecycle & Google Drive API Synchronization",
    subtitleAr: "دورة عمل قياسية من 8 مراحل مدعومة بالمزامنة المعتمدة مع Google Drive وتصنيف تلقائي",
    subtitleEn: "An 8-Stage Standardized Ingestion Pipeline with Deduplication, Role-Based Access, and Enterprise Cloud Sync",
    executiveTagAr: "هندسة أتمتة الوثائق",
    executiveTagEn: "Document Ingestion Pipeline",
    presenterNotesAr: [
      "شرح شجرة المجلدات المقترحة: Worker-Archive المنظم تلقائيًا.",
      "التأكيد على المصداقية التقنية: الربط مع Google Drive يتم عبر API معتمد بتصاريح واضحة.",
      "توضيح آليات التحقق من صحة الملفات ومنع التكرار ومعالجة أخطاء الرفع."
    ],
    presenterNotesEn: [
      "Walk through the canonical directory structure (/Worker-Archive/Worker-ID-xxxx/...).",
      "Emphasize technical integrity: cloud sync utilizes official Google Drive REST APIs with OAuth2 authorization.",
      "Explain automated checksum validation, duplicate detection, and robust retry queues."
    ]
  },
  {
    id: 7,
    sectionAr: "إدارة السكنات",
    sectionEn: "Accommodation Management",
    titleAr: "إدارة السكنات بالأرقام الفعلية.. وليس بالتقديرات",
    titleEn: "Pillar 2: Accommodation Intelligence & Real-Time Bed Occupancy",
    subtitleAr: "خريطة تفاعلية لكافة المباني والغرف والأسرة وتحديد لحظي للإشغال والغياب والشواغر",
    subtitleEn: "3D Spatial Camp Twin Providing Live Telemetry on Buildings, Rooms, Beds, Absences, and Actual Vacancies",
    executiveTagAr: "إدارة الأصول السكنية",
    executiveTagEn: "Real Estate & Bed Asset Optimization",
    presenterNotesAr: [
      "إيضاح مشكلة العمالة غير المنتظمة والانتقال بين السكنات دون إخطار الإدارة.",
      "عرض حالات السرير الخمس: مشغول، غائب مؤقتًا، شاغر، محجوز، وتحت المراجعة.",
      "إبراز سهولة التسكين وتغيير الغرف بضغطة زر مع تسجيل تاريخ الحركة."
    ],
    presenterNotesEn: [
      "Detail irregular workforce mobility and unauthorized camp-hopping.",
      "Present the 5 canonical bed states: Occupied, Temporarily Absent, Vacant, Reserved, and Pending Review.",
      "Demonstrate zero-friction supervisor room transfers with full history logging."
    ]
  },
  {
    id: 8,
    sectionAr: "سياسة حجز الأسرة",
    sectionEn: "Bed Retention Policy",
    titleAr: "كل سرير له حالة.. وكل يوم غياب محسوب",
    titleEn: "The 10-Day Bed Reservation Policy: Automated Timelines & Governance",
    subtitleAr: "حوكمة سياسة الـ 10 أيام للغياب: تتبع زمني آلي، تنبيهات للمشرفين، وقرار إداري معتمد",
    subtitleEn: "Automated Absence Timers with Multi-Stage Escalation, Day-10 Management Alerts, and Controlled Release Workflow",
    executiveTagAr: "حوكمة الغياب والشواغر",
    executiveTagEn: "Automated Governance & Escalation",
    presenterNotesAr: [
      "التأكيد على نقطة جوهرية: النظام لا يفرغ السرير عشوائيًا، بل يطلق تنبيهًا عند اليوم 10 للمراجعة وفق السياسة.",
      "مرونة استثناء الإجازات الرسمية أو المرضية المعتمدة مسبقًا.",
      "تحويل السرير لشاغر فقط بعد توقيع واعتماد مدير العمليات."
    ],
    presenterNotesEn: [
      "Crucial legal rule: the ERP never automatically evicts a bed solely on day 10 without managerial confirmation.",
      "Show how approved medical leaves and official exceptions suspend the countdown timer.",
      "Highlight the formal sign-off gateway required before reallocating a bed to new intake."
    ]
  },
  {
    id: 9,
    sectionAr: "سهولة الاستخدام للعمال",
    sectionEn: "Zero-Friction Usability",
    titleAr: "نظام عملي.. حتى لو العامل لا يمتلك هاتفًا ذكيًا",
    titleEn: "Zero-Friction Field Usability: Pragmatic Non-Smartphone Architecture",
    subtitleAr: "منظومة إدارية أولًا (Administrator-First) تعتمد على المشرفين، البطاقات الذكية ومحطات العمل",
    subtitleEn: "Administrator-First Architecture Utilizing Supervisor Tablets, Rugged Scanners, and Physical Barcode Cards",
    executiveTagAr: "الواقعية والجدوى التشغيلية",
    executiveTagEn: "Inclusive Industrial Operations",
    presenterNotesAr: [
      "التشديد على مراعاة ظروف العمال: لا يشترط امتلاك هاتف ذكي أو تنزيل تطبيق أو باقة إنترنت.",
      "الاعتماد على أجهزة المشرفين (Tablets/Desktops) وكروت باركود ميسرة أو البحث برقم العامل.",
      "إمكانية الاستيراد الجماعي من شيتات الإكسيل المعتمدة بدون تعقيد."
    ],
    presenterNotesEn: [
      "Stress operational realism: zero worker smartphone requirements, zero data plan dependencies, zero adoption resistance.",
      "Operated via field supervisor touchscreens, desktop terminals, and durable barcode/QR identity badges.",
      "Seamless batch synchronization from approved Excel imports for rapid site onboarding."
    ]
  },
  {
    id: 10,
    sectionAr: "إدارة التغذية",
    sectionEn: "Catering Management",
    titleAr: "عدد الوجبات يجب أن يعكس عدد العمال المستحقين فعليًا",
    titleEn: "Pillar 3: Catering & Precision Meal Demand Optimization",
    subtitleAr: "ربط مطبخ الإعاشة ببيانات الحضور الفعلي في السكن ومواقع العمل لمنع هدر الميزانية",
    subtitleEn: "Eliminating Food Budget Wastage by Directing Kitchen Production Telemetry from Actual Confirmed Headcounts",
    executiveTagAr: "إدارة تكاليف الإعاشة",
    executiveTagEn: "Catering Cost & Waste Elimination",
    presenterNotesAr: [
      "كشف حجم الهدر في المطبخ عند تجهيز وجبات بناءً على كشوف قديمة لا تستبعد الغائبين.",
      "تحديد الاستحقاق وفق الوردية والموقع ونوع الوجبة (إفطار/غداء/عشاء).",
      "لوحة تحكم للشيف والمشرف توضح الكميات المطلوبة بدقة مع نسبة احتياطي آمنة قابلة للتعديل."
    ],
    presenterNotesEn: [
      "Quantify historical kitchen wastage caused by cooking against static rosters that ignore daily absenteeism.",
      "Granular entitlement calculation by shift, worksite, camp location, and meal slot (Breakfast, Lunch, Dinner).",
      "Real-time kitchen production dashboard featuring configurable safety buffers."
    ]
  },
  {
    id: 11,
    sectionAr: "حوكمة صرف الوجبات",
    sectionEn: "Meal Issuance Governance",
    titleAr: "صرف منضبط.. وهدر أقل",
    titleEn: "The Single Authorized Meal Rule: Controlled Issuance & Anti-Duplication",
    subtitleAr: "قاعدة عامل واحد = وجبة واحدة معتمدة: مراقبة فورية لعمليات الصرف وكشف التكرار والفائض",
    subtitleEn: "Strict Verification Distinguishing Planned Portions, Authorized Allocations, and Confirmed Physical Issuance",
    executiveTagAr: "مراقبة الصرف والحد من الفاقد",
    executiveTagEn: "Portion Verification & Variance Tracking",
    presenterNotesAr: [
      "شرح كيفية التحقق السريع من الاستحقاق عند نقطة التوزيع.",
      "منع تكرار صرف الوجبة للعامل نفسه في نفس الفترة الزمنية.",
      "عرض أرقام تجريبية واضحة للمقارنة بين المخطط والمجهز والمصروف والفائض."
    ],
    presenterNotesEn: [
      "Rapid entitlement scanning at field serving stations.",
      "Algorithmic lockout preventing double-dipping or unauthorized multiple meal receipts per worker per meal window.",
      "Transparent delta tracking between planned portions, prepared meals, issued trays, and documented waste."
    ]
  },
  {
    id: 12,
    sectionAr: "النقل والأتوبيسات",
    sectionEn: "Fleet & Transit",
    titleAr: "العدد الفعلي قبل الوردية.. والقرار قبل تحرك الأتوبيس",
    titleEn: "Pillar 4: Transportation Dispatch & Fleet Capacity Balancing",
    subtitleAr: "تنسيق أسطول النقل بناءً على الجاهزية المؤكدة للعمال وجداول الورديات ومسارات الحركة",
    subtitleEn: "Synchronizing Bus Fleet Dispatch with Pre-Shift Confirmed Worker Readiness to Eliminate Deadhead Runs",
    executiveTagAr: "إدارة الأسطول والحركة",
    executiveTagEn: "Intelligent Fleet Orchestration",
    presenterNotesAr: [
      "معالجة مشكلة مفاجآت الورديات: إما نقص السعة وتعطل الإنتاج أو خروج أتوبيسات شبه خالية.",
      "حصر دقيق لركاب كل نقطة تجمع قبل موعد الانطلاق بوقت كافٍ.",
      "إصدار أمر الحركة والمصادقة عليه رقميًا."
    ],
    presenterNotesEn: [
      "Eradicate shift-change surprises: eliminate plant downtime from insufficient buses and stop empty 50-seater runs.",
      "Accurate headcount validation per pickup hub 60 minutes before departure.",
      "Digital trip manifests authorized by shift supervisors before engine ignition."
    ]
  },
  {
    id: 13,
    sectionAr: "كفاءة الأسطول والتكلفة",
    sectionEn: "Fleet Cost Benchmark",
    titleAr: "الأتوبيس المناسب.. في الوقت المناسب.. بالعدد المناسب",
    titleEn: "Cost-Optimized Fleet Allocation: Before vs After Benchmark",
    subtitleAr: "مقارنة حية بين التقديرات اليدوية القديمة وتوزيع السعة الذكي المقترح لتقليل الرحلات الفارغة",
    subtitleEn: "Direct Comparative Analysis of Legacy Guesswork vs Algorithmic Capacity Matching and Route Optimization",
    executiveTagAr: "مقارنة قبل وبعد (Before & After)",
    executiveTagEn: "Comparative Operational Audit",
    presenterNotesAr: [
      "استعراض المقارنة: قبل النظام vs بعد تفعيل المنظومة.",
      "تنبيهات فورية عند تجاوز سعة الأتوبيس لطلب دعم مسبق بدلاً من التكدس المفاجئ.",
      "تقارير نسبة استغلال المقاعد وتكلفة الكيلومتر لتشغيل اقتصادي رشيد."
    ],
    presenterNotesEn: [
      "Compare legacy chaotic dispatching with disciplined capacity allocation.",
      "Automated route consolidation suggestions when passenger demand drops below threshold.",
      "Per-kilometer expenditure auditing and seat occupancy maximization reports."
    ]
  },
  {
    id: 14,
    sectionAr: "التكامل التشغيلي",
    sectionEn: "Cross-Pillar Orchestration",
    titleAr: "قيمة النظام الحقيقية في الربط بين الأقسام",
    titleEn: "Cross-Departmental Orchestration: The Ripple Effect in Action",
    subtitleAr: "محاكاة تفاعلية حية: كيف يؤثر إجراء واحد في قسم على باقي الأقسام الأربعة فورياً",
    subtitleEn: "Interactive Real-Time Simulation: How a Single Worker Event Propagates Across Identity, Camp, Kitchen, and Fleet",
    executiveTagAr: "محاكاة الأثر التتابعي (Ripple Effect)",
    executiveTagEn: "Synchronous Event Propagation",
    presenterNotesAr: [
      "هذه الشريحة هي قلب العرض: تجربة عملية حية أمام الإدارة.",
      "تسجيل غياب لعامل -> تحديث السكن -> خصم الوجبة من المطبخ -> تحرير مقعد الأتوبيس -> تحديث الداشبورد.",
      "إثبات أن الاستثمار في نظام موحد يلغي آلاف ساعات العمل اليدوي وملايين الجنيهات المهدرة."
    ],
    presenterNotesEn: [
      "This is the presentation's core value demonstration: live interactive simulation.",
      "Trigger an absence -> Bed updates -> Kitchen decrements meal (-1) -> Bus seat frees up -> Executive KPIs refresh.",
      "Concrete proof that architectural unification eliminates thousands of manual coordination hours."
    ]
  },
  {
    id: 15,
    sectionAr: "اللوحة التنفيذية",
    sectionEn: "Executive Cockpit",
    titleAr: "الإدارة ترى الصورة كاملة في شاشة واحدة",
    titleEn: "Executive Unified Cockpit: Real-Time Operational KPI Telemetry",
    subtitleAr: "لوحة تحكم قيادية تفاعلية تعرض مؤشرات الأداء الحيوية (KPIs) ونسب الإشغال والتنبيهات",
    subtitleEn: "Strategic C-Suite Command Center Providing Live Multi-Site Telemetry, Occupancy Ratios, and Proactive Escalations",
    executiveTagAr: "مركز المراقبة والتحكم الشامل",
    executiveTagEn: "Unified C-Suite Operations Hub",
    presenterNotesAr: [
      "استعراض الشاشة التي سيراها العضو المنتدب ومدير العمليات كل صباح.",
      "مؤشرات الإشغال، الحضور الفعلي، استهلاك الوجبات، وتوزيع الأسطول.",
      "التنويه بوضوح أن الأرقام المعروضة هي بيانات توضيحية تجريبية للديمو."
    ],
    presenterNotesEn: [
      "Demonstrate the executive morning briefing screen utilized by Managing Directors and Operations Chiefs.",
      "Instant visibility into actual headcount, bed occupancy %, meal precision, and transport fleet utilization.",
      "Strict disclaimer that displayed values represent illustrative demonstration telemetry."
    ]
  },
  {
    id: 16,
    sectionAr: "الحوكمة والأمان",
    sectionEn: "Security & Governance",
    titleAr: "صلاحيات واضحة.. بيانات محمية.. وسجل لكل إجراء",
    titleEn: "Enterprise Governance, Role-Based Access Control (RBAC) & Audit Integrity",
    subtitleAr: "مصفوفة صلاحيات دقيقة تعزل البيانات الحساسة وتضمن سرية البطاقات والفيش الجنائي وسجل التدقيق",
    subtitleEn: "Strict Data Isolation Shielding Sensitive National IDs and Police Records with Immutable Audit Logs",
    executiveTagAr: "الأمن السيبراني والامتثال",
    executiveTagEn: "Cybersecurity & Regulatory Compliance",
    presenterNotesAr: [
      "التشديد على حماية المستندات الشخصية: لا يسمح بمشاهدة الفيش الجنائي إلا للمصرح لهم.",
      "سجل تدقيق كامل (Audit Log) لا يمكن حذفه لكل حركة تعديل أو حذف أو تصدير.",
      "نسخ احتياطية وتشفير كامل للبيانات المخزنة والمتبادلة."
    ],
    presenterNotesEn: [
      "Strict data segregation: police clearance and ID documents restricted solely to authorized HR officers.",
      "Tamper-proof audit logging for every single data modification, transfer, or export.",
      "Enterprise AES-256 encryption at rest and in transit with automated off-site backups."
    ]
  },
  {
    id: 17,
    sectionAr: "خارطة طريق التنفيذ",
    sectionEn: "Deployment Roadmap",
    titleAr: "تنفيذ مرحلي.. بقيمة واضحة في كل مرحلة",
    titleEn: "Strategic Phased Deployment Roadmap: 6 Structured Milestones",
    subtitleAr: "خطة تنفيذ واقعية مقسمة على 6 مراحل تضمن استقرار التشغيل والتدريب وتفادي الصدمات",
    subtitleEn: "A Risk-Mitigated 6-Phase Execution Strategy Ensuring Zero Operational Disruption and Immediate Milestone ROI",
    executiveTagAr: "استراتيجية التدشين والجاهزية",
    executiveTagEn: "Structured Enterprise Delivery",
    presenterNotesAr: [
      "التأكيد على الواقعية: لن نطبق كل شيء بين ليلة وضحاها لتفادي ارتباك العمليات.",
      "البدء بتهيئة البيانات وتدريب المشرفين، ثم إطلاق تجريبي (Pilot) لقياس النتائج.",
      "تحديد الجداول الزمنية الدقيقة بعد جلسات العمل التفصيلية مع فرق الشركة."
    ],
    presenterNotesEn: [
      "Emphasize professional delivery realism: avoid 'big bang' disruptions through phased rollouts.",
      "Commence with process mapping and data grooming, followed by a controlled pilot site to validate benchmarks.",
      "Final schedule milestones to be finalized following initial on-site infrastructure audit."
    ]
  },
  {
    id: 18,
    sectionAr: "الرؤية الختامية",
    sectionEn: "Strategic Closing",
    titleAr: "تحكم أكبر.. هدر أقل.. وقرارات مبنية على بيانات",
    titleEn: "Closing Strategic Vision: Maximum Control, Minimized Leakage & Data-Driven Growth",
    subtitleAr: "منظومة تشغيلية متكاملة تمنح الإدارة رؤية أوضح وتحكمًا أدق في الموارد اليومية",
    subtitleEn: "An Integrated Enterprise Operating System Delivering Unprecedented Clarity, Accountability, and Scalability for Alfarabi",
    executiveTagAr: "القرار الاستراتيجي والقيمة المستدامة",
    executiveTagEn: "Strategic Investment & Board Decision",
    presenterNotesAr: [
      "تلخيص المخرجات الاستراتيجية الثلاث: توحيد العمليات، كفاءة التخطيط، والتحكم في الهدر.",
      "شكر الإدارة وفتح باب النقاش والأسئلة لخطوات العمل القادمة.",
      "التأكيد على جاهزية الفريق لبدء ورش العمل وتخصيص المنظومة لاحتياجات شركة الفارابي."
    ],
    presenterNotesEn: [
      "Summarize the 3 strategic imperatives: Process Unification, Operational Precision, and Capital Leakage Elimination.",
      "Thank the executive board and initiate the interactive Q&A discussion.",
      "Reiterate engineering readiness to initiate discovery workshops and system tailoring for Alfarabi."
    ]
  }
];
