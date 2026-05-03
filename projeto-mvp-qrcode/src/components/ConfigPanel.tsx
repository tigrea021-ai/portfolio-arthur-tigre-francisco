import { Link2, Palette, Settings2, Image as ImageIcon, LayoutGrid, Type, X, Sparkles, Frame } from 'lucide-react';
import { motion } from 'motion/react';
import { type QRSettings } from '../lib/types';
import { cn } from '../lib/utils';
import { useTranslation } from 'react-i18next';

interface ConfigPanelProps {
  settings: QRSettings;
  setSettings: (settings: QRSettings) => void;
}

export function ConfigPanel({ settings, setSettings }: ConfigPanelProps) {
  const { t } = useTranslation();
  
  const ColorInput = ({ label, value, onChange, className }: { label?: string, value: string, onChange: (val: string) => void, className?: string }) => (
    <div className={cn("space-y-3", className)}>
      {label && <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">{label}</label>}
      <div className="flex items-center gap-3 p-2 rounded-2xl glass-input border shadow-inner group/hover transition-all">
        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-xl border border-white/10 shadow-lg group/color">
          <div className="w-full h-full transition-transform duration-500 group-hover/color:scale-110" style={{ backgroundColor: value }} />
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="absolute inset-0 opacity-0 cursor-pointer scale-150"
          />
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 bg-transparent border-none text-[10px] font-mono uppercase tracking-widest text-white/90 focus:ring-0 p-0"
        />
      </div>
    </div>
  );

  const updateSetting = (path: string, value: any) => {
    const keys = path.split('.');
    
    const updateDeep = (obj: any, keys: string[]): any => {
      const [first, ...rest] = keys;
      if (rest.length === 0) {
        return { ...obj, [first]: value };
      }
      return {
        ...obj,
        [first]: updateDeep(obj[first] || {}, rest)
      };
    };

    const newSettings = updateDeep(settings, keys);
    setSettings(newSettings);
  };

  return (
    <div className="space-y-12">
      {/* Content Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
          <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
            <Link2 size={18} />
          </div>
          <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-white">{t('config.content')}</h2>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{t('config.sourceLabel')}</label>
            <div className="flex gap-2">
               <button 
                onClick={() => updateSetting('data', window.location.href)}
                className="text-[9px] font-bold text-purple-400 hover:text-white transition-colors uppercase tracking-widest flex items-center gap-1"
               >
                 <Sparkles size={10} />
                 {t('config.useCurrent')}
               </button>
            </div>
          </div>
          <div className="relative group/input">
            <input
              type="text"
              value={settings.data}
              onChange={(e) => {
                const val = e.target.value;
                updateSetting('data', val);
              }}
              placeholder={t('config.placeholder')}
              className="w-full p-4 pr-12 rounded-2xl glass-input text-sm placeholder:text-gray-600 shadow-lg"
            />
            {settings.data && (
              <button 
                onClick={() => updateSetting('data', '')}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 opacity-100 transition-all"
              >
                <X size={14} />
              </button>
            )}
          </div>
          <div className="flex items-center gap-2 px-1">
            <div className={`h-1.5 w-1.5 rounded-full ${settings.data.startsWith('http') ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' : 'bg-gray-600'}`} />
            <span className="text-[9px] font-medium text-gray-500 uppercase tracking-widest">
              {settings.data.startsWith('http') ? 'URL Detected' : 'Plain Text'}
            </span>
            {settings.data.length > 100 && (
              <span className="text-[9px] font-bold text-amber-500 uppercase tracking-widest ml-2 animate-pulse">
                • {t('config.longWarning')}
              </span>
            )}
            <span className="text-[9px] font-medium text-gray-700 uppercase tracking-widest ml-auto">
              {settings.data.length} chars
            </span>
          </div>
        </div>
      </section>

      {/* Style Section */}
      <section className="space-y-8">
        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
          <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
            <Palette size={18} />
          </div>
          <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-white">{t('config.aesthetics')}</h2>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-4">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">{t('config.shape')}</label>
            <div className="relative">
              <select
                value={settings.dotsOptions.type}
                onChange={(e) => updateSetting('dotsOptions.type', e.target.value)}
                className="w-full p-4 rounded-2xl glass-input appearance-none cursor-pointer hover:bg-white/[0.08]"
              >
                <option value="square">Square</option>
                <option value="dots">Dots</option>
                <option value="rounded">Rounded</option>
                <option value="classy">Classy</option>
                <option value="classy-rounded">Classy Rounded</option>
                <option value="extra-rounded">Extra Rounded</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-40">
                <LayoutGrid size={14} />
              </div>
            </div>
          </div>

          <ColorInput 
            label={t('config.color')}
            value={settings.dotsOptions.color}
            onChange={(val) => updateSetting('dotsOptions.color', val)}
            className="flex-1"
          />
        </div>

        {/* Gradient Controls */}
        <div className="pt-4 space-y-6">
          <div className="flex items-center justify-between px-1">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{t('config.useGradient')}</span>
            <button
              onClick={() => {
                const useGradient = !settings.dotsOptions.gradient;
                if (useGradient) {
                  updateSetting('dotsOptions.gradient', {
                    type: 'linear',
                    rotation: 0,
                    colorStops: [
                      { offset: 0, color: settings.dotsOptions.color },
                      { offset: 1, color: '#3b82f6' }
                    ]
                  });
                } else {
                  updateSetting('dotsOptions.gradient', null);
                }
              }}
              className={cn(
                "w-12 h-6 rounded-full transition-all duration-300 relative",
                settings.dotsOptions.gradient ? "bg-purple-600" : "bg-white/10"
              )}
            >
              <div className={cn(
                "absolute top-1 w-4 h-4 bg-white rounded-full transition-all",
                settings.dotsOptions.gradient ? "left-7 shadow-lg shadow-purple-500/50" : "left-1"
              )} />
            </button>
          </div>

          {settings.dotsOptions.gradient && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              className="space-y-6 overflow-hidden"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                   <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-1">{t('config.gradientType')}</label>
                   <select
                    value={settings.dotsOptions.gradient.type}
                    onChange={(e) => updateSetting('dotsOptions.gradient.type', e.target.value)}
                    className="w-full p-4 rounded-2xl glass-input appearance-none text-xs"
                   >
                     <option value="linear">Linear</option>
                     <option value="radial">Radial</option>
                   </select>
                </div>
                <div className="space-y-3">
                   <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-1">{t('config.rotation')}</label>
                   <input
                    type="number"
                    value={settings.dotsOptions.gradient.rotation}
                    onChange={(e) => updateSetting('dotsOptions.gradient.rotation', Number(e.target.value))}
                    className="w-full p-4 rounded-2xl glass-input text-xs"
                   />
                </div>
              </div>

              <div className="space-y-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{t('config.colorStops')}</label>
                {settings.dotsOptions.gradient.colorStops.map((stop, index) => (
                  <div key={index} className="flex gap-3 items-center">
                    <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-xl border border-white/10 p-0.5">
                       <div className="w-full h-full rounded-lg" style={{ backgroundColor: stop.color }} />
                       <input
                        type="color"
                        value={stop.color}
                        onChange={(e) => {
                          const newStops = [...settings.dotsOptions.gradient!.colorStops];
                          newStops[index] = { ...newStops[index], color: e.target.value };
                          updateSetting('dotsOptions.gradient.colorStops', newStops);
                        }}
                        className="absolute inset-0 opacity-0 cursor-pointer scale-150"
                       />
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={stop.offset}
                      onChange={(e) => {
                        const newStops = [...settings.dotsOptions.gradient!.colorStops];
                        newStops[index] = { ...newStops[index], offset: Number(e.target.value) };
                        updateSetting('dotsOptions.gradient.colorStops', newStops);
                      }}
                      className="flex-1 accent-purple-500"
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Corners Section */}
      <section className="space-y-8">
        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
          <div className="p-2 rounded-lg bg-pink-500/10 text-pink-400">
            <LayoutGrid size={18} />
          </div>
          <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-white">{t('config.anchor')}</h2>
        </div>
        
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-4">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">{t('config.outer')}</label>
            <div className="grid grid-cols-[1fr_52px] gap-2">
              <select
                value={settings.cornersSquareOptions.type}
                onChange={(e) => updateSetting('cornersSquareOptions.type', e.target.value)}
                className="p-4 rounded-2xl glass-input appearance-none cursor-pointer text-xs"
              >
                <option value="square">Standard</option>
                <option value="dot">Organic</option>
                <option value="extra-rounded">Fluid</option>
              </select>
              <div className="relative overflow-hidden rounded-2xl glass-input p-1.5 group/color">
                <div 
                  className="w-full h-full rounded-xl shadow-inner border border-white/10 transition-transform group-hover/color:scale-110"
                  style={{ backgroundColor: settings.cornersSquareOptions.color }}
                />
                <input
                  type="color"
                  value={settings.cornersSquareOptions.color}
                  onChange={(e) => updateSetting('cornersSquareOptions.color', e.target.value)}
                  className="absolute inset-0 opacity-0 cursor-pointer scale-150"
                />
              </div>
            </div>
          </div>
          <div className="space-y-4">
             <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">{t('config.inner')}</label>
             <div className="grid grid-cols-[1fr_52px] gap-2">
               <select
                 value={settings.cornersDotOptions.type}
                 onChange={(e) => updateSetting('cornersDotOptions.type', e.target.value)}
                 className="p-4 rounded-2xl glass-input appearance-none cursor-pointer text-xs"
               >
                 <option value="square">Block</option>
                 <option value="dot">Circle</option>
               </select>
               <div className="relative overflow-hidden rounded-2xl glass-input p-1.5 group/color">
                <div 
                  className="w-full h-full rounded-xl shadow-inner border border-white/10 transition-transform group-hover/color:scale-110"
                  style={{ backgroundColor: settings.cornersDotOptions.color }}
                />
                <input
                  type="color"
                  value={settings.cornersDotOptions.color}
                  onChange={(e) => updateSetting('cornersDotOptions.color', e.target.value)}
                  className="absolute inset-0 opacity-0 cursor-pointer scale-150"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

       {/* Logo Section */}
       <section className="space-y-6">
        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
          <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
            <ImageIcon size={18} />
          </div>
          <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-white">{t('config.emblem')}</h2>
        </div>
        <div className="space-y-4">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">{t('config.assetLabel')}</label>
          <div className="relative group/logo">
            <input
              type="text"
              value={settings.image || ''}
              onChange={(e) => updateSetting('image', e.target.value)}
              placeholder={t('config.assetPlaceholder')}
              className="w-full p-4 pr-12 rounded-2xl glass-input text-sm shadow-inner"
            />
            {settings.image && (
              <button 
                onClick={() => updateSetting('image', '')}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 opacity-100 transition-all"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>
      </section>

       {/* Frame Section */}
       <section className="space-y-8">
        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
          <div className="p-2 rounded-lg bg-orange-500/10 text-orange-400">
            <Frame size={18} />
          </div>
          <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-white">{t('config.frame')}</h2>
        </div>
        
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">{t('config.frameType')}</label>
              <select
                value={settings.frameOptions?.type || 'none'}
                onChange={(e) => updateSetting('frameOptions.type', e.target.value)}
                className="w-full p-4 rounded-2xl glass-input appearance-none cursor-pointer text-xs"
              >
                <option value="none">{t('config.frameNone')}</option>
                <option value="simple">{t('config.frameSimple')}</option>
                <option value="thick">{t('config.frameThick')}</option>
                <option value="double">{t('config.frameDouble')}</option>
                <option value="dashed">{t('config.frameDashed')}</option>
                <option value="glass">{t('config.frameGlass')}</option>
                <option value="bracket">{t('config.frameBracket')}</option>
                <option value="modern">{t('config.frameModern')}</option>
                <option value="label">{t('config.frameLabel')}</option>
              </select>
            </div>
            <div className="space-y-4">
              <ColorInput 
                label={t('config.frameColor')}
                value={settings.frameOptions?.color || '#7c3aed'}
                onChange={(val) => updateSetting('frameOptions.color', val)}
              />
            </div>
          </div>

          {settings.frameOptions?.type === 'label' && (
            <div className="space-y-4">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">{t('config.frameText')}</label>
              <input
                type="text"
                value={settings.frameOptions.text}
                onChange={(e) => updateSetting('frameOptions.text', e.target.value)}
                maxLength={20}
                className="w-full p-4 rounded-2xl glass-input text-sm"
              />
            </div>
          )}
        </div>
      </section>

      {/* Technical Section */}
      <section className="space-y-8">
        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
          <div className="p-2 rounded-lg bg-teal-500/10 text-teal-400">
            <Settings2 size={18} />
          </div>
          <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-white">{t('config.system')}</h2>
        </div>
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-4">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">{t('config.resolution')}</label>
            <div className="relative">
              <input
                type="number"
                value={settings.width}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  updateSetting('width', val);
                  updateSetting('height', val);
                }}
                className="w-full p-4 rounded-2xl glass-input text-sm pr-12"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-gray-600">PX</span>
            </div>
          </div>
          <div className="space-y-4">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">{t('config.error')}</label>
            <select
              value={settings.qrOptions.errorCorrectionLevel}
              onChange={(e) => updateSetting('qrOptions.errorCorrectionLevel', e.target.value)}
              className="w-full p-4 rounded-2xl glass-input appearance-none cursor-pointer"
            >
              <option value="L">Level L (7%)</option>
              <option value="M">Level M (15%)</option>
              <option value="Q">Level Q (25%)</option>
              <option value="H">Level H (30%)</option>
            </select>
          </div>
        </div>
      </section>
    </div>
  );
}
