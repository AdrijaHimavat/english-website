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
console.log('index.html and public/astrology/ written');
