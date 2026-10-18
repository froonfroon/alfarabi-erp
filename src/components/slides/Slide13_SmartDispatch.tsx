import React, { useState } from 'react';
import { ArrowLeftRight, CheckCircle2, XCircle, Zap } from 'lucide-react';
import { soundManager } from '../../utils/audio';
import { useLanguage } from '../../context/LanguageContext';

export const Slide13_SmartDispatch: React.FC = () => {
  const { isArabic, t } = useLanguage();
  const [viewMode, setViewMode] = useState<'after' | 'before'>('after');

  return (
    <div className="w-full h-full flex flex-col justify-between p-6 lg:p-8 relative">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/40 text-purple-300 text-xs font-semibold">
          <ArrowLeftRight className="w-4 h-4 text-purple-400" />
          <span>{t('مقارنة الأثر التشغيلي وضبط التكاليف', 'Operational Impact & Cost Benchmarking')}</span>
        </div>
        <div className="text-xs text-cyan-400 font-mono bg-cyan-950/40 px-3 py-1 rounded-lg border border-cyan-800/40">
          BEFORE VS AFTER OPERATIONAL BENCHMARK
        </div>
      </div>

      {/* Main Title & Toggle Controls */}
      <div className="my-1 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-[1.4] mb-2">
            {t('الأتوبيس المناسب.. في الوقت المناسب.. بالعدد المناسب', 'The Right Bus, at the Right Time, with the Right Capacity')}
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
            {t(
              'مقارنة مباشرة بين فوضى التقدير اليدوي السابقة والانضباط الرقمي الذكي لتشغيل أسطول نقل العمالة.',
              'A direct benchmark comparing legacy manual estimation friction against intelligent capacity-aware transit dispatch.'
            )}
          </p>
        </div>

        {/* Interactive Comparison Switcher */}
        <div className="flex bg-slate-900 p-1.5 rounded-xl border border-slate-700">
          <button
            onClick={() => {
              soundManager.playClick();
              setViewMode('before');
            }}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
              viewMode === 'before'
                ? 'bg-rose-600/90 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <XCircle className="w-4 h-4" />
            <span>{t('الوضع السابق (Before)', 'Legacy Baseline (Before)')}</span>
          </button>
          <button
            onClick={() => {
              soundManager.playClick();
              setViewMode('after');
            }}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
              viewMode === 'after'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{t('المنظومة المقترحة (After)', 'Proposed ERP Solution (After)')}</span>
          </button>
        </div>
      </div>

      {/* Comparison Dynamic Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-2 flex-1 items-stretch">
        {/* BEFORE CARD */}
        <div className={`p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
          viewMode === 'before'
            ? 'bg-rose-950/40 border-rose-500/60 shadow-[0_0_30px_rgba(244,63,94,0.2)]'
            : 'bg-slate-900/30 border-slate-800 opacity-60'
        }`}>
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-rose-500/20 mb-4">
              <span className="text-xs font-bold text-rose-400 flex items-center gap-2">
                <XCircle className="w-4 h-4" />
                {t('قبل تطبيق النظام (التقديرات اليدوية)', 'Before: Fragmented Legacy Guesswork')}
              </span>
              <span className="text-[10px] bg-rose-950 px-2 py-0.5 rounded text-rose-300 font-mono">LEGACY OPS</span>
            </div>

            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                <span>
                  <strong>{t('تقديرات ورقية تقريبية:', 'Static Paper Rosters:')}</strong>{' '}
                  {t('خروج الأتوبيسات بناءً على أرقام قديمة غير مطابقة لواقع الحضور.', 'Vehicles dispatched based on outdated static headcounts ignoring shift absences.')}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                <span>
                  <strong>{t('تكدس أو فراغ غير متوقع:', 'Unbalanced Capacity:')}</strong>{' '}
                  {t('بعض الخطوط تشهد تكدساً خانقاً، بينما خطوط أخرى تتحرك بـ 15 راكباً فقط.', 'Some routes suffer severe overloading while parallel buses run 70% empty.')}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                <span>
                  <strong>{t('طلب رحلات طوارئ مكلفة:', 'Emergency Charters:')}</strong>{' '}
                  {t('استئجار حافلات إضافية في اللحظات الأخيرة بأسعار استثنائية.', 'Surprise seat shortages require costly last-minute charter buses.')}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                <span>
                  <strong>{t('انعدام تقارير الكيلومتر والوقود:', 'Opaque Auditing:')}</strong>{' '}
                  {t('صعوبة حصر تكلفة المقعد الفعلي في كل رحلة ومراجعة فواتير الموردين.', 'Inability to reconcile subcontractor invoices against actual transported heads.')}
                </span>
              </li>
            </ul>
          </div>

          <div className="mt-4 pt-3 border-t border-rose-500/20 text-xs text-rose-300 font-bold flex items-center justify-between">
            <span>{t('معدل استغلال مقاعد الأسطول الفعلي:', 'Historical Fleet Seat Utilization:')}</span>
            <span className="font-mono text-sm">~ 55% - 62%</span>
          </div>
        </div>

        {/* AFTER CARD */}
        <div className={`p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
          viewMode === 'after'
            ? 'bg-blue-950/40 border-cyan-400 shadow-[0_0_30px_rgba(56,189,248,0.25)] ring-1 ring-cyan-400'
            : 'bg-slate-900/30 border-slate-800 opacity-60'
        }`}>
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-cyan-500/20 mb-4">
              <span className="text-xs font-bold text-cyan-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                {t('بعد تفعيل منظومة الفارابي ERP الذكية', 'After: Algorithmic Fleet Orchestration')}
              </span>
              <span className="text-[10px] bg-cyan-950 px-2 py-0.5 rounded text-cyan-300 font-bold font-mono">GOVERNED</span>
            </div>

            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                <span>
                  <strong>{t('توقع الطلب حسب الجاهزية المؤكدة:', 'Demand-Aware Telemetry:')}</strong>{' '}
                  {t('احتساب الركاب تلقائياً بعد استبعاد الغائبين والمجازين المسجلين بالسكن.', 'Passenger counts automatically calculated after subtracting verified absences.')}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                <span>
                  <strong>{t('توزيع ذكي حسب سعة الأتوبيس:', 'Dynamic Vehicle Matching:')}</strong>{' '}
                  {t('توجيه الأتوبيس الكبير للخطوط المزدحمة والأصغر للمسارات الخفيفة.', 'Right-sizing vehicle capacity to exact hub demand dynamically.')}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                <span>
                  <strong>{t('تنبيهات استباقية بتجاوز السعة:', 'Automated Overload Triggers:')}</strong>{' '}
                  {t('إنذار المنسق قبل ساعتين لدمج المسارات أو توفير حل بديل.', 'Proactive 2-hour alerts recommending route mergers before vehicle departure.')}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                <span>
                  <strong>{t('تقارير تكلفة الكيلومتر والرحلات الخالية:', 'Per-Seat Financial Transparency:')}</strong>{' '}
                  {t('شفافية كاملة لحسابات الموردين وشركات النقل ومعدلات استهلاك الوقود.', 'Granular cost auditing down to per-kilometer passenger trip manifests.')}
                </span>
              </li>
            </ul>
          </div>

          <div className="mt-4 pt-3 border-t border-cyan-500/20 text-xs text-emerald-300 font-bold flex items-center justify-between">
            <span>{t('معدل استغلال مقاعد الأسطول المستهدف:', 'Target Fleet Capacity Utilization:')}</span>
            <span className="font-mono text-sm text-emerald-400">88% - 94%</span>
          </div>
        </div>
      </div>

      {/* Operational Disclaimer */}
      <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-700/80 flex items-center justify-between text-xs text-slate-400">
        <span className="flex items-center gap-2 text-cyan-300">
          <Zap className="w-4 h-4 text-cyan-400" />
          {t(
            'النظام يقدم مقترحات تشغيل وتنبيهات فورية للمنسق، بينما يظل القرار النهائي للمشرف المعتمد لإدارة الطوارئ الميدانية.',
            'The platform delivers actionable algorithmic dispatch recommendations while maintaining human-in-the-loop sign-off for dynamic site conditions.'
          )}
        </span>
        <span className="font-mono text-slate-500 text-[11px]">DISPATCH-INTELLIGENCE-V2</span>
      </div>
    </div>
  );
};
