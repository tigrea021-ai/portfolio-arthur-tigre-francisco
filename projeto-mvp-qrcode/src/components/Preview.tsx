import { useEffect, useRef, useState } from 'react';
import QRCodeStyling from 'qr-code-styling';
import { Download, Share2, Copy, Save, Check, Plus, Sparkles, Instagram, Twitter, MessageCircle } from 'lucide-react';
import { type QRSettings } from '../lib/types';
import { motion, AnimatePresence } from 'motion/react';
import { auth } from '../lib/firebase';
import { saveQRCode } from '../lib/qrService';
import { useTranslation } from 'react-i18next';

interface PreviewProps {
  settings: QRSettings;
}

export function Preview({ settings }: PreviewProps) {
  const { t } = useTranslation();
  const qrRef = useRef<HTMLDivElement>(null);
  const floatingRef = useRef<HTMLDivElement>(null);
  const qrCode = useRef<QRCodeStyling>(new QRCodeStyling(settings));
  const [copied, setCopied] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [isFloating, setIsFloating] = useState(false);
  const user = auth.currentUser;

  useEffect(() => {
    if (qrRef.current && !isFloating) {
      qrRef.current.innerHTML = '';
      qrCode.current.append(qrRef.current);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth < 1024) {
        const rect = qrRef.current?.getBoundingClientRect();
        if (rect && rect.bottom < 0) {
          setIsFloating(true);
        } else {
          setIsFloating(false);
        }
      } else {
        setIsFloating(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isFloating && floatingRef.current) {
      floatingRef.current.innerHTML = '';
      qrCode.current.append(floatingRef.current);
    } else if (!isFloating && qrRef.current) {
      qrRef.current.innerHTML = '';
      qrCode.current.append(qrRef.current);
    }
  }, [isFloating]);

  useEffect(() => {
    // Only update if we have data to prevent broken QR
    if (settings.data) {
      try {
        qrCode.current.update(settings);
      } catch (err) {
        console.error('QR Update Error:', err);
      }
    }
  }, [settings]);

  const onDownload = (extension: 'png' | 'jpeg' | 'svg') => {
    qrCode.current.download({
      name: 'qr-code',
      extension,
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'QRfly - Custom QR Code',
          text: `Check out my custom QR code!`,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSave = async () => {
    if (!user) return alert(t('history.signedOut'));
    setSaving(true);
    try {
      const name = prompt(t('preview.namePrompt'), `QR ${new Date().toLocaleDateString()}`) || 'Untitled';
      
      // Capture canvas as image data
      let imageData: string | undefined = undefined;
      const canvas = qrRef.current?.querySelector('canvas');
      if (canvas) {
        imageData = canvas.toDataURL('image/webp', 0.5); // Low quality for thumbnail
      }

      await saveQRCode(user.uid, name, settings, imageData);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (error) {
      console.error('Error saving:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleCopyConfig = () => {
    navigator.clipboard.writeText(JSON.stringify(settings, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareSocial = async (platform: 'whatsapp' | 'x' | 'instagram') => {
    const url = window.location.href;
    const text = "Check out my custom QR code! 🚀 #QRfly";
    const encodedText = encodeURIComponent(text);
    const encodedUrl = encodeURIComponent(url);

    switch (platform) {
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodedText}%20${encodedUrl}`, '_blank');
        break;
      case 'x':
        window.open(`https://x.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`, '_blank');
        break;
      case 'instagram':
        // Web to Instagram sharing is limited, we prompt to download and use the app
        alert(t('preview.instagramNote'));
        onDownload('png');
        break;
    }
  };

  const getFrameStyle = () => {
    const { type, color } = settings.frameOptions || { type: 'none', color: '#7c3aed' };
    if (type === 'none') return '';
    
    switch (type) {
      case 'simple': return `p-6 border-4 rounded-[2.5rem] bg-white transition-all`;
      case 'glass': return `p-6 border border-white/20 rounded-[2.5rem] bg-white/[0.05] backdrop-blur-md shadow-2xl`;
      case 'bracket': return `p-8 relative transition-all`;
      case 'label': return `p-6 pb-14 border-4 rounded-[2.5rem] bg-white relative transition-all`;
      case 'thick': return `p-6 border-[8px] rounded-[2.5rem] bg-white transition-all`;
      case 'dashed': return `p-6 border-4 border-dashed rounded-[2.5rem] bg-white transition-all`;
      case 'double': return `p-6 border-double border-[6px] rounded-[2.5rem] bg-white transition-all`;
      case 'modern': return `p-10 bg-white shadow-2xl relative transition-all`;
      default: return '';
    }
  };

  return (
    <>
      <AnimatePresence>
        {isFloating && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.5 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.5 }}
            className="fixed bottom-6 right-6 z-[100] p-1 bg-white rounded-2xl shadow-2xl border-4 border-purple-500 cursor-pointer lg:hidden"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="w-20 h-20 overflow-hidden rounded-xl">
               <div ref={floatingRef} />
            </div>
            <div className="absolute -top-2 -right-2 bg-purple-600 text-white rounded-full p-1 shadow-lg">
                <Sparkles size={12} strokeWidth={3} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col items-center gap-10 p-10 glass-card rounded-[2.5rem] sticky top-28 overflow-hidden group">
      {/* Immersive glow effect behind QR */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/10 blur-[80px] pointer-events-none group-hover:bg-purple-500/20 transition-all duration-700" />
      
      <div className="relative z-10">
        {/* Designer corner accents */}
        <motion.div 
          animate={{ rotate: [0, 90, 180, 270, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -inset-6 border border-white/5 rounded-full pointer-events-none"
        />
        
        {settings.frameOptions?.type === 'bracket' && (
          <>
            <div className="absolute -top-2 -left-2 w-16 h-16 border-t-[6px] border-l-[6px] rounded-tl-3xl z-20 transition-all duration-500" style={{ borderColor: settings.frameOptions.color }} />
            <div className="absolute -top-2 -right-2 w-16 h-16 border-t-[6px] border-r-[6px] rounded-tr-3xl z-20 transition-all duration-500" style={{ borderColor: settings.frameOptions.color }} />
            <div className="absolute -bottom-2 -left-2 w-16 h-16 border-b-[6px] border-l-[6px] rounded-bl-3xl z-20 transition-all duration-500" style={{ borderColor: settings.frameOptions.color }} />
            <div className="absolute -bottom-2 -right-2 w-16 h-16 border-b-[6px] border-r-[6px] rounded-br-3xl z-20 transition-all duration-500" style={{ borderColor: settings.frameOptions.color }} />
          </>
        )}

        {settings.frameOptions?.type === 'modern' && (
           <>
              <div className="absolute h-[calc(100%+16px)] w-1.5 -top-2 -left-4 rounded-full" style={{ backgroundColor: settings.frameOptions.color }} />
              <div className="absolute h-[calc(100%+16px)] w-1.5 -top-2 -right-4 rounded-full" style={{ backgroundColor: settings.frameOptions.color }} />
           </>
        )}

        <div className="absolute -top-4 -left-4 w-12 h-12 border-t border-l border-white/30 rounded-tl-2xl transition-all group-hover:scale-110" />
        <div className="absolute -top-4 -right-4 w-12 h-12 border-t border-r border-white/30 rounded-tr-2xl transition-all group-hover:scale-110" />
        <div className="absolute -bottom-4 -left-4 w-12 h-12 border-b border-l border-white/30 rounded-bl-2xl transition-all group-hover:scale-110" />
        <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b border-r border-white/30 rounded-br-2xl transition-all group-hover:scale-110" />
        
        <motion.div 
          layout
          className={`${getFrameStyle()} relative z-10 transition-all duration-500`}
          style={
            ['simple', 'label', 'thick', 'dashed', 'double'].includes(settings.frameOptions?.type || '')
              ? { borderColor: settings.frameOptions.color } 
              : {}
          }
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="bg-white p-4 rounded-2xl shadow-xl">
            <div ref={qrRef} className="overflow-hidden rounded-xl" />
          </div>
          
          {settings.frameOptions?.type === 'label' && (
            <div 
              className="absolute bottom-3 left-1/2 -translate-x-1/2 w-full text-center px-4"
            >
              <span 
                className="text-[10px] font-black uppercase tracking-[0.3em] truncate max-w-full block"
                style={{ color: settings.frameOptions.color }}
              >
                {settings.frameOptions.text}
              </span>
            </div>
          )}
        </motion.div>
      </div>

      <div className="w-full space-y-8 relative z-10">
        <div className="space-y-4">
          <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.4em] text-center">{t('preview.export')}</h3>
          <div className="grid grid-cols-3 gap-4">
            {(['png', 'jpeg', 'svg'] as const).map((ext) => (
              <button 
                key={ext}
                onClick={() => onDownload(ext)}
                className="flex flex-col items-center justify-center gap-3 p-5 rounded-2xl bg-white/[0.03] border border-white/[0.05] hover:border-purple-500/50 hover:bg-white/[0.08] transition-all group/btn"
              >
                <Download size={18} className="text-gray-500 group-hover/btn:text-purple-400 transition-colors" />
                <span className="text-[9px] font-bold text-gray-500 group-hover/btn:text-white uppercase tracking-widest">{ext}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-2">
          <button 
            onClick={handleCopyConfig}
            className="flex items-center justify-center gap-3 py-5 rounded-2xl bg-white/[0.03] border border-white/[0.1] text-white font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-white/[0.08] transition-all active:scale-[0.98] duration-200"
          >
            {copied ? <Check size={16} strokeWidth={2.5} className="text-green-400" /> : <Copy size={16} strokeWidth={2.5} />}
            {copied ? t('preview.copied') : t('preview.copy')}
          </button>
          <button 
            onClick={handleSave}
            disabled={saving}
            className="flex items-center justify-center gap-3 py-5 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-[10px] uppercase tracking-[0.2em] hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] transition-all active:scale-[0.98] duration-200"
          >
            {saving ? (
              <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : saved ? (
              <Check size={16} strokeWidth={2.5} />
            ) : (
              <Save size={16} strokeWidth={2.5} />
            )}
            {saved ? t('preview.copied').replace('!', ' ✅') : t('preview.save')}
          </button>
        </div>
        
        <div className="flex items-center gap-4 pt-2">
          <div className="flex-1 h-px bg-white/5" />
          <div className="flex gap-4">
            <button 
              onClick={() => shareSocial('whatsapp')}
              className="p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-green-500/50 hover:bg-green-500/10 text-gray-500 hover:text-green-400 transition-all"
            >
              <MessageCircle size={18} />
            </button>
            <button 
              onClick={() => shareSocial('x')}
              className="p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/50 hover:bg-white/10 text-gray-500 hover:text-white transition-all"
            >
              <Twitter size={18} />
            </button>
            <button 
              onClick={() => shareSocial('instagram')}
              className="p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-pink-500/50 hover:bg-pink-500/10 text-gray-500 hover:text-pink-400 transition-all"
            >
              <Instagram size={18} />
            </button>
          </div>
          <div className="flex-1 h-px bg-white/5" />
        </div>

        <button 
          onClick={handleShare}
          className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.08] text-gray-400 hover:text-white transition-all active:scale-95 text-[10px] font-bold uppercase tracking-[0.2em]"
        >
          <Share2 size={16} />
          {t('preview.share')}
        </button>
      </div>
    </div>
    </>
  );
}
