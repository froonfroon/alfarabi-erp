import React from 'react';
import { ChevronRight, ChevronLeft, LayoutGrid } from 'lucide-react';
import { soundManager } from '../utils/audio';
import { useLanguage } from '../context/LanguageContext';

interface NavigationDockProps {
  currentSlide: number;
  totalSlides: number;
  onNext: () => void;
  onPrev: () => void;
  onOpenToc: () => void;
  sectionTitle: string;
}

export const NavigationDock: React.FC<NavigationDockProps> = ({
  currentSlide,
  totalSlides,
  onNext,
  onPrev,
  onOpenToc,
  sectionTitle,
}) => {
  const { isArabic, t } = useLanguage();
  const progressPercent = (currentSlide / totalSlides) * 100;

  return (
    <div className="no-print w-full max-w-4xl select-none mx-auto">
      <div className="bg-[#0b1024]/95 backdrop-blur-2xl border border-slate-700/80 rounded-2xl px-4 sm:px-6 py-2 shadow-[0_8px_30px_rgba(0,0,0,0.7)] flex items-center justify-between gap-4">
        {/* Previous Button */}
        <button
          onClick={() => {
            soundManager.playSlideTransition();
            onPrev();
          }}
          disabled={currentSlide === 1}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 text-xs font-bold transition active:scale-95 disabled:opacity-30 disabled:pointer-events-none border border-slate-700/60"
          title={isArabic ? 'الشريحة السابقة (السهم الأيمن / Backspace)' : 'Previous Slide (Left Arrow / Backspace)'}
        >
          {isArabic ? <ChevronRight className="w-4 h-4 text-cyan-400" /> : <ChevronLeft className="w-4 h-4 text-cyan-400" />}
          <span className="hidden sm:inline">{t('السابق', 'Previous')}</span>
          <span className="text-[10px] text-slate-400 font-mono hidden md:inline">
            {isArabic ? '[→]' : '[←]'}
          </span>
        </button>

        {/* Center Progress & Section Title */}
        <div className="flex-1 max-w-md mx-2 flex flex-col items-center gap-1.5">
          <div className="w-full flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-cyan-400 font-mono tracking-wider text-sm">
                {String(currentSlide).padStart(2, '0')}
              </span>
              <span className="text-slate-500 font-mono">/</span>
              <span className="text-slate-400 font-mono text-xs">
                {String(totalSlides).padStart(2, '0')}
              </span>
            </div>

            <button
              onClick={() => {
                soundManager.playClick();
                onOpenToc();
              }}
              className="text-[11px] font-semibold text-slate-300 hover:text-cyan-300 px-2.5 py-0.5 rounded-md bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 flex items-center gap-1.5 transition"
            >
              <LayoutGrid className="w-3 h-3 text-cyan-400" />
              <span>{sectionTitle}</span>
            </button>
          </div>

          {/* Interactive Progress Bar */}
          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden relative">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 via-lime-400 to-indigo-500 rounded-full transition-all duration-300 shadow-[0_0_12px_rgba(56,189,248,0.7)]"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Next Button */}
        <button
          onClick={() => {
            soundManager.playSlideTransition();
            onNext();
          }}
          disabled={currentSlide === totalSlides}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold transition active:scale-95 disabled:opacity-30 disabled:pointer-events-none shadow-[0_0_20px_rgba(56,189,248,0.4)]"
          title={isArabic ? 'الشريحة التالية (مسافة / السهم الأيسر)' : 'Next Slide (Space / Right Arrow)'}
        >
          <span>{t('التالي', 'Next')}</span>
          <span className="text-[10px] text-cyan-100 font-mono hidden md:inline">[Space]</span>
          {isArabic ? <ChevronLeft className="w-4 h-4 text-white" /> : <ChevronRight className="w-4 h-4 text-white" />}
        </button>
      </div>
    </div>
  );
};
