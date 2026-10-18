import React, { useState } from 'react';
import { FolderTree, Cloud, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { soundManager } from '../../utils/audio';
import { useLanguage } from '../../context/LanguageContext';

export const Slide6_DocWorkflow: React.FC = () => {
  const { isArabic, t } = useLanguage();
  const [activeStep, setActiveStep] = useState<number>(3);

  const steps = [
    { num: 1, titleAr: 'إدخال البيانات', titleEn: 'Data Ingestion', descAr: 'إدخال أو استيراد بيانات العامل من شيت معتمد', descEn: 'Direct entry or batch intake from verified client rosters' },
    { num: 2, titleAr: 'توليد Worker ID', titleEn: 'Worker ID Minting', descAr: 'إنشاء معرف رقمي فريد يربط كافة المعاملات', descEn: 'Generating immutable canonical hash connecting all modules' },
    { num: 3, titleAr: 'رفع المستندات', titleEn: 'Document Ingestion', descAr: 'رفع البطاقة والفيش من واجهة إدارية مبسطة', descEn: 'Rapid field upload of National ID & police records' },
    { num: 4, titleAr: 'التحقق والمطابقة', titleEn: 'Verification & QA', descAr: 'فحص جودة الملف ومنع التكرار وربطه بالعامل', descEn: 'Automated checksum check, deduplication & profile linkage' },
    { num: 5, titleAr: 'التصنيف الآلي', titleEn: 'Canonical Hierarchy', descAr: 'توزيع الملفات في هيكل مجلدات موحد ومنتظم', descEn: 'Auto-sorting into standardized enterprise folder trees' },
    { num: 6, titleAr: 'توليد ملفات PDF', titleEn: 'Batch PDF Generation', descAr: 'إنشاء PDF مجمع للوردية أو المشروع بضغطة زر', descEn: 'Single-click generation of audit-ready compliance dossiers' },
    { num: 7, titleAr: 'مزامنة السحابة', titleEn: 'Google Drive API Sync', descAr: 'تكامل مع Google Drive API معتمد وموثق', descEn: 'Automated background sync via secure OAuth 2.0 endpoints' },
    { num: 8, titleAr: 'حوكمة الوصول', titleEn: 'Governance & RBAC', descAr: 'إتاحة الملفات للمصرح لهم وتأمين النسخ المحلية', descEn: 'Role-based access gating and secure cached workstation storage' },
  ];

  return (
    <div className="w-full h-full flex flex-col justify-between p-6 lg:p-8 relative">
      {/* Header Tag */}
      <div className="flex items-center justify-between">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
          <FolderTree className="w-4 h-4 text-cyan-400" />
          <span>{t('أتمتة الأرشيف ومزامنة السحابة', 'Document Pipeline & Cloud Sync Architecture')}</span>
        </div>
        <div className="text-xs text-slate-400 font-mono">STANDARDIZED REPOSITORY & DRIVE API</div>
      </div>

      {/* Headline */}
      <div className="my-1">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-[1.4] mb-2">
          {t('من رفع المستند إلى الأرشفة.. بدون فوضى يدوية', 'Automated Document Ingestion to Cloud Archival')}
        </h2>
        <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
          {t(
            'دورة عمل هندسية من 8 مراحل تضمن توحيد مسميات وتصنيفات وثائق العمال، ومنع التكرار، مع جاهزية الربط السحابي الآمن.',
            'An 8-stage industrial-grade ingestion pipeline enforcing standardized taxonomies, cryptographic deduplication, and verified Google Drive API integration.'
          )}
        </p>
      </div>

      {/* Main Content: 8-Step Interactive Pipeline + Folder Tree Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start my-2 flex-1">
        {/* Left Side: 8-Step Interactive Pipeline */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-3">
          <div className="text-xs font-bold text-cyan-300 flex items-center justify-between">
            <span>{t('مراحل دورة حياة المستند (انقر للاستعراض):', '8-Stage Ingestion Lifecycle (Click to inspect):')}</span>
            <span className="text-slate-400 font-normal">
              {t(`المرحلة المحددة: ${activeStep} من 8`, `Selected Stage: ${activeStep} of 8`)}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {steps.map((st) => {
              const isSelected = activeStep === st.num;
              const title = isArabic ? st.titleAr : st.titleEn;
              const desc = isArabic ? st.descAr : st.descEn;

              return (
                <button
                  key={st.num}
                  onClick={() => {
                    soundManager.playClick();
                    setActiveStep(st.num);
                  }}
                  className={`p-3 rounded-xl border ${isArabic ? 'text-right' : 'text-left'} transition-all flex flex-col justify-between h-24 ${
                    isSelected
                      ? 'bg-blue-950/80 border-cyan-400 shadow-[0_0_15px_rgba(56,189,248,0.3)] ring-1 ring-cyan-400'
                      : 'bg-slate-900/40 hover:bg-slate-800/60 border-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`w-6 h-6 rounded-md font-mono text-xs font-bold flex items-center justify-center ${
                      isSelected ? 'bg-cyan-400 text-black' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {st.num}
                    </span>
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />}
                  </div>
                  <div>
                    <h5 className="font-bold text-white text-xs leading-snug line-clamp-1">{title}</h5>
                    <p className="text-[10px] text-slate-400 line-clamp-1">{desc}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Step Deep Dive Box */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-700/80">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
              <h4 className="text-sm font-bold text-white">
                {t(`تفاصيل المرحلة ${activeStep}: ${steps[activeStep - 1].titleAr}`, `Stage ${activeStep} Deep Dive: ${steps[activeStep - 1].titleEn}`)}
              </h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {isArabic ? steps[activeStep - 1].descAr : steps[activeStep - 1].descEn}.{' '}
              {t(
                'تشتمل هذه الخطوة على فحص برمجي للتحقق من سلامة الملفات المدعومة (PDF, JPG, PNG) ومنع التكرار التام بالاعتماد على الرقم القومي.',
                'Enforces automated checksum verification, file type validation (PDF, JPG, PNG), and strict National ID deduplication.'
              )}
            </p>
          </div>

          {/* Technical Honesty & Cloud Sync Note */}
          <div className="p-3.5 rounded-xl bg-blue-950/30 border border-blue-500/20 text-xs text-slate-300 space-y-1">
            <div className="font-bold text-cyan-300 flex items-center gap-1.5">
              <Cloud className="w-4 h-4 text-cyan-400" />
              <span>{t('المعايير التقنية للتكامل مع Google Drive:', 'Google Drive API Integration Specifications:')}</span>
            </div>
            <div className="text-[11px] leading-relaxed text-slate-300 flex flex-col gap-1.5 pt-1">
              <p>
                {t(
                  '• يتم الربط السحابي الفعلي من خلال Google Drive API الرسمية باستخدام مصادقة OAuth 2.0 المعتمدة.',
                  '• Cloud synchronization executes via certified Google Drive REST APIs utilizing enterprise OAuth 2.0 authorization tokens.'
                )}
              </p>
              <p>
                {t(
                  '• المزامنة إلى أجهزة حواسيب المكاتب تتطلب إعداد عميل المزامنة (Google Drive for Desktop) أو نظام نشر إداري متفق عليه.',
                  '• Workstation desktop synchronization requires standard managed Google Drive for Desktop clients or enterprise deployment scripts.'
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Standardized Folder Structure Schema */}
        <div className="lg:col-span-5 glass-panel p-5 rounded-2xl border-cyan-500/30 font-mono text-xs text-slate-300 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
              <span className="font-bold text-white font-sans text-sm flex items-center gap-2">
                <FolderTree className="w-4 h-4 text-cyan-400" />
                {t('هيكل مجلدات الأرشيف الموحد', 'Standardized Folder Taxonomy')}
              </span>
              <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded font-sans">
                {t('قابل للتخصيص', 'Policy Configurable')}
              </span>
            </div>

            <div className="bg-[#050814] p-4 rounded-xl border border-slate-800 space-y-1.5 overflow-x-auto text-slate-300 text-[11px] text-left ltr" dir="ltr">
              <div className="text-cyan-400 font-bold">📁 /Worker-Archive/</div>
              <div className="pl-4 text-slate-300">📁 /Worker-ID-0001/</div>
              <div className="pl-8 text-slate-400">📄 Personal-ID.pdf <span className="text-[10px] text-emerald-400 font-sans">[National ID]</span></div>
              <div className="pl-8 text-slate-400">📄 Criminal-Record.pdf <span className="text-[10px] text-lime-400 font-sans">[Police Clearance]</span></div>
              <div className="pl-8 text-slate-400">📄 Worker-Profile.pdf <span className="text-[10px] text-cyan-400 font-sans">[Comprehensive Dossier]</span></div>
              <div className="pl-4 text-slate-300">📁 /Worker-ID-0002/</div>
              <div className="pl-4 text-amber-400 font-semibold">📁 /Personal-IDs/ <span className="text-[10px] text-slate-400 font-sans">[Batch ID Index]</span></div>
              <div className="pl-4 text-lime-400 font-semibold">📁 /Criminal-Records/ <span className="text-[10px] text-slate-400 font-sans">[Clearance Registry]</span></div>
              <div className="pl-4 text-purple-400 font-semibold">📁 /Worker-Reports/ <span className="text-[10px] text-slate-400 font-sans">[Site Roster Exports]</span></div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-sans">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <ShieldCheck className="w-4 h-4" /> {t('صلاحيات وصول دورية (RBAC)', 'Granular RBAC Protection')}
            </span>
            <span>{t('تحديث وتسمية تلقائية 100%', '100% Automated Taxonomies')}</span>
          </div>
        </div>
      </div>

      {/* Footer Assurance */}
      <div className="text-xs text-slate-400 text-center border-t border-slate-800 pt-2">
        {t(
          '* يتم توفير سجل للأخطاء (Error Logs) وآلية إعادة محاولة آلية (Retry Mechanism) في حال انقطاع الاتصال أثناء الرفع.',
          '* Equipped with detailed error logging, transactional checkpoints, and automatic exponential retry queues for resilient cloud uploads.'
        )}
      </div>
    </div>
  );
};
