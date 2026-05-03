import { motion } from 'motion/react';
import { LayoutGrid, Sparkles } from 'lucide-react';
import { QR_TEMPLATES } from '../lib/templates';
import { type QRSettings } from '../lib/types';
import { useTranslation } from 'react-i18next';

interface TemplatesSectionProps {
  onSelect: (settings: Partial<QRSettings>) => void;
}

export function TemplatesSection({ onSelect }: TemplatesSectionProps) {
  const { t } = useTranslation();

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3 border-b border-white/10 pb-4">
        <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
          <Sparkles size={18} />
        </div>
        <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-white underline decoration-amber-500/30 underline-offset-8 decoration-2">{t('templates.title')}</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {QR_TEMPLATES.map((template) => (
          <motion.button
            key={template.id}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(template.settings)}
            className="flex flex-col gap-3 p-4 rounded-3xl bg-white/[0.03] border border-white/[0.05] hover:border-amber-500/30 transition-all text-left"
          >
            <div 
              className="h-12 w-full rounded-2xl shadow-inner mb-1"
              style={{ background: `linear-gradient(135deg, ${template.previewColor}44, ${template.previewColor}11)` }}
            >
              <div className="h-full w-full flex items-center justify-center">
                <LayoutGrid size={20} style={{ color: template.previewColor }} />
              </div>
            </div>
            <div>
              <h3 className="text-[10px] font-black text-white uppercase tracking-wider">{template.name}</h3>
              <p className="text-[8px] text-gray-500 leading-tight mt-1 truncate">{template.description}</p>
            </div>
          </motion.button>
        ))}
      </div>
    </section>
  );
}
