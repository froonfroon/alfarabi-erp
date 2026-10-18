import React, { useState } from 'react';
import { SceneDocumentVault } from '../3d/SceneDocumentVault';
import { FileCheck, Shield, AlertCircle, CheckCircle2, User, FileText, History } from 'lucide-react';
import { soundManager } from '../../utils/audio';
import { useLanguage } from '../../context/LanguageContext';

export const Slide5_Documents: React.FC = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'profile' | 'docs' | 'audit'>('profile');

  return (
    <div className="w-full h-full flex flex-col justify-between p-6 lg:p-8 relative">
      {/* Top Tag */}
      <div className="flex items-center justify-between">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
          <FileCheck className="w-4 h-4 text-cyan-400" />
          <span>{t('القسم الأول: وثائق العمالة والأرشيف الرقمي', 'Pillar 01: Workforce Identity & Digital Vault')}</span>
        </div>
        <div className="text-xs text-slate-400 font-mono">DIGITAL WORKER IDENTITY & VAULT</div>
      </div>

      {/* Headline */}
      <div className="my-1">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-[1.4] mb-2">
          {t('من أرشيف ورقي مشتت إلى ملف رقمي موحد لكل عامل', 'From Paper Chaos to a Unified Digital Dossier')}
        </h2>
        <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
          {t(
            'إنشاء بطاقة رقمية تفاعلية لكل عامل تحمل Worker ID موحد يربط ملف البطاقة، الفيش الجنائي، وعقد العمل بسجل تدقيق كامل.',
            'Architecting an encrypted 3D interactive dossier binding National IDs, police clearances, and employment contracts under an immutable audit trail.'
          )}
        </p>
      </div>

      {/* Main Grid: Comparison & 3D Interactive Profile */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center my-2 flex-1">
        {/* Left Side: Current Pain Points vs Proposed Solution */}
        <div className="lg:col-span-6 flex flex-col space-y-4">
          <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-500/30">
            <h4 className="text-xs font-bold text-rose-300 flex items-center gap-2 mb-2">
              <AlertCircle className="w-4 h-4 text-rose-400" />
              <span>{t('واقع الأرشيف الورقي السابق (قبل النظام)', 'Legacy Paper Archiving Pain Points')}</span>
            </h4>
            <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
              <li>{t('صعوبة بالغة في تجميع وتتبع صور البطاقات والفيش الجنائي من المشرفين.', 'Severe friction collecting, digitizing, and tracking paper ID copies across field sites.')}</li>
              <li>{t('غياب الربط الآلي بين صور المستندات والرقم الوظيفي للعامل.', 'No automatic relational link between scanned documents and employee payroll IDs.')}</li>
              <li>{t('استهلاك ساعات طويلة في تجهيز وتجميع ملفات PDF لكل مجموعة أو موقع.', 'Wasting excessive administrative hours compiling compliance PDFs for client audits.')}</li>
              <li>{t('تكرار العمل اليدوي في إعادة تنزيل الصور وإعادة ترتيبها وتسميتها.', 'Constant redundant rework downloading, renaming, and re-sorting WhatsApp image files.')}</li>
            </ul>
          </div>

          {/* Interactive Worker Profile HUD */}
          <div className="glass-panel p-4 rounded-2xl border-cyan-500/30">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-400/40 flex items-center justify-center font-bold">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-white">{t('إبراهيم محمود كمال', 'Ibrahim Mahmoud Kamal')}</h4>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                      WRK-10842
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">{t('عامل تشغيل موقع - مشروع السويس', 'Site Plant Operator — Suez Sector A')}</p>
                </div>
              </div>

              {/* Sub-tabs */}
              <div className="flex gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800 text-[11px]">
                <button
                  onClick={() => { soundManager.playClick(); setActiveTab('profile'); }}
                  className={`px-2.5 py-1 rounded-md transition ${activeTab === 'profile' ? 'bg-cyan-600 text-white font-bold' : 'text-slate-400'}`}
                >
                  {t('البيانات', 'Profile')}
                </button>
                <button
                  onClick={() => { soundManager.playClick(); setActiveTab('docs'); }}
                  className={`px-2.5 py-1 rounded-md transition ${activeTab === 'docs' ? 'bg-cyan-600 text-white font-bold' : 'text-slate-400'}`}
                >
                  {t('المستندات (3)', 'Docs (3)')}
                </button>
                <button
                  onClick={() => { soundManager.playClick(); setActiveTab('audit'); }}
                  className={`px-2.5 py-1 rounded-md transition ${activeTab === 'audit' ? 'bg-cyan-600 text-white font-bold' : 'text-slate-400'}`}
                >
                  {t('سجل التعديلات', 'Audit Trail')}
                </button>
              </div>
            </div>

            {/* Tab 1: Profile Details */}
            {activeTab === 'profile' && (
              <div className="pt-3 grid grid-cols-2 gap-3 text-xs">
                <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                  <span className="text-slate-400 block text-[11px]">{t('الرقم القومي:', 'National ID:')}</span>
                  <span className="font-mono font-bold text-white">29804151203491</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                  <span className="text-slate-400 block text-[11px]">{t('السكن المخصص:', 'Assigned Camp:')}</span>
                  <span className="font-bold text-white">{t('سكن النخيل - غرفة 204 (سرير 2)', 'Palm Camp — Room 204 (Bed 2)')}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                  <span className="text-slate-400 block text-[11px]">{t('تاريخ الالتحاق:', 'Deployment Date:')}</span>
                  <span className="font-bold text-white">{t('12 مارس 2024', '12 March 2024')}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                  <span className="text-slate-400 block text-[11px]">{t('حالة الملف:', 'Compliance Status:')}</span>
                  <span className="font-bold text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> {t('مكتمل ومعتمد', 'Verified & Compliant')}
                  </span>
                </div>
              </div>
            )}

            {/* Tab 2: Document Vault Status */}
            {activeTab === 'docs' && (
              <div className="pt-3 space-y-2 text-xs">
                <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-cyan-400" />
                    <div>
                      <span className="font-bold text-white block">{t('بطاقة الرقم القومي (وجهان)', 'National ID Card (Dual Sided)')}</span>
                      <span className="text-[10px] text-slate-400 font-mono">Expires: 2028/11 | PDF High-Res</span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 text-[10px] border border-emerald-800 font-bold">{t('مفحوص ومطابق', 'Verified')}</span>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-lime-400" />
                    <div>
                      <span className="font-bold text-white block">{t('صحيفة الحالة الجنائية (الفيش)', 'Criminal Police Clearance Record')}</span>
                      <span className="text-[10px] text-slate-400 font-mono">Issued: 2024/02 | Valid</span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 text-[10px] border border-emerald-800 font-bold">{t('معتمد HR', 'HR Approved')}</span>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-purple-400" />
                    <div>
                      <span className="font-bold text-white block">{t('عقد العمل وإقرار الاستلام', 'Employment Contract & Signed Onboarding')}</span>
                      <span className="text-[10px] text-slate-400 font-mono">Digitally Signed & Archived</span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 text-[10px] border border-cyan-800 font-bold">{t('مؤرشف بالسحابة', 'Cloud Synced')}</span>
                </div>
              </div>
            )}

            {/* Tab 3: Audit Trail */}
            {activeTab === 'audit' && (
              <div className="pt-3 space-y-2 text-xs">
                <div className="p-2 rounded bg-slate-900/70 border border-slate-800 flex items-center justify-between text-[11px]">
                  <div className="flex items-center gap-2">
                    <History className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{t('تم رفع الفيش الجنائي وتحديث الصلاحية', 'Police clearance uploaded & expiration verified')}</span>
                  </div>
                  <span className="text-slate-400 font-mono">By: A. Sami (HR Officer)</span>
                </div>
                <div className="p-2 rounded bg-slate-900/70 border border-slate-800 flex items-center justify-between text-[11px]">
                  <div className="flex items-center gap-2">
                    <History className="w-3.5 h-3.5 text-lime-400" />
                    <span>{t('تسكين العامل في سكن النخيل - غرفة 204', 'Worker allocated to Palm Camp - Room 204')}</span>
                  </div>
                  <span className="text-slate-400 font-mono">By: K. Radwan (Camp Lead)</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: 3D Holographic Vault Scene */}
        <div className="lg:col-span-6 h-[340px] sm:h-[400px] rounded-3xl bg-slate-950/60 border border-cyan-500/30 p-2 shadow-2xl relative flex items-center justify-center">
          <SceneDocumentVault />
        </div>
      </div>

      {/* Footer Security Assurance */}
      <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 flex items-center justify-between text-xs text-slate-400">
        <span className="flex items-center gap-2 text-cyan-300">
          <Shield className="w-4 h-4 text-cyan-400" />
          {t(
            'تشفير تام للوثائق الحساسة (AES-256) مع عزل الوصول وفق صلاحيات الموارد البشرية فقط.',
            'End-to-end AES-256 encryption with role-based segregation strictly isolating sensitive identity files to certified HR officers.'
          )}
        </span>
        <span className="font-mono text-slate-500 text-[11px]">MODULE-DOCS-V2</span>
      </div>
    </div>
  );
};
