import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';

export default function SearchModal({ isOpen, onClose, posts, onSelectPost }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const results = query.trim()
    ? posts.filter((p) => {
        const q = query.toLowerCase();
        return (
          p.title.toLowerCase().includes(q) ||
          (p.description || '').toLowerCase().includes(q) ||
          (p.rawBody || '').toLowerCase().includes(q) ||
          (p.tags || []).some((t) => t.toLowerCase().includes(q))
        );
      })
    : [];

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-start justify-center pt-20 px-4"
      onClick={onClose}
    >
      <div 
        className="bg-white w-full max-w-2xl rounded-sm shadow-2xl overflow-hidden border border-gray-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-gray-200 flex items-center gap-3">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type to search posts..."
            className="w-full text-base sm:text-lg text-gray-900 placeholder-gray-400 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-black transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-4 divide-y divide-gray-100">
          {query.trim() === '' ? (
            <div className="text-center py-8 text-sm text-gray-400">
              Start typing to search titles, tags, or graffiti text...
            </div>
          ) : results.length === 0 ? (
            <div className="text-center py-8 text-sm text-gray-500">
              No results found for "{query}"
            </div>
          ) : (
            results.map((post) => (
              <div
                key={post.slug}
                onClick={() => {
                  onSelectPost(post);
                  onClose();
                }}
                className="py-3 px-2 hover:bg-gray-50 cursor-pointer rounded transition-colors"
              >
                <div className="text-xs text-gray-400 font-medium mb-1">
                  {post.displayDate} {post.tags && post.tags.length > 0 && `• ${post.tags.join(', ')}`}
                </div>
                <h4 className="text-base font-bold text-gray-900 font-['Montserrat'] hover:text-gray-600">
                  {post.title}
                </h4>
                {post.description && (
                  <p className="text-xs text-gray-500 line-clamp-1 mt-1 font-['Lato']">
                    {post.description}
                  </p>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
