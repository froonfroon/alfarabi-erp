import React from 'react';
import { Utensils, AlertTriangle, CheckCircle2, TrendingDown, ChefHat } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const Slide10_Catering: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="w-full h-full flex flex-col justify-between p-6 lg:p-8 relative">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-500/40 text-amber-300 text-xs font-semibold">
          <Utensils className="w-4 h-4 text-amber-400" />
          <span>{t('القسم الثالث: إدارة التغذية والإعاشة', 'Pillar 03: Catering Precision & Waste Elimination')}</span>
        </div>
        <div className="text-xs text-slate-400 font-mono">CATERING & CONFIRMED MEAL DEMAND</div>
      </div>

      {/* Main Title */}
      <div className="my-1">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-[1.4] mb-2">
          {t('عدد الوجبات يجب أن يعكس عدد العمال المستحقين فعليًا', 'Meal Counts Must Reflect Confirmed Eligible Workers')}
        </h2>
        <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
          {t(
            'إيقاف نزيف ميزانية الإعاشة من خلال ربط مطابخ التجهيز بقواعد بيانات الحضور الفعلي في السكن ومواقع التشغيل، بدلاً من الاعتماد على تخمينات المشرفين.',
            'Halting food expenditure leakage by syncing industrial kitchen preparation directly with confirmed camp and site telemetry instead of lagging verbal estimates.'
          )}
        </p>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center my-2 flex-1">
        {/* Left: Current Waste vs Proposed Precision */}
        <div className="lg:col-span-5 flex flex-col space-y-4">
          <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-500/30">
            <h4 className="text-xs font-bold text-rose-300 flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              <span>{t('جذور مشكلة الإعاشة في الوضع التقليدي', 'Root Inefficiencies in Legacy Catering')}</span>
            </h4>
            <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
              <li>{t('الاعتماد على تقديرات غير دقيقة من مشرفي المواقع قبل الورديات.', 'Inaccurate pre-shift phone estimates from site supervisors.')}</li>
              <li>{t('طبخ وتجهيز مئات الوجبات لعمال في إجازات أو مسافرين أو متغيبين.', 'Cooking hundreds of surplus meals for workers on leave or absent.')}</li>
              <li>{t('انعدام أي قناة تواصل لحظية بين مسؤولي السكن ومسؤولي المطبخ.', 'Zero real-time data bridge between camp managers and head chefs.')}</li>
              <li>{t('صعوبة إثبات الفاقد أو محاسبة المتسبب في الوجبات الزائدة.', 'Total inability to audit food waste or trace cost responsibility.')}</li>
            </ul>
          </div>

          <div className="glass-panel p-4 rounded-xl border-amber-500/30 space-y-2">
            <h4 className="text-xs font-bold text-amber-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              <span>{t('مزايا منظومة التغذية المقترحة', 'Engineered Catering Capabilities')}</span>
            </h4>
            <div className="space-y-1.5 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>{t('حصر آلي للعمال المستحقين حسب السكن والموقع والوردية.', 'Automated eligible worker tally by camp, site, shift, and meal.')}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>{t('إصدار أمر تشغيل المطبخ بأعداد مؤكدة مع نسبة أمان قابلة للضبط.', 'Generating kitchen preparation orders with configurable safety buffers.')}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>{t('تسجيل استثناءات الوجبات الخاصة أو الورديات الإضافية بموافقة مسبقة.', 'Tracking overtime meal exceptions and settlements via formal workflows.')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Simulated Kitchen Live Dispatch HUD */}
        <div className="lg:col-span-7 glass-panel p-5 rounded-2xl border-amber-500/30 flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                <ChefHat className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">{t('لوحة تحكم مطبخ الإعاشة المركزي', 'Central Kitchen Batch Telemetry')}</h4>
                <p className="text-xs text-slate-400">{t('تحديث لحظي حسب الحضور المؤكد بالسكنات', 'Real-time sync from confirmed camp presence')}</p>
              </div>
            </div>
            <span className="text-[10px] font-mono bg-amber-950 text-amber-300 px-2.5 py-1 rounded-full border border-amber-800">
              {t('بيانات تجريبية توضيحية', 'DEMO TELEMETRY')}
            </span>
          </div>

          {/* Kitchen KPIs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4">
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-[11px] text-slate-400 block mb-0.5">{t('العمال المستحقون:', 'Eligible Workers:')}</span>
              <span className="text-lg font-bold text-white font-mono">1,420</span>
              <span className="text-[10px] text-cyan-400 block">{t('حضور مؤكد بالسكن', 'Verified in camp')}</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-[11px] text-slate-400 block mb-0.5">{t('وجبات تم تجهيزها:', 'Portions Prepared:')}</span>
              <span className="text-lg font-bold text-amber-300 font-mono">1,450</span>
              <span className="text-[10px] text-amber-400 block">{t('+30 وجبة احتياطي آمن', '+30 Buffer portions')}</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-[11px] text-slate-400 block mb-0.5">{t('وجبات تم صرفها:', 'Confirmed Issued:')}</span>
              <span className="text-lg font-bold text-emerald-400 font-mono">1,418</span>
              <span className="text-[10px] text-emerald-400 block">{t('مسجلة بنقاط الصرف', 'Logged at counter')}</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-[11px] text-slate-400 block mb-0.5">{t('الفاقد المقاس:', 'Measured Waste:')}</span>
              <span className="text-lg font-bold text-rose-400 font-mono">32 {t('وجبة', 'Trays')}</span>
              <span className="text-[10px] text-rose-400 block">2.2% {t('فقط (تحت السيطرة)', 'only (Controlled)')}</span>
            </div>
          </div>

          {/* Planned vs Actual Breakdown Bar */}
          <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-300">{t('مؤشر مطابقة خطة التغذية مع التوزيع الفعلي:', 'Meal Plan Precision vs Physical Issuance:')}</span>
              <span className="text-emerald-400 font-mono font-bold">97.8% {t('دقة تشغيلية', 'Precision Rate')}</span>
            </div>
            <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden flex">
              <div className="bg-emerald-400 h-full" style={{ width: '97.8%' }} />
              <div className="bg-rose-500 h-full" style={{ width: '2.2%' }} />
            </div>
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>{t('مصروف معتمد (1,418 وجبة)', 'Issued Trays (1,418)')}</span>
              <span className="text-rose-400">{t('فائض واحتياطي (32 وجبة)', 'Buffer Variance (32)')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom Line */}
      <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 flex items-center justify-between text-xs text-slate-400">
        <span className="flex items-center gap-2 text-amber-300">
          <TrendingDown className="w-4 h-4 text-amber-400" />
          {t(
            'تخفيض الفائض العشوائي من الوجبات يحقق وفراً شهرياً مؤكداً في ميزانية الإعاشة.',
            'Direct variance containment eliminates random unallocated kitchen waste, generating immediate monthly catering savings.'
          )}
        </span>
        <span className="font-mono text-slate-500 text-[11px]">MODULE-CATERING-V2</span>
      </div>
    </div>
  );
};
