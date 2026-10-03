import React from 'react';
import rawAbout from '/content/about/index.md?raw';
import { parsePostMarkdown } from '../utils/posts';

export default function AboutView({ onExplorePosts }) {
  const { title, html } = parsePostMarkdown(rawAbout, 'about/index.md');

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center">
      
      {/* Brand Logo */}
      <div className="flex justify-center mb-8">
        <img
          src="/assets/img/logo.png"
          alt="BehindTheBathroomStalls"
          className="h-12 w-auto object-contain"
        />
      </div>

      {/* Title */}
      <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 font-['Montserrat'] tracking-tight mb-6">
        {title || "About"}
      </h1>

      {/* Content from content/about/index.md */}
      <div 
        className="article-prose text-base sm:text-lg text-gray-600 leading-relaxed font-['Lato'] max-w-lg mx-auto mb-12"
        dangerouslySetInnerHTML={{ __html: html }}
      />

      <div>
        <button
          onClick={onExplorePosts}
          className="text-xs uppercase font-bold tracking-widest text-gray-500 hover:text-black border-b border-gray-400 hover:border-black pb-1 transition-colors"
        >
          ← Return to Blog
        </button>
      </div>

    </div>
  );
}
