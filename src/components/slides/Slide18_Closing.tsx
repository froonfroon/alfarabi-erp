import React from 'react';
import { SceneCentralCore } from '../3d/SceneCentralCore';
import { Sparkles, RotateCcw, MessageSquare } from 'lucide-react';
import { soundManager } from '../../utils/audio';
import { useLanguage } from '../../context/LanguageContext';

interface SlideProps {
  onRestart: () => void;
}

export const Slide18_Closing: React.FC<SlideProps> = ({ onRestart }) => {
  const { isArabic, t } = useLanguage();

  return (
    <div className="w-full h-full flex flex-col justify-between p-6 lg:p-8 relative">
      {/* Background ambient glow */}
      <div className="absolute top-1/3 -right-20 w-96 h-96 bg-lime-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-20 w-96 h-96 bg-cyan-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <div className="flex items-center justify-between z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-xs font-semibold">
          <Sparkles className="w-4 h-4 text-lime-400" />
          <span>{t('الرؤية الختامية وقرار الاستثمار', 'Strategic Closing & Investment Decision')}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
          <span className="w-2 h-2 rounded-full bg-lime-400 animate-ping"></span>
          <span>ALFARABI ERP 2026</span>
        </div>
      </div>

      {/* Main Grid: Headline & Outcomes + 3D Central Core */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-2 flex-1 z-10">
        {/* Left Side: Strategic Outcomes */}
        <div className="lg:col-span-7 flex flex-col space-y-5">
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white flex flex-col gap-2 pb-1 leading-[1.35]">
              <span>{t('تحكم أكبر.. هدر أقل..', 'Maximum Control. Minimized Leakage.')}</span>
              <span className="bg-gradient-to-r from-lime-300 via-cyan-300 to-sky-400 bg-clip-text text-transparent py-1">
                {t('وقرارات مبنية على بيانات موثقة', 'Decisions Powered by Real-Time Telemetry')}
              </span>
            </h1>
            <p className="text-base text-slate-300 leading-relaxed max-w-2xl">
              {t(
                'منظومة تشغيلية متكاملة تمنح إدارة شركة الفارابي رؤية أوضح وتحكمًا أدق في الموارد اليومية للعمالة، السكن، الإعاشة، والأسطول.',
                'An integrated industrial operating platform empowering Alfarabi executive leadership with total transparency, predictive precision, and disciplined resource control.'
              )}
            </p>
          </div>

          {/* 3 Core Strategic Outcomes Cards */}
          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/40 transition flex items-start gap-3.5 backdrop-blur-md">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold shrink-0 mt-0.5">
                01
              </div>
              <div>
                <h4 className="text-sm font-bold text-white mb-0.5">
                  {t('توحيد البيانات والإجراءات', 'Data Unification & Process Standardization')}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {t(
                    'القضاء التام على جزر البيانات المنعزلة وشيتات الإكسيل المتضاربة من خلال مرجع رقمي موحد لكافة العمليات.',
                    'Completely eradicating fragmented data silos and contradictory offline spreadsheets through a single relational source of operational truth.'
                  )}
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-lime-500/40 transition flex items-start gap-3.5 backdrop-blur-md">
              <div className="w-8 h-8 rounded-lg bg-lime-500/20 text-lime-400 flex items-center justify-center font-bold shrink-0 mt-0.5">
                02
              </div>
              <div>
                <h4 className="text-sm font-bold text-white mb-0.5">
                  {t('تحسين دقة التخطيط والتشغيل الميداني', 'Predictive Precision & Field Orchestration')}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {t(
                    'توجيه الوجبات والأتوبيسات والأسرة بناءً على الأعداد الحقيقية والجاهزية المؤكدة وليس التقديرات الشفهية.',
                    'Dispatching kitchen orders, transit fleets, and bed allocations from confirmed telemetry rather than inaccurate verbal estimates.'
                  )}
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-purple-500/40 transition flex items-start gap-3.5 backdrop-blur-md">
              <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold shrink-0 mt-0.5">
                03
              </div>
              <div>
                <h4 className="text-sm font-bold text-white mb-0.5">
                  {t('قياس الهدر والتكاليف واتخاذ قرارات أفضل', 'Capital Leakage Containment & Strategic ROI')}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {t(
                    'شفافية فورية للإدارة العليا تكشف مواضع التسرب المالي، وتتيح التدخل السريع قبل تفاقم المصروفات.',
                    'Unprecedented C-suite financial visibility exposing operational leaks and unlocking substantial compounding monthly savings.'
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                soundManager.playTrigger();
                alert(
                  isArabic
                    ? 'فريق العمل التقني جاهز لتنسيق ورشة العمل التنفيذية وتخصيص المنظومة لشركة الفارابي.'
                    : 'The enterprise engineering team is ready to conduct technical discovery workshops tailored for Alfarabi.'
                );
              }}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-lime-500 to-emerald-600 hover:from-lime-400 hover:to-emerald-500 text-slate-950 font-black text-xs sm:text-sm shadow-[0_0_25px_rgba(163,230,53,0.4)] flex items-center gap-2 transition active:scale-95"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{t('بدء جلسة النقاش التنفيذية والأسئلة (Q&A)', 'Open Executive Board Q&A Discussion')}</span>
            </button>

            <button
              onClick={() => {
                soundManager.playSlideTransition();
                onRestart();
              }}
              className="px-4 py-3 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold transition flex items-center gap-2 border border-slate-700"
            >
              <RotateCcw className="w-4 h-4 text-cyan-400" />
              <span>{t('إعادة العرض من البداية', 'Replay Presentation from Slide 1')}</span>
            </button>
          </div>
        </div>

        {/* Right Side: 3D Central Core in Full Glory */}
        <div className="lg:col-span-5 h-[360px] sm:h-[440px] rounded-3xl bg-slate-950/60 border border-lime-500/30 p-2 shadow-2xl relative flex items-center justify-center">
          <SceneCentralCore activeModule={0} />
        </div>
      </div>

      {/* Strategic Footer */}
      <div className="border-t border-slate-800/80 pt-3 pb-3 flex flex-wrap items-center justify-between text-xs text-slate-400 z-10">
        <div className="flex items-center gap-3">
          <img src="/alfarabi-logo.jpg" alt="Alfarabi" className="w-5 h-5 rounded-full border border-lime-400" />
          <span className="text-slate-300 font-bold">
            {t(
              'شركة الفارابي — شركاء في التميز التشغيلي والتحول الرقمي المستدام',
              'Alfarabi Enterprise — Partnering in Operational Excellence & Digital Transformation'
            )}
          </span>
        </div>
        <div className="font-mono text-slate-500 text-[11px]">ALFARABI ENTERPRISE ERP KEYNOTE 2026</div>
      </div>
    </div>
  );
};
