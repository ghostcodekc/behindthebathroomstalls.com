import React from 'react';

export default function PostCard({ post, onSelectPost }) {
  return (
    <article className="bg-white rounded-sm overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 flex flex-col h-full group">
      
      {/* Cover Image */}
      <div 
        onClick={() => onSelectPost(post)}
        className="aspect-[16/10] overflow-hidden bg-gray-100 cursor-pointer"
      >
        {post.image ? (
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500 ease-out"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs font-mono">
            No image
          </div>
        )}
      </div>

      {/* Post Info Body */}
      <div className="p-5 sm:p-6 flex flex-col flex-grow">
        
        {/* Tags Row */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-2.5">
            {post.tags.map((tag, idx) => (
              <span
                key={idx}
                className="text-xs font-semibold tracking-wider uppercase text-gray-500 hover:text-black transition-colors"
              >
                | {tag}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h2 
          onClick={() => onSelectPost(post)}
          className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-gray-600 transition-colors cursor-pointer leading-snug font-['Montserrat'] mb-2"
        >
          {post.title}
        </h2>

        {/* Excerpt if present */}
        {post.description && (
          <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed mt-1 font-['Lato']">
            {post.description}
          </p>
        )}

        {/* Date */}
        <div className="mt-auto pt-4 text-xs text-gray-400 font-medium">
          {post.displayDate}
        </div>

      </div>

    </article>
  );
}
