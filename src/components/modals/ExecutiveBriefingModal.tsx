import React from 'react';
import { X, FileText, Printer, CheckCircle, Shield, Award, Clock } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { soundManager } from '../../utils/audio';

interface ExecutiveBriefingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExecutiveBriefingModal: React.FC<ExecutiveBriefingModalProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-2xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#070b1b] border border-cyan-500/40 rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.95)] p-6 sm:p-10 text-white">
        
        {/* Top Header Controls (No-print) */}
        <div className="no-print flex items-center justify-between pb-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 flex items-center justify-center font-bold">
              <FileText className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black text-white">
                  {t('الملخص التنفيذي الموحد لمجلس الإدارة', 'C-Suite Executive Briefing Paper')}
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-cyan-400 border border-slate-700">
                  DOC-ID: ALF-ERP-2026-EXEC
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {t('وثيقة موجزة تلخص القرار التقني، الأثر المالي، ومراحل التنفيذ الست.', 'High-level executive overview for board review and operational sanctioning.')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                soundManager.playClick();
                window.print();
              }}
              className="px-4 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-cyan-300 hover:text-white text-xs font-bold transition flex items-center gap-1.5 border border-slate-700"
            >
              <Printer className="w-4 h-4" />
              <span>{t('طباعة الوثيقة (PDF)', 'Print / Export PDF')}</span>
            </button>

            <button
              onClick={() => {
                soundManager.playClick();
                onClose();
              }}
              className="w-10 h-10 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition border border-slate-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Executive Memo Content */}
        <div className="my-6 space-y-6 text-slate-200">
          
          {/* Memo Branding Banner */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-950/60 via-slate-900 to-slate-900 border border-cyan-500/30 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src="/alfarabi-logo.jpg" alt="Alfarabi" className="w-12 h-12 rounded-full border-2 border-lime-400 shadow-lg object-cover" />
              <div>
                <h2 className="text-base font-bold text-white">
                  {t('شركة الفارابي — مشروع التحول الرقمي للعمليات الميدانية', 'Alfarabi Enterprise — Industrial Digital Transformation Keynote')}
                </h2>
                <div className="text-xs text-slate-400 flex items-center gap-3 mt-1 font-mono">
                  <span>DATE: 2026-Q1</span>
                  <span>CONFIDENTIAL</span>
                  <span>VERSION: 2.4-ENTERPRISE</span>
                </div>
              </div>
            </div>
            <div className="text-right font-mono text-xs hidden sm:block">
              <span className="text-lime-400 font-bold block">STATUS: READY FOR PILOT</span>
              <span className="text-slate-400">PILOT: 90 DAYS DURATION</span>
            </div>
          </div>

          {/* Section 1: Executive Summary */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-1">
              <Award className="w-4 h-4 text-lime-400" />
              <span>{t('1. الخلاصة التنفيذية والدافع الاستراتيجي', '1. Strategic Executive Summary')}</span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {t(
                'تواجه شركة الفارابي تحديات تشغيلية ناتجة عن استخدام دفاتر إكسيل يدوية منفصلة لإدارة العمالة، غرف السكن، التغذية، وحركة الأسطول، مما يؤدي إلى هدر مالي يصل إلى 18-22% سنوياً بسبب ازدواجية الوجبات، وتأخر تفريغ أسرة العمال الغائبين، واختلال توزيع مقاعد الحافلات. تقترح هذه المنظومة (Alfarabi ERP) دمج هذه الإدارات الأربع في مرجع بيانات موحد ومؤتمت بالكامل دون اشتراط هواتف ذكية للعمال.',
                'Alfarabi operations currently endure operational friction and an estimated 18-22% annual capital leakage stemming from disconnected manual spreadsheets across workforce records, camp occupancy, catering meals, and fleet dispatch. Alfarabi ERP orchestrates all 4 pillars on a unified relational data plane, achieving real-time automated telemetry without requiring worker smartphones.'
              )}
            </p>
          </div>

          {/* Section 2: Four Core Pillars Matrix */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-1">
              <CheckCircle className="w-4 h-4 text-cyan-400" />
              <span>{t('2. المحاور التشغيلية الأربعة وقواعد الحوكمة', '2. Four Operational Pillars & Governance Rules')}</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                <div className="font-bold text-xs text-cyan-300 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                  {t('المحور الأول: أرشيف الوثائق وهوية العامل', 'Pillar 1: Workforce Dossier & Worker ID')}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {t(
                    'ربط كل عامل برقم مرجعي موحد (Worker ID) مع أرشفة سحابية لكافة الوثائق (الرقم القومي، الفيش الجنائي، الشهادات الصحية) مع تكامل رسمي عبر Google Drive API.',
                    'Unique relational Worker ID tied to Google Drive cloud vault for IDs, criminal clearance, and medical records.'
                  )}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                <div className="font-bold text-xs text-lime-300 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-lime-400"></span>
                  {t('المحور الثاني: إدارة السكن وسياسة الـ 10 أيام', 'Pillar 2: Housing & 10-Day Absence Policy')}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {t(
                    'شجرة هرمية لكافة السكنات (مبنى/دور/غرفة/سرير). عند غياب العامل 10 أيام متصلة، تنطلق تنبيهات متدرجة ولا يُحرر السرير عشوائياً إلا باعتماد المشرف وتوقيعه الرقمي.',
                    'Granular hierarchy (Camp/Floor/Room/Bed). Consecutive 10-day absence initiates multi-stage alerts, releasing beds only with verified supervisor sign-off.'
                  )}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                <div className="font-bold text-xs text-amber-300 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                  {t('المحور الثالث: حوكمة التغذية (1 عامل = 1 وجبة)', 'Pillar 3: Catering & Single-Meal Enforcement')}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {t(
                    'مسح هوية العامل عبر قارئ باركود سريع في منفذ التوزيع؛ يمنع استلام وجبة ثانية في نفس اليوم بنسبة 100% ويصدر كشف الصرف الآلي للمطبخ.',
                    'Instant optical scan prevents duplicate portions with 100% mathematical certainty, aligning kitchen prep with verified headcount.'
                  )}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                <div className="font-bold text-xs text-purple-300 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                  {t('المحور الرابع: الأسطول والنقل الذكي', 'Pillar 4: Fleet Transit & Route Optimization')}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {t(
                    'جدولة الحافلات بناءً على كشوف الحضور المؤكدة في السكنات، مما يقضي على الأتوبيسات شبه الفارغة ويوفر حتى 20% من استهلاك الوقود والصيانة.',
                    'Dynamic fleet dispatch synchronized with active camp headcounts, eliminating half-empty trips and trimming fuel overhead.'
                  )}
                </p>
              </div>

            </div>
          </div>

          {/* Section 3: Financial ROI & 6-Phase Rollout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            
            <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 space-y-2">
              <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                {t('الأثر المالي المتوقع (Financial ROI)', 'Financial Impact Summary')}
              </div>
              <ul className="text-xs text-slate-300 space-y-1 leading-relaxed">
                <li>• {t('استرداد الاستثمار التقديري خلال 3.8 إلى 4.5 أشهر.', 'Full capital payback achieved within 3.8 to 4.5 months.')}</li>
                <li>• {t('تقليص هدر الإعاشة بنسبة لا تقل عن 15% سنوياً.', 'Guaranteed min. 15% reduction in catering duplicate wastage.')}</li>
                <li>• {t('استيعاب العمالة الجديدة فوراً دون الحاجة لاستئجار سكنات إضافية.', 'Instant intake accommodation without redundant lease overhead.')}</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                <span>{t('مراحل التنفيذ الست (6-Phase Roadmap)', '6-Phase Implementation')}</span>
              </div>
              <div className="text-xs text-slate-300 space-y-1 font-mono">
                <div>Phase 1: Discovery & Architecture (W1-2)</div>
                <div>Phase 2: Core Platform & Database (W3-5)</div>
                <div>Phase 3: Housing & 10-Day Engine (W6-8)</div>
                <div>Phase 4: Meal & Fleet Integration (W9-11)</div>
                <div>Phase 5: Field Pilot & Supervisor Training (W12-14)</div>
                <div>Phase 6: Full Enterprise Rollout (W15-16)</div>
              </div>
            </div>

          </div>

          {/* Section 4: Sign-off & Recommendation */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-400 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-white font-bold block">{t('التوصية الاستراتيجية للإدارة العليا:', 'Executive Board Recommendation:')}</span>
              <span>{t('اعتماد ورشة العمل التقنية وبدء المرحلة التجريبية (Pilot Phase) لمدة 90 يوماً.', 'Approve the Phase-1 Technical Discovery Workshop and initiate the 90-day field pilot.')}</span>
            </div>
            <div className="font-mono text-cyan-400 border border-cyan-800/40 px-3 py-1.5 rounded-lg bg-slate-900">
              BOARD APPROVAL READY
            </div>
          </div>

        </div>

        {/* Modal Footer (No-print) */}
        <div className="no-print mt-6 pt-4 border-t border-slate-800 flex justify-end gap-3">
          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold transition"
          >
            {t('إغلاق', 'Close')}
          </button>
          <button
            onClick={() => {
              soundManager.playTrigger();
              window.print();
            }}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-black transition active:scale-95 shadow-[0_0_20px_rgba(56,189,248,0.4)] flex items-center gap-2"
          >
            <Printer className="w-4 h-4" />
            <span>{t('طباعة وتصدير التقرير التنفيذي', 'Export Official Memo')}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
