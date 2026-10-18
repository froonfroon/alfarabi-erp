import React from 'react';
import { SceneBedManagement } from '../3d/SceneBedManagement';
import { Home, AlertTriangle, CheckCircle2, BedDouble } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const Slide7_Accommodation: React.FC = () => {
  const { isArabic, t } = useLanguage();

  return (
    <div className="w-full h-full flex flex-col justify-between p-6 lg:p-8 relative">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime-950/60 border border-lime-500/30 text-lime-300 text-xs font-semibold">
          <Home className="w-4 h-4 text-lime-400" />
          <span>{t('القسم الثاني: إدارة السكنات والغياب', 'Pillar 02: Accommodation Intelligence & Camp Telemetry')}</span>
        </div>
        <div className="text-xs text-slate-400 font-mono">ACCOMMODATION & REAL-TIME BED OCCUPANCY</div>
      </div>

      {/* Main Title */}
      <div className="my-1">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-[1.4] mb-2">
          {t('إدارة السكنات بالأرقام الفعلية.. وليس بالتقديرات', 'Camp Management by Real Telemetry, Not Rough Guesses')}
        </h2>
        <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
          {t(
            'خريطة رقمية ثلاثية الأبعاد تمكن إدارة العمليات من معرفة حالة كل سرير في كافة المجمعات السكنية لحظة بلحظة، وربطها الفوري بطلبات الإعاشة والنقل.',
            'An interactive 3D spatial twin empowering executive operations to inspect room and bed utilization in real-time, instantly synchronizing headcounts with catering and bus dispatch.'
          )}
        </p>
      </div>

      {/* Main 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center my-2 flex-1">
        {/* Left: Problems & Proposed Solution Points */}
        <div className="lg:col-span-5 flex flex-col space-y-4">
          {/* Current Bottlenecks */}
          <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-500/30">
            <h4 className="text-xs font-bold text-rose-300 flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              <span>{t('مشاكل السكن في الوضع التقليدي', 'Legacy Housing Inefficiencies')}</span>
            </h4>
            <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
              <li>{t('غياب العمال لفترات طويلة دون تسجيل معتمد يترك الأسرة محجوزة وهمياً.', 'Unrecorded prolonged worker absences leaving beds phantom-reserved for weeks.')}</li>
              <li>{t('انتقال العمال بين الغرف أو السكنات دون إخطار الإدارة.', 'Unauthorized room-hopping and camp transfers without managerial oversight.')}</li>
              <li>{t('مغادرة العامل في إجازة عادية أو طارئة دون خصم الوجبة أو تحرير السرير.', 'Unscheduled leaves departing without decrementing kitchen portions or releasing bed slots.')}</li>
              <li>{t('الاعتماد على جرد ورقي أسبوعي أو شهري يفقد الإدارة اللحظية.', 'Relying on lagging manual paper audits destroys operational real-time control.')}</li>
            </ul>
          </div>

          {/* Solution Capabilities Matrix */}
          <div className="glass-panel p-4 rounded-xl border-lime-500/30 space-y-2.5">
            <h4 className="text-xs font-bold text-lime-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-lime-400" />
              <span>{t('الحلول الهندسية في منظومة الفارابي ERP', 'Engineered Solutions in Alfarabi ERP')}</span>
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                <span className="font-bold text-white block">{t('ترميز كل سرير', 'Granular Asset Tagging')}</span>
                <span className="text-[11px] text-slate-400">{t('سكن / مبنى / دور / غرفة / سرير', 'Camp / Block / Floor / Room / Bed')}</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                <span className="font-bold text-white block">{t('حالات واضحة ومقننة', '5 Defined Bed States')}</span>
                <span className="text-[11px] text-cyan-300">{t('مشغول، غائب، شاغر، مراجعة', 'Occupied, Absent, Vacant, Review')}</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                <span className="font-bold text-white block">{t('حركات النقل المعتمدة', 'Authorized Relocation')}</span>
                <span className="text-[11px] text-slate-400">{t('موافقة المشرف وتوثيق التاريخ', 'Supervisor Sign-off & History Logs')}</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                <span className="font-bold text-white block">{t('تقارير شواغر لحظية', 'Live Vacancy Telemetry')}</span>
                <span className="text-[11px] text-emerald-400">{t('استيعاب العمالة الجديدة فوراً', 'Instant Intake Allocation')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: 3D Bed Visualizer */}
        <div className="lg:col-span-7 h-[360px] sm:h-[420px] rounded-3xl bg-slate-950/60 border border-lime-500/30 p-2 shadow-2xl relative flex flex-col justify-between">
          <SceneBedManagement />
        </div>
      </div>

      {/* Footer Insight */}
      <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 flex items-center justify-between text-xs text-slate-400">
        <span className="flex items-center gap-2 text-lime-300">
          <BedDouble className="w-4 h-4 text-lime-400" />
          {t(
            'توفير الطاقة الاستيعابية الضائعة يقلل الحاجة لاستئجار سكنات إضافية مكلفة بنسبة تصل إلى 20%.',
            'Recapturing stranded bed capacity mitigates the need to lease expensive overflow camp accommodation by up to 20%.'
          )}
        </span>
        <span className="font-mono text-slate-500 text-[11px]">MODULE-ACCOM-V2</span>
      </div>
    </div>
  );
};
