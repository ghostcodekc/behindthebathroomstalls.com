import React, { useState } from 'react';
import rawContact from '/content/contact/_index.md?raw';
import { parsePostMarkdown } from '../utils/posts';
import { Send, Upload, Sparkles, CheckCircle2, ExternalLink } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function SubmitView({ onSubmitted }) {
  const { title, html } = parsePostMarkdown(rawContact, 'contact/_index.md');

  const [establishment, setEstablishment] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('Men');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [credit, setCredit] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!establishment || !imageUrl) return;

    confetti({
      particleCount: 80,
      spread: 80,
      origin: { y: 0.6 },
    });

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-cyan-400 to-pink-500 p-1 flex items-center justify-center shadow-xl shadow-cyan-500/20">
          <div className="w-full h-full bg-[#0c1220] rounded-[22px] flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10 text-cyan-400" />
          </div>
        </div>

        <h2 className="text-3xl font-extrabold text-white font-['Outfit']">Graffiti Submitted!</h2>
        <p className="text-slate-300 text-sm leading-relaxed max-w-md mx-auto">
          Thanks for contributing to <strong className="text-white">Behind The Bathroom Stalls</strong>! 
          We'll review your photo from <span className="text-cyan-400">{establishment}</span>.
        </p>

        <div className="pt-4 flex items-center justify-center gap-4">
          <button
            onClick={() => setSubmitted(false)}
            className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-all border border-slate-700"
          >
            Submit Another One
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Title */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Get In Touch</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-['Outfit'] tracking-tight">
          {title || "Contact Us!"}
        </h1>
      </div>

      {/* Real Markdown Content from content/contact/_index.md */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl">
        <div 
          className="markdown-content text-slate-300"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>

      {/* Submission Form */}
      <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-3xl bg-[#0c1220] border border-slate-800 shadow-xl space-y-5">
        <h3 className="text-lg font-bold text-white font-['Outfit'] border-b border-slate-800 pb-3">
          Submit Restroom Graffiti
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase font-semibold text-slate-300 mb-1.5">
              Establishment Name *
            </label>
            <input
              type="text"
              required
              value={establishment}
              onChange={(e) => setEstablishment(e.target.value)}
              placeholder="e.g. Old National Centre"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="block text-xs uppercase font-semibold text-slate-300 mb-1.5">
              City, State / Country *
            </label>
            <input
              type="text"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Indianapolis, IN"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-400"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs uppercase font-semibold text-slate-300 mb-1.5">
            Restroom Type *
          </label>
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {[
              { id: 'Men', label: "Men's Room", icon: '🚹' },
              { id: 'Women', label: "Women's Room", icon: '🚺' },
              { id: 'Other', label: 'Other', icon: '🚻' },
            ].map((item) => (
              <button
                type="button"
                key={item.id}
                onClick={() => setCategory(item.id)}
                className={`py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 border transition-all ${
                  category === item.id
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-inner'
                    : 'bg-slate-900 text-slate-400 border-slate-700 hover:bg-slate-800'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs uppercase font-semibold text-slate-300 mb-1.5">
            Imgur or Image Link *
          </label>
          <input
            type="url"
            required
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://imgur.com/..."
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm font-mono focus:outline-none focus:border-cyan-400"
          />
        </div>

        <div>
          <label className="block text-xs uppercase font-semibold text-slate-300 mb-1.5">
            Message / Graffiti Description
          </label>
          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Graffiti text or story..."
            className="w-full p-3.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-xs leading-relaxed focus:outline-none focus:border-cyan-400 resize-none"
          />
        </div>

        <div>
          <label className="block text-xs uppercase font-semibold text-slate-300 mb-1.5">
            Photo Credit / Social Handle (Optional)
          </label>
          <input
            type="text"
            value={credit}
            onChange={(e) => setCredit(e.target.value)}
            placeholder="@yourhandle"
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-400"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-cyan-500 to-pink-500 hover:opacity-95 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/25 transition-all flex items-center justify-center gap-2"
        >
          <Send className="w-4 h-4" />
          <span>Send Message</span>
        </button>

      </form>
    </div>
  );
}
