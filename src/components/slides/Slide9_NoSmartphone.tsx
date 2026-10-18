import React from 'react';
import { Smartphone, Laptop, QrCode, FileSpreadsheet, ShieldCheck, CheckCircle2, Users } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const Slide9_NoSmartphone: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="w-full h-full flex flex-col justify-between p-6 lg:p-8 relative">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
          <Smartphone className="w-4 h-4 text-cyan-400" />
          <span>{t('الواقعية التشغيلية وملاءمة العمالة', 'Operational Usability & Field Inclusivity')}</span>
        </div>
        <div className="text-xs text-lime-400 font-mono bg-lime-950/40 px-3 py-1 rounded-lg border border-lime-800/40">
          ADMINISTRATOR-FIRST ARCHITECTURE
        </div>
      </div>

      {/* Main Title */}
      <div className="my-1">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-[1.4] mb-2">
          {t('نظام عملي.. حتى لو العامل لا يمتلك هاتفًا ذكيًا', 'Zero Smartphone Dependency: Engineered for Industrial Reality')}
        </h2>
        <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
          {t(
            'فلسفة تصميم ترتكز على المشرف ومحطات العمل؛ لا نلزم العامل بهاتف ذكي، أو تثبيت تطبيقات، أو باقات إنترنت معقدة. المنظومة تخدم بيئة العمل الحقيقية بكل بساطة.',
            'A pragmatic administrator-first operational model eliminating worker smartphone mandates, app downloads, or internet connectivity requirements across the workforce.'
          )}
        </p>
      </div>

      {/* 4 Pillars of Realistic Field Operations */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-2 flex-1">
        {/* Card 1: Supervisor Tablets & Desktops */}
        <div className="glass-panel p-5 rounded-2xl border-cyan-500/30 hover:border-cyan-400 transition flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center mb-4">
              <Laptop className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-cyan-400 uppercase">{t('المشرف الميداني', 'Field Supervisor')}</span>
            <h3 className="text-base font-bold text-white mt-1 mb-2">{t('أجهزة التابلت والمكاتب', 'Tablets & Desktop Terminals')}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {t(
                'واجهات إدارية سهلة للغاية على تابلت أو كمبيوتر مشرف السكن لتسجيل المغادرة والعودة بضغطة واحدة.',
                'Streamlined, high-contrast touch interfaces allowing camp leads to register departures and arrivals in seconds.'
              )}
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-cyan-300 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>{t('إنجاز المعاملة في أقل من 5 ثوانٍ', '< 5s Fast Transaction Speed')}</span>
          </div>
        </div>

        {/* Card 2: Barcode / QR ID Cards */}
        <div className="glass-panel p-5 rounded-2xl border-lime-500/30 hover:border-lime-400 transition flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-lime-500/20 text-lime-400 flex items-center justify-center mb-4">
              <QrCode className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-lime-400 uppercase">{t('الهوية المادية', 'Physical ID Badging')}</span>
            <h3 className="text-base font-bold text-white mt-1 mb-2">{t('كروت باركود بلاستيكية', 'Durable Barcode & QR Cards')}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {t(
                'طباعة كارت هوية ورقي أو بلاستيكي برقم العامل والباركود؛ يكفي مسحه عند بوابة السكن أو المطبخ.',
                'Rugged plastic identity badges scanned at gate kiosks, meal lines, and bus loading docks.'
              )}
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-lime-300 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-lime-400" />
            <span>{t('تكلفة شبه معدومة وسهلة الاستبدال', 'Negligible Cost & Instant Replacement')}</span>
          </div>
        </div>

        {/* Card 3: Manual Search by Worker ID */}
        <div className="glass-panel p-5 rounded-2xl border-purple-500/30 hover:border-purple-400 transition flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-4">
              <Users className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-purple-400 uppercase">{t('البحث الفوري', 'Instant Lookup')}</span>
            <h3 className="text-base font-bold text-white mt-1 mb-2">{t('البحث السريع برقم العامل', 'Worker ID & Name Fallback')}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {t(
                'في حال نسيان الكارت، يبحث المشرف برقم العامل أو الاسم ليظهر ملفه وصورته للتأكد البصري وتسجيل الحركة.',
                'If a badge is misplaced, supervisors conduct visual verification via photo search in under 3 seconds.'
              )}
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-purple-300 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
            <span>{t('لا توقف للعمليات تحت أي ظرف', 'Zero Operational Bottlenecks')}</span>
          </div>
        </div>

        {/* Card 4: Excel Bulk Import & Device Integration */}
        <div className="glass-panel p-5 rounded-2xl border-amber-500/30 hover:border-amber-400 transition flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-4">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-amber-400 uppercase">{t('المرونة التشغيلية', 'Enterprise Flexibility')}</span>
            <h3 className="text-base font-bold text-white mt-1 mb-2">{t('الاستيراد الجماعي وأجهزة الحضور', 'Batch Excel Intake & Biometrics')}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {t(
                'إمكانية رفع شيتات الحضور المعتمدة دفعياً (Bulk Import)، مع جاهزية الربط مع أجهزة البصمة المتاحة.',
                'Turnkey CSV/Excel batch intake utilities plus modular API connectors for on-premise biometric gates.'
              )}
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-amber-300 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
            <span>{t('تدرج في الاستثمار التقني', 'Progressive Tech Adoption')}</span>
          </div>
        </div>
      </div>

      {/* Strategic Takeaway Box */}
      <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-700/80 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-lime-400 shrink-0" />
          <span className="text-xs text-slate-200">
            <strong>{t('ميزة تنافسية كبرى:', 'Core Strategic Advantage:')}</strong>{' '}
            {t(
              'تجنب مقاومة التغيير وتقليل مجهود وتكلفة التدريب، مع ضمان سرعة التطبيق الميداني بنسبة 100% دون ارتباك.',
              'Overcoming workforce resistance, eradicating training overhead, and guaranteeing 100% rapid field adoption across all industrial sites.'
            )}
          </span>
        </div>
        <div className="text-[11px] text-cyan-300 font-mono">ZERO WORKER SMARTPHONE FRICTION</div>
      </div>
    </div>
  );
};
