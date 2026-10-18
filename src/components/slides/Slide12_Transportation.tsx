import React from 'react';
import { SceneTransportationFleet } from '../3d/SceneTransportationFleet';
import { Bus, AlertTriangle, CheckCircle2, Gauge } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const Slide12_Transportation: React.FC = () => {
  const { isArabic, t } = useLanguage();

  return (
    <div className="w-full h-full flex flex-col justify-between p-6 lg:p-8 relative">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/40 text-purple-300 text-xs font-semibold">
          <Bus className="w-4 h-4 text-purple-400" />
          <span>{t('القسم الرابع: إدارة الحركة وأسطول الأتوبيسات', 'Pillar 04: Fleet Transit & Shift Balancing')}</span>
        </div>
        <div className="text-xs text-slate-400 font-mono">INTELLIGENT FLEET DISPATCH</div>
      </div>

      {/* Main Title */}
      <div className="my-1">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-[1.4] mb-2">
          {t('العدد الفعلي قبل الوردية.. والقرار قبل تحرك الأتوبيس', 'Confirmed Shift Headcounts Before Ignition')}
        </h2>
        <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
          {t(
            'التنسيق الاستباقي لرحلات الأسطول بالربط مع جداول الورديات والجاهزية الفعلية للعمال في السكن، للقضاء على أزمة الأتوبيسات الفارغة أو التكدس المفاجئ.',
            'Proactive fleet routing linked directly with camp readiness and shift schedules, eliminating both stranded worker bottlenecks and deadhead empty trips.'
          )}
        </p>
      </div>

      {/* Main 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center my-2 flex-1">
        {/* Left: Problems & Proposed Solution */}
        <div className="lg:col-span-5 flex flex-col space-y-4">
          <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-500/30">
            <h4 className="text-xs font-bold text-rose-300 flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              <span>{t('مشاكل الحركة في التشغيل الحالي', 'Legacy Transit Bottlenecks')}</span>
            </h4>
            <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
              <li>{t('عدم معرفة العدد الفعلي للعمال الجاهزين بالمحطات قبل وصول الأتوبيس.', 'Zero advance visibility into confirmed passenger numbers at loading hubs.')}</li>
              <li>{t('طلب أتوبيسات طوارئ إضافية بتكلفة مرتفعة عند حدوث تكدس مفاجئ.', 'Ordering expensive emergency charter buses upon sudden unexpected crowding.')}</li>
              <li>{t('تحرك أتوبيسات بأعداد ركاب ضئيلة (10 أو 15 راكبًا في أتوبيس 50).', 'Dispatching 50-passenger buses carrying only 12 riders due to unrecorded absences.')}</li>
              <li>{t('صعوبة تتبع حركة الركاب وتطابق خطوط السير مع احتياجات المواقع.', 'Inability to audit actual passenger manifests against subcontractor transport invoices.')}</li>
            </ul>
          </div>

          <div className="glass-panel p-4 rounded-xl border-purple-500/30 space-y-2">
            <h4 className="text-xs font-bold text-purple-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-purple-400" />
              <span>{t('الحلول التشغيلية في المنظومة المقترحة', 'Proposed Fleet Telemetry Capabilities')}</span>
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
              <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                <span className="font-bold text-white block">{t('حصر الجاهزية', 'Pre-Shift Validation')}</span>
                <span className="text-[11px] text-slate-400">{t('تأكيد الركاب قبل ساعة من الانطلاق', 'Headcount locked 60m pre-departure')}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                <span className="font-bold text-white block">{t('توزيع المقاعد الذكي', 'Capacity Matching')}</span>
                <span className="text-[11px] text-cyan-300">{t('موازنة الحمولة حسب سعة المركبة', 'Matching route demand to vehicle size')}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                <span className="font-bold text-white block">{t('دمج المسارات', 'Route Consolidation')}</span>
                <span className="text-[11px] text-purple-300">{t('توصيات آلية بإلغاء الرحلات الفارغة', 'Automated merger of under-filled runs')}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                <span className="font-bold text-white block">{t('أمر تحرك رقمي', 'Digital Dispatch Manifest')}</span>
                <span className="text-[11px] text-emerald-400">{t('موافقة المشرف وتوثيق خط السير', 'Supervisor authorization & trip logs')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: 3D Transportation Fleet Visualizer */}
        <div className="lg:col-span-7 h-[360px] sm:h-[420px] rounded-3xl bg-slate-950/60 border border-purple-500/30 p-2 shadow-2xl relative flex flex-col justify-between">
          <SceneTransportationFleet />
        </div>
      </div>

      {/* Footer Bottom Note */}
      <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 flex items-center justify-between text-xs text-slate-400">
        <span className="flex items-center gap-2 text-purple-300">
          <Gauge className="w-4 h-4 text-purple-400" />
          {t(
            'رفع معدل استغلال مقاعد الأتوبيسات من 60% إلى أكثر من 90% يقلل عدد الرحلات المستأجرة.',
            'Optimizing fleet seat utilization from 60% to >90% reduces third-party bus rental expenses by up to 30%.'
          )}
        </span>
        <span className="font-mono text-slate-500 text-[11px]">MODULE-TRANSPORT-V2</span>
      </div>
    </div>
  );
};
