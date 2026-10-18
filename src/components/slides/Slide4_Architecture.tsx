import React from 'react';
import { Database, Cpu, Layers, Link } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { SceneCentralCore } from '../3d/SceneCentralCore';

export const Slide4_Architecture: React.FC = () => {
  const { isArabic, t } = useLanguage();

  return (
    <div className="w-full h-full flex flex-col justify-between p-6 lg:p-8 relative">
      {/* Header Tag */}
      <div className="flex items-center justify-between">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
          <Layers className="w-4 h-4 text-cyan-400" />
          <span>{t('المعمارية التقنية للمنظومة', 'Target Solution Architecture')}</span>
        </div>
        <div className="text-xs text-slate-400 font-mono">CORE ERP ENGINE & RELATIONAL DATA PLANE</div>
      </div>

      {/* Headline */}
      <div className="my-1">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-[1.4] mb-2">
          {t('قلب رقمي واحد يربط كل العمليات', 'The Digital Core: A Unified Operational Nerve Center')}
        </h2>
        <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
          {t(
            'معمارية معيارية ترتكز على Worker ID الموحد وقاعدة بيانات سحابية مركزية تتدفق منها وإليها كافة قرارات التشغيل.',
            'A modular relational architecture binding every operational transaction to a canonical Worker ID and real-time event pipeline.'
          )}
        </p>
      </div>

      {/* Architectural Diagram */}
      <div className="relative my-3 flex-1 flex items-center justify-center">
        {/* Background Network Grid Lines */}
        <div className="absolute inset-0 border border-slate-800/80 rounded-3xl bg-slate-950/50 backdrop-blur-md overflow-hidden flex items-center justify-center">
          <div className="absolute w-[480px] h-[480px] rounded-full border border-dashed border-cyan-500/20 animate-spin" style={{ animationDuration: '40s' }} />
          <div className="absolute w-[320px] h-[320px] rounded-full border border-cyan-500/30 animate-pulse" />
        </div>

        {/* 5 Interconnected Architecture Blocks */}
        <div className="relative z-10 w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          {/* Top Left: Module 1 Documents */}
          <div className="glass-panel p-4 rounded-xl border-cyan-500/40 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-cyan-400">{t('01. وثائق العمالة', '01. Workforce Dossier')}</span>
              <span className="text-[10px] bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded font-mono">Worker ID</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {t(
                'الملف التعريفي، البطاقة، الفيش الجنائي، وحالة التواجد بالخدمة.',
                'Canonical profile, National ID, police verification, and active deployment status.'
              )}
            </p>
            <div className="mt-2 text-[10px] text-cyan-400 flex items-center gap-1 font-mono">
              <Link className="w-3 h-3" /> {t('يحدد أهلية التسكين والخدمات', 'Authorizes Housing & Services')}
            </div>
          </div>

          {/* Center: ERP Core & Database with 3D Core Engine */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-blue-900/90 to-slate-950 border-2 border-cyan-400 shadow-[0_0_40px_rgba(56,189,248,0.4)] text-center relative group">
            {/* Live 3D Central Core Engine */}
            <div className="w-full h-32 relative mb-2 flex items-center justify-center rounded-xl bg-slate-950/60 border border-cyan-500/20">
              <SceneCentralCore activeModule={0} />
            </div>

            <div className="text-[10px] font-extrabold text-lime-400 tracking-wider uppercase mb-0.5">
              {t('النواة المركزية الموحدة', 'Relational Core Engine')}
            </div>
            <h3 className="text-base font-black text-white">{t('قاعدة البيانات التشغيلية', 'Central Operational DB')}</h3>
            <p className="text-xs text-slate-300 mt-0.5 line-clamp-2">
              {t(
                'سجل أحادي مشفر (Single Source of Truth) يمنع تضارب البيانات.',
                'Single Source of Truth with AES-256 encryption preventing data drift.'
              )}
            </p>
            <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-slate-900/80 text-[10px] text-cyan-300 font-mono border border-cyan-500/30">
              <Cpu className="w-3 h-3" /> RESTful APIs & Events
            </div>
          </div>

          {/* Top Right: Module 2 Accommodation */}
          <div className="glass-panel p-4 rounded-xl border-lime-500/40 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-lime-400">{t('02. السكن والغياب', '02. Accommodation')}</span>
              <span className="text-[10px] bg-lime-950 text-lime-300 px-2 py-0.5 rounded font-mono">Bed Occupancy</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {t(
                'توزيع الأسرة والغرف، تسجيل الغياب الفعلي، وتطبيق سياسة الـ 10 أيام.',
                'Room and bed allocations, absence telemetry, and 10-day retention policies.'
              )}
            </p>
            <div className="mt-2 text-[10px] text-lime-400 flex items-center gap-1 font-mono">
              <Link className="w-3 h-3" /> {t('يحدد طلبات المطبخ والأتوبيس', 'Feeds Kitchen & Bus Headcounts')}
            </div>
          </div>

          {/* Bottom Left: Module 3 Catering */}
          <div className="glass-panel p-4 rounded-xl border-amber-500/40 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-amber-400">{t('03. التغذية والإعاشة', '03. Catering Demand')}</span>
              <span className="text-[10px] bg-amber-950 text-amber-300 px-2 py-0.5 rounded font-mono">Meal Demand</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {t(
                'تحديد أعداد الوجبات الدقيقة وفق الحضور المؤكد، ومنع تكرار الصرف.',
                'Precision kitchen demand driven by verified presence, preventing duplicate issuance.'
              )}
            </p>
            <div className="mt-2 text-[10px] text-amber-400 flex items-center gap-1 font-mono">
              <Link className="w-3 h-3" /> {t('يمنع هدر الطعام والتكاليف', 'Eliminates Capital & Food Waste')}
            </div>
          </div>

          {/* Bottom Center: Module 5 Executive Dashboard */}
          <div className="glass-panel p-4 rounded-xl border-emerald-500/40 shadow-lg text-center">
            <div className="text-xs font-bold text-emerald-400 mb-1">{t('05. لوحة القيادة العليا (KPIs)', '05. Executive Cockpit (KPIs)')}</div>
            <p className="text-xs text-slate-300">
              {t(
                'تقارير استغلال الأصول، قياس نسب الشواغر، وسجل التدقيق والامتثال.',
                'Real-time asset telemetry, vacancy rate auditing, and compliance tracking.'
              )}
            </p>
            <div className="mt-2 text-[10px] text-emerald-300 font-bold font-mono">
              {t('تقارير تنفيذية لحظية للإدارة', 'Live C-Suite Strategic Intelligence')}
            </div>
          </div>

          {/* Bottom Right: Module 4 Transportation */}
          <div className="glass-panel p-4 rounded-xl border-purple-500/40 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-purple-400">{t('04. الحركة والنقل', '04. Transit Dispatch')}</span>
              <span className="text-[10px] bg-purple-950 text-purple-300 px-2 py-0.5 rounded font-mono">Bus Dispatch</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {t(
                'تخصيص الأتوبيسات حسب جاهزية عمال الوردية المؤكدة بنقاط التجمع.',
                'Dynamic fleet assignment tailored to verified pre-shift worker readiness at pickup hubs.'
              )}
            </p>
            <div className="mt-2 text-[10px] text-purple-400 flex items-center gap-1 font-mono">
              <Link className="w-3 h-3" /> {t('يحقق أعلى استغلال للمقاعد', 'Maximizes Seat Utilization')}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Clarity Note */}
      <div className="text-xs text-slate-400 text-center border-t border-slate-800 pt-2">
        {t(
          '* كافة الروابط الموضحة أعلاه هي تكاملات برمجية مقترحة (Proposed Integrations) يتم بناؤها وتدشينها مرحلياً لضمان دقة التنفيذ.',
          '* All architectural connections represent proposed system integrations deployed across structured phases to ensure flawless execution.'
        )}
      </div>
    </div>
  );
};
