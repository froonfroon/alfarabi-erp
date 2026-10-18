import React, { useState } from 'react';
import { 
  AlertOctagon, 
  Sparkles, 
  Layers, 
  TrendingUp, 
  CheckCircle2, 
  AlertTriangle,
  ShieldCheck,
  Zap,
  DollarSign,
  ChevronRight,
  ChevronLeft,
  FileSpreadsheet,
  Home,
  Utensils,
  Bus,
  Lock,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { soundManager } from '../../utils/audio';
import { 
  SceneProblemDeepDive3D, 
  PROBLEMS_CATALOG, 
  PROBLEM_KEYS, 
  type ProblemType 
} from '../3d/SceneProblemDeepDive3D';

export const Slide3_Challenges: React.FC = () => {
  const { isArabic, t } = useLanguage();
  const [selectedProblem, setSelectedProblem] = useState<ProblemType>('housing');
  const [mode, setMode] = useState<'problem' | 'solution'>('solution');

  const currentProblemData = PROBLEMS_CATALOG[selectedProblem];
  const currentIndex = PROBLEM_KEYS.indexOf(selectedProblem);

  const handleSelectProblem = (key: ProblemType) => {
    soundManager.playClick();
    setSelectedProblem(key);
  };

  const handleNextProblem = () => {
    soundManager.playSlideTransition();
    const nextIdx = (currentIndex + 1) % PROBLEM_KEYS.length;
    setSelectedProblem(PROBLEM_KEYS[nextIdx]);
  };

  const handlePrevProblem = () => {
    soundManager.playSlideTransition();
    const prevIdx = (currentIndex - 1 + PROBLEM_KEYS.length) % PROBLEM_KEYS.length;
    setSelectedProblem(PROBLEM_KEYS[prevIdx]);
  };

  const toggleMode = () => {
    soundManager.playTrigger();
    setMode(prev => (prev === 'problem' ? 'solution' : 'problem'));
  };

  return (
    <div className="w-full h-full flex flex-col justify-between p-3 sm:p-5 lg:p-6 relative select-none">
      
      {/* 1. Header & Title Block */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/80 border border-rose-500/50 text-rose-300 text-xs font-semibold shadow-md">
            <AlertOctagon className="w-4 h-4 text-rose-400" />
            <span>{t('تشخيص المشكلات الميدانية والمعالجة ثلاثية الأبعاد', 'Operational Diagnostic & Dedicated 3D Solutions')}</span>
          </div>

          <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>{t('نموذج 3D مخصص لكل معضلة تشغيلية', 'Dedicated 3D Model Per Problem')}</span>
          </div>
        </div>

        {/* Global Stats Capsule */}
        <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-700/80 px-3 py-1 rounded-xl text-xs">
          <span className="text-slate-400">{t('المعضلة المعروضة:', 'Active Problem:')}</span>
          <span className="font-mono font-black text-cyan-400">
            0{currentIndex + 1} / 0{PROBLEM_KEYS.length}
          </span>
        </div>
      </div>

      {/* Main Headline */}
      <div className="mb-2">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white leading-tight mb-1 flex items-center gap-2">
          <span>{isArabic ? currentProblemData.titleAr : currentProblemData.titleEn}</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-4xl">
          {isArabic ? currentProblemData.subtitleAr : currentProblemData.subtitleEn}
        </p>
      </div>

      {/* 2. Top Five Problem Selector Buttons (Tab Strip) */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 my-1">
        {PROBLEM_KEYS.map((key, idx) => {
          const item = PROBLEMS_CATALOG[key];
          const Icon = item.icon;
          const isSelected = selectedProblem === key;

          return (
            <button
              key={key}
              onClick={() => handleSelectProblem(key)}
              className={`p-2 sm:p-2.5 rounded-xl border text-left transition-all flex items-center gap-2 ${
                isSelected
                  ? 'bg-gradient-to-r from-cyan-950 via-slate-900 to-blue-950 border-cyan-400 text-white shadow-[0_0_20px_rgba(6,182,212,0.4)] scale-[1.02]'
                  : 'bg-slate-900/70 hover:bg-slate-800/80 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center shrink-0 font-bold"
                style={{ backgroundColor: `${item.accentColor}25`, color: item.accentColor }}
              >
                <Icon className="w-4 h-4" />
              </div>
              <div className="truncate">
                <div className="text-[10px] font-mono text-slate-400">
                  {t(`معضلة 0${idx + 1}`, `Problem 0${idx + 1}`)}
                </div>
                <div className="text-xs font-bold text-white truncate">
                  {isArabic ? item.badgeAr : item.badgeEn}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* 3. Center: Dedicated 3D Scene for the Selected Problem */}
      <div className="my-1.5 relative">
        <SceneProblemDeepDive3D
          activeProblem={selectedProblem}
          mode={mode}
          onToggleMode={toggleMode}
        />

        {/* Floating Quick Prev / Next Arrows over 3D viewport */}
        <button
          onClick={handlePrevProblem}
          className={`absolute bottom-4 ${isArabic ? 'right-4' : 'left-4'} z-20 p-2.5 rounded-xl bg-slate-900/85 hover:bg-slate-800 border border-slate-700/80 text-cyan-300 hover:text-white transition active:scale-95 backdrop-blur-md shadow-xl flex items-center gap-1.5 text-xs font-bold`}
          title={t('المعضلة السابقة', 'Previous Problem')}
        >
          {isArabic ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          <span className="hidden sm:inline">{t('السابق', 'Prev')}</span>
        </button>

        <button
          onClick={handleNextProblem}
          className={`absolute bottom-4 ${isArabic ? 'left-4' : 'right-4'} z-20 p-2.5 rounded-xl bg-slate-900/85 hover:bg-slate-800 border border-slate-700/80 text-cyan-300 hover:text-white transition active:scale-95 backdrop-blur-md shadow-xl flex items-center gap-1.5 text-xs font-bold`}
          title={t('المعضلة التالية', 'Next Problem')}
        >
          <span className="hidden sm:inline">{t('التالي', 'Next')}</span>
          {isArabic ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>
      </div>

      {/* 4. Deep-Dive Comparative Cockpit (Problem State vs Strong Solution) */}
      <div className="w-full rounded-2xl border border-slate-700/80 bg-slate-900/90 backdrop-blur-xl p-3.5 sm:p-4 shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          
          {/* Legacy Problem Box */}
          <div className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-500/35 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-rose-400 font-bold text-xs">
                  <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0" />
                  <span>{t('المشكلة التشغيلية والنزيف المالي الميداني', 'Field Operational Bottleneck')}</span>
                </div>
                <span className="text-[10px] font-mono font-bold text-rose-400 bg-rose-950/60 px-2 py-0.5 rounded border border-rose-800">
                  {t('الواقع القديم', 'Legacy State')}
                </span>
              </div>

              <h4 className="text-sm font-bold text-white mb-1.5">
                {isArabic ? currentProblemData.problemTitleAr : currentProblemData.problemTitleEn}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed mb-3">
                {isArabic ? currentProblemData.problemDescAr : currentProblemData.problemDescEn}
              </p>
            </div>

            {/* 3 Live Metric Chips for Problem */}
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-rose-900/40">
              {(isArabic ? currentProblemData.problemStatsAr : currentProblemData.problemStatsEn).map((st, i) => (
                <div key={i} className="bg-rose-950/40 border border-rose-900/50 p-1.5 rounded-lg text-center">
                  <div className="text-[10px] text-slate-400 truncate">{st.label}</div>
                  <div className="text-xs font-mono font-black text-rose-400 mt-0.5">{st.value}</div>
                  <div className="text-[9px] text-rose-300/80 truncate">{st.sub}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Extreme Alfarabi Solution Box */}
          <div className="p-3.5 rounded-xl bg-emerald-950/25 border border-emerald-500/40 flex flex-col justify-between shadow-[0_0_25px_rgba(16,185,129,0.12)]">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{t('الحل الخارق الجذري من منظومة الفارابي ERP', 'Engineered Alfarabi Extreme Solution')}</span>
                </div>
                <span className="text-[10px] font-mono font-bold text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-600">
                  {t('معالجة جذرية 100%', '100% Solved')}
                </span>
              </div>

              <h4 className="text-sm font-bold text-white mb-1.5">
                {isArabic ? currentProblemData.solutionTitleAr : currentProblemData.solutionTitleEn}
              </h4>
              <p className="text-xs text-slate-200 leading-relaxed mb-3">
                {isArabic ? currentProblemData.solutionDescAr : currentProblemData.solutionDescEn}
              </p>
            </div>

            {/* 3 Live Metric Chips for Solution */}
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-emerald-900/40">
              {(isArabic ? currentProblemData.solutionStatsAr : currentProblemData.solutionStatsEn).map((st, i) => (
                <div key={i} className="bg-emerald-950/40 border border-emerald-800/50 p-1.5 rounded-lg text-center">
                  <div className="text-[10px] text-slate-400 truncate">{st.label}</div>
                  <div className="text-xs font-mono font-black text-emerald-400 mt-0.5">{st.value}</div>
                  <div className="text-[9px] text-emerald-300/80 truncate">{st.sub}</div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Strategic ROI Ribbon */}
        <div className="mt-3 pt-2.5 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-cyan-300 font-semibold">
            <Zap className="w-4 h-4 text-lime-400 shrink-0" />
            <span>{isArabic ? currentProblemData.roiMetricAr : currentProblemData.roiMetricEn}</span>
          </div>

          <div className="flex items-center gap-2 bg-emerald-950/80 border border-emerald-500/50 px-3 py-1 rounded-xl text-emerald-300 font-mono font-bold text-xs shadow-md">
            <DollarSign className="w-3.5 h-3.5 text-lime-400" />
            <span>{isArabic ? currentProblemData.annualValueAr : currentProblemData.annualValueEn}</span>
          </div>
        </div>

      </div>

    </div>
  );
};
