# Behind The Bathroom Stalls (v2.0)

A curated photographic comparison blog between men and women's restroom graffiti habits, built with **Vite**, **React**, **Tailwind CSS v4**, and deployed on **AWS Amplify**.

---

## 🚀 Features

- **⚡ Blazing Fast Vite + React**: Modern client-side application with zero sluggish reload times.
- **🎨 Tailwind CSS v4**: Sleek, urban street-art dark mode with vibrant neon accents (cyan for men's rooms, pink/rose for women's rooms).
- **📝 Effortless Markdown Content**: Drop any `.md` file into `src/posts/` and it will automatically be discovered, parsed, and published — no configuration arrays or manual imports required!
- **🛠️ Easy Post Studio**: In-app draft creator and preview tool. Fill in fields, see live markdown preview, and download or copy `.md` files in seconds.
- **🔍 Real-Time Search & Filters**: Instant search across titles, locations, graffiti quotes, and tags, with category filters (All / Men's / Women's).
- **🖼️ High-Res Lightbox**: Fullscreen photo view with zoom toggle, credit attribution, and keyboard navigation (`Esc`).
- **☁️ AWS Amplify Ready**: Includes [`amplify.yml`](./amplify.yml) configured for CI/CD builds with caching.

---

## 📂 Project Structure

```
├── amplify.yml           # AWS Amplify build configuration
├── content/              # Real Markdown content
│   ├── post/             # Blog posts (.md)
│   ├── about/            # About page (index.md)
│   └── contact/          # Contact page (_index.md)
├── public/
│   ├── favicon.ico
│   └── img/
│       └── portfolio/    # Real stall photos
├── src/
│   ├── components/       # UI components (Navbar, PostCard, Modals, etc.)
│   ├── utils/            # Markdown parser & Vite glob post loader
│   ├── App.jsx           # Main application
│   ├── index.css         # Tailwind CSS v4 theme & prose styling
│   └── main.jsx          # React DOM entry point
├── index.html            # Vite HTML template with Google Fonts & SEO
├── package.json
└── vite.config.js
```

---

## ✍️ How to Add or Edit Blog Posts

Updating this blog is designed to be **super simple**:

### Option 1: Use the In-Browser "Easy Post Studio"
1. Click the **Easy Post Studio** button in the top navigation.
2. Enter your title, select Men's or Women's restroom, add photo URL/path, and write your story.
3. Check the live preview.
4. Click **Download .md** or **Copy .md** and place the file in `content/post/`.

### Option 2: Add a `.md` File Manually
1. Save your photo to `public/img/portfolio/your-photo.jpg`.
2. Create a new markdown file in `content/post/` (e.g. `content/post/my-new-post.md`):

```markdown
---
title: "The Wall of Time: Austin, TX"
date: "2026-10-02"
category: "Men"
image: "/img/portfolio/mens_dive_bar_austin.jpg"
tags: ["restroom graffiti", "dive bar", "austin"]
description: "A philosophical debate on a steel stall door in Austin."
credit: "@author"
---

"We are all graffiti on the wall of time."

<!--more-->

Write your post content here! Supports full Markdown formatting including headers, quotes, lists, and links.

> A memorable quote from the stall wall!

Photo Credit: [@author](https://twitter.com/author)
```

*(Note: Legacy Hugo `+++` TOML frontmatter is also 100% supported!)*

3. Push to your Git repository — AWS Amplify automatically builds and deploys your changes!

---

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

---

## ☁️ AWS Amplify Deployment

1. Connect your repository to AWS Amplify.
2. Amplify will automatically detect [`amplify.yml`](./amplify.yml).
3. Under **App Settings > Rewrites and redirects**, ensure single-page app routing is enabled:
   - **Source address**: `</^[^.]+$|\.(?!(css|gif|ico|jpg|js|png|txt|svg|woff|woff2|ttf|map|json)$)([^.]+$)/>`
   - **Target address**: `/index.html`
   - **Type**: `200 (Rewrite)`
