import React, { useState } from 'react';
import { Volume2, VolumeX, Maximize2, Minimize2, BookOpen, List, Sparkles, Languages, Calculator, FileText, Play, Pause } from 'lucide-react';
import { soundManager } from '../utils/audio';
import { useLanguage } from '../context/LanguageContext';

interface HeaderProps {
  currentSlide?: number;
  totalSlides?: number;
  onOpenToc: () => void;
  onToggleNotes: () => void;
  showNotes: boolean;
  onOpenRoi: () => void;
  onOpenBriefing: () => void;
  onOpenProblemSolver: () => void;
  isAutoplay: boolean;
  onToggleAutoplay: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenToc,
  onToggleNotes,
  showNotes,
  onOpenRoi,
  onOpenBriefing,
  onOpenProblemSolver,
  isAutoplay,
  onToggleAutoplay,
}) => {
  const { language, setLanguage, t } = useLanguage();
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleSound = () => {
    const next = !isMuted;
    setIsMuted(next);
    soundManager.setMuted(next);
    if (!next) soundManager.playTrigger();
  };

  const toggleLanguage = () => {
    soundManager.playClick();
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };

  const toggleFullscreen = () => {
    soundManager.playClick();
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  return (
    <header className="no-print w-full h-16 bg-[#080b18]/95 backdrop-blur-xl border-b border-slate-800/80 px-4 sm:px-6 flex items-center justify-between z-40 select-none">
      {/* Brand & Clean Presentation Title */}
      <div className="flex items-center gap-3">
        <img
          src="/alfarabi-logo.jpg"
          alt="Alfarabi Logo"
          className="w-10 h-10 rounded-full border-2 border-lime-400/80 shadow-[0_0_15px_rgba(163,230,53,0.35)] object-cover"
        />
        <div className="flex items-center gap-2.5">
          <span className="font-black text-white tracking-wide text-lg">Alfarabi ERP</span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-500/30">
            Enterprise 2026
          </span>
        </div>
      </div>

      {/* Action Controls - Clean, Spaced, Uncluttered */}
      <div className="flex items-center gap-2 sm:gap-2.5">
        {/* Language Switcher */}
        <button
          onClick={toggleLanguage}
          className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700/80 hover:border-cyan-400 text-cyan-300 text-xs font-bold flex items-center gap-1.5 transition active:scale-95 shadow-[0_0_10px_rgba(56,189,248,0.15)]"
          title={t('التبديل إلى اللغة الإنجليزية', 'Switch to Arabic')}
        >
          <Languages className="w-4 h-4 text-cyan-400" />
          <span className="font-mono">{language === 'ar' ? 'EN' : 'العربية'}</span>
        </button>

        {/* Primary Action 0: 3D Problem Solver */}
        <button
          onClick={() => {
            soundManager.playTrigger();
            onOpenProblemSolver();
          }}
          className="px-3 sm:px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-bold flex items-center gap-1.5 transition active:scale-95 shadow-[0_0_20px_rgba(6,182,212,0.45)] border border-cyan-400/50"
          title={t('فتح منظومة حل المشكلات الذكية 3D', 'Open 3D Problem-Resolution Engine')}
        >
          <Sparkles className="w-3.5 h-3.5 text-lime-300 animate-pulse" />
          <span>{t('حل المشاكل 3D', '3D Problem Solver')}</span>
        </button>

        {/* Primary Action 1: ROI Calculator */}
        <button
          onClick={() => {
            soundManager.playTrigger();
            onOpenRoi();
          }}
          className="px-3 sm:px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-950 to-slate-900 border border-emerald-500/50 hover:border-emerald-400 text-emerald-300 text-xs font-bold flex items-center gap-1.5 transition active:scale-95 shadow-[0_0_15px_rgba(16,185,129,0.25)]"
        >
          <Calculator className="w-4 h-4 text-lime-400" />
          <span>{t('حاسبة الوفورات (ROI)', 'ROI Calculator')}</span>
        </button>

        {/* Primary Action 2: Executive Briefing */}
        <button
          onClick={() => {
            soundManager.playClick();
            onOpenBriefing();
          }}
          className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-950 to-slate-900 border border-cyan-500/40 hover:border-cyan-300 text-cyan-300 text-xs font-bold flex items-center gap-1.5 transition active:scale-95"
        >
          <FileText className="w-4 h-4 text-cyan-400" />
          <span className="hidden sm:inline">{t('الملخص التنفيذي', 'Executive Memo')}</span>
        </button>

        {/* Autoplay Toggle */}
        <button
          onClick={() => {
            soundManager.playClick();
            onToggleAutoplay();
          }}
          className={`p-2 rounded-xl border text-xs font-bold transition active:scale-95 ${
            isAutoplay
              ? 'bg-amber-950/70 border-amber-400 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.4)] animate-pulse'
              : 'bg-slate-900/80 hover:bg-slate-800 border-slate-700 text-slate-300'
          }`}
          title={isAutoplay ? t('إيقاف العرض التلقائي', 'Pause Autoplay') : t('تشغيل العرض التلقائي', 'Autoplay')}
        >
          {isAutoplay ? <Pause className="w-4 h-4 text-amber-400" /> : <Play className="w-4 h-4 text-lime-400" />}
        </button>

        <div className="h-5 w-px bg-slate-800 mx-1"></div>

        {/* Table of Contents Icon */}
        <button
          onClick={() => {
            soundManager.playClick();
            onOpenToc();
          }}
          className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-slate-300 hover:text-cyan-300 transition"
          title={t('فهرس الشرائح', 'Table of Contents')}
        >
          <List className="w-4 h-4 text-cyan-400" />
        </button>

        {/* Presenter Notes Icon */}
        <button
          onClick={() => {
            soundManager.playClick();
            onToggleNotes();
          }}
          className={`p-2 rounded-xl border transition ${
            showNotes
              ? 'bg-cyan-950/70 border-cyan-400 text-cyan-300'
              : 'bg-slate-900 hover:bg-slate-800 border-slate-700/80 text-slate-300'
          }`}
          title={t('ملاحظات المتحدث', 'Presenter Notes')}
        >
          <BookOpen className="w-4 h-4" />
        </button>

        {/* Sound Toggle */}
        <button
          onClick={toggleSound}
          className={`p-2 rounded-xl border transition ${
            isMuted
              ? 'bg-rose-950/40 border-rose-600/40 text-rose-400'
              : 'bg-slate-900 hover:bg-slate-800 border-slate-700/80 text-cyan-400'
          }`}
          title={isMuted ? t('تفعيل الصوت', 'Unmute Sound') : t('كتم الصوت', 'Mute Sound')}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>

        {/* Fullscreen Toggle */}
        <button
          onClick={toggleFullscreen}
          className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-slate-300 hover:text-white transition"
          title={t('ملء الشاشة', 'Toggle Fullscreen')}
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4 text-lime-400" />}
        </button>
      </div>
    </header>
  );
};
