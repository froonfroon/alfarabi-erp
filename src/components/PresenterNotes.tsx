import React from 'react';
import { SLIDES_CONFIG } from '../types/presentation';
import { X, Lightbulb, UserCheck, ShieldAlert } from 'lucide-react';
import { soundManager } from '../utils/audio';
import { useLanguage } from '../context/LanguageContext';

interface PresenterNotesProps {
  isOpen: boolean;
  onClose: () => void;
  currentSlide: number;
}

export const PresenterNotes: React.FC<PresenterNotesProps> = ({
  isOpen,
  onClose,
  currentSlide,
}) => {
  const { isArabic, t } = useLanguage();
  if (!isOpen) return null;

  const slide = SLIDES_CONFIG[currentSlide - 1];
  const notes = isArabic ? slide.presenterNotesAr : slide.presenterNotesEn;

  return (
    <div className={`fixed bottom-24 ${isArabic ? 'right-6' : 'left-6'} z-40 w-full max-w-md bg-[#0b1026]/95 backdrop-blur-2xl border border-cyan-500/40 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] overflow-hidden select-none animate-in fade-in slide-in-from-bottom-4 duration-200`}>
      {/* Header */}
      <div className="p-4 bg-slate-900/90 border-b border-slate-700/60 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
            <Lightbulb className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white">
              {t('دليل المتحدث التنفيذي (Presenter Notes)', 'Executive Speaker Briefing Notes')}
            </h4>
            <p className="text-[11px] text-slate-400">
              {t(`نقاط الإقناع للشريحة ${slide.id}`, `Persuasion & strategic talking points for Slide ${slide.id}`)}
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            soundManager.playClick();
            onClose();
          }}
          className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3 max-h-72 overflow-y-auto">
        <div className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
          <UserCheck className="w-4 h-4 text-cyan-400" />
          <span>{t('المحاور الجوهرية للحديث أمام القيادات:', 'Key Strategic Talking Points for Executive Board:')}</span>
        </div>

        <ul className="space-y-2 text-xs text-slate-200 leading-relaxed">
          {notes.map((note, idx) => (
            <li key={idx} className="flex items-start gap-2 bg-slate-900/50 p-2.5 rounded-lg border border-slate-800">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
              <span>{note}</span>
            </li>
          ))}
        </ul>

        <div className="p-2.5 rounded-lg bg-amber-950/40 border border-amber-600/30 text-[11px] text-amber-200 flex items-start gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <span>
            {t(
              'تنبيه المصداقية: التأكيد دائمًا على أن هذا نظام مقترح، والأرقام استرشادية، وقواعد السياسات تخضع لاعتماد إدارة شركة الفارابي.',
              'Integrity Reminder: Reiterate that this is an engineered proposed architecture with demonstrative demo figures subject to Alfarabi board approval.'
            )}
          </span>
        </div>
      </div>
    </div>
  );
};
