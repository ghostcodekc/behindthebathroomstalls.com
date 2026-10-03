import React, { useState } from 'react';
import { X, Copy, Download, Check, FileText, Eye, Edit3, HelpCircle } from 'lucide-react';
import { marked } from 'marked';

export default function PostStudioModal({ onClose }) {
  const [title, setTitle] = useState("Hank's Saloon, Brooklyn, NY [MEN]");
  const [category, setCategory] = useState('MEN');
  const [image, setImage] = useState('/assets/img/HanksSaloon_Cover.jpg');
  const [tags, setTags] = useState('MEN, NY');
  const [description, setDescription] = useState('Hank’s Saloon has a honky-tonk vibe & regular live music.');
  const [body, setBody] = useState(`> Hank’s Saloon has a honky-tonk vibe & regular live music. Draw a crowd to this dark, black-painted watering hole.

![Hank's Saloon Graffiti](/assets/img/HanksSaloon_Bathroom-Door.jpg)

Photo Credit: @william_ruben_helms on Instagram.`);

  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('edit'); // 'edit', 'preview', 'instructions'

  const isoDate = new Date().toISOString();
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'new-post';
  const tagList = tags.split(',').map((t) => `"${t.trim()}"`).join(', ');

  const markdownOutput = `---
title: "${title}"
date: "${isoDate}"
category: "${category}"
tags: [${tagList}]
image: "${image}"
description: "${description}"
---

${body}
`;

  const handleCopy = () => {
    navigator.clipboard.writeText(markdownOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([markdownOutput], { type: 'text/markdown' });
    element.href = URL.createObjectURL(file);
    element.download = `${slug}.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const renderedPreviewHtml = marked.parse(body);

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/60 flex items-start justify-center p-3 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="bg-white max-w-4xl w-full rounded-sm shadow-2xl overflow-hidden my-6 border border-gray-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Header */}
        <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between bg-gray-50">
          <div>
            <h2 className="text-base font-bold text-gray-900 font-['Montserrat']">Create New Blog Post</h2>
            <p className="text-xs text-gray-500 font-['Lato']">Draft and download ready-to-save Markdown files for <code className="text-gray-700 font-mono">content/post/</code></p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold text-gray-700 bg-white hover:bg-gray-100 border border-gray-300 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Markdown'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold text-white bg-gray-900 hover:bg-gray-800 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download .md</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-gray-400 hover:text-black transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-gray-200 px-6 pt-2 bg-white text-xs font-semibold uppercase tracking-wider">
          <button
            onClick={() => setActiveTab('edit')}
            className={`pb-2.5 px-3 flex items-center gap-1.5 border-b-2 transition-colors ${
              activeTab === 'edit' ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-black'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Editor</span>
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`pb-2.5 px-3 flex items-center gap-1.5 border-b-2 transition-colors ${
              activeTab === 'preview' ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-black'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Live Preview</span>
          </button>
          <button
            onClick={() => setActiveTab('instructions')}
            className={`pb-2.5 px-3 flex items-center gap-1.5 border-b-2 transition-colors ${
              activeTab === 'instructions' ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-black'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>How to publish</span>
          </button>
        </div>

        {/* Modal content */}
        <div className="p-6">
          {activeTab === 'edit' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                    Post Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-gray-900 focus:outline-none focus:border-black font-['Lato']"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                      Category
                    </label>
                    <input
                      type="text"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      placeholder="MEN, WOMEN, or No Gender"
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-gray-900 focus:outline-none focus:border-black font-['Lato']"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                      Tags (comma separated)
                    </label>
                    <input
                      type="text"
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                      placeholder="MEN, NY"
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-gray-900 focus:outline-none focus:border-black font-['Lato']"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                    Cover Image URL / Path
                  </label>
                  <input
                    type="text"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="/assets/img/your-photo.jpg"
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm font-mono text-gray-900 focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                    Description / Subtitle
                  </label>
                  <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Short 1-sentence summary"
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-gray-900 focus:outline-none focus:border-black font-['Lato']"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                  Article Body (Markdown)
                </label>
                <textarea
                  rows={13}
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded text-xs font-mono leading-relaxed text-gray-900 focus:outline-none focus:border-black resize-none"
                />
              </div>

            </div>
          )}

          {activeTab === 'preview' && (
            <div className="max-w-2xl mx-auto space-y-6">
              <h1 className="text-2xl font-bold text-gray-900 font-['Montserrat']">{title}</h1>
              {image && (
                <div className="aspect-[16/9] overflow-hidden bg-gray-100 rounded">
                  <img src={image} alt={title} className="w-full h-full object-cover" />
                </div>
              )}
              <div 
                className="article-prose"
                dangerouslySetInnerHTML={{ __html: renderedPreviewHtml }}
              />
            </div>
          )}

          {activeTab === 'instructions' && (
            <div className="max-w-xl mx-auto py-4 space-y-4 text-sm text-gray-700 font-['Lato']">
              <h3 className="text-base font-bold text-gray-900 font-['Montserrat']">
                How updating works in this modern Vite blog
              </h3>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Put your photo in <code className="bg-gray-100 px-1 py-0.5 rounded font-mono text-xs">public/assets/img/</code></li>
                <li>Save this markdown file into <code className="bg-gray-100 px-1 py-0.5 rounded font-mono text-xs">content/post/</code> (e.g. <code className="font-mono text-xs">{slug}.md</code>)</li>
                <li>Vite automatically discovers the new post on build, and AWS Amplify deploys it on your next git push!</li>
              </ol>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
