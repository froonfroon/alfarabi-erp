import React from 'react';
import { SceneOperationalNetwork } from '../3d/SceneOperationalNetwork';
import { Network, Sparkles, Cpu } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const Slide14_CrossDeptSync: React.FC = () => {
  const { isArabic, t } = useLanguage();

  return (
    <div className="w-full h-full flex flex-col justify-between p-6 lg:p-8 relative">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-xs font-semibold">
          <Network className="w-4 h-4 text-cyan-400" />
          <span>{t('محاكاة التكامل الحي بين القطاعات الأربعة', 'Cross-Departmental Synchronization Simulation')}</span>
        </div>
        <div className="text-xs text-lime-400 font-mono bg-lime-950/40 px-3 py-1 rounded-lg border border-lime-800/40 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>THE RIPPLE EFFECT SIMULATION</span>
        </div>
      </div>

      {/* Main Title */}
      <div className="my-1">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-[1.4] mb-2">
          {t('قيمة النظام الحقيقية في الربط بين الأقسام', 'The Core Value: Real-Time Cross-Pillar Integration')}
        </h2>
        <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
          {t(
            'شاهد كيف يتحول تسجيل غياب أو عودة عامل واحد في شاشة السكن إلى سلسلة تفاعلية فورية توفر وجبة بالمطبخ، وتُحرر مقعداً بالأوتوبيس، وتُحدث اللوحة التنفيذية في نفس اللحظة!',
            'Witness how a single worker event logged in accommodation triggers an instantaneous cascade: decrementing kitchen production, liberating bus capacity, and updating executive telemetry simultaneously.'
          )}
        </p>
      </div>

      {/* Interactive Simulation Component */}
      <div className="my-2 flex-1 flex flex-col justify-center">
        <SceneOperationalNetwork />
      </div>

      {/* Bottom Technical Assurance */}
      <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-700/80 flex items-center justify-between text-xs text-slate-400">
        <span className="flex items-center gap-2 text-cyan-300">
          <Cpu className="w-4 h-4 text-cyan-400" />
          {t(
            'يتم تفعيل كل خطوة وفق قواعد عمل مبرمجة ومؤمنة بصلاحيات المشرف المسؤول لمنع أي أخطاء أو تضارب.',
            'Every downstream event is governed by programmatic business rules and role-based validation checkpoints to prevent erroneous cascades.'
          )}
        </span>
        <span className="font-mono text-slate-500 text-[11px]">EVENT-DRIVEN ARCHITECTURE</span>
      </div>
    </div>
  );
};
