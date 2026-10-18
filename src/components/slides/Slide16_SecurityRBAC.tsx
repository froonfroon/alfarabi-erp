import React, { useState } from 'react';
import { ShieldCheck, Lock, KeyRound, History, UserCheck, AlertTriangle } from 'lucide-react';
import { soundManager } from '../../utils/audio';
import { useLanguage } from '../../context/LanguageContext';
import { SceneSecurityShield3D } from '../3d/SceneSecurityShield3D';

export const Slide16_SecurityRBAC: React.FC = () => {
  const { isArabic, t } = useLanguage();
  const [selectedRole, setSelectedRole] = useState<number>(1);

  const roles = [
    {
      id: 0,
      titleAr: 'مدير النظام (SysAdmin)',
      titleEn: 'System Administrator (SysAdmin)',
      scopeAr: 'إدارة البنية التحتية، الصلاحيات، والنسخ الاحتياطي',
      scopeEn: 'Infrastructure configuration, role assignments & enterprise backups',
      docsAr: 'إدارة تقنية',
      docsEn: 'Technical Config Only',
      accomAr: 'كامل',
      accomEn: 'Full Admin',
      foodAr: 'كامل',
      foodEn: 'Full Admin',
      busAr: 'كامل',
      busEn: 'Full Admin',
      auditAr: 'كامل',
      auditEn: 'Full System Audit',
    },
    {
      id: 1,
      titleAr: 'مسؤول الموارد البشرية (HR)',
      titleEn: 'HR Compliance Officer',
      scopeAr: 'إدارة ملفات العمال، رفع وفحص البطاقات والفيش',
      scopeEn: 'Workforce records management, National ID & criminal clearance audit',
      docsAr: 'صلاحية كاملة',
      docsEn: 'Full Verification Rights',
      accomAr: 'مشاهدة',
      accomEn: 'Read Only',
      foodAr: 'استحقاق',
      foodEn: 'Entitlement Gating',
      busAr: 'مشاهدة',
      busEn: 'Read Only',
      auditAr: 'سجل الوثائق',
      auditEn: 'Dossier Audit Logs',
    },
    {
      id: 2,
      titleAr: 'مشرف السكن (Accommodation)',
      titleEn: 'Camp Housing Supervisor',
      scopeAr: 'تسجيل التسكين، الغياب، وتطبيق سياسة الـ 10 أيام',
      scopeEn: 'Bed allocations, daily absence registration & 10-day escalation',
      docsAr: 'حظر الوثائق الحساسة',
      docsEn: 'Sensitive Files Gated',
      accomAr: 'إدخال واعتماد',
      accomEn: 'Full Camp Control',
      foodAr: 'إخطار غياب',
      foodEn: 'Sync Absence Telemetry',
      busAr: 'مشاهدة',
      busEn: 'Read Only',
      auditAr: 'سجل السكن',
      auditEn: 'Camp Activity Log',
    },
    {
      id: 3,
      titleAr: 'مشرف التغذية (Catering)',
      titleEn: 'Catering Lead / Head Chef',
      scopeAr: 'استلام أوامر تشغيل المطبخ وتسجيل صرف الوجبات',
      scopeEn: 'Kitchen batch orders and physical meal counter issuance verification',
      docsAr: 'محظور تماماً',
      docsEn: 'Strictly Restricted',
      accomAr: 'حصر الحضور فقط',
      accomEn: 'Headcount Telemetry Only',
      foodAr: 'صرف الوجبات',
      foodEn: 'Portion Issuance Access',
      busAr: 'لا يوجد',
      busEn: 'No Access',
      auditAr: 'سجل الصرف',
      auditEn: 'Meal Issuance Audit',
    },
    {
      id: 4,
      titleAr: 'منسق الحركة (Transport)',
      titleEn: 'Fleet Transit Coordinator',
      scopeAr: 'إدارة خطوط الأتوبيسات وتعيين الركاب حسب الجاهزية',
      scopeEn: 'Bus route optimization, capacity balancing & dispatch manifests',
      docsAr: 'محظور تماماً',
      docsEn: 'Strictly Restricted',
      accomAr: 'حصر الركاب بالسكن',
      accomEn: 'Passenger Readiness Telemetry',
      foodAr: 'لا يوجد',
      foodEn: 'No Access',
      busAr: 'إصدار أمر الحركة',
      busEn: 'Dispatch Authority',
      auditAr: 'سجل الأسطول',
      auditEn: 'Transit Trip Log',
    },
    {
      id: 5,
      titleAr: 'مدير العمليات (Ops Manager)',
      titleEn: 'Director of Field Operations',
      scopeAr: 'اعتماد شواغر الأسرة، معالجة الاستثناءات، واعتماد التقارير',
      scopeEn: 'Day-10 bed releases, overtime meal approvals & exception sign-offs',
      docsAr: 'اعتماد رسمي',
      docsEn: 'Executive Access',
      accomAr: 'اعتماد نهائي',
      accomEn: 'Reallocation Approval',
      foodAr: 'اعتماد هدر',
      foodEn: 'Variance Sign-off',
      busAr: 'اعتماد رحلات',
      busEn: 'Charter Approval',
      auditAr: 'سجل شامل',
      auditEn: 'Comprehensive Audit',
    },
    {
      id: 6,
      titleAr: 'الإدارة العليا (Executive)',
      titleEn: 'Executive Board / C-Suite',
      scopeAr: 'متابعة مؤشرات الأداء، تقارير التكاليف، ولوحة القيادة',
      scopeEn: 'C-suite strategic overview, financial variance & aggregate KPIs',
      docsAr: 'مؤشرات إحصائية',
      docsEn: 'Aggregate Metrics',
      accomAr: 'نسب إشغال',
      accomEn: 'Occupancy Ratios',
      foodAr: 'تكاليف وهدر',
      foodEn: 'Budget & Waste Variance',
      busAr: 'كفاءة الأسطول',
      busEn: 'Fleet Utilization',
      auditAr: 'استعراض وتقارير',
      auditEn: 'Full Audit Inspection',
    },
  ];

  return (
    <div className="w-full h-full flex flex-col justify-between p-6 lg:p-8 relative">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-xs font-semibold">
          <ShieldCheck className="w-4 h-4 text-cyan-400" />
          <span>{t('الأمن السيبراني، الحوكمة وحماية البيانات', 'Cybersecurity, Governance & Enterprise RBAC')}</span>
        </div>
        <div className="text-xs text-lime-400 font-mono bg-lime-950/40 px-3 py-1 rounded-lg border border-lime-800/40">
          ENTERPRISE RBAC & AUDIT COMPLIANCE
        </div>
      </div>

      {/* Main Title */}
      <div className="my-1">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-[1.4] mb-2">
          {t('صلاحيات واضحة.. بيانات محمية.. وسجل لكل إجراء', 'Strict Access Control, Encrypted Dossiers & Audit Trails')}
        </h2>
        <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
          {t(
            'عزل صارم للبيانات الشخصية الحساسة؛ لا تظهر صور البطاقات أو الفيش الجنائي إلا للمخولين بالموارد البشرية، مع توثيق اسم كل موظف وتاريخ أي تعديل في سجل تدقيق غير قابل للتلاعب.',
            'Granular role-based security strictly gating sensitive personal identity documents to authorized HR personnel, backed by an immutable write-once audit log.'
          )}
        </p>
      </div>

      {/* Main 3-Column Grid: Roles + Detailed Scope + 3D Holographic Vault */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center my-2 flex-1">
        {/* Left: Role-Based Access List */}
        <div className="lg:col-span-4 flex flex-col justify-between space-y-2">
          <span className="text-xs font-bold text-cyan-300">
            {t('مصفوفة الأدوار الوظيفية (انقر للفحص):', 'Role-Based Access Matrix:')}
          </span>

          <div className="space-y-1.5">
            {roles.map((r) => {
              const isSelected = selectedRole === r.id;
              const title = isArabic ? r.titleAr : r.titleEn;

              return (
                <button
                  key={r.id}
                  onClick={() => {
                    soundManager.playClick();
                    setSelectedRole(r.id);
                  }}
                  className={`w-full ${isArabic ? 'text-right' : 'text-left'} p-2 rounded-xl border transition-all flex items-center justify-between text-xs ${
                    isSelected
                      ? 'bg-blue-950/80 border-cyan-400 shadow-[0_0_15px_rgba(56,189,248,0.25)] ring-1 ring-cyan-400'
                      : 'bg-slate-900/40 hover:bg-slate-800/60 border-slate-800 text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <UserCheck className={`w-3.5 h-3.5 ${isSelected ? 'text-cyan-400' : 'text-slate-500'}`} />
                    <span className="font-bold text-white text-[11px] sm:text-xs">{title}</span>
                  </div>
                  <span className="text-[10px] text-cyan-400 font-mono">
                    {r.id === 0 ? 'ROOT' : 'LEVEL ' + r.id}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Center: Selected Role Permissions Matrix Card */}
        <div className="lg:col-span-4 glass-panel p-4 rounded-2xl border-cyan-500/30 flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-2">
              <div>
                <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                  <KeyRound className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{isArabic ? roles[selectedRole].titleAr : roles[selectedRole].titleEn}</span>
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                  {isArabic ? roles[selectedRole].scopeAr : roles[selectedRole].scopeEn}
                </p>
              </div>
              <span className="text-[10px] bg-slate-800 text-cyan-300 px-2 py-0.5 rounded font-mono border border-slate-700">
                ROLE #{roles[selectedRole].id}
              </span>
            </div>

            {/* Scope Breakdown */}
            <div className="grid grid-cols-2 gap-2 text-xs mb-2">
              <div className="p-2 rounded-lg bg-slate-900/70 border border-slate-800">
                <span className="text-[10px] text-slate-400 block mb-0.5">
                  {t('الوثائق والفيش:', 'Sensitive Dossiers:')}
                </span>
                <span className={`font-bold text-[11px] ${roles[selectedRole].docsEn.includes('Restricted') || roles[selectedRole].docsAr.includes('محظور') ? 'text-rose-400' : 'text-emerald-400'}`}>
                  {isArabic ? roles[selectedRole].docsAr : roles[selectedRole].docsEn}
                </span>
              </div>

              <div className="p-2 rounded-lg bg-slate-900/70 border border-slate-800">
                <span className="text-[10px] text-slate-400 block mb-0.5">
                  {t('السكنات والأسرة:', 'Camp Beds:')}
                </span>
                <span className="font-bold text-[11px] text-cyan-300">
                  {isArabic ? roles[selectedRole].accomAr : roles[selectedRole].accomEn}
                </span>
              </div>

              <div className="p-2 rounded-lg bg-slate-900/70 border border-slate-800">
                <span className="text-[10px] text-slate-400 block mb-0.5">
                  {t('المطبخ والوجبات:', 'Meal Issuance:')}
                </span>
                <span className="font-bold text-[11px] text-amber-300">
                  {isArabic ? roles[selectedRole].foodAr : roles[selectedRole].foodEn}
                </span>
              </div>

              <div className="p-2 rounded-lg bg-slate-900/70 border border-slate-800">
                <span className="text-[10px] text-slate-400 block mb-0.5">
                  {t('الحركة والأتوبيس:', 'Fleet Transit:')}
                </span>
                <span className="font-bold text-[11px] text-purple-300">
                  {isArabic ? roles[selectedRole].busAr : roles[selectedRole].busEn}
                </span>
              </div>
            </div>

            {/* Audit Log Guarantee */}
            <div className="p-2 rounded-lg bg-slate-950/80 border border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 text-slate-300">
                <History className="w-3.5 h-3.5 text-cyan-400" />
                <span className="text-[11px]">{t('سجل التدقيق:', 'Audit:')} <strong className="text-white">{isArabic ? roles[selectedRole].auditAr : roles[selectedRole].auditEn}</strong></span>
              </div>
              <span className="text-[9px] text-emerald-400 font-mono">NON-ERASABLE</span>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
            <span className="flex items-center gap-1 text-lime-400">
              <Lock className="w-3 h-3" /> {t('تشفير كامل TLS 1.3 / AES-256', 'Full AES-256')}
            </span>
            <span>{t('نسخ احتياطي فوري', 'Auto-Backup')}</span>
          </div>
        </div>

        {/* Right: 3D Holographic Security Shield & RBAC Vault */}
        <div className="lg:col-span-4 h-[240px] sm:h-[300px] rounded-2xl bg-slate-950/70 border border-cyan-500/30 p-1 shadow-2xl relative flex items-center justify-center">
          <SceneSecurityShield3D />
        </div>
      </div>

      {/* Footer Caveat */}
      <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-700/80 flex items-center justify-between text-xs text-slate-400">
        <span className="flex items-center gap-2 text-rose-300">
          <AlertTriangle className="w-4 h-4 text-rose-400" />
          {t(
            'لا تظهر أي بيانات حساسة في الشاشات العامة أو تقارير المشرفين الميدانيين لضمان الخصوصية والامتثال القانوني.',
            'No sensitive personal dossiers or police records are exposed on shared field displays or general reports, ensuring strict GDPR & local regulatory privacy compliance.'
          )}
        </span>
        <span className="font-mono text-slate-500 text-[11px]">SECURITY-GOVERNANCE-V2</span>
      </div>
    </div>
  );
};
