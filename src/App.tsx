import React, { useState, useEffect, useCallback } from 'react';
import { SLIDES_CONFIG } from './types/presentation';
import { Header } from './components/Header';
import { NavigationDock } from './components/NavigationDock';
import { TableOfContents } from './components/TableOfContents';
import { PresenterNotes } from './components/PresenterNotes';
import { soundManager } from './utils/audio';
import { LanguageProvider, useLanguage } from './context/LanguageContext';

// Slides Imports
import { Slide1_Intro } from './components/slides/Slide1_Intro';
import { Slide2_Vision } from './components/slides/Slide2_Vision';
import { Slide3_Challenges } from './components/slides/Slide3_Challenges';
import { Slide4_Architecture } from './components/slides/Slide4_Architecture';
import { Slide5_Documents } from './components/slides/Slide5_Documents';
import { Slide6_DocWorkflow } from './components/slides/Slide6_DocWorkflow';
import { Slide7_Accommodation } from './components/slides/Slide7_Accommodation';
import { Slide8_TenDayPolicy } from './components/slides/Slide8_TenDayPolicy';
import { Slide9_NoSmartphone } from './components/slides/Slide9_NoSmartphone';
import { Slide10_Catering } from './components/slides/Slide10_Catering';
import { Slide11_MealGovernance } from './components/slides/Slide11_MealGovernance';
import { Slide12_Transportation } from './components/slides/Slide12_Transportation';
import { Slide13_SmartDispatch } from './components/slides/Slide13_SmartDispatch';
import { Slide14_CrossDeptSync } from './components/slides/Slide14_CrossDeptSync';
import { Slide15_ExecutiveDashboard } from './components/slides/Slide15_ExecutiveDashboard';
import { Slide16_SecurityRBAC } from './components/slides/Slide16_SecurityRBAC';
import { Slide17_Roadmap } from './components/slides/Slide17_Roadmap';
import { Slide18_Closing } from './components/slides/Slide18_Closing';

// Modals
import { RoiCalculatorModal } from './components/modals/RoiCalculatorModal';
import { ExecutiveBriefingModal } from './components/modals/ExecutiveBriefingModal';
import { ProblemSolverModal } from './components/modals/ProblemSolverModal';

function PresentationDeck() {
  const { isArabic, t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState<number>(1);
  const [isTocOpen, setIsTocOpen] = useState<boolean>(false);
  const [showNotes, setShowNotes] = useState<boolean>(false);
  const [isRoiOpen, setIsRoiOpen] = useState<boolean>(false);
  const [isBriefingOpen, setIsBriefingOpen] = useState<boolean>(false);
  const [isProblemSolverOpen, setIsProblemSolverOpen] = useState<boolean>(false);
  const [isAutoplay, setIsAutoplay] = useState<boolean>(false);

  const totalSlides = SLIDES_CONFIG.length;

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => Math.min(prev + 1, totalSlides));
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => Math.max(prev - 1, 1));
  }, []);

  const goToSlide = (slideId: number) => {
    setCurrentSlide(slideId);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (e.key === ' ' || (isArabic ? e.key === 'ArrowLeft' : e.key === 'ArrowRight')) {
        e.preventDefault();
        soundManager.playSlideTransition();
        nextSlide();
      } else if (e.key === 'Backspace' || (isArabic ? e.key === 'ArrowRight' : e.key === 'ArrowLeft')) {
        e.preventDefault();
        soundManager.playSlideTransition();
        prevSlide();
      } else if (e.key === 'Escape') {
        setIsTocOpen(false);
        setShowNotes(false);
      } else if (e.key === 'Home') {
        e.preventDefault();
        soundManager.playSlideTransition();
        setCurrentSlide(1);
      } else if (e.key === 'End') {
        e.preventDefault();
        soundManager.playSlideTransition();
        setCurrentSlide(totalSlides);
      } else if (e.key === 'n' || e.key === 'N') {
        soundManager.playClick();
        setShowNotes((v) => !v);
      } else if (e.key === 't' || e.key === 'T') {
        soundManager.playClick();
        setIsTocOpen((v) => !v);
      } else if (e.key === 'p' || e.key === 'P') {
        soundManager.playTrigger();
        setIsProblemSolverOpen((v) => !v);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide, totalSlides, isArabic]);

  // Touch Swipe for mobile/tablets
  useEffect(() => {
    let touchStartX = 0;
    let touchEndX = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.changedTouches[0].screenX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchEndX - touchStartX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          soundManager.playSlideTransition();
          if (isArabic) prevSlide(); else nextSlide();
        } else {
          soundManager.playSlideTransition();
          if (isArabic) nextSlide(); else prevSlide();
        }
      }
    };

    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [nextSlide, prevSlide, isArabic]);

  // Autoplay / Kiosk Presentation Mode
  useEffect(() => {
    if (!isAutoplay) return;
    const interval = setInterval(() => {
      soundManager.playSlideTransition();
      setCurrentSlide((prev) => (prev >= totalSlides ? 1 : prev + 1));
    }, 12000); // 12 seconds per slide
    return () => clearInterval(interval);
  }, [isAutoplay, totalSlides]);

  const activeConfig = SLIDES_CONFIG[currentSlide - 1];
  const sectionTitle = isArabic ? activeConfig.sectionAr : activeConfig.sectionEn;

  // Render current slide component
  const renderSlide = (id: number) => {
    switch (id) {
      case 1: return <Slide1_Intro onNext={nextSlide} />;
      case 2: return <Slide2_Vision />;
      case 3: return <Slide3_Challenges />;
      case 4: return <Slide4_Architecture />;
      case 5: return <Slide5_Documents />;
      case 6: return <Slide6_DocWorkflow />;
      case 7: return <Slide7_Accommodation />;
      case 8: return <Slide8_TenDayPolicy />;
      case 9: return <Slide9_NoSmartphone />;
      case 10: return <Slide10_Catering />;
      case 11: return <Slide11_MealGovernance />;
      case 12: return <Slide12_Transportation />;
      case 13: return <Slide13_SmartDispatch />;
      case 14: return <Slide14_CrossDeptSync />;
      case 15: return <Slide15_ExecutiveDashboard />;
      case 16: return <Slide16_SecurityRBAC />;
      case 17: return <Slide17_Roadmap />;
      case 18: return <Slide18_Closing onRestart={() => setCurrentSlide(1)} />;
      default: return <Slide1_Intro onNext={nextSlide} />;
    }
  };

  return (
    <div className={`min-h-screen bg-[#060813] text-slate-100 flex flex-col justify-between selection:bg-cyan-500 selection:text-black ${isArabic ? 'font-sans' : 'font-sans'} relative overflow-x-hidden`}>
      {/* Top Header */}
      <Header
        currentSlide={currentSlide}
        totalSlides={totalSlides}
        onOpenToc={() => setIsTocOpen(true)}
        onToggleNotes={() => setShowNotes(!showNotes)}
        showNotes={showNotes}
        onOpenRoi={() => setIsRoiOpen(true)}
        onOpenBriefing={() => setIsBriefingOpen(true)}
        onOpenProblemSolver={() => setIsProblemSolverOpen(true)}
        isAutoplay={isAutoplay}
        onToggleAutoplay={() => setIsAutoplay((v) => !v)}
      />

      {/* Main Presentation Stage */}
      <main className="flex-1 w-full max-w-[1720px] mx-auto p-2 sm:p-4 md:p-5 flex items-center justify-center relative">
        <div className="w-full h-full min-h-[calc(100vh-170px)] rounded-3xl bg-slate-950/70 border border-slate-800/80 shadow-[0_20px_60px_rgba(0,0,0,0.8)] backdrop-blur-2xl flex flex-col justify-between overflow-y-auto overflow-x-hidden relative">
          {renderSlide(currentSlide)}
        </div>
      </main>

      {/* Dedicated Bottom Navigation Bar - Completely separated from slides */}
      <footer className="no-print w-full py-2.5 px-4 bg-[#080b18]/95 backdrop-blur-md border-t border-slate-800/80 flex items-center justify-center z-40 select-none shrink-0 shadow-[0_-10px_30px_rgba(0,0,0,0.6)]">
        <NavigationDock
          currentSlide={currentSlide}
          totalSlides={totalSlides}
          onNext={nextSlide}
          onPrev={prevSlide}
          onOpenToc={() => setIsTocOpen(true)}
          sectionTitle={sectionTitle}
        />
      </footer>

      {/* Table of Contents Modal Drawer */}
      <TableOfContents
        isOpen={isTocOpen}
        onClose={() => setIsTocOpen(false)}
        currentSlide={currentSlide}
        onSelectSlide={goToSlide}
      />

      {/* Presenter Notes Overlay */}
      <PresenterNotes
        isOpen={showNotes}
        onClose={() => setShowNotes(false)}
        currentSlide={currentSlide}
      />

      {/* C-Suite ROI Calculator Modal */}
      <RoiCalculatorModal
        isOpen={isRoiOpen}
        onClose={() => setIsRoiOpen(false)}
      />

      {/* C-Suite Executive Briefing Paper Modal */}
      <ExecutiveBriefingModal
        isOpen={isBriefingOpen}
        onClose={() => setIsBriefingOpen(false)}
      />

      {/* Global 3D Problem-Resolution Engine Modal */}
      <ProblemSolverModal
        isOpen={isProblemSolverOpen}
        onClose={() => setIsProblemSolverOpen(false)}
      />

      {/* Print View: All 18 slides formatted sequentially for PDF print */}
      <div className="hidden print:block w-full">
        {SLIDES_CONFIG.map((cfg) => (
          <div key={cfg.id} className="slide-container w-full h-screen p-8 bg-[#060813] text-white">
            <div className="text-xs text-cyan-400 font-bold mb-2">
              {t(`شريحة ${cfg.id} من ${totalSlides} | ${cfg.sectionAr}`, `Slide ${cfg.id} of ${totalSlides} | ${cfg.sectionEn}`)}
            </div>
            {renderSlide(cfg.id)}
          </div>
        ))}
      </div>
    </div>
  );
}

export function App() {
  return (
    <LanguageProvider>
      <PresentationDeck />
    </LanguageProvider>
  );
}

export default App;
