import React from 'react';
import { LayoutDashboard, Users, Home, Utensils, Bus, AlertCircle, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const Slide15_ExecutiveDashboard: React.FC = () => {
  const { isArabic, t } = useLanguage();

  return (
    <div className="w-full h-full flex flex-col justify-between p-6 lg:p-8 relative">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-xs font-semibold">
          <LayoutDashboard className="w-4 h-4 text-cyan-400" />
          <span>{t('مركز القيادة والمتابعة اللحظية', 'Unified Executive Command Cockpit')}</span>
        </div>
        <div className="text-xs text-amber-400 font-mono bg-amber-950/40 px-3 py-1 rounded-lg border border-amber-800/40">
          {t('بيانات تجريبية توضيحية (DEMO DATA)', 'DEMO OPERATIONAL TELEMETRY')}
        </div>
      </div>

      {/* Main Title */}
      <div className="my-1">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-[1.4] mb-2">
          {t('الإدارة ترى الصورة كاملة في شاشة واحدة', 'The Executive Board Sees the Full Picture on One Screen')}
        </h2>
        <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
          {t(
            'لوحة قيادية مركزية مصممة للقيادات التنفيذية؛ تجمع مؤشرات الحضور، إشغال الأسرة، كفاءة الإعاشة، واستغلال الأسطول في واجهة تفاعلية موحدة.',
            'A unified C-Suite telemetry console consolidating active headcount, bed occupancy rates, catering efficiency, and fleet capacity into an executive dashboard.'
          )}
        </p>
      </div>

      {/* Executive KPI Cards Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 my-2">
        {/* KPI 1 */}
        <div className="glass-panel p-3.5 rounded-xl border-cyan-500/30">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>{t('إجمالي العمالة المقيدة', 'Total Registered Workforce')}</span>
            <Users className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-black text-white font-mono">1,650</div>
          <div className="text-[11px] text-cyan-400 mt-1 flex items-center justify-between">
            <span>{t('حضور فعلي: 1,518', 'Active: 1,518')}</span>
            <span className="text-amber-400">{t('غياب: 132', 'Absent: 132')}</span>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="glass-panel p-3.5 rounded-xl border-lime-500/30">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>{t('نسبة إشغال السكنات', 'Camp Bed Occupancy Rate')}</span>
            <Home className="w-4 h-4 text-lime-400" />
          </div>
          <div className="text-2xl font-black text-lime-300 font-mono">89.4%</div>
          <div className="text-[11px] text-slate-300 mt-1 flex items-center justify-between">
            <span>{t('أسرة شاغرة: 175 سرير', 'Vacant Beds: 175')}</span>
            <span className="text-rose-400">{t('تحت المراجعة: 18', 'Review: 18')}</span>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="glass-panel p-3.5 rounded-xl border-amber-500/30">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>{t('وجبات اليوم (مطلوبة / مصروفة)', 'Today Meals (Planned / Issued)')}</span>
            <Utensils className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-amber-300 font-mono">1,518 / 1,510</div>
          <div className="text-[11px] text-emerald-400 mt-1 flex items-center justify-between">
            <span>{t('دقة الصرف: 99.4%', 'Accuracy: 99.4%')}</span>
            <span className="text-slate-400">{t('الفاقد: 8 وجبات', 'Waste: 8')}</span>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="glass-panel p-3.5 rounded-xl border-purple-500/30">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>{t('معدل استغلال الأتوبيسات', 'Fleet Seat Utilization Rate')}</span>
            <Bus className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-black text-purple-300 font-mono">91.2%</div>
          <div className="text-[11px] text-slate-300 mt-1 flex items-center justify-between">
            <span>{t('34 رحلة منتظمة', '34 Active Runs')}</span>
            <span className="text-emerald-400">{t('0 رحلة طوارئ', '0 Charter Trips')}</span>
          </div>
        </div>
      </div>

      {/* Main Operational Feeds & Visual Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 my-1 flex-1">
        {/* Left Side: Active Operational Alerts */}
        <div className="lg:col-span-7 glass-panel p-4 rounded-2xl border-cyan-500/30 flex flex-col justify-between">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h4 className="text-xs font-bold text-white flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-cyan-400" />
              <span>{t('التنبيهات التشغيلية الاستباقية للورديات القادمة', 'Proactive Shift Escalations & Operational Alerts')}</span>
            </h4>
            <span className="text-[10px] text-slate-400 font-mono">
              {t('3 تنبيهات تتطلب المتابعة', '3 Actionable Items')}
            </span>
          </div>

          <div className="space-y-2 my-2 text-xs">
            <div className="p-2.5 rounded-lg bg-rose-950/40 border border-rose-500/40 flex items-start gap-2.5">
              <span className="w-2 h-2 rounded-full bg-rose-500 mt-1.5 shrink-0 animate-ping" />
              <div>
                <div className="font-bold text-rose-300">
                  {t('سكن النخيل: 4 أسرة بلغت 10 أيام غياب', 'Palm Camp: 4 Beds Reached Day-10 Threshold')}
                </div>
                <div className="text-slate-300 text-[11px]">
                  {t('بانتظار اعتماد مدير العمليات لإعادة طرحها للتسكين الجديد.', 'Pending Operations Director formal sign-off for intake slot release.')}
                </div>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-amber-950/40 border border-amber-500/40 flex items-start gap-2.5">
              <span className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 shrink-0" />
              <div>
                <div className="font-bold text-amber-300">
                  {t('مسار أتوبيس 03 (وردية المساء): زيادة متوقعة بـ 6 ركاب', 'Transit Route 03 (Night Shift): +6 Passengers Projected')}
                </div>
                <div className="text-slate-300 text-[11px]">
                  {t('تم توجيه مقترح آلي بدمج ركاب نقطة التجمع (ب) مع الأتوبيس 02 لتفادي استئجار حافلة.', 'Automated recommendation to merge Hub B with Bus 02 to prevent charter costs.')}
                </div>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-blue-950/40 border border-blue-500/40 flex items-start gap-2.5">
              <span className="w-2 h-2 rounded-full bg-cyan-500 mt-1.5 shrink-0" />
              <div>
                <div className="font-bold text-cyan-300">
                  {t('وثائق عمالة: 12 فيش جنائي تقترب من انتهاء صلاحيتها', 'Compliance Dossier: 12 Police Clearances Expiring in 14 Days')}
                </div>
                <div className="text-slate-300 text-[11px]">
                  {t('تم إرسال إشعار لمسؤول الموارد البشرية لتجديدها مبكراً.', 'Automated reminder dispatched to HR Compliance lead for renewal.')}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
            <span>{t('تحديث فوري كل 60 ثانية', 'Telemetry Sync: 60s Interval')}</span>
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> {t('المنظومة تعمل بكفاءة تامة', 'All Modules Operational')}
            </span>
          </div>
        </div>

        {/* Right Side: Compliance & Documents Summary */}
        <div className="lg:col-span-5 glass-panel p-4 rounded-2xl border-cyan-500/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-3">
              <h4 className="text-xs font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>{t('حالة امتثال الأرشيف والوثائق', 'Regulatory Compliance Index')}</span>
              </h4>
              <span className="text-[10px] text-emerald-400 font-bold font-mono">98.2% {t('امتثال', 'Compliant')}</span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center text-slate-300">
                <span>{t('بطاقات الرقم القومي المكتملة:', 'National ID Validated:')}</span>
                <span className="font-mono font-bold text-white">1,642 / 1,650</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="bg-cyan-400 h-full" style={{ width: '99.5%' }} />
              </div>

              <div className="flex justify-between items-center text-slate-300 pt-1">
                <span>{t('صحيفة الحالة الجنائية (الفيش):', 'Police Clearances Cleared:')}</span>
                <span className="font-mono font-bold text-white">1,618 / 1,650</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="bg-lime-400 h-full" style={{ width: '98.0%' }} />
              </div>

              <div className="flex justify-between items-center text-slate-300 pt-1">
                <span>{t('عقود العمل وإقرارات الاستلام:', 'Signed Contracts on File:')}</span>
                <span className="font-mono font-bold text-white">1,650 / 1,650</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="bg-emerald-400 h-full" style={{ width: '100%' }} />
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
            <span>{t('مزامنة سحابية معتمدة: Google Drive', 'Enterprise Cloud: Google Drive API')}</span>
            <span className="text-cyan-400 font-mono font-bold">AES-256 ENCRYPTED</span>
          </div>
        </div>
      </div>

      {/* Footer Disclaimer */}
      <div className="text-[11px] text-slate-400 text-center border-t border-slate-800 pt-2">
        {t(
          '* كافة المؤشرات والأرقام المعروضة في هذه الشاشة هي بيانات تجريبية استرشادية لبيان قدرات لوحة القيادة العليا بعد تدشين المنظومة.',
          '* All KPI figures and telemetry shown are illustrative demo metrics showcasing C-suite cockpit capabilities upon enterprise deployment.'
        )}
      </div>
    </div>
  );
};
