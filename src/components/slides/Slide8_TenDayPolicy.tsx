import React, { useState } from 'react';
import { Clock, AlertTriangle } from 'lucide-react';
import { soundManager } from '../../utils/audio';
import { useLanguage } from '../../context/LanguageContext';
import { SceneBedTenDays3D } from '../3d/SceneBedTenDays3D';

export const Slide8_TenDayPolicy: React.FC = () => {
  const { isArabic, t } = useLanguage();
  const [dayCounter, setDayCounter] = useState<number>(7);

  const getDayStatus = (d: number) => {
    if (d <= 3) {
      return {
        label: t('غياب مسجل مبكر (تحت المراقبة)', 'Early Logged Absence (Monitored)'),
        color: 'text-cyan-400',
        border: 'border-cyan-500/40',
        badge: 'bg-cyan-950 text-cyan-300',
      };
    }
    if (d <= 7) {
      return {
        label: t('تنبيه للمشرف (قرب اكتمال المهلة)', 'Supervisor Alert (Approaching Threshold)'),
        color: 'text-amber-400',
        border: 'border-amber-500/40',
        badge: 'bg-amber-950 text-amber-300',
      };
    }
    if (d < 10) {
      return {
        label: t('إنذار نهائي - تواصل فوري مع العامل', 'Critical Warning - Contact Worker Immediately'),
        color: 'text-orange-400',
        border: 'border-orange-500/40',
        badge: 'bg-orange-950 text-orange-300',
      };
    }
    return {
      label: t('اكتمال 10 أيام: إحالة لمدير العمليات للمراجعة', 'Day 10 Reached: Escalated to Operations Director'),
      color: 'text-rose-400',
      border: 'border-rose-500/50',
      badge: 'bg-rose-950 text-rose-300',
    };
  };

  const status = getDayStatus(dayCounter);

  return (
    <div className="w-full h-full flex flex-col justify-between p-6 lg:p-8 relative">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-500/40 text-amber-300 text-xs font-semibold">
          <Clock className="w-4 h-4 text-amber-400" />
          <span>{t('حوكمة سياسة حجز الأسرة والغياب', 'Bed Retention Policy & Absence Governance')}</span>
        </div>
        <div className="text-xs text-rose-400 font-mono bg-rose-950/40 px-3 py-1 rounded-lg border border-rose-800/40">
          THE 10-DAY BED RETENTION POLICY
        </div>
      </div>

      {/* Main Title */}
      <div className="my-1">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-[1.4] mb-2">
          {t('كل سرير له حالة.. وكل يوم غياب محسوب', 'Every Bed Has a State — Every Absence Day Accounted')}
        </h2>
        <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
          {t(
            'آلية دقيقة لحوكمة أسرة الغائبين: احتساب مدة الغياب آلياً، إرسال إشعارات استباقية للمشرفين، ولا يتم إخلاء السرير إلا بعد اعتماد الإدارة العليا وفق اللوائح.',
            'A rigorous governance protocol for unworked beds: automatic absence timers, proactive supervisor alerts, and guaranteed management sign-off before reallocation.'
          )}
        </p>
      </div>

      {/* Interactive 10-Day Policy Timeline Simulator & 3D Bed Matrix */}
      <div className="my-2 p-5 rounded-2xl bg-slate-900/80 border border-slate-700/80 backdrop-blur-md">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
          
          {/* Left Side: Interactive Slider Controls and Telemetry Cards */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-slate-800">
              <div>
                <h4 className="font-bold text-white text-sm flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span>{t('محاكاة عداد أيام الغياب التفاعلي:', 'Interactive Absence Countdown Simulator:')}</span>
                </h4>
                <p className="text-xs text-slate-400">
                  {t('حرك المؤشر لمشاهدة استجابة السرير ثلاثي الأبعاد وتصعيد النظام', 'Adjust day counter to watch live 3D bed telemetry transition')}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-300 font-bold">{t('اليوم:', 'Day:')}</span>
                <span className="text-lg font-mono font-black text-amber-400 bg-amber-950/60 px-3 py-1 rounded-lg border border-amber-600/40">
                  {dayCounter} / 10 {t('أيام', 'Days')}
                </span>
              </div>
            </div>

            {/* Timeline Range Track with 10 Points */}
            <div className="py-1">
              <input
                type="range"
                min={1}
                max={10}
                value={dayCounter}
                onChange={(e) => {
                  soundManager.playClick();
                  setDayCounter(Number(e.target.value));
                }}
                className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />

              <div className="flex justify-between text-[11px] font-mono text-slate-400 mt-2 px-1">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((d) => (
                  <span
                    key={d}
                    onClick={() => {
                      soundManager.playClick();
                      setDayCounter(d);
                    }}
                    className={`cursor-pointer px-1.5 py-0.5 rounded transition ${
                      dayCounter === d
                        ? 'bg-amber-400 text-black font-bold scale-125'
                        : d === 10
                        ? 'text-rose-400 font-bold'
                        : 'hover:text-slate-200'
                    }`}
                  >
                    {t(`يوم ${d}`, `Day ${d}`)}
                  </span>
                ))}
              </div>
            </div>

            {/* Dynamic Status HUD for Selected Day */}
            <div className={`p-3.5 rounded-xl border ${status.border} bg-slate-950/70 grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs`}>
              <div>
                <span className="text-slate-400 block text-[11px]">{t('حالة العامل:', 'Worker State:')}</span>
                <span className="font-bold text-white">{t('غائب (مغادرة مسجلة)', 'Absent')}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">{t('المتبقي للحد الأقصى:', 'To Threshold:')}</span>
                <span className="font-bold text-amber-300 font-mono">
                  {10 - dayCounter} {t('أيام متبقية', 'Days')}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">{t('الإشعار البرمجي:', 'System Alert:')}</span>
                <span className={`font-bold ${status.color}`}>{status.label}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">{t('حالة السرير الفعلية:', 'Physical Bed:')}</span>
                <span className="font-bold text-slate-200">
                  {dayCounter < 10 ? t('محجوز مؤقتًا', 'Protected Hold') : t('معلق للإدارة', 'Pending Sign-Off')}
                </span>
              </div>
            </div>
          </div>

          {/* Right Side: Interactive 3D Bed Room Telemetry */}
          <div className="lg:col-span-5 h-[230px] sm:h-[260px] rounded-2xl bg-slate-950/70 border border-amber-500/30 p-1.5 shadow-2xl relative flex items-center justify-center">
            <SceneBedTenDays3D dayCounter={dayCounter} />
          </div>

        </div>
      </div>

      {/* 6-Step Formal Policy Rules Flow */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-2.5 my-1">
        <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800 text-xs">
          <span className="w-5 h-5 rounded bg-cyan-950 text-cyan-400 flex items-center justify-center font-bold font-mono text-[10px] mb-1.5">1</span>
          <span className="font-bold text-white block">{t('تسجيل المغادرة', 'Leave Registered')}</span>
          <span className="text-[10px] text-slate-400">{t('توثيق تاريخ ووقت خروج العامل', 'Timestamped exit logged')}</span>
        </div>
        <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800 text-xs">
          <span className="w-5 h-5 rounded bg-cyan-950 text-cyan-400 flex items-center justify-center font-bold font-mono text-[10px] mb-1.5">2</span>
          <span className="font-bold text-white block">{t('احتساب المدة', 'Automated Timer')}</span>
          <span className="text-[10px] text-slate-400">{t('عداد آلي لحظي بدون تدخل يدوي', 'Real-time elapsed tracking')}</span>
        </div>
        <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800 text-xs">
          <span className="w-5 h-5 rounded bg-amber-950 text-amber-400 flex items-center justify-center font-bold font-mono text-[10px] mb-1.5">3</span>
          <span className="font-bold text-white block">{t('تنبيه اليوم 3 و 7', 'Day 3 & 7 Triggers')}</span>
          <span className="text-[10px] text-slate-400">{t('إشعار المشرف لمتابعة سبب الغياب', 'Early supervisor prompts')}</span>
        </div>
        <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800 text-xs">
          <span className="w-5 h-5 rounded bg-orange-950 text-orange-400 flex items-center justify-center font-bold font-mono text-[10px] mb-1.5">4</span>
          <span className="font-bold text-white block">{t('بلوغ اليوم 10', 'Day 10 Escalation')}</span>
          <span className="text-[10px] text-slate-400">{t('تنبيه تلقائي للإدارة التنفيذية', 'Direct alert to C-Suite')}</span>
        </div>
        <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800 text-xs">
          <span className="w-5 h-5 rounded bg-rose-950 text-rose-400 flex items-center justify-center font-bold font-mono text-[10px] mb-1.5">5</span>
          <span className="font-bold text-white block">{t('المراجعة والاعتماد', 'Executive Sign-Off')}</span>
          <span className="text-[10px] text-slate-400">{t('لا تحرير عشوائي بدون توقيع معتمد', 'No arbitrary auto-eviction')}</span>
        </div>
        <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800 text-xs">
          <span className="w-5 h-5 rounded bg-emerald-950 text-emerald-400 flex items-center justify-center font-bold font-mono text-[10px] mb-1.5">6</span>
          <span className="font-bold text-white block">{t('إتاحة التسكين', 'Slot Reallocation')}</span>
          <span className="text-[10px] text-slate-400">{t('تحويل السرير لشاغر وتسجيل الحركة', 'Bed marked vacant for intake')}</span>
        </div>
      </div>

      {/* Critical Caveat Notice */}
      <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-600/30 text-xs text-amber-200 flex items-start gap-2.5">
        <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>{t('ضمانة قانونية وتشغيلية:', 'Legal & Governance Safeguard:')}</strong>{' '}
          {t(
            'النظام لا يُسقط حيازة السرير تلقائيًا بمجرد انقضاء الـ 10 أيام، بل يمنع القرار المنفرد ويجعل الإخلاء خاضعًا لمراجعة الإدارة المختصة واستثناء الإجازات المرضية أو المعتمدة مسبقًا.',
            'The platform never automatically voids bed occupancy on day 10 without managerial review; documented medical leaves and approved exceptions pause the timer according to corporate policy.'
          )}
        </p>
      </div>
    </div>
  );
};
