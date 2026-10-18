import React from 'react';
import { SLIDES_CONFIG } from '../types/presentation';
import { X, CheckCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import { soundManager } from '../utils/audio';
import { useLanguage } from '../context/LanguageContext';

interface TableOfContentsProps {
  isOpen: boolean;
  onClose: () => void;
  currentSlide: number;
  onSelectSlide: (slideId: number) => void;
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({
  isOpen,
  onClose,
  currentSlide,
  onSelectSlide,
}) => {
  const { isArabic, t } = useLanguage();
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex justify-end transition-opacity select-none">
      <div className={`w-full max-w-xl h-full bg-[#080d1e] ${isArabic ? 'border-r' : 'border-l'} border-slate-700/80 flex flex-col shadow-2xl overflow-hidden`}>
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/alfarabi-logo.jpg" alt="Alfarabi" className="w-8 h-8 rounded-full border border-lime-400" />
            <div>
              <h3 className="text-base font-extrabold text-white">
                {t('فهرس العرض التقديمي التنفيذي', 'Executive Keynote Agenda')}
              </h3>
              <p className="text-xs text-slate-400">
                {t('18 شريحة متكاملة تغطي حلول منظومة الفارابي ERP', '18 Comprehensive Slides Covering Alfarabi ERP Architecture')}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Slide List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {SLIDES_CONFIG.map((slide) => {
            const isActive = slide.id === currentSlide;
            const section = isArabic ? slide.sectionAr : slide.sectionEn;
            const title = isArabic ? slide.titleAr : slide.titleEn;
            const subtitle = isArabic ? slide.subtitleAr : slide.subtitleEn;

            return (
              <button
                key={slide.id}
                onClick={() => {
                  soundManager.playSlideTransition();
                  onSelectSlide(slide.id);
                  onClose();
                }}
                className={`w-full ${isArabic ? 'text-right' : 'text-left'} p-3.5 rounded-xl border transition-all flex items-start justify-between gap-3 ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-950/70 to-slate-900 border-cyan-400 shadow-[0_0_20px_rgba(56,189,248,0.25)] ring-1 ring-cyan-400'
                    : 'bg-slate-900/40 hover:bg-slate-800/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-xs shrink-0 ${
                    isActive ? 'bg-cyan-500 text-black shadow-md' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {String(slide.id).padStart(2, '0')}
                  </span>

                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700">
                        {section}
                      </span>
                      {isActive && (
                        <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" /> {t('الشريحة الحالية', 'Current Slide')}
                        </span>
                      )}
                    </div>
                    <h4 className="text-sm font-bold text-white mb-0.5">{title}</h4>
                    <p className="text-xs text-slate-400 line-clamp-1">{subtitle}</p>
                  </div>
                </div>

                {isArabic ? (
                  <ArrowLeft className={`w-4 h-4 shrink-0 mt-2 transition ${isActive ? 'text-cyan-400' : 'text-slate-600'}`} />
                ) : (
                  <ArrowRight className={`w-4 h-4 shrink-0 mt-2 transition ${isActive ? 'text-cyan-400' : 'text-slate-600'}`} />
                )}
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-900/60 flex items-center justify-between text-xs text-slate-400">
          <span>{t('اختصارات: [Space] للتنقل | [Esc] للإغلاق', 'Shortcuts: [Space] Next | [Esc] Close')}</span>
          <span className="text-cyan-400 font-mono font-bold">{t('18 شريحة متكاملة', '18 Complete Slides')}</span>
        </div>
      </div>
    </div>
  );
};
