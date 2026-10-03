import React, { useState } from 'react';
import { Search, Menu, X, PlusCircle } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, onOpenSearch, onOpenStudio }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          
          {/* Mobile hamburger menu toggle */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-700 hover:text-black focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Desktop Left Nav Links */}
          <nav className="hidden md:flex items-center gap-7">
            <button
              onClick={() => { setActiveTab('blog'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className={`text-sm font-semibold tracking-wider uppercase transition-colors ${
                activeTab === 'blog' ? 'text-black border-b-2 border-black pb-1' : 'text-gray-600 hover:text-black'
              }`}
            >
              Blog
            </button>
            <button
              onClick={() => { setActiveTab('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className={`text-sm font-semibold tracking-wider uppercase transition-colors ${
                activeTab === 'about' ? 'text-black border-b-2 border-black pb-1' : 'text-gray-600 hover:text-black'
              }`}
            >
              About
            </button>
            <a
              href="https://goo.gl/forms/lntISz45BochR7lR2"
              target="_blank"
              rel="noreferrer"
              className="text-sm font-semibold tracking-wider uppercase text-gray-600 hover:text-black transition-colors"
            >
              Submit A Post
            </a>
          </nav>

          {/* Center Brand Logo (matching S3 header) */}
          <div className="flex items-center justify-center">
            <button 
              onClick={() => { setActiveTab('blog'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="hover:opacity-85 transition-opacity"
            >
              <img
                src="/assets/img/logo.png"
                alt="BehindTheBathroomStalls"
                className="h-10 sm:h-12 w-auto object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement.innerHTML = '<span class="font-bold text-lg tracking-tight uppercase">BehindTheBathroomStalls</span>';
                }}
              />
            </button>
          </div>

          {/* Right: Search & Post Studio */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenStudio}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold uppercase tracking-wider text-gray-700 bg-gray-100 hover:bg-gray-200 border border-gray-300 transition-colors"
              title="Easy Post Studio - Write new markdown posts"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>New Post</span>
            </button>
            
            <button
              onClick={onOpenSearch}
              className="p-2 text-gray-700 hover:text-black hover:bg-gray-100 rounded-full transition-colors"
              title="Search posts"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-5 py-4 space-y-3">
          <button
            onClick={() => { setActiveTab('blog'); setMobileMenuOpen(false); }}
            className="block w-full text-left py-2 text-sm font-semibold uppercase tracking-wider text-gray-800 hover:text-black"
          >
            Blog
          </button>
          <button
            onClick={() => { setActiveTab('about'); setMobileMenuOpen(false); }}
            className="block w-full text-left py-2 text-sm font-semibold uppercase tracking-wider text-gray-800 hover:text-black"
          >
            About
          </button>
          <a
            href="https://goo.gl/forms/lntISz45BochR7lR2"
            target="_blank"
            rel="noreferrer"
            className="block py-2 text-sm font-semibold uppercase tracking-wider text-gray-800 hover:text-black"
          >
            Submit A Post
          </a>
          <button
            onClick={() => { onOpenStudio(); setMobileMenuOpen(false); }}
            className="block w-full text-left py-2 text-sm font-semibold uppercase tracking-wider text-gray-600 hover:text-black"
          >
            + New Post (Markdown Studio)
          </button>
        </div>
      )}
    </header>
  );
}
