import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, Trash2, ExternalLink, X, Plus } from 'lucide-react';
import { subscribeToHistory, deleteQRCode, type SavedQRCode } from '../lib/qrService';
import { auth } from '../lib/firebase';
import { type QRSettings } from '../lib/types';
import { useTranslation } from 'react-i18next';

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (settings: QRSettings) => void;
}

export function HistoryDrawer({ isOpen, onClose, onSelect }: HistoryDrawerProps) {
  const { t } = useTranslation();
  const [history, setHistory] = useState<SavedQRCode[]>([]);
  const user = auth.currentUser;

  useEffect(() => {
    if (!user) return;
    return subscribeToHistory(user.uid, (data) => setHistory(data));
  }, [user]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-sm glass-card border-l border-white/10 z-[101] p-8"
          >
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
                  <Clock size={18} />
                </div>
                <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-white">{t('history.title')}</h2>
              </div>
              <button 
                onClick={onClose}
                className="p-2 rounded-xl hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4 overflow-y-auto h-[calc(100vh-180px)] pr-2">
              {!user ? (
                <div className="text-center py-20">
                  <p className="text-sm text-gray-500 mb-2">{t('history.signedOut')}</p>
                </div>
              ) : history.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-sm text-gray-500">{t('history.empty')}</p>
                </div>
              ) : (
                history.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="group flex items-center justify-between p-4 rounded-2xl bg-white/[0.03] border border-white/[0.05] hover:border-purple-500/30 transition-all"
                  >
                    <div 
                      className="flex-1 cursor-pointer" 
                      onClick={() => {
                        onSelect(item.settings);
                        onClose();
                      }}
                    >
                      <h3 className="text-xs font-bold text-white truncate mb-1">{item.name || 'Untitled QR'}</h3>
                      <p className="text-[9px] text-gray-500 uppercase tracking-widest truncate max-w-[150px]">
                        {item.settings.data}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => deleteQRCode(item.id)}
                        className="p-2 rounded-lg hover:bg-red-500/10 text-gray-600 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 size={14} />
                      </button>
                      <button 
                        onClick={() => {
                          onSelect(item.settings);
                          onClose();
                        }}
                        className="p-2 rounded-lg bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
