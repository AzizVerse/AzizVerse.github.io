import { readFileSync, writeFileSync } from 'node:fs';
const content = readFileSync('src/content.ts', 'utf8');
const url = content.match(/siteUrl:\s*'([^']*)'/)?.[1]?.replace(/\/$/, '');
if (url) {
  if (!/^https:\/\/[a-z0-9.-]+(?:\/[^\s<>"']*)?$/i.test(url)) throw new Error('siteUrl must be a valid HTTPS URL.');
  const path = new URL(url).pathname.replace(/\/$/, '');
  const preview = `${url}/assets/og-image.png`;
  const html = readFileSync('dist/index.html', 'utf8').replace('</head>', `<link rel="canonical" href="${url}/"/><meta property="og:url" content="${url}/"/><meta property="og:image" content="${preview}"/><meta property="og:image:width" content="1200"/><meta property="og:image:height" content="630"/><meta name="twitter:image" content="${preview}"/></head>`);
  writeFileSync('dist/index.html', html);
  writeFileSync('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${url.replace(/&/g,'&amp;')}/</loc></url></urlset>`);
  writeFileSync('dist/robots.txt', `User-agent: *\nAllow: ${path || '/'}\nSitemap: ${url}/sitemap.xml\n`);
  console.log('Canonical, social metadata, and sitemap generated.');
} else {
  // Unapproved local drafts should not be indexed if accidentally hosted.
  writeFileSync('dist/robots.txt', 'User-agent: *\nDisallow: /\n');
  console.log('Local draft: set profile.siteUrl before approved deployment to enable canonical, social image, and sitemap.');
}
