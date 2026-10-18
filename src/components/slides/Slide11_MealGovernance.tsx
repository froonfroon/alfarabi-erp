import React, { useState } from 'react';
import { SceneMealDistribution } from '../3d/SceneMealDistribution';
import { ShieldCheck, AlertOctagon, UtensilsCrossed } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { soundManager } from '../../utils/audio';

export const Slide11_MealGovernance: React.FC = () => {
  const { isArabic, t } = useLanguage();

  const [scanResult, setScanResult] = useState<{
    type: 'success' | 'duplicate' | 'absent';
    workerName: string;
    workerId: string;
    statusTitle: string;
    statusDesc: string;
    time: string;
  }>({
    type: 'success',
    workerName: isArabic ? 'أحمد منصور' : 'Ahmed Mansoor',
    workerId: 'WRK-1042',
    statusTitle: isArabic ? 'جاهز للاستخدام — اختر سيناريو للتجربة الميدانية' : 'Ready — Select a Test Scenario Above',
    statusDesc: isArabic
      ? 'اضغط على أحد الأزرار أعلاه لتجربة مسح كارت العامل ومشاهدة رد فعل النظام اللحظي.'
      : 'Click any scenario button above to trigger the simulated station barcode scanner.',
    time: '13:00:00',
  });

  return (
    <div className="w-full h-full flex flex-col justify-between p-6 lg:p-8 relative">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime-950/60 border border-lime-500/40 text-lime-300 text-xs font-semibold">
          <UtensilsCrossed className="w-4 h-4 text-lime-400" />
          <span>{t('حوكمة الصرف وقاعدة الاستحقاق الفردي', 'Issuance Governance & 1-Worker-1-Meal Policy')}</span>
        </div>
        <div className="text-xs text-amber-400 font-mono bg-amber-950/40 px-3 py-1 rounded-lg border border-amber-800/40">
          ONE WORKER = ONE AUTHORIZED MEAL
        </div>
      </div>

      {/* Main Title */}
      <div className="my-1">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-[1.4] mb-2">
          {t('صرف منضبط.. وهدر أقل', 'Disciplined Meal Issuance — Minimal Waste')}
        </h2>
        <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
          {t(
            'التمييز الهندسي الدقيق بين الوجبة المخططة، والتخصيص المعتمد، والصرف الفعلي المسجل لمنع التكرار وضبط التكاليف.',
            'Rigorous architectural separation between planned batch counts, authorized worker entitlements, and confirmed physical receipt.'
          )}
        </p>
      </div>

      {/* Main 2-Column Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center my-2 flex-1">
        {/* Left: 3D Meal Tray Station Visualizer */}
        <div className="lg:col-span-6 h-[340px] sm:h-[400px] rounded-3xl bg-slate-950/60 border border-lime-500/30 p-2 shadow-2xl relative flex items-center justify-center">
          <SceneMealDistribution />
        </div>

        {/* Right: Operational Rules & Interactive Live Scanner Simulation */}
        <div className="lg:col-span-6 flex flex-col space-y-3.5">
          {/* Interactive Live Barcode Scanner Console */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border-2 border-lime-500/40 shadow-xl space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-lime-400 animate-ping"></span>
                <span className="text-xs font-black text-white tracking-wide">
                  {t('محاكي قارئ باركود نقاط التوزيع الحي', 'Live Field Station Scanner Simulator')}
                </span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-lime-950 text-lime-300 border border-lime-800/60 font-mono font-bold">
                {t('تجربة تفاعلية حية', 'INTERACTIVE DEMO')}
              </span>
            </div>

            {/* Test Simulation Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                onClick={() => {
                  soundManager.playTrigger();
                  setScanResult({
                    type: 'success',
                    workerName: isArabic ? 'أحمد منصور' : 'Ahmed Mansoor',
                    workerId: 'WRK-1042',
                    statusTitle: isArabic ? 'مصرح بالصرف — وجبة معتمدة' : 'Access Granted — Portion 1/1 Verified',
                    statusDesc: isArabic ? 'تم توثيق صرف وجبة الغداء - قفل آلي لمنع أي صرف مكرر اليوم.' : 'Lunch entitlement verified. Algorithmic lock engaged.',
                    time: '13:12:04'
                  });
                }}
                className="p-2.5 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-500/40 text-emerald-300 text-xs font-bold transition text-center flex flex-col items-center gap-1 active:scale-95"
              >
                <span>✓ {t('عامل مؤهل #1042', 'Valid Worker #1042')}</span>
                <span className="text-[10px] text-slate-400 font-normal">{t('استحقاق نظامي', 'First issuance')}</span>
              </button>

              <button
                onClick={() => {
                  soundManager.playClick();
                  setScanResult({
                    type: 'duplicate',
                    workerName: isArabic ? 'أحمد منصور' : 'Ahmed Mansoor',
                    workerId: 'WRK-1042',
                    statusTitle: isArabic ? 'مرفوض: محاولة صرف وجبة ثانية!' : 'Violation: Duplicate Meal Blocked!',
                    statusDesc: isArabic ? 'تم صرف وجبة الغداء مسبقاً في الساعة 13:12:04 بمطبخ الموقع أ.' : 'Meal already claimed at 13:12:04 in Kitchen Station A.',
                    time: '13:28:10'
                  });
                }}
                className="p-2.5 rounded-xl bg-rose-950/60 hover:bg-rose-900/60 border border-rose-500/40 text-rose-300 text-xs font-bold transition text-center flex flex-col items-center gap-1 active:scale-95"
              >
                <span>✕ {t('محاولة صرف مكرر', 'Duplicate Attempt')}</span>
                <span className="text-[10px] text-rose-400 font-normal">{t('منع التلاعب', 'Anti-fraud lock')}</span>
              </button>

              <button
                onClick={() => {
                  soundManager.playClick();
                  setScanResult({
                    type: 'absent',
                    workerName: isArabic ? 'محمود سامي' : 'Mahmoud Sami',
                    workerId: 'WRK-2089',
                    statusTitle: isArabic ? 'مرفوض: العامل مقيد في حالة غياب' : 'Restricted: Worker Flagged Absent',
                    statusDesc: isArabic ? 'مسجل غياب (اليوم الرابع) في سجل السكن - تم تجميد الاستحقاق آلياً.' : 'Logged Absent (Day 4) in Camp Registry. Meal auto-held.',
                    time: '13:30:15'
                  });
                }}
                className="p-2.5 rounded-xl bg-amber-950/60 hover:bg-amber-900/60 border border-amber-500/40 text-amber-300 text-xs font-bold transition text-center flex flex-col items-center gap-1 active:scale-95"
              >
                <span>⚠ {t('عامل غائب بالسكن', 'Absent in Camp')}</span>
                <span className="text-[10px] text-amber-400 font-normal">{t('ربط السكن بالتغذية', 'Camp-Catering Sync')}</span>
              </button>
            </div>

            {/* Live Scanner Telemetry Display Screen */}
            <div className={`p-3.5 rounded-xl border transition-all duration-300 ${
              scanResult.type === 'success'
                ? 'bg-emerald-950/40 border-emerald-500/60 shadow-[0_0_20px_rgba(16,185,129,0.2)]'
                : scanResult.type === 'duplicate'
                ? 'bg-rose-950/40 border-rose-500/60 shadow-[0_0_20px_rgba(244,63,94,0.2)]'
                : 'bg-amber-950/40 border-amber-500/60 shadow-[0_0_20px_rgba(245,158,11,0.2)]'
            }`}>
              <div className="flex items-center justify-between text-xs pb-1 mb-1 border-b border-slate-800">
                <span className="font-mono text-slate-400">ID: {scanResult.workerId} | {scanResult.workerName}</span>
                <span className="font-mono text-slate-400">{scanResult.time}</span>
              </div>
              <div className={`text-sm font-black ${
                scanResult.type === 'success'
                  ? 'text-emerald-400'
                  : scanResult.type === 'duplicate'
                  ? 'text-rose-400'
                  : 'text-amber-400'
              }`}>
                {scanResult.statusTitle}
              </div>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                {scanResult.statusDesc}
              </p>
            </div>
          </div>

          {/* Core Rule: Transactional Integrity */}
          <div className="glass-panel p-3.5 rounded-xl border-lime-500/30 flex items-center justify-between text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-lime-400 shrink-0" />
              <span>
                <strong>{t('مبدأ الصفر-ازدواجية:', 'Zero Duplicate Principle:')}</strong>{' '}
                {t('لا يمكن تحرير وجبة ثانية بنفس رقم العامل إلا بقرار مدير معتمد.', 'Algorithmic certainty eliminating phantom & double-claimed meals.')}
              </span>
            </div>
            <span className="text-[10px] text-emerald-400 font-mono font-bold shrink-0">100% AUDITED</span>
          </div>
        </div>
      </div>

      {/* Technical Honesty Note */}
      <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 flex items-center justify-between text-xs text-slate-400">
        <span className="flex items-center gap-2 text-cyan-300">
          <AlertOctagon className="w-4 h-4 text-cyan-400" />
          {t(
            'النظام لا يدّعي التحقق المادي الذاتي، بل يوثق حركة الصرف التي تتم بواسطة المشرف أو ماسح الباركود بنقطة التوزيع.',
            'The platform registers real transactions completed via certified station scanners or supervisors, distinguishing records from physical consumption.'
          )}
        </span>
        <span className="font-mono text-slate-500 text-[11px]">GOVERNANCE-MEAL-V2</span>
      </div>
    </div>
  );
};
