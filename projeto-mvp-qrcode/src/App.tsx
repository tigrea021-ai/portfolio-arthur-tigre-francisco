/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Header } from './components/Header';
import { Preview } from './components/Preview';
import { ConfigPanel } from './components/ConfigPanel';
import { HistoryDrawer } from './components/HistoryDrawer';
import { TemplatesSection } from './components/TemplatesSection';
import { ProjectGallery } from './components/ProjectGallery';
import { DEFAULT_SETTINGS, type QRSettings } from './lib/types';
import { motion, AnimatePresence } from 'motion/react';
import { QrCode } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function App() {
  const { t } = useTranslation();
  const [settings, setSettings] = useState<QRSettings>(DEFAULT_SETTINGS);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [accessibilityMode, setAccessibilityMode] = useState<string>('standard');

  const updateSettings = (newSettings: Partial<QRSettings>) => {
    const deepMerge = (target: any, source: any): any => {
      const output = { ...target };
      Object.keys(source).forEach(key => {
        if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
          output[key] = deepMerge(target[key] || {}, source[key]);
        } else {
          output[key] = source[key];
        }
      });
      return output;
    };

    setSettings(prev => deepMerge(prev, newSettings) as QRSettings);
  };

  const getAccessibilityClass = () => {
    switch (accessibilityMode) {
      case 'high-contrast': return 'acc-high-contrast';
      case 'protanopia': return 'acc-protanopia';
      case 'deuteranopia': return 'acc-deuteranopia';
      case 'tritanopia': return 'acc-tritanopia';
      case 'achromatopsia': return 'acc-achromatopsia';
      default: return '';
    }
  };

  return (
    <div className={`min-h-screen text-gray-300 selection:bg-purple-500/30 selection:text-white transition-all duration-500 ${getAccessibilityClass()}`}>
      {/* Immersive Background */}
      <div className="atmosphere" />
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="blob w-[500px] h-[500px] bg-purple-600 -top-48 -left-24 animate-pulse" />
        <div className="blob w-[600px] h-[600px] bg-blue-600 -bottom-48 -right-24 animate-pulse [animation-delay:2s]" />
      </div>

      <Header 
        onOpenHistory={() => setIsHistoryOpen(true)} 
        accessibilityMode={accessibilityMode}
        setAccessibilityMode={setAccessibilityMode}
      />
      
      <main className="mx-auto max-w-7xl px-4 py-8 md:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Config Area */}
          <div className="order-2 lg:order-1 flex-1 space-y-12">
            {/* Templates */}
            <motion.div
              id="templates-section"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="glass-card p-8 rounded-[2.5rem]"
            >
              <TemplatesSection onSelect={updateSettings} />
            </motion.div>

            {/* Config Panel */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="glass-card p-8 rounded-[2.5rem]"
            >
              <ConfigPanel settings={settings} setSettings={setSettings} />
            </motion.div>
          </div>

          {/* Preview */}
          <div className="order-1 lg:order-2 w-full lg:w-[400px] lg:sticky lg:top-28">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <Preview settings={settings} />
            </motion.div>
          </div>
        </div>

        {/* New Projects Gallery Section */}
        <div className="mt-20">
          <ProjectGallery onSelect={setSettings} />
        </div>
      </main>

      <footer className="mt-20 border-t border-white/5 bg-black/20 backdrop-blur-sm py-16 relative z-10">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-6 group cursor-default">
            <motion.div 
              whileHover={{ rotate: 180, scale: 1.1 }}
              className="h-8 w-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center text-white shadow-lg shadow-purple-500/20"
            >
              <QrCode size={18} strokeWidth={2.5} />
            </motion.div>
            <span className="text-xl font-bold text-white tracking-tight uppercase">QRfly</span>
          </div>
          <p className="text-sm text-gray-400 max-w-md mx-auto leading-relaxed">
            {t('footer.tagline')}
          </p>
          <div className="mt-10 flex justify-center gap-10">
            {[
              { id: 'terms', label: t('footer.terms') },
              { id: 'privacy', label: t('footer.privacy') },
              { id: 'status', label: t('footer.status') }
            ].map((item) => (
              <span key={item.id} className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.3em] hover:text-white transition-all cursor-pointer relative after:absolute after:-bottom-2 after:left-0 after:w-0 after:h-[1px] after:bg-purple-500 after:transition-all hover:after:w-full">
                {item.label}
              </span>
            ))}
          </div>
        </div>
      </footer>

      <HistoryDrawer 
        isOpen={isHistoryOpen} 
        onClose={() => setIsHistoryOpen(false)} 
        onSelect={setSettings} 
      />
    </div>
  );
}

