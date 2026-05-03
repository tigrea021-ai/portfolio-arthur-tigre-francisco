import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { FolderHeart, Trash2, ExternalLink, Archive, Loader2 } from 'lucide-react';
import { subscribeToHistory, deleteQRCode, type SavedQRCode } from '../lib/qrService';
import { auth } from '../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { type QRSettings } from '../lib/types';
import { useTranslation } from 'react-i18next';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import QRCodeStyling from 'qr-code-styling';

interface ProjectGalleryProps {
  onSelect: (settings: QRSettings) => void;
}

export function ProjectGallery({ onSelect }: ProjectGalleryProps) {
  const { t } = useTranslation();
  const [projects, setProjects] = useState<SavedQRCode[]>([]);
  const [user, setUser] = useState(auth.currentUser);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  useEffect(() => {
    if (!user) return;
    return subscribeToHistory(user.uid, (data) => setProjects(data));
  }, [user]);

  const exportAll = async () => {
    if (projects.length === 0) return;
    setExporting(true);
    try {
      const zip = new JSZip();
      const folder = zip.folder("qrcodes");
      
      for (const project of projects) {
        // We set a standard high-res width for export
        const exportSettings = { ...project.settings, width: 1000, height: 1000 };
        const qr = new QRCodeStyling(exportSettings);
        const blob = await qr.getRawData('png');
        if (blob) {
          folder?.file(`${project.name || project.id}.png`, blob);
        }
      }

      const content = await zip.generateAsync({ type: "blob" });
      saveAs(content, `qrfly-projects-${new Date().getTime()}.zip`);
    } catch (error) {
      console.error('Export error:', error);
    } finally {
      setExporting(false);
    }
  };

  if (!user) return null;

  return (
    <section className="space-y-6 pt-12">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-pink-500/10 text-pink-400">
            <FolderHeart size={18} />
          </div>
          <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-white">
            {t('history.projectsTitle')}
          </h2>
        </div>
        
        {projects.length > 0 && (
          <button
            onClick={exportAll}
            disabled={exporting}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl glass-card border-white/10 hover:border-purple-500/30 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-white transition-all disabled:opacity-50"
          >
            {exporting ? <Loader2 size={14} className="animate-spin" /> : <Archive size={14} />}
            {exporting ? t('history.exporting') : t('history.exportAll')}
          </button>
        )}
      </div>

      {projects.length === 0 ? (
        <div className="glass-card p-12 rounded-[2rem] text-center border-dashed border-white/10">
          <p className="text-sm text-gray-500">{t('history.empty')}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              className="glass-card p-6 rounded-3xl border border-white/5 hover:border-purple-500/30 transition-all group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-white group-hover:text-purple-400 transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest leading-none">
                    {project.createdAt?.toDate?.()?.toLocaleDateString() || new Date().toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={() => deleteQRCode(project.id)}
                  className="p-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100"
                >
                  <Trash2 size={14} />
                </button>
              </div>

              <div className="aspect-square bg-white rounded-2xl mb-4 flex items-center justify-center p-4 relative overflow-hidden group/img">
                  {project.image ? (
                    <img 
                      src={project.image} 
                      alt={project.name} 
                      className="w-full h-full object-contain transition-transform duration-500 group-hover/img:scale-110" 
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-full h-full border-2 border-dashed border-gray-100 rounded-xl flex items-center justify-center text-gray-300">
                       <FolderHeart size={40} strokeWidth={1} />
                    </div>
                  )}
                  {/* Subtle overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/5 transition-colors pointer-events-none" />
              </div>

              <button
                onClick={() => {
                  onSelect(project.settings);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all"
              >
                <ExternalLink size={12} />
                {t('history.load')}
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
