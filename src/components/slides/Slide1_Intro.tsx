import React from 'react';
import { SceneCentralCore } from '../3d/SceneCentralCore';
import { Sparkles, Shield, ArrowLeft, ArrowRight, Database, Cpu } from 'lucide-react';
import { soundManager } from '../../utils/audio';
import { useLanguage } from '../../context/LanguageContext';

interface SlideProps {
  onNext: () => void;
}

export const Slide1_Intro: React.FC<SlideProps> = ({ onNext }) => {
  const { isArabic, t } = useLanguage();

  return (
    <div className="w-full h-full flex flex-col justify-between p-6 lg:p-8 relative">
      {/* Background ambient glow circles */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-20 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Slide Top Badge */}
      <div className="flex items-center justify-between z-10">
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-900/80 border border-cyan-500/30 text-cyan-300 text-xs font-semibold backdrop-blur-md shadow-[0_0_20px_rgba(56,189,248,0.2)]">
          <Sparkles className="w-4 h-4 text-lime-400" />
          <span>{t('مقترح تحول رقمي استراتيجي | شركة الفارابي', 'Strategic Digital Transformation Proposal | Alfarabi')}</span>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
          <span className="w-2 h-2 rounded-full bg-lime-400 animate-ping"></span>
          <span>GLOBAL ENTERPRISE ERP KEYNOTE 2026</span>
        </div>
      </div>

      {/* Main Hero Grid: 3D Scene + Typography */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10 flex-1 my-4">
        {/* Left Side: Headlines & Strategic Pillars */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
          <div className="space-y-4">
            <div className="text-lime-400 font-extrabold text-sm tracking-wider uppercase flex items-center gap-2">
              <span className="h-0.5 w-8 bg-lime-400 inline-block"></span>
              {t('التحول من العشوائية إلى الانضباط المحكم', 'Autonomous Operational Governance')}
            </div>

            {/* Clear, well-spaced headline with distinct blocks and generous line height */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white flex flex-col gap-2 pb-1">
              <span className="leading-[1.3] text-white">
                {t('من التشغيل التقليدي', 'From Legacy Operations')}
              </span>
              <span className="leading-[1.3] bg-gradient-to-r from-cyan-400 via-sky-300 to-lime-300 bg-clip-text text-transparent py-0.5">
                {t('إلى الإدارة الرقمية الذكية', 'To Intelligent Enterprise ERP')}
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl pt-1">
              {t(
                'منظومة ERP مركزية متكاملة لربط إدارة وثائق العمالة، وإشغال السكنات، وحوكمة التغذية، وضبط الحركة والنقل في شاشة واحدة.',
                'A unified cloud-native ERP platform orchestrating Workforce Dossiers, Camp Bed Occupancy, Catering Governance, and Fleet Transit on a single pane of glass.'
              )}
            </p>
          </div>

          {/* 4 Pillar Quick Badges with ample spacing */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 pt-3">
            <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 backdrop-blur-md flex flex-col justify-between gap-1 hover:border-cyan-500/40 transition">
              <div className="text-cyan-400 font-bold text-xs">{t('القسم الأول', 'Pillar 01')}</div>
              <div className="text-white font-bold text-sm leading-snug">{t('أرشيف الوثائق', 'Workforce Dossier')}</div>
              <div className="text-[11px] text-slate-400 font-mono tracking-wide pt-0.5">Worker ID</div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 backdrop-blur-md flex flex-col justify-between gap-1 hover:border-lime-500/40 transition">
              <div className="text-lime-400 font-bold text-xs">{t('القسم الثاني', 'Pillar 02')}</div>
              <div className="text-white font-bold text-sm leading-snug">{t('السكن والغياب', 'Camp Housing')}</div>
              <div className="text-[11px] text-slate-400 font-mono tracking-wide pt-0.5">{t('سياسة الـ 10 أيام', '10-Day Policy')}</div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 backdrop-blur-md flex flex-col justify-between gap-1 hover:border-amber-500/40 transition">
              <div className="text-amber-400 font-bold text-xs">{t('القسم الثالث', 'Pillar 03')}</div>
              <div className="text-white font-bold text-sm leading-snug">{t('الإعاشة والتغذية', 'Catering')}</div>
              <div className="text-[11px] text-slate-400 font-mono tracking-wide pt-0.5">{t('1 عامل = 1 وجبة', 'Single Portion Rule')}</div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 backdrop-blur-md flex flex-col justify-between gap-1 hover:border-purple-500/40 transition">
              <div className="text-purple-400 font-bold text-xs">{t('القسم الرابع', 'Pillar 04')}</div>
              <div className="text-white font-bold text-sm leading-snug">{t('الحركة والنقل', 'Fleet Transit')}</div>
              <div className="text-[11px] text-slate-400 font-mono tracking-wide pt-0.5">{t('كفاءة الأتوبيسات', 'Capacity Balanced')}</div>
            </div>
          </div>

          {/* CTA Action button */}
          <div className="pt-2 flex items-center gap-4">
            <button
              onClick={() => {
                soundManager.playSlideTransition();
                onNext();
              }}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm shadow-[0_0_25px_rgba(56,189,248,0.4)] flex items-center gap-2.5 transition active:scale-95"
            >
              <span>{t('بدء استعراض الرؤية التنفيذية', 'Explore Strategic Architecture')}</span>
              {isArabic ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </button>
            <span className="text-xs text-slate-400">
              {t('أو اضغط', 'Or press')} <kbd className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-cyan-300 font-mono">Space</kbd> {t('للتنقل', 'to advance')}
            </span>
          </div>
        </div>

        {/* Right Side: 3D Central Core Interactive Canvas */}
        <div className="lg:col-span-5 h-[340px] sm:h-[420px] lg:h-[480px] rounded-3xl bg-slate-950/40 border border-cyan-500/20 backdrop-blur-md shadow-2xl relative flex items-center justify-center p-2">
          <SceneCentralCore activeModule={0} />
        </div>
      </div>

      {/* Strategic Footer Line */}
      <div className="border-t border-slate-800/80 pt-3 pb-3 flex flex-wrap items-center justify-between text-xs text-slate-400 z-10 gap-2">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5"><Shield className="w-4 h-4 text-lime-400" /> {t('مصممة لبيئة العمل الميدانية الحقيقية', 'Engineered for Harsh Industrial Field Realities')}</span>
          <span className="flex items-center gap-1.5"><Database className="w-4 h-4 text-cyan-400" /> {t('قاعدة بيانات مركزية أحادية', 'Single Relational Data Plane')}</span>
          <span className="flex items-center gap-1.5"><Cpu className="w-4 h-4 text-purple-400" /> {t('بدون اشتراط هواتف ذكية للعمال', 'Zero Worker Smartphone Dependency')}</span>
        </div>
        <div className="text-slate-500 font-mono text-[11px]">ALFARABI ENTERPRISE SYSTEMS © 2026</div>
      </div>
    </div>
  );
};
