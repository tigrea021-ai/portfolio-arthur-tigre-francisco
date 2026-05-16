import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Copy, Check, Info } from 'lucide-react';

type Shape = 'flat' | 'concave' | 'convex' | 'pressed';

export default function App() {
  const [bgColor, setBgColor] = useState('#e0e5ec');
  const [size, setSize] = useState(300);
  const [radius, setRadius] = useState(50);
  const [distance, setDistance] = useState(20);
  const [intensity, setIntensity] = useState(15);
  const [blur, setBlur] = useState(60);
  const [shape, setShape] = useState<Shape>('flat');
  const [copied, setCopied] = useState(false);

  // Helper functions
  const hexToRgb = (hex: string) => {
    const cleanHex = hex.replace('#', '');
    return {
      r: parseInt(cleanHex.slice(0, 2), 16),
      g: parseInt(cleanHex.slice(2, 4), 16),
      b: parseInt(cleanHex.slice(4, 6), 16)
    };
  };

  const toHex = (r: number, g: number, b: number) => {
    const c = (v: number) => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, '0');
    return '#' + c(r) + c(g) + c(b);
  };

  const getShadowColor = (hex: string, intensityVal: number, lighten: boolean) => {
    const { r, g, b } = hexToRgb(hex);
    const target = lighten ? 255 : 0;
    const factor = intensityVal / 100;
    return toHex(
      r + (target - r) * factor,
      g + (target - g) * factor,
      b + (target - b) * factor
    );
  };

  const colors = useMemo(() => {
    const dark = getShadowColor(bgColor, intensity, false);
    const light = getShadowColor(bgColor, intensity, true);
    return { dark, light };
  }, [bgColor, intensity]);

  // Update CSS variables for the global scope if needed for custom input styles
  useEffect(() => {
    document.documentElement.style.setProperty('--shadow-dark', colors.dark);
    document.documentElement.style.setProperty('--shadow-light', colors.light);
  }, [colors]);

  const styleData = useMemo(() => {
    let boxShadow = '';
    let background = bgColor;

    switch (shape) {
      case 'flat':
        boxShadow = `${distance}px ${distance}px ${blur}px ${colors.dark}, -${distance}px -${distance}px ${blur}px ${colors.light}`;
        background = bgColor;
        break;
      case 'concave': {
        const darker = getShadowColor(bgColor, 8, false);
        background = `linear-gradient(145deg, ${darker}, ${bgColor})`;
        boxShadow = `${distance}px ${distance}px ${blur}px ${colors.dark}, -${distance}px -${distance}px ${blur}px ${colors.light}`;
        break;
      }
      case 'convex': {
        const lighter = getShadowColor(bgColor, 8, true);
        background = `linear-gradient(145deg, ${lighter}, ${bgColor})`;
        boxShadow = `${distance}px ${distance}px ${blur}px ${colors.dark}, -${distance}px -${distance}px ${blur}px ${colors.light}`;
        break;
      }
      case 'pressed':
        boxShadow = `inset ${distance}px ${distance}px ${blur}px ${colors.dark}, inset -${distance}px -${distance}px ${blur}px ${colors.light}`;
        background = bgColor;
        break;
    }

    return {
      borderRadius: `${radius}px`,
      background,
      boxShadow,
    };
  }, [shape, bgColor, distance, blur, colors, radius]);

  const cssString = useMemo(() => {
    return `border-radius: ${radius}px;\nbackground: ${styleData.background};\nbox-shadow: ${styleData.boxShadow};`;
  }, [radius, styleData]);

  const handleCopy = () => {
    navigator.clipboard.writeText(cssString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isLight = useMemo(() => {
    const { r, g, b } = hexToRgb(bgColor);
    const lum = (r * 0.299 + g * 0.587 + b * 0.114) / 255;
    return lum > 0.5;
  }, [bgColor]);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-5 py-4 md:px-8 md:py-5 flex items-center justify-between bg-[var(--panel-bg)] shadow-[0_4px_20px_rgba(184,190,199,0.4)] sticky top-0 z-10">
        <div className="text-lg font-semibold tracking-tight">
          neumorphism<span className="text-[var(--accent)]">.</span>io
          <span className="text-xs font-normal text-[var(--text-muted)] ml-1.5">— React</span>
        </div>
        <span className="text-[11px] font-medium bg-[var(--accent-soft)] text-[var(--accent)] px-2.5 py-1 rounded-full tracking-wide">
          CSS GENERATOR
        </span>
      </header>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-[320px_1fr]">
        {/* SIDEBAR */}
        <aside className="bg-[var(--panel-bg)] p-6 md:p-8 flex flex-col gap-8 border-r border-white/50 overflow-y-auto max-h-[calc(100vh-68px)]">
          <section>
            <label className="text-[10px] font-bold tracking-widest uppercase text-[var(--text-muted)] block mb-3">
              Background Color
            </label>
            <div className="flex items-center gap-3 bg-[var(--bg)] rounded-xl p-2 px-3 shadow-[inset_3px_3px_7px_var(--shadow-dark),_inset_-3px_-3px_7px_var(--shadow-light)]">
              <div className="w-8 h-8 rounded-lg overflow-hidden shrink-0 shadow-[2px_2px_5px_var(--shadow-dark),_-2px_-2px_5px_var(--shadow-light)]">
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-full h-full border-none p-0 cursor-pointer bg-transparent scale-125"
                />
              </div>
              <input
                type="text"
                value={bgColor.toUpperCase()}
                onChange={(e) => {
                  const val = e.target.value;
                  if (/^#[0-9a-fA-F]{0,6}$/.test(val)) setBgColor(val);
                }}
                className="flex-1 font-mono text-sm uppercase bg-transparent border-none outline-none tracking-widest"
              />
            </div>
          </section>

          <section className="flex flex-col gap-5">
            <label className="text-[10px] font-bold tracking-widest uppercase text-[var(--text-muted)]">
              Settings
            </label>
            
            {[
              { label: 'Size', val: `${size}px`, min: 20, max: 400, state: size, set: setSize },
              { label: 'Radius', val: `${radius}px`, min: 0, max: 200, state: radius, set: setRadius },
              { label: 'Distance', val: `${distance}px`, min: 0, max: 50, state: distance, set: setDistance },
              { label: 'Intensity', val: (intensity / 100).toFixed(2), min: 1, max: 40, state: intensity, set: setIntensity },
              { label: 'Blur', val: `${blur}px`, min: 0, max: 100, state: blur, set: setBlur },
            ].map((s) => (
              <div key={s.label} className="flex flex-col gap-2">
                <div className="flex justify-between items-center text-xs text-[var(--text-muted)]">
                  <span>{s.label}</span>
                  <span className="font-mono text-[11px] font-medium text-[var(--accent)] bg-[var(--accent-soft)] px-2 py-0.5 rounded-md">
                    {s.val}
                  </span>
                </div>
                <input
                  type="range"
                  min={s.min}
                  max={s.max}
                  value={s.state}
                  onChange={(e) => s.set(parseInt(e.target.value))}
                />
              </div>
            ))}
          </section>

          <section>
            <label className="text-[10px] font-bold tracking-widest uppercase text-[var(--text-muted)] block mb-3">
              Shape
            </label>
            <div className="grid grid-cols-2 gap-2">
              {(['flat', 'concave', 'convex', 'pressed'] as Shape[]).map((sh) => (
                <button
                  key={sh}
                  onClick={() => setShape(sh)}
                  className={`py-2.5 px-2 text-[11px] font-semibold rounded-xl capitalize transition-all duration-200 border-none cursor-pointer ${
                    shape === sh
                      ? 'bg-[var(--bg)] text-[var(--accent)] shadow-[inset_3px_3px_7px_var(--shadow-dark),_inset_-3px_-3px_7px_var(--shadow-light)]'
                      : 'bg-[var(--bg)] text-[var(--text-muted)] shadow-[4px_4px_8px_var(--shadow-dark),_-4px_-4px_8px_var(--shadow-light)] hover:text-[var(--text)]'
                  }`}
                >
                  {sh}
                </button>
              ))}
            </div>
          </section>
        </aside>

        {/* PREVIEW AREA */}
        <main className="flex flex-col">
          <div 
            className="flex-1 flex items-center justify-center p-10 min-h-[400px] transition-colors duration-300"
            style={{ backgroundColor: bgColor }}
          >
            <motion.div
              layout
              className="flex items-center justify-center relative group overflow-hidden"
              style={{
                width: `${Math.min(size, 400)}px`,
                height: `${Math.min(size, 400)}px`,
                ...styleData
              }}
            >
              <div 
                className="text-[11px] font-medium tracking-[0.2em] uppercase transition-colors duration-300 pointer-events-none"
                style={{ 
                  color: isLight ? '#000' : '#fff',
                  opacity: isLight ? 0.2 : 0.4
                }}
              >
                neumorphism
              </div>
              
              {/* Optional hint icon */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-10 transition-opacity">
                <Info size={16} />
              </div>
            </motion.div>
          </div>

          <div className="bg-[var(--panel-bg)] border-t border-white/50 p-6 md:px-10 shadow-[0_-4px_16px_rgba(184,190,199,0.2)]">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-bold tracking-widest uppercase text-[var(--text-muted)]">
                Generated CSS
              </span>
              <button
                onClick={handleCopy}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                  copied 
                    ? 'text-teal-600 bg-[var(--bg)] shadow-[inset_2px_2px_5px_var(--shadow-dark),_inset_-2px_-2px_5px_var(--shadow-light)]'
                    : 'text-[var(--accent)] bg-[var(--bg)] shadow-[3px_3px_7px_var(--shadow-dark),_-3px_-3px_7px_var(--shadow-light)] active:scale-95'
                }`}
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? 'Copied!' : 'Copy to Clipboard'}
              </button>
            </div>
            
            <div className="relative font-mono text-[13px] bg-[var(--bg)] p-5 rounded-xl text-[var(--text)] shadow-[inset_3px_3px_8px_var(--shadow-dark),_inset_-3px_-3px_8px_var(--shadow-light)] whitespace-pre-wrap leading-relaxed">
              {cssString.split('\n').map((line, i) => {
                const [prop, val] = line.split(': ');
                return (
                  <div key={i}>
                    <span className="text-[var(--text-muted)]">{prop}:</span>
                    <span className="text-[var(--accent)]"> {val}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
