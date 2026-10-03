import React, { useEffect } from 'react';
import { X, ZoomIn, ZoomOut, Download, ExternalLink } from 'lucide-react';

export default function LightboxModal({ post, onClose }) {
  const [isZoomed, setIsZoomed] = React.useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!post || !post.image) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-between p-4 sm:p-6"
      onClick={onClose}
    >
      {/* Top Header Bar */}
      <div 
        className="w-full max-w-7xl flex items-center justify-between z-10 py-2"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-left">
          <span className="text-xs uppercase tracking-wider font-semibold text-cyan-400">
            {post.category} Restroom Graffiti
          </span>
          <h2 className="text-base sm:text-lg font-bold text-white truncate max-w-md sm:max-w-xl">
            {post.title}
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsZoomed(!isZoomed)}
            className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
            title={isZoomed ? 'Zoom Out' : 'Zoom In'}
          >
            {isZoomed ? <ZoomOut className="w-5 h-5" /> : <ZoomIn className="w-5 h-5" />}
          </button>
          <a
            href={post.image}
            download
            target="_blank"
            rel="noreferrer"
            className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
            title="Open original high-res image"
          >
            <ExternalLink className="w-5 h-5" />
          </a>
          <button
            onClick={onClose}
            className="p-2.5 rounded-xl bg-white/10 hover:bg-rose-500/80 text-white transition-colors"
            title="Close Lightbox (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Image Stage */}
      <div 
        className="relative flex-grow flex items-center justify-center w-full max-h-[80vh] overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={post.image}
          alt={post.title}
          className={`transition-all duration-300 object-contain rounded-lg shadow-2xl cursor-pointer select-none ${
            isZoomed ? 'scale-150 cursor-zoom-out' : 'max-h-[78vh] max-w-full cursor-zoom-in'
          }`}
          onClick={() => setIsZoomed(!isZoomed)}
        />
      </div>

      {/* Footer Info */}
      <div 
        className="w-full max-w-7xl flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 pt-3 z-10 gap-2"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          {post.credit && (
            <span>
              Credit: <strong className="text-slate-200">{post.credit}</strong>
            </span>
          )}
        </div>
        <p className="text-[11px] text-slate-500">
          Click image or press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">Esc</kbd> to exit lightbox
        </p>
      </div>
    </div>
  );
}
