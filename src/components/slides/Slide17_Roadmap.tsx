import React, { useState } from 'react';
import { CalendarRange, CheckCircle2, ShieldAlert } from 'lucide-react';
import { soundManager } from '../../utils/audio';
import { useLanguage } from '../../context/LanguageContext';

export const Slide17_Roadmap: React.FC = () => {
  const { isArabic, t } = useLanguage();
  const [activePhase, setActivePhase] = useState<number>(1);

  const phases = [
    {
      num: 1,
      titleAr: 'المرحلة 1: الاستكشاف وتوثيق العمليات',
      titleEn: 'Phase 1: Discovery & Process Mapping',
      tag: 'DISCOVERY',
      summaryAr: 'مراجعة وتأكيد لوائح وسياسات الشركة، وتوثيق دورة العمل الحالية، وتحديد معايير Worker ID.',
      summaryEn: 'Review and benchmark corporate policies, document current field workflows, and define the canonical Worker ID format.',
      deliverablesAr: ['وثيقة متطلبات العمليات المعتمدة', 'هيكل تصنيف الوثائق وشجرة الأرشيف', 'تحديد الصلاحيات والمشرفين المسؤولين'],
      deliverablesEn: ['Validated Business Requirements Document (BRD)', 'Standardized Archive Hierarchy & File Taxonomies', 'Role Assignment & Supervisor RACI Matrix']
    },
    {
      num: 2,
      titleAr: 'المرحلة 2: النواة الرقمية وملفات العمال',
      titleEn: 'Phase 2: Core ERP & Workforce Records',
      tag: 'CORE ERP',
      summaryAr: 'بناء قاعدة البيانات المركزية الموحدة، وتفعيل إدارة المستندات الرقمية، وسجل التدقيق.',
      summaryEn: 'Deploying the central relational database, activating digital document management, and setting up immutable audit logs.',
      deliverablesAr: ['توليد الأرقام الوظيفية Worker IDs', 'واجهة رفع وفحص البطاقات والفيش', 'تشفير المستندات وتأمين الصلاحيات'],
      deliverablesEn: ['Enterprise Worker ID Minting Engine', 'National ID & Police Clearance Ingestion Kiosks', 'At-Rest File Encryption & Key Management']
    },
    {
      num: 3,
      titleAr: 'المرحلة 3: إدارة السكنات والغياب',
      titleEn: 'Phase 3: Camp Housing & Retention Policy',
      tag: 'ACCOMMODATION',
      summaryAr: 'إعداد سجل المباني والغرف والأسرة، وتفعيل تتبع الإشغال وتطبيق قواعد سياسة الـ 10 أيام.',
      summaryEn: 'Mapping buildings, rooms, and beds; implementing live occupancy tracking and 10-day escalation rules.',
      deliverablesAr: ['تسكين العمال وربطهم بالغرف والأسرة', 'تتبع الحضور والغياب والإجازات', 'تنبيهات مهلة الـ 10 أيام للمشرفين'],
      deliverablesEn: ['Room-and-Bed Asset Inventory Database', 'Real-Time Absence & Vacation Telemetry', 'Configurable 10-Day Retention Workflow Alerts']
    },
    {
      num: 4,
      titleAr: 'المرحلة 4: التغذية وحركة الأتوبيسات',
      titleEn: 'Phase 4: Catering & Fleet Orchestration',
      tag: 'CATERING & TRANSIT',
      summaryAr: 'ربط مطابخ الإعاشة بالحضور الفعلي، وتنسيق أسطول الأتوبيسات وفق جاهزية عمال الوردية.',
      summaryEn: 'Linking kitchen batch orders to verified camp presence and synchronizing bus fleets with shift readiness.',
      deliverablesAr: ['أوامر تشغيل المطبخ بأعداد مؤكدة', 'حوكمة صرف الوجبات ومنع التكرار', 'توزيع ركاب الأتوبيسات وتفادي الرحلات الفارغة'],
      deliverablesEn: ['Automated Kitchen Batch Orders', 'Anti-Duplication Meal Scanning at Counters', 'Dynamic Fleet Dispatch & Seat Balancing']
    },
    {
      num: 5,
      titleAr: 'المرحلة 5: المزامنة والاختبار الشامل',
      titleEn: 'Phase 5: Cloud Integration & Validation',
      tag: 'INTEGRATION & QA',
      summaryAr: 'تفعيل تكامل Google Drive API، واستيراد البيانات المعتمدة، واختبار استقرار السيناريوهات.',
      summaryEn: 'Finalizing official Google Drive API synchronization, loading historical records, and conducting scenario stress tests.',
      deliverablesAr: ['فحص تكامل المزامنة السحابية', 'اختبار سيناريوهات انقطاع الاتصال والاسترجاع', 'مطابقة تقارير لوحة القيادة العليا'],
      deliverablesEn: ['Google Drive API Automated Sync Audit', 'Network Disconnect & Disaster Recovery Drills', 'Executive KPI Telemetry Validation']
    },
    {
      num: 6,
      titleAr: 'المرحلة 6: الإطلاق التجريبي والتدريب',
      titleEn: 'Phase 6: Pilot, Training & Full Rollout',
      tag: 'PILOT & ROLLOUT',
      summaryAr: 'تشغيل تجريبي محكوم على سكن أو موقع عمل واحد، وتدريب المشرفين، وقياس الوفر قبل التعميم.',
      summaryEn: 'Executing a controlled pilot at a primary camp site, training field supervisors, and verifying ROI before full expansion.',
      deliverablesAr: ['تدريب عملي لمشرفي السكن والمطبخ والحركة', 'قياس مؤشرات الأداء الحقيقية ومعالجة الملاحظات', 'الإطلاق الكامل لمنظومة شركة الفارابي'],
      deliverablesEn: ['Hands-On Field Training for Camp & Kitchen Leads', 'Pilot ROI & Waste Elimination Verification', 'Enterprise-Wide Alfarabi System Cutover']
    },
  ];

  return (
    <div className="w-full h-full flex flex-col justify-between p-6 lg:p-8 relative">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-xs font-semibold">
          <CalendarRange className="w-4 h-4 text-cyan-400" />
          <span>{t('استراتيجية التنفيذ وخارطة الطريق', 'Strategic Enterprise Rollout Roadmap')}</span>
        </div>
        <div className="text-xs text-lime-400 font-mono bg-lime-950/40 px-3 py-1 rounded-lg border border-lime-800/40">
          6-PHASE STRUCTURED ROLLOUT
        </div>
      </div>

      {/* Main Title */}
      <div className="my-1">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-[1.4] mb-2">
          {t('تنفيذ مرحلي.. بقيمة واضحة في كل مرحلة', 'Phased Delivery: High Value & Zero Operational Shock')}
        </h2>
        <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
          {t(
            'خطة تدشين واقعية تضمن انتقالاً سلساً دون إرباك العمليات اليومية، مع تحقيق عائد فوري ملموس مع نهاية كل مرحلة تشغيلية.',
            'A battle-tested deployment methodology mitigating risk, ensuring zero day-to-day disruption, and unlocking tangible cost containment at every milestone.'
          )}
        </p>
      </div>

      {/* 6 Phases Timeline Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 my-2">
        {phases.map((ph) => {
          const isSelected = activePhase === ph.num;
          const title = isArabic ? ph.titleAr : ph.titleEn;

          return (
            <button
              key={ph.num}
              onClick={() => {
                soundManager.playClick();
                setActivePhase(ph.num);
              }}
              className={`p-3 rounded-xl border ${isArabic ? 'text-right' : 'text-left'} transition-all flex flex-col justify-between h-28 ${
                isSelected
                  ? 'bg-blue-950/80 border-cyan-400 shadow-[0_0_20px_rgba(56,189,248,0.3)] ring-1 ring-cyan-400'
                  : 'bg-slate-900/40 hover:bg-slate-800/60 border-slate-800 text-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`w-6 h-6 rounded-md font-mono text-xs font-bold flex items-center justify-center ${
                  isSelected ? 'bg-cyan-400 text-black' : 'bg-slate-800 text-slate-400'
                }`}>
                  0{ph.num}
                </span>
                <span className="text-[9px] font-mono text-slate-400">{ph.tag}</span>
              </div>
              <h5 className="font-bold text-white text-xs leading-snug line-clamp-2">{title}</h5>
            </button>
          );
        })}
      </div>

      {/* Active Phase Deep Dive */}
      <div className="p-5 rounded-2xl glass-panel border-cyan-500/30 my-1">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-slate-800">
          <div>
            <div className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-wider">
              {t(`المرحلة ${activePhase}:`, `Phase ${activePhase}:`)} {phases[activePhase - 1].tag}
            </div>
            <h4 className="text-base font-bold text-white mt-0.5">
              {isArabic ? phases[activePhase - 1].titleAr : phases[activePhase - 1].titleEn}
            </h4>
          </div>
          <span className="text-xs text-slate-300 bg-slate-900 px-3 py-1 rounded-lg border border-slate-800">
            {t('تُحدد المدد الزمنية الدقيقة بعد جلسة تقييم البنية التحتية', 'Exact timelines calibrated following initial discovery audit')}
          </span>
        </div>

        <p className="text-xs text-slate-300 my-3 leading-relaxed">
          {isArabic ? phases[activePhase - 1].summaryAr : phases[activePhase - 1].summaryEn}
        </p>

        <div>
          <span className="text-xs font-bold text-lime-300 block mb-2">
            {t('المخرجات الرئيسية والتسليمات المعتمدة للمرحلة:', 'Core Phase Deliverables & Governance Artifacts:')}
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {(isArabic ? phases[activePhase - 1].deliverablesAr : phases[activePhase - 1].deliverablesEn).map((item, idx) => (
              <div key={idx} className="p-2.5 rounded-lg bg-slate-900/70 border border-slate-800 text-xs text-slate-200 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Realistic Disclaimer */}
      <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-700/80 flex items-center justify-between text-xs text-slate-400">
        <span className="flex items-center gap-2 text-cyan-300">
          <ShieldAlert className="w-4 h-4 text-cyan-400" />
          {t(
            'التزامًا بالمصداقية الهندسية: لا نفرض تواريخ خيالية مسبقة، بل يُعتمد الجدول الزمني بعد مراجعة حجم الأصول وعدد العمالة مع فريق الفارابي.',
            'Engineering Honesty Pledge: Timelines and milestones will be established after assessing active infrastructure, camp headcounts, and existing data quality with Alfarabi stakeholders.'
          )}
        </span>
        <span className="font-mono text-slate-500 text-[11px]">PHASED-DEPLOYMENT-V2</span>
      </div>
    </div>
  );
};
