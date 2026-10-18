import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  AlertTriangle, 
  ShieldCheck, 
  TrendingUp, 
  Printer, 
  Layers, 
  DollarSign, 
  CheckCircle2, 
  BarChart3,
  Cpu,
  Boxes
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { soundManager } from '../../utils/audio';
import { SceneProblemSolving3D, PILLARS_DATA, type PillarKey } from '../3d/SceneProblemSolving3D';
import { 
  SceneProblemDeepDive3D, 
  PROBLEMS_CATALOG, 
  PROBLEM_KEYS, 
  type ProblemType 
} from '../3d/SceneProblemDeepDive3D';

interface ProblemSolverModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProblemSolverModal: React.FC<ProblemSolverModalProps> = ({ isOpen, onClose }) => {
  const { isArabic, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'individual-3d' | 'network-3d' | 'matrix' | 'roi'>('individual-3d');
  const [selectedIndividual, setSelectedIndividual] = useState<ProblemType>('housing');
  const [individualMode, setIndividualMode] = useState<'problem' | 'solution'>('solution');
  const [selectedPillar, setSelectedPillar] = useState<PillarKey>('housing');

  // ROI Simulator in modal
  const [workforceSize, setWorkforceSize] = useState<number>(2500);

  if (!isOpen) return null;

  // Real-world dynamic calculations
  const monthlyBedSavings = Math.round(workforceSize * 0.18 * 450); // 18% ghost beds * avg bed cost
  const monthlyFoodSavings = Math.round(workforceSize * 0.12 * 75 * 30); // 12% excess meals * meal cost
  const monthlyTransitSavings = Math.round((workforceSize / 50) * 0.25 * 18000); // 25% bus consolidation
  const monthlyDossierComplianceSavings = Math.round(workforceSize * 45); // fines & admin delay prevented
  const totalMonthlySavings = monthlyBedSavings + monthlyFoodSavings + monthlyTransitSavings + monthlyDossierComplianceSavings;
  const annualSavings = totalMonthlySavings * 12;

  const currentIndividualData = PROBLEMS_CATALOG[selectedIndividual];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/90 backdrop-blur-2xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-6xl max-h-[94vh] overflow-y-auto bg-[#070b1b] border border-cyan-500/40 rounded-3xl shadow-[0_25px_90px_rgba(0,0,0,0.95)] p-4 sm:p-7 text-white flex flex-col justify-between">
        
        {/* Header Controls */}
        <div className="no-print flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-cyan-600 to-emerald-500 text-white flex items-center justify-center font-bold shadow-[0_0_20px_rgba(6,182,212,0.5)]">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-black text-white">
                  {t('محرك حل المشكلات الذكي 3D العالمي', 'Global 3D Problem-Resolution Engine')}
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/40">
                  ALFARABI QUANTUM ERP
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {t(
                  'المحرك الهندسي التفاعلي لاستعراض ومعالجة معضلات التشغيل الميداني',
                  'Enterprise-grade diagnostic engine transforming field operational bottlenecks into automated high-ROI workflows'
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                soundManager.playClick();
                window.print();
              }}
              className="px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-cyan-300 hover:text-white text-xs font-bold transition flex items-center gap-1.5 border border-slate-700"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">{t('طباعة', 'Print')}</span>
            </button>

            <button
              onClick={() => {
                soundManager.playClick();
                onClose();
              }}
              className="w-10 h-10 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition border border-slate-700 active:scale-95"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="no-print flex items-center gap-2 my-3 border-b border-slate-800/80 pb-2 overflow-x-auto">
          <button
            onClick={() => {
              soundManager.playClick();
              setActiveTab('individual-3d');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'individual-3d'
                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-[0_0_15px_rgba(6,182,212,0.5)]'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Boxes className="w-4 h-4 text-cyan-300" />
            <span>{t('مشهد 3D لكل مشكلة والحل الخارق', 'Dedicated 3D Problem Scenes')}</span>
          </button>

          <button
            onClick={() => {
              soundManager.playClick();
              setActiveTab('network-3d');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'network-3d'
                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-[0_0_15px_rgba(6,182,212,0.5)]'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Sparkles className="w-4 h-4 text-cyan-300" />
            <span>{t('الشبكة البانورامية الشاملة (Ecosystem)', 'Full 3D Ecosystem Core')}</span>
          </button>

          <button
            onClick={() => {
              soundManager.playClick();
              setActiveTab('matrix');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'matrix'
                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-[0_0_15px_rgba(6,182,212,0.5)]'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Layers className="w-4 h-4 text-cyan-300" />
            <span>{t('مصفوفة مقارنة المشاكل والحلول (Matrix)', 'Problem vs Solution Matrix')}</span>
          </button>

          <button
            onClick={() => {
              soundManager.playClick();
              setActiveTab('roi');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'roi'
                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-[0_0_15px_rgba(6,182,212,0.5)]'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span>{t('حاسبة استرداد الهدر المالي (ROI)', 'Capital Recovery Calculator')}</span>
          </button>
        </div>

        {/* Tab 1: Dedicated 3D Scene Per Problem */}
        {activeTab === 'individual-3d' && (
          <div className="w-full space-y-3">
            {/* 5 Problem selector tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {PROBLEM_KEYS.map((k) => {
                const item = PROBLEMS_CATALOG[k];
                const Icon = item.icon;
                const isSelected = selectedIndividual === k;

                return (
                  <button
                    key={k}
                    onClick={() => {
                      soundManager.playClick();
                      setSelectedIndividual(k);
                    }}
                    className={`p-2 rounded-xl border text-left transition flex items-center gap-2 ${
                      isSelected
                        ? 'bg-gradient-to-r from-cyan-950 to-blue-950 border-cyan-400 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                        : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${item.accentColor}25`, color: item.accentColor }}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="truncate text-xs font-bold text-white">
                      {isArabic ? item.badgeAr : item.badgeEn}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* 3D Model */}
            <SceneProblemDeepDive3D
              activeProblem={selectedIndividual}
              mode={individualMode}
              onToggleMode={() => {
                soundManager.playTrigger();
                setIndividualMode(prev => (prev === 'problem' ? 'solution' : 'problem'));
              }}
            />

            {/* Problem vs Solution Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-rose-950/25 border border-rose-500/30">
                <div className="font-bold text-rose-400 mb-1 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>{isArabic ? currentIndividualData.problemTitleAr : currentIndividualData.problemTitleEn}</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  {isArabic ? currentIndividualData.problemDescAr : currentIndividualData.problemDescEn}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-emerald-950/25 border border-emerald-500/30">
                <div className="font-bold text-emerald-400 mb-1 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{isArabic ? currentIndividualData.solutionTitleAr : currentIndividualData.solutionTitleEn}</span>
                </div>
                <p className="text-slate-200 leading-relaxed">
                  {isArabic ? currentIndividualData.solutionDescAr : currentIndividualData.solutionDescEn}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Panoramic 3D Network Core */}
        {activeTab === 'network-3d' && (
          <div className="w-full my-2">
            <SceneProblemSolving3D 
              onSelectPillar={(p) => setSelectedPillar(p)}
              selectedPillarKey={selectedPillar}
            />
          </div>
        )}

        {/* Tab 3: Detailed Matrix */}
        {activeTab === 'matrix' && (
          <div className="w-full my-2 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {(Object.keys(PILLARS_DATA) as PillarKey[]).map((key) => {
                const item = PILLARS_DATA[key];
                const ItemIcon = item.icon;

                return (
                  <div
                    key={key}
                    className="p-4 rounded-2xl bg-slate-900/80 border border-slate-700/80 hover:border-cyan-500/60 transition flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div
                          className="w-9 h-9 rounded-xl flex items-center justify-center font-bold"
                          style={{ backgroundColor: `${item.color}20`, color: item.color }}
                        >
                          <ItemIcon className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                          {key.toUpperCase()}
                        </span>
                      </div>

                      <h4 className="font-bold text-white text-sm mb-2">
                        {isArabic ? item.titleAr : item.titleEn}
                      </h4>

                      {/* Problem Block */}
                      <div className="p-2.5 rounded-xl bg-rose-950/30 border border-rose-500/30 mb-2.5">
                        <div className="text-[11px] font-bold text-rose-400 flex items-center gap-1 mb-1">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          <span>{t('المشكلة الحالية:', 'Legacy Friction:')}</span>
                        </div>
                        <p className="text-[11px] text-slate-300 leading-relaxed">
                          {isArabic ? item.problemAr : item.problemEn}
                        </p>
                      </div>

                      {/* Solution Block */}
                      <div className="p-2.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30">
                        <div className="text-[11px] font-bold text-emerald-400 flex items-center gap-1 mb-1">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          <span>{t('حل الفارابي الهندسي:', 'Alfarabi Solution:')}</span>
                        </div>
                        <p className="text-[11px] text-slate-200 leading-relaxed">
                          {isArabic ? item.solutionAr : item.solutionEn}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 pt-2.5 border-t border-slate-800 text-[11px] text-emerald-300 font-mono font-bold flex items-center justify-between">
                      <span>{t('الأثر المباشر:', 'Key Metric:')}</span>
                      <span className="bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-700/50">
                        {item.metricAfter}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 4: Interactive ROI Recovery Calculator */}
        {activeTab === 'roi' && (
          <div className="w-full my-2 space-y-6">
            {/* Workforce Slider */}
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-700/80">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div>
                  <h4 className="font-bold text-white text-sm sm:text-base">
                    {t('محاكاة حجم العمالة المشغلة في المنظومة', 'Live Operational Workforce Scale')}
                  </h4>
                  <p className="text-xs text-slate-400">
                    {t('حرك المؤشر لحساب التوفير المالي الفعلي لشركتكم شهرياً وسنوياً', 'Adjust workforce volume to simulate verified capital recovery')}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-cyan-400 font-mono">
                    {workforceSize.toLocaleString()}
                  </span>
                  <span className="text-xs text-slate-400 mr-1.5 ml-1.5">{t('عامل نشط', 'Active Workers')}</span>
                </div>
              </div>

              <input
                type="range"
                min="500"
                max="15000"
                step="250"
                value={workforceSize}
                onChange={(e) => setWorkforceSize(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                <span>500 {t('عامل', 'Workers')}</span>
                <span>5,000</span>
                <span>10,000</span>
                <span>15,000 {t('عامل', 'Workers')}</span>
              </div>
            </div>

            {/* Savings Breakdown Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-slate-900/80 border border-lime-500/30">
                <div className="text-xs text-lime-400 font-bold mb-1">{t('توفير إيجار الأسرة الوهمية', 'Camp Ghost Beds')}</div>
                <div className="text-xl font-black text-white font-mono">{monthlyBedSavings.toLocaleString()} <span className="text-xs text-slate-400">ج.م / شهر</span></div>
                <div className="text-[10px] text-slate-400 mt-1">{t('إخلاء آلي بعد 10 أيام غياب', 'Automated 10-day retention release')}</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-amber-500/30">
                <div className="text-xs text-amber-400 font-bold mb-1">{t('وقف هدر الوجبات الزائدة', 'Food Waste Prevention')}</div>
                <div className="text-xl font-black text-white font-mono">{monthlyFoodSavings.toLocaleString()} <span className="text-xs text-slate-400">ج.م / شهر</span></div>
                <div className="text-[10px] text-slate-400 mt-1">{t('حوكمة الحصة الواحدة برمز الهوية', '1-Worker-1-Meal barcode sync')}</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-sky-500/30">
                <div className="text-xs text-sky-400 font-bold mb-1">{t('ترشيد أسطول الأتوبيسات', 'Fleet Route Optimization')}</div>
                <div className="text-xl font-black text-white font-mono">{monthlyTransitSavings.toLocaleString()} <span className="text-xs text-slate-400">ج.م / شهر</span></div>
                <div className="text-[10px] text-slate-400 mt-1">{t('دمج المسارات ورفع الإشغال لـ 92%', 'Consolidated loads & 92% occupancy')}</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-cyan-500/30">
                <div className="text-xs text-cyan-400 font-bold mb-1">{t('تجنب غرامات الوثائق والبحث', 'Compliance & Dossier Ops')}</div>
                <div className="text-xl font-black text-white font-mono">{monthlyDossierComplianceSavings.toLocaleString()} <span className="text-xs text-slate-400">ج.م / شهر</span></div>
                <div className="text-[10px] text-slate-400 mt-1">{t('تنبيهات استباقية وأرشيف مشفر', 'Zero compliance penalties')}</div>
              </div>
            </div>

            {/* Total Savings Ribbon */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-cyan-950 via-slate-900 to-emerald-950 border border-emerald-500/40 flex flex-wrap items-center justify-between gap-4 shadow-[0_0_30px_rgba(16,185,129,0.15)]">
              <div>
                <div className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
                  {t('إجمالي العائد المالي المحقق لحل المشكلات الخمس', 'Total Compounded Value Recovered via Alfarabi ERP')}
                </div>
                <div className="text-xs text-slate-300 mt-1">
                  {t('استرداد مباشر للتكاليف المهدرة دون تقليص أي خدمة أو الإخلال بسلامة التشغيل', 'Pure non-disruptive overhead recovery preserving highest operational standards')}
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-right">
                  <div className="text-[10px] text-slate-400">{t('التوفير الشهري الصافي', 'Monthly Direct Savings')}</div>
                  <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">
                    {totalMonthlySavings.toLocaleString()} <span className="text-xs text-slate-300 font-normal">ج.م</span>
                  </div>
                </div>

                <div className="h-10 w-px bg-slate-700 hidden sm:block" />

                <div className="text-right">
                  <div className="text-[10px] text-slate-400">{t('التوفير السنوي التراكمي', 'Annual Net Capital Saved')}</div>
                  <div className="text-2xl sm:text-3xl font-black text-white font-mono">
                    {annualSavings.toLocaleString()} <span className="text-xs text-emerald-400 font-normal">ج.م/سنة</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="no-print mt-3 pt-2.5 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{t('معتمد ومطابق للمعايير المؤسسية الدولية', 'Certified Enterprise Standard Architecture')}</span>
          </div>

          <div className="font-mono text-[11px] text-cyan-400">
            Alfarabi Enterprise ERP • 2026 Engine
          </div>
        </div>

      </div>
    </div>
  );
};
