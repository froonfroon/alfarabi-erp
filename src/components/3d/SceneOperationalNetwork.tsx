import React, { useState } from 'react';
import { soundManager } from '../../utils/audio';
import { FileText, Home, Utensils, Bus, CheckCircle2, RefreshCw, AlertTriangle, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const SceneOperationalNetwork: React.FC = () => {
  const { t } = useLanguage();
  const [scenarioState, setScenarioState] = useState<'idle' | 'running' | 'completed'>('idle');
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [workerState, setWorkerState] = useState<'present' | 'absent'>('present');

  const triggerScenario = (isAbsent: boolean) => {
    soundManager.playTrigger();
    setScenarioState('running');
    setWorkerState(isAbsent ? 'absent' : 'present');
    setCurrentStep(1);

    // Sequence through the 5 interconnected operational steps
    const timer1 = setTimeout(() => {
      setCurrentStep(2);
      soundManager.playClick();
    }, 900);

    const timer2 = setTimeout(() => {
      setCurrentStep(3);
      soundManager.playClick();
    }, 1800);

    const timer3 = setTimeout(() => {
      setCurrentStep(4);
      soundManager.playClick();
    }, 2700);

    const timer4 = setTimeout(() => {
      setCurrentStep(5);
      soundManager.playTrigger();
      setScenarioState('completed');
    }, 3600);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  };

  const resetScenario = () => {
    soundManager.playClick();
    setScenarioState('idle');
    setCurrentStep(0);
    setWorkerState('present');
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Control Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/80 border border-slate-700/60 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-cyan-400 animate-ping"></div>
          <div>
            <h4 className="font-bold text-white text-sm">
              {t('محاكاة تفاعلية للربط بين الإدارات الأربع', 'Interactive Cross-Pillar Telemetry Simulation')}
            </h4>
            <p className="text-xs text-slate-400">
              {t(
                'انقر لتجربة أثر تغير حالة العامل على تدفق البيانات اللحظي عبر المنظومة',
                'Simulate a worker state transition and trace the synchronous event ripple in real time'
              )}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => triggerScenario(true)}
            disabled={scenarioState === 'running'}
            className="px-4 py-2 rounded-lg bg-rose-600/30 hover:bg-rose-600/50 border border-rose-500/50 text-rose-200 text-xs font-bold transition flex items-center gap-2 active:scale-95 disabled:opacity-50"
          >
            <AlertTriangle className="w-4 h-4 text-rose-400" />
            <span>{t('سيناريو: تسجيل غياب مفاجئ لعامل (WRK-8924)', 'Trigger Event: Unplanned Absence (WRK-8924)')}</span>
          </button>

          <button
            onClick={() => triggerScenario(false)}
            disabled={scenarioState === 'running'}
            className="px-4 py-2 rounded-lg bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-500/50 text-emerald-200 text-xs font-bold transition flex items-center gap-2 active:scale-95 disabled:opacity-50"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>{t('سيناريو: تسجيل عودة معتمدة من إجازة', 'Trigger Event: Return from Approved Leave')}</span>
          </button>

          <button
            onClick={resetScenario}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs border border-slate-700 transition"
            title={t('إعادة تعيين المحاكاة', 'Reset Simulation')}
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 5 Interconnected Operational Modules Visual Flow */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative">
        {/* Module 1: Worker & Admin */}
        <div className={`p-4 rounded-xl border transition-all duration-500 flex flex-col justify-between ${
          currentStep >= 1
            ? 'bg-blue-950/60 border-cyan-400 shadow-[0_0_25px_rgba(56,189,248,0.25)] ring-1 ring-cyan-400'
            : 'bg-slate-900/50 border-slate-800 opacity-60'
        }`}>
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-xs">1</span>
              <FileText className="w-5 h-5 text-cyan-400" />
            </div>
            <h5 className="font-bold text-white text-sm mb-1">{t('إدارة الوثائق والبيانات', 'Identity & Records')}</h5>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              {t(
                'التحقق من هوية العامل ومطابقة Worker ID وتسجيل تعديل الحالة التشغيلية.',
                'Matching canonical Worker ID and updating operational deployment status.'
              )}
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] font-mono">
            <div className="text-slate-400">{t('حالة العامل:', 'Worker Status:')}</div>
            <div className={`font-bold ${workerState === 'absent' ? 'text-rose-400' : 'text-emerald-400'}`}>
              {workerState === 'absent' ? t('● غائب - تسجيل رسمي', '● Absent (Logged)') : t('● متواجد بالخدمة', '● Active on Duty')}
            </div>
          </div>
        </div>

        {/* Module 2: Accommodation */}
        <div className={`p-4 rounded-xl border transition-all duration-500 flex flex-col justify-between ${
          currentStep >= 2
            ? 'bg-amber-950/60 border-amber-400 shadow-[0_0_25px_rgba(245,158,11,0.25)] ring-1 ring-amber-400'
            : 'bg-slate-900/50 border-slate-800 opacity-60'
        }`}>
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs">2</span>
              <Home className="w-5 h-5 text-amber-400" />
            </div>
            <h5 className="font-bold text-white text-sm mb-1">{t('إدارة السكن والغياب', 'Camp Housing')}</h5>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              {t(
                'تحديث حالة السرير تلقائيًا، وبدء احتساب عداد سياسة الـ 10 أيام مع تنبيه للمشرف.',
                'Bed state toggled to Absent; 10-day retention countdown initiates with supervisor alert.'
              )}
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] font-mono">
            <div className="text-slate-400">{t('حالة السرير #204:', 'Bed #204 Status:')}</div>
            <div className={`font-bold ${workerState === 'absent' ? 'text-amber-400' : 'text-cyan-400'}`}>
              {workerState === 'absent' ? t('● غائب مؤقتًا (عداد: 1/10)', '● Absent (Timer: 1/10)') : t('● مشغول معتمد', '● Occupied & Active')}
            </div>
          </div>
        </div>

        {/* Module 3: Catering */}
        <div className={`p-4 rounded-xl border transition-all duration-500 flex flex-col justify-between ${
          currentStep >= 3
            ? 'bg-lime-950/60 border-lime-400 shadow-[0_0_25px_rgba(163,230,53,0.25)] ring-1 ring-lime-400'
            : 'bg-slate-900/50 border-slate-800 opacity-60'
        }`}>
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="w-7 h-7 rounded-lg bg-lime-500/20 text-lime-400 flex items-center justify-center font-bold text-xs">3</span>
              <Utensils className="w-5 h-5 text-lime-400" />
            </div>
            <h5 className="font-bold text-white text-sm mb-1">{t('المطبخ والإعاشة', 'Kitchen & Catering')}</h5>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              {t(
                'إعادة احتساب الوجبات المستحقة فورياً؛ إيقاف صرف الوجبة لمنع الهدر المالي.',
                'Instant recalculation of eligible meals; entitlement blocked to prevent meal waste.'
              )}
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] font-mono">
            <div className="text-slate-400">{t('طلب وجبة الغداء:', 'Lunch Demand:')}</div>
            <div className={`font-bold ${workerState === 'absent' ? 'text-rose-400' : 'text-emerald-400'}`}>
              {workerState === 'absent' ? t('450 -> 449 وجبة (-1)', '450 -> 449 Trays (-1)') : t('450 وجبة كاملة', '450 Full Trays')}
            </div>
          </div>
        </div>

        {/* Module 4: Transportation */}
        <div className={`p-4 rounded-xl border transition-all duration-500 flex flex-col justify-between ${
          currentStep >= 4
            ? 'bg-purple-950/60 border-purple-400 shadow-[0_0_25px_rgba(168,85,247,0.25)] ring-1 ring-purple-400'
            : 'bg-slate-900/50 border-slate-800 opacity-60'
        }`}>
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="w-7 h-7 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-xs">4</span>
              <Bus className="w-5 h-5 text-purple-400" />
            </div>
            <h5 className="font-bold text-white text-sm mb-1">{t('الحركة والأتوبيسات', 'Fleet Dispatch')}</h5>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              {t(
                'تحديث كشف ركاب الأتوبيس قبل التحرك، وتحرير المقعد أو إعادة توجيه السعة للبدلاء.',
                'Transit manifest decrements passenger; seat liberated for standby shift intake.'
              )}
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] font-mono">
            <div className="text-slate-400">{t('إشغال أتوبيس الوردية:', 'Shift Bus Occupancy:')}</div>
            <div className="font-bold text-purple-300">
              {workerState === 'absent' ? t('49 / 50 (مقعد شاغر)', '49 / 50 (Seat Freed)') : t('50 / 50 (مكتمل)', '50 / 50 (Full Capacity)')}
            </div>
          </div>
        </div>

        {/* Module 5: Executive Dashboard */}
        <div className={`p-4 rounded-xl border transition-all duration-500 flex flex-col justify-between ${
          currentStep >= 5
            ? 'bg-emerald-950/60 border-emerald-400 shadow-[0_0_25px_rgba(52,211,153,0.25)] ring-1 ring-emerald-400'
            : 'bg-slate-900/50 border-slate-800 opacity-60'
        }`}>
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">5</span>
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            </div>
            <h5 className="font-bold text-white text-sm mb-1">{t('لوحة القيادة العليا', 'Executive Cockpit')}</h5>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              {t(
                'تحديث مؤشرات التكلفة والجاهزية، وتسجيل الإجراء في سجل التدقيق الموحد (Audit Log).',
                'Live KPIs updated; event timestamped into immutable audit logs.'
              )}
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] font-mono">
            <div className="text-slate-400">{t('التأثير المالي المباشر:', 'Direct Financial ROI:')}</div>
            <div className="font-bold text-emerald-400">
              {workerState === 'absent' ? t('وفر فوري: 1 وجبة + مقعد', 'Direct Save: 1 Meal + Seat') : t('تشغيل بنسبة 100%', '100% Active Production')}
            </div>
          </div>
        </div>
      </div>

      {/* Technical Disclaimer Note */}
      <div className="p-3.5 rounded-lg bg-blue-950/30 border border-blue-500/20 text-xs text-blue-200 flex items-start gap-3">
        <span className="text-cyan-400 font-bold shrink-0">{t('ملاحظة هندسية:', 'Architectural Note:')}</span>
        <p className="text-slate-300 leading-relaxed">
          {t(
            'هذا التدفق التتابعي التلقائي يعتمد على تفعيل قواعد الأعمال المعتمدة (Configured Business Rules) والربط البرمجي بين قواعد البيانات، مع اشتراط تأكيد الإجراء من المشرف المختص لمنع القرارات العشوائية.',
            'This synchronous event cascade runs on configured business rules and relational database triggers, requiring authorized supervisor sign-off to prevent unverified data cascades.'
          )}
        </p>
      </div>
    </div>
  );
};
