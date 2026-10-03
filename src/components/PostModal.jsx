import React, { useEffect } from 'react';
import { X, ArrowLeft, ArrowRight, Share2, Check } from 'lucide-react';
import { TwitterIcon, FacebookIcon } from './SocialIcons';

export default function PostModal({ post, onClose, onSelectPost, allPosts }) {
  const [copied, setCopied] = React.useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!post) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`;
  const fbUrl = `https://facebook.com/sharer.php?u=${encodeURIComponent(window.location.href)}`;

  const recentPosts = allPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  // If the body starts with a blockquote repeating the description, deduplicate it
  let contentHtml = post.html || '';
  if (post.description) {
    const cleanDesc = post.description.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`^\\s*<blockquote[^>]*>\\s*<p>\\s*${cleanDesc}\\s*<\\/p>\\s*<\\/blockquote>`, 'i');
    contentHtml = contentHtml.replace(regex, '').trim();
  }

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 flex items-start justify-center p-0 sm:p-4 md:p-8"
      onClick={onClose}
    >
      <div 
        className="bg-white max-w-4xl w-full min-h-screen sm:min-h-0 sm:rounded-sm shadow-2xl relative my-0 sm:my-6 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top close button bar */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-sm border-b border-gray-100 px-6 py-3 flex items-center justify-between">
          <button
            onClick={onClose}
            className="inline-flex items-center gap-1.5 text-xs uppercase font-semibold text-gray-600 hover:text-black transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to all posts</span>
          </button>

          <button
            onClick={onClose}
            className="p-1.5 text-gray-500 hover:text-black rounded transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Hero Cover Image (matching S3 cover-image) */}
        {post.image && (
          <div className="w-full aspect-[16/9] sm:aspect-[21/9] max-h-[440px] bg-gray-900 overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Main Article Content */}
        <article className="max-w-3xl mx-auto px-6 sm:px-12 py-10">
          
          {/* Header */}
          <div className="border-b border-gray-100 pb-8 mb-8 text-center sm:text-left">
            <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 font-['Montserrat'] tracking-tight leading-tight mb-3">
              {post.title}
            </h1>
            <div className="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-4">
              <time>{post.displayDate}</time>
            </div>
            {post.description && (
              <p className="text-sm text-gray-600 font-['Lato'] leading-relaxed pt-1">
                {post.description}
              </p>
            )}
          </div>

          {/* Rendered HTML */}
          <div 
            className="article-prose"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />

          {/* Tags & Share Footer */}
          <div className="border-t border-gray-100 mt-12 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-gray-400 font-semibold uppercase tracking-wider">Tags:</span>
                {post.tags.map((t, idx) => (
                  <span key={idx} className="font-semibold text-gray-600 uppercase">
                    | {t}
                  </span>
                ))}
              </div>
            )}

            <div className="flex items-center gap-3">
              <span className="text-gray-400 font-semibold uppercase tracking-wider">Share:</span>
              <a
                href={tweetUrl}
                target="_blank"
                rel="noreferrer"
                className="text-gray-600 hover:text-black p-1 transition-colors"
                title="Share on Twitter"
              >
                <TwitterIcon className="w-4 h-4" />
              </a>
              <a
                href={fbUrl}
                target="_blank"
                rel="noreferrer"
                className="text-gray-600 hover:text-black p-1 transition-colors"
                title="Share on Facebook"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <button
                onClick={handleCopyLink}
                className="text-gray-600 hover:text-black p-1 transition-colors"
                title="Copy Link"
              >
                {copied ? <Check className="w-4 h-4 text-green-600" /> : <Share2 className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Recent Posts Section (matching S3 recent-box) */}
          {recentPosts.length > 0 && (
            <div className="mt-14 pt-8 border-t border-gray-100">
              <h3 className="text-sm uppercase tracking-widest font-bold text-gray-400 mb-6 font-['Montserrat']">
                Recent Posts
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {recentPosts.map((rp) => (
                  <div
                    key={rp.slug}
                    onClick={() => { onSelectPost(rp); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="p-4 border border-gray-100 hover:border-gray-300 rounded-sm cursor-pointer transition-colors flex items-center gap-4 bg-[#fafafa]"
                  >
                    {rp.image && (
                      <img src={rp.image} alt={rp.title} className="w-16 h-14 object-cover rounded-sm shrink-0" />
                    )}
                    <div>
                      <div className="text-xs text-gray-400 mb-1">{rp.displayDate}</div>
                      <div className="text-sm font-bold text-gray-800 line-clamp-1 font-['Montserrat']">
                        {rp.title}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </article>

      </div>
    </div>
  );
}
