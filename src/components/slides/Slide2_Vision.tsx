import React from 'react';
import { Network, FileText, Home, Utensils, Bus, Check, AlertCircle } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const Slide2_Vision: React.FC = () => {
  const { isArabic, t } = useLanguage();

  return (
    <div className="w-full h-full flex flex-col justify-between p-6 lg:p-8 relative">
      {/* Slide Top Tag */}
      <div className="flex items-center justify-between">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
          <Network className="w-4 h-4 text-cyan-400" />
          <span>{t('الرؤية التنفيذية والترابط المؤسسي', 'Executive Vision & Cross-Pillar Synergies')}</span>
        </div>
        <div className="text-xs text-amber-400/90 bg-amber-950/40 border border-amber-600/30 px-3 py-1 rounded-lg flex items-center gap-1.5">
          <AlertCircle className="w-3.5 h-3.5" />
          <span>{t('نموذج تشغيلي مقترح للدراسة والاعتماد', 'Proposed Engineered Model for Executive Adoption')}</span>
        </div>
      </div>

      {/* Main Title Block */}
      <div className="my-2">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-[1.4] mb-2">
          {t('منظومة واحدة.. رؤية تشغيلية موحدة', 'Single Data Plane — Unified Operational Vision')}
        </h2>
        <p className="text-sm lg:text-base text-slate-300 leading-relaxed max-w-3xl">
          {t(
            'الانتقال من "جزر البيانات المعزولة" ودفاتر الإكسيل اليدوية إلى منصة رقمية موحدة تضمن تدفق القرار اللحظي بين كافة الإدارات التشغيلية.',
            'Bridging fragmented operational silos and manual spreadsheets into a real-time data plane where events instantly synchronize across all departments.'
          )}
        </p>
      </div>

      {/* 4 Connected Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-2">
        {/* Module 1 */}
        <div className="glass-panel p-5 rounded-2xl border-cyan-500/30 hover:border-cyan-400 transition-all flex flex-col justify-between group">
          <div>
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center mb-4 group-hover:scale-110 transition shadow-[0_0_15px_rgba(56,189,248,0.3)]">
              <FileText className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">{t('الإدارة والوثائق', 'Workforce Records')}</span>
            <h3 className="text-base font-bold text-white mt-1 mb-2">{t('أرشيف وهوية العمالة', 'Identity & Compliance')}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {t(
                'تكويد كل عامل بـ Worker ID فريد يربط البطاقة والفيش الجنائي وعقد العمل وحالته التشغيلية.',
                'Unique canonical Worker ID binding National ID, police clearance, employment contracts, and real-time active status.'
              )}
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-cyan-300 flex items-center gap-1">
            <Check className="w-3.5 h-3.5 text-cyan-400" />
            <span>{t('ملف رقمي موحد ومحدث لحظياً', 'Unified Real-Time Digital Dossier')}</span>
          </div>
        </div>

        {/* Module 2 */}
        <div className="glass-panel p-5 rounded-2xl border-lime-500/30 hover:border-lime-400 transition-all flex flex-col justify-between group">
          <div>
            <div className="w-10 h-10 rounded-xl bg-lime-500/20 text-lime-400 flex items-center justify-center mb-4 group-hover:scale-110 transition shadow-[0_0_15px_rgba(163,230,53,0.3)]">
              <Home className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-lime-400 uppercase tracking-wider">{t('الأصول السكنية', 'Camp Facilities')}</span>
            <h3 className="text-base font-bold text-white mt-1 mb-2">{t('إدارة السكنات والغياب', 'Accommodation & Bed Matrix')}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {t(
                'تسكين فوري على مستوى الغرفة والسرير، تتبع الإشغال الفعلي، وتطبيق سياسة الـ 10 أيام للغياب.',
                'Precision room-and-bed asset allocation, live absence timers, and automated 10-day retention policies.'
              )}
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-lime-300 flex items-center gap-1">
            <Check className="w-3.5 h-3.5 text-lime-400" />
            <span>{t('حصر الأسرة الشاغرة بدقة 100%', '100% Real-Time Vacancy Accuracy')}</span>
          </div>
        </div>

        {/* Module 3 */}
        <div className="glass-panel p-5 rounded-2xl border-amber-500/30 hover:border-amber-400 transition-all flex flex-col justify-between group">
          <div>
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-4 group-hover:scale-110 transition shadow-[0_0_15px_rgba(245,158,11,0.3)]">
              <Utensils className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">{t('خدمات الإعاشة', 'Catering Services')}</span>
            <h3 className="text-base font-bold text-white mt-1 mb-2">{t('الطعام والتغذية', 'Catering Governance')}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {t(
                'ربط طلبات المطبخ بالحضور الفعلي؛ منع تجهيز وجبات لعمال غائبين وتطبيق مبدأ 1 عامل = 1 وجبة.',
                'Directing kitchen batch orders from confirmed camp headcount; enforcing the 1-Worker-1-Meal entitlement rule.'
              )}
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-amber-300 flex items-center gap-1">
            <Check className="w-3.5 h-3.5 text-amber-400" />
            <span>{t('إيقاف الهدر المالي في المطبخ', 'Direct Elimination of Food Capital Loss')}</span>
          </div>
        </div>

        {/* Module 4 */}
        <div className="glass-panel p-5 rounded-2xl border-purple-500/30 hover:border-purple-400 transition-all flex flex-col justify-between group">
          <div>
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-4 group-hover:scale-110 transition shadow-[0_0_15px_rgba(168,85,247,0.3)]">
              <Bus className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider">{t('الأسطول والخدمات', 'Transit Operations')}</span>
            <h3 className="text-base font-bold text-white mt-1 mb-2">{t('الحركة والنقل', 'Fleet Dispatch')}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {t(
                'تخصيص الأتوبيسات وفق الجاهزية الحقيقية لركاب الوردية؛ القضاء على الرحلات الفارغة وعجز السعة.',
                'Dynamic bus dispatch matching confirmed shift passengers; eliminating empty deadhead runs and sudden seat shortages.'
              )}
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-purple-300 flex items-center gap-1">
            <Check className="w-3.5 h-3.5 text-purple-400" />
            <span>{t('تشغيل اقتصادي ذكي للأسطول', 'Economic Fleet Capacity Optimization')}</span>
          </div>
        </div>
      </div>

      {/* Cross-Department Integration Banner */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-slate-900/90 via-blue-950/40 to-slate-900/90 border border-slate-700/80 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-xs text-slate-200">
            <strong className="text-cyan-300">{t('مبدأ الربط المتسلسل:', 'Sequential Propagation Core:')}</strong>{' '}
            {t(
              'تغيير حالة العامل في السكن ينعكس فوراً على إيقاف استحقاق الوجبة وتحرير مقعد الأتوبيس وتحديث تقرير الإدارة دون تدخل ورقي.',
              'A camp status change immediately decrements kitchen order quantity, frees transit seating, and updates C-suite KPIs without paper delay.'
            )}
          </span>
        </div>
        <div className="text-[11px] font-mono text-cyan-400 bg-slate-950 px-3 py-1 rounded-md border border-cyan-800/40">
          DATA PIPELINE: REALTIME SYNC
        </div>
      </div>
    </div>
  );
};
