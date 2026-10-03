import { marked } from 'marked';

// Configure marked options
marked.setOptions({
  gfm: true,
  breaks: true,
});

/**
 * Parses simple TOML or YAML frontmatter lines
 */
function parseMetaBlock(rawMeta) {
  const meta = {};
  const lines = rawMeta.split(/\r?\n/);

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    // Match either `key = value` (TOML) or `key: value` (YAML)
    const delimiterIndex = trimmed.indexOf('=') !== -1 && (trimmed.indexOf(':') === -1 || trimmed.indexOf('=') < trimmed.indexOf(':'))
      ? trimmed.indexOf('=')
      : trimmed.indexOf(':');

    if (delimiterIndex === -1) continue;

    const key = trimmed.slice(0, delimiterIndex).trim();
    let val = trimmed.slice(delimiterIndex + 1).trim();

    // Check array: e.g. ["item1", "item2"] or ['item1', 'item2']
    if (val.startsWith('[') && val.endsWith(']')) {
      const inner = val.slice(1, -1).trim();
      if (!inner) {
        meta[key] = [];
      } else {
        meta[key] = inner.split(',').map(item => {
          let s = item.trim();
          if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) {
            s = s.slice(1, -1);
          }
          return s.trim();
        }).filter(Boolean);
      }
      continue;
    }

    // Strip outer quotes
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    } else if (val === 'true') {
      val = true;
    } else if (val === 'false') {
      val = false;
    } else if (!isNaN(Number(val)) && val !== '') {
      val = Number(val);
    }

    meta[key] = val;
  }

  return meta;
}

/**
 * Parses raw markdown file content with either TOML (+++) or YAML (---) frontmatter
 */
export function parsePostMarkdown(rawContent, filePath = '') {
  let meta = {};
  let body = rawContent || '';

  const tomlMatch = rawContent.match(/^\+\+\+\r?\n([\s\S]*?)\r?\n\+\+\+\r?\n?([\s\S]*)$/);
  const yamlMatch = rawContent.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);

  if (tomlMatch) {
    meta = parseMetaBlock(tomlMatch[1]);
    body = tomlMatch[2];
  } else if (yamlMatch) {
    meta = parseMetaBlock(yamlMatch[1]);
    body = yamlMatch[2];
  }

  // Derive slug from filename
  const filename = filePath.split('/').pop() || '';
  const slug = filename.replace(/\.md$/i, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'post';

  // Normalize image path
  let image = meta.image || '';
  if (image && !image.startsWith('http://') && !image.startsWith('https://') && !image.startsWith('/')) {
    image = '/' + image;
  }

  // Normalize category: handle categories array or category string
  let category = 'Uncategorized';
  if (Array.isArray(meta.categories) && meta.categories.length > 0) {
    category = meta.categories[0];
  } else if (typeof meta.category === 'string') {
    category = meta.category;
  } else if (typeof meta.categories === 'string') {
    category = meta.categories;
  }

  // Tags
  let tags = [];
  if (Array.isArray(meta.tags)) {
    tags = meta.tags;
  } else if (typeof meta.tags === 'string') {
    tags = meta.tags.split(',').map(t => t.trim()).filter(Boolean);
  }

  // Extract excerpt (before <!--more--> if present)
  let excerpt = '';
  let fullBody = body.trim();
  if (fullBody.includes('<!--more-->')) {
    const parts = fullBody.split('<!--more-->');
    excerpt = parts[0].trim();
  } else {
    // Take first paragraph
    const firstPara = fullBody.split(/\r?\n\r?\n/)[0] || '';
    excerpt = firstPara.replace(/[#*`>]/g, '').trim().slice(0, 160);
  }

  // Extract photo credit from body if not explicit in meta
  let credit = meta.credit || meta.photoCredit || '';
  if (!credit) {
    const creditMatch = fullBody.match(/Photo Credit:\s*(\[.*?\]\(.*?\)|\S+)/i);
    if (creditMatch) {
      credit = creditMatch[1];
    }
  }

  return {
    slug,
    title: meta.title || filename.replace(/\.md$/i, ''),
    date: meta.date ? new Date(meta.date).toISOString() : new Date().toISOString(),
    displayDate: meta.date ? formatDate(meta.date) : 'Recently',
    category: category.trim(),
    tags,
    image,
    description: meta.description || excerpt,
    excerpt,
    credit,
    draft: Boolean(meta.draft),
    rawContent,
    rawBody: fullBody,
    html: marked.parse(fullBody),
    weight: typeof meta.weight === 'number' ? meta.weight : 999,
  };
}

/**
 * Formats a date string to a human-readable format e.g. "Nov 5, 2016"
 */
export function formatDate(dateString) {
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } catch {
    return dateString;
  }
}

/**
 * Loads all posts using Vite's import.meta.glob
 */
export function loadAllPosts() {
  // Vite dynamically glob-imports all markdown files directly from content/post/
  const modules = import.meta.glob('/content/post/*.md', {
    query: '?raw',
    import: 'default',
    eager: true,
  });

  const postsMap = new Map();

  for (const [filePath, rawText] of Object.entries(modules)) {
    const post = parsePostMarkdown(rawText, filePath);
    // If draft is true in production, skip (or include if desired)
    if (post.draft) continue;

    // Use slug as unique key so duplicates don't appear
    if (!postsMap.has(post.slug)) {
      postsMap.set(post.slug, post);
    }
  }

  // Convert to array and sort by date descending (newest first)
  const posts = Array.from(postsMap.values());
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

/**
 * Helper to generate a ready-to-save Markdown file template for new posts
 */
export function generateMarkdownTemplate({
  title = 'Stall Graffiti Title',
  category = 'Men',
  location = 'City, State',
  image = '/img/portfolio/FuckYou_OldNationalCentre.jpg',
  credit = '@author',
  tags = 'restroom graffiti, bathroom art',
  description = '',
  body = 'Found this hilarious graffiti on the back of the stall door.\n\n<!--more-->\n\nPhoto Credit: [@twitter_handle](https://twitter.com/handle)',
}) {
  const tagList = tags.split(',').map(t => `"${t.trim()}"`).join(', ');
  const isoDate = new Date().toISOString();

  return `---
title: "${title}"
date: "${isoDate}"
category: "${category}"
image: "${image}"
tags: [${tagList}]
description: "${description || title}"
---

${body}
`;
}
