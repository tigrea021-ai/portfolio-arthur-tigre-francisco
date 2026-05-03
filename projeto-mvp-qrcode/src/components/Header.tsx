import { QrCode, LogOut, User as UserIcon, Languages, Eye, Accessibility } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { auth, signInWithGoogle, logout } from '../lib/firebase';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { useTranslation } from 'react-i18next';

export function Header({ 
  onOpenHistory, 
  accessibilityMode, 
  setAccessibilityMode 
}: { 
  onOpenHistory: () => void;
  accessibilityMode: string;
  setAccessibilityMode: (mode: string) => void;
}) {
  const { t, i18n } = useTranslation();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAccMenu, setShowAccMenu] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'pt' : 'en';
    i18n.changeLanguage(newLang);
  };

  const accModes = [
    { id: 'standard', name: t('accessibility.standard') },
    { id: 'high-contrast', name: t('accessibility.highContrast') },
    { id: 'protanopia', name: t('accessibility.protanopia') },
    { id: 'deuteranopia', name: t('accessibility.deuteranopia') },
    { id: 'tritanopia', name: t('accessibility.tritanopia') },
    { id: 'achromatopsia', name: t('accessibility.monochrome') },
  ];

  const handleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  return (
    <header className="border-b border-white/5 bg-black/10 backdrop-blur-xl sticky top-0 z-[60] px-6 py-5">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="flex items-center gap-4 group cursor-pointer" onClick={() => window.location.reload()}>
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 360 }}
            transition={{ duration: 0.5 }}
            className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-blue-600 text-white shadow-lg shadow-purple-500/20"
          >
            <QrCode size={22} strokeWidth={2.5} />
          </motion.div>
          <div className="flex flex-col">
            <h1 className="text-2xl font-black tracking-tighter text-white uppercase italic">QRfly</h1>
            <div className="h-[2px] w-full bg-gradient-to-r from-purple-500 to-transparent" />
          </div>
        </div>
        
        <nav className="hidden md:flex items-center gap-10">
          <button 
            onClick={() => document.getElementById('templates-section')?.scrollIntoView({ behavior: 'smooth' })} 
            className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] hover:text-white transition-all relative group"
          >
            {t('header.templates')}
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all group-hover:w-full" />
          </button>
          <button 
            onClick={onOpenHistory} 
            className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] hover:text-white transition-all relative group"
          >
            {t('header.history')}
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all group-hover:w-full" />
          </button>
          <a 
            href="#" 
            className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] hover:text-white transition-all relative group"
          >
            {t('header.api')}
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all group-hover:w-full" />
          </a>
        </nav>

        <div className="flex items-center gap-4">
          {/* Accessibility Toggle */}
          <div className="relative">
            <button 
              onClick={() => setShowAccMenu(!showAccMenu)}
              className="p-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all active:scale-95 flex items-center gap-2 group/acc"
              title="Acessibilidade"
            >
              <Eye size={18} className="group-hover/acc:text-blue-400 transition-colors" />
            </button>
            <AnimatePresence>
              {showAccMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-4 w-48 glass-card p-2 rounded-2xl z-[70] shadow-2xl overflow-hidden"
                >
                  <div className="space-y-1">
                    {accModes.map((mode) => (
                      <button
                        key={mode.id}
                        onClick={() => {
                          setAccessibilityMode(mode.id);
                          setShowAccMenu(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${
                          accessibilityMode === mode.id 
                            ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/30' 
                            : 'text-gray-400 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        {mode.name}
                        {accessibilityMode === mode.id && <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_white]" />}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Language Toggle */}
          <button 
            onClick={toggleLanguage}
            className="p-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all active:scale-95 flex items-center gap-2 group/lang"
          >
            <Languages size={18} className="group-hover/lang:text-purple-400 transition-colors" />
            <span className="text-[10px] font-black uppercase tracking-widest">{i18n.language === 'en' ? 'EN' : 'PT'}</span>
          </button>

          <AnimatePresence mode="wait">
            {loading ? (
              <div key="loading" className="h-10 w-24 bg-white/5 animate-pulse rounded-xl" />
            ) : user ? (
              <motion.div 
                key="user"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="flex items-center gap-3 pl-2 pr-1 py-1 rounded-2xl bg-white/[0.03] border border-white/10"
              >
                <div className="flex flex-col items-end">
                  <span className="text-[10px] font-bold text-white truncate max-w-[100px] leading-none">
                    {user.displayName?.split(' ')[0]}
                  </span>
                  <button 
                    onClick={logout}
                    className="text-[8px] font-black text-purple-400 uppercase tracking-widest hover:text-purple-300 transition-colors"
                  >
                    {t('header.logout')}
                  </button>
                </div>
                {user.photoURL ? (
                  <img src={user.photoURL} alt={user.displayName || ''} className="h-8 w-8 rounded-xl object-cover ring-1 ring-white/10 shadow-lg" referrerPolicy="no-referrer" />
                ) : (
                  <div className="h-8 w-8 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400">
                    <UserIcon size={16} />
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.button 
                key="login"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleLogin}
                className="group relative flex items-center gap-3 px-6 py-3 rounded-2xl bg-white text-black font-black text-[10px] uppercase tracking-[0.2em] hover:bg-gray-100 transition-all active:scale-95 shadow-xl shadow-white/5"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fillOpacity="1" />
                  <path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.52z" />
                </svg>
                {t('header.login')}
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
