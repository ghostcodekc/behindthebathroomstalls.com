import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PostCard from './components/PostCard';
import PostModal from './components/PostModal';
import SearchModal from './components/SearchModal';
import PostStudioModal from './components/PostStudioModal';
import AboutView from './components/AboutView';
import { loadAllPosts } from './utils/posts';

export default function App() {
  const [posts, setPosts] = useState([]);
  const [activeTab, setActiveTab] = useState('blog'); // 'blog' or 'about'
  const [selectedTag, setSelectedTag] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isStudioOpen, setIsStudioOpen] = useState(false);

  // Load all authentic posts
  useEffect(() => {
    const loaded = loadAllPosts();
    setPosts(loaded);

    // Deep linking via URL hash
    const hash = window.location.hash.replace('#', '');
    if (hash === 'about') {
      setActiveTab('about');
    } else if (hash.startsWith('post-')) {
      const slug = hash.replace('post-', '');
      const match = loaded.find((p) => p.slug === slug);
      if (match) setSelectedPost(match);
    }
  }, []);

  // Sync hash
  useEffect(() => {
    if (selectedPost) {
      window.history.replaceState(null, '', `#post-${selectedPost.slug}`);
    } else if (activeTab === 'about') {
      window.history.replaceState(null, '', '#about');
    } else {
      window.history.replaceState(null, '', window.location.pathname);
    }
  }, [selectedPost, activeTab]);

  // Extract all unique tags
  const allTags = useMemo(() => {
    const tagSet = new Set();
    posts.forEach((p) => {
      (p.tags || []).forEach((t) => tagSet.add(t));
    });
    return Array.from(tagSet);
  }, [posts]);

  // Filtered posts
  const filteredPosts = useMemo(() => {
    if (!selectedTag) return posts;
    return posts.filter((p) => (p.tags || []).includes(selectedTag));
  }, [posts, selectedTag]);

  return (
    <div className="min-h-screen flex flex-col bg-[#fafafa] text-[#333333] font-['Lato'] antialiased">
      
      {/* Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setSelectedPost(null);
          setSelectedTag('');
        }}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenStudio={() => setIsStudioOpen(true)}
      />

      {/* Main Content */}
      <main className="flex-grow">
        
        {activeTab === 'about' ? (
          <AboutView onExplorePosts={() => setActiveTab('blog')} />
        ) : (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
            
            {/* Tag Filter Navigation (Clean, minimal links matching S3 tags) */}
            {allTags.length > 0 && (
              <div className="mb-10 flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs font-semibold uppercase tracking-wider font-['Montserrat']">
                <button
                  onClick={() => setSelectedTag('')}
                  className={`pb-1 transition-colors ${
                    selectedTag === ''
                      ? 'text-black border-b-2 border-black'
                      : 'text-gray-400 hover:text-black'
                  }`}
                >
                  All Posts ({posts.length})
                </button>
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(selectedTag === tag ? '' : tag)}
                    className={`pb-1 transition-colors ${
                      selectedTag === tag
                        ? 'text-black border-b-2 border-black'
                        : 'text-gray-400 hover:text-black'
                    }`}
                  >
                    | {tag}
                  </button>
                ))}
              </div>
            )}

            {/* Posts Grid (Matching Adam Blog 3-column post-card-box) */}
            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                  <PostCard
                    key={post.slug}
                    post={post}
                    onSelectPost={(p) => setSelectedPost(p)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 text-gray-400 text-sm">
                No posts found for tag "#{selectedTag}".
              </div>
            )}

          </div>
        )}

      </main>

      {/* Footer */}
      <Footer />

      {/* Post Modal / Reader View */}
      {selectedPost && (
        <PostModal
          post={selectedPost}
          allPosts={posts}
          onClose={() => setSelectedPost(null)}
          onSelectPost={(p) => setSelectedPost(p)}
        />
      )}

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        posts={posts}
        onSelectPost={(p) => setSelectedPost(p)}
      />

      {/* Post Studio Modal */}
      {isStudioOpen && (
        <PostStudioModal
          onClose={() => setIsStudioOpen(false)}
        />
      )}

    </div>
  );
}
