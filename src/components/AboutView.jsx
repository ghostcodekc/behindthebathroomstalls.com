import React from 'react';
import { Globe } from 'lucide-react';
import { TwitterIcon, GithubIcon, LinkedinIcon, InstagramIcon } from './SocialIcons';

export default function AboutView({ onExplorePosts }) {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center">
      
      {/* Author Avatar Image */}
      <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-2 border-gray-200 shadow-sm mb-6">
        <img
          src="/assets/img/andrew-face.jpg"
          alt="Andrew Grube"
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = '/img/me.jpg';
          }}
        />
      </div>

      {/* Title */}
      <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 font-['Montserrat'] tracking-tight mb-4">
        Andrew Grube
      </h1>

      {/* Subtitle / Bio (from S3 about page) */}
      <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-['Lato'] max-w-lg mx-auto mb-8">
        My name is Andrew Grube. I’m a Cloud Engineer working in downtown Kansas City, Missouri. I also run this blog!
      </p>

      {/* Social / Contact Links (matching S3 about page exactly) */}
      <div className="flex items-center justify-center gap-5 pt-2 mb-12">
        <a
          href="http://andrewgrube.com"
          target="_blank"
          rel="noreferrer"
          className="w-10 h-10 rounded-full border border-gray-300 hover:border-black flex items-center justify-center text-gray-700 hover:text-black transition-all hover:scale-105"
          title="Personal Website"
        >
          <Globe className="w-4 h-4" />
        </a>

        <a
          href="https://in.linkedin.com/in/andrew-grube-74124821/"
          target="_blank"
          rel="noreferrer"
          className="w-10 h-10 rounded-full border border-gray-300 hover:border-[#0077b5] flex items-center justify-center text-gray-700 hover:text-[#0077b5] transition-all hover:scale-105"
          title="LinkedIn"
        >
          <LinkedinIcon className="w-4 h-4" />
        </a>

        <a
          href="http://github.com/ThrownJupiter"
          target="_blank"
          rel="noreferrer"
          className="w-10 h-10 rounded-full border border-gray-300 hover:border-black flex items-center justify-center text-gray-700 hover:text-black transition-all hover:scale-105"
          title="GitHub"
        >
          <GithubIcon className="w-4 h-4" />
        </a>

        <a
          href="https://twitter.com/@ThrownJupiter"
          target="_blank"
          rel="noreferrer"
          className="w-10 h-10 rounded-full border border-gray-300 hover:border-[#1DA1F2] flex items-center justify-center text-gray-700 hover:text-[#1DA1F2] transition-all hover:scale-105"
          title="Twitter"
        >
          <TwitterIcon className="w-4 h-4" />
        </a>

        <a
          href="https://instagram.com/ThrownJupiter"
          target="_blank"
          rel="noreferrer"
          className="w-10 h-10 rounded-full border border-gray-300 hover:border-[#E1306C] flex items-center justify-center text-gray-700 hover:text-[#E1306C] transition-all hover:scale-105"
          title="Instagram"
        >
          <InstagramIcon className="w-4 h-4" />
        </a>
      </div>

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
