// Builds two standalone copies of the page from app.html (the Claude artifact source):
//  - astrology-app/index.html: open directly in a browser;
//  - public/astrology/: served by the Grow Me site at /astrology/.
// Nothing the visitor enters is sent anywhere; it stays in their own browser.
import { readFileSync, writeFileSync, mkdirSync, cpSync, rmSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
const dir = dirname(fileURLToPath(import.meta.url));
const body = readFileSync(join(dir, 'app.html'), 'utf8');
const page = (extraHead) => '<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">\n' + extraHead + '</head>\n<body>\n' + body + '\n</body>\n</html>\n';
writeFileSync(join(dir, 'index.html'), page(''));
const site = join(dir, '..', 'public', 'astrology');
rmSync(site, { recursive: true, force: true });
mkdirSync(site, { recursive: true });
for (const d of ['js', 'lang', 'vendor']) cpSync(join(dir, d), join(site, d), { recursive: true });
writeFileSync(join(site, 'index.html'), page(''));
// - dist/: a standalone static site for its own Vercel project (not committed; deployed from here)
const dist = join(dir, 'dist');
rmSync(dist, { recursive: true, force: true });
mkdirSync(dist, { recursive: true });
for (const d of ['js', 'lang', 'vendor']) cpSync(join(dir, d), join(dist, d), { recursive: true });
const icon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#18203f"/><circle cx="32" cy="32" r="23" fill="none" stroke="#d8ad58" stroke-width="3"/><g stroke="#d8ad58" stroke-width="2"><line x1="32" y1="6" x2="32" y2="13"/><line x1="32" y1="51" x2="32" y2="58"/><line x1="6" y1="32" x2="13" y2="32"/><line x1="51" y1="32" x2="58" y2="32"/></g><path d="M32 15 L36.5 32 L32 49 L27.5 32 Z" fill="#93a7f2"/><circle cx="32" cy="32" r="3.5" fill="#d8ad58"/></svg>\n';
writeFileSync(join(dist, 'icon.svg'), icon);
writeFileSync(join(dist, 'manifest.webmanifest'), JSON.stringify({ name: 'Akhtarnameh · اخترنامه', short_name: 'Akhtarnameh', start_url: '/', display: 'standalone', background_color: '#0b1124', theme_color: '#18203f', icons: [{ src: '/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' }] }, null, 1) + '\n');
writeFileSync(join(dist, 'vercel.json'), JSON.stringify({ cleanUrls: true, headers: [{ source: '/(js|lang|vendor)/(.*)', headers: [{ key: 'Cache-Control', value: 'public, max-age=3600, must-revalidate' }] }, { source: '/(.*)', headers: [{ key: 'X-Content-Type-Options', value: 'nosniff' }, { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' }] }] }, null, 1) + '\n');
writeFileSync(join(dist, 'robots.txt'), 'User-agent: *\nAllow: /\n');
const desc = 'Your stars in plain words: who you are, love, money and the right time, from the world’s classical astrology. In 16 languages.';
writeFileSync(join(dist, 'index.html'), page(
  '<link rel="icon" href="/icon.svg" type="image/svg+xml">\n<link rel="apple-touch-icon" href="/icon.svg">\n<link rel="manifest" href="/manifest.webmanifest">\n' +
  '<meta name="theme-color" content="#18203f">\n<meta property="og:type" content="website">\n<meta property="og:title" content="Akhtarnameh · اخترنامه">\n' +
  '<meta property="og:description" content="' + desc + '">\n<meta name="twitter:card" content="summary">\n'));
console.log('index.html, public/astrology/ and dist/ written');
