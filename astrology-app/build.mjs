// ساخت index.html مستقل برای اجرا بیرون از Claude (دوبار کلیک یا هر میزبان ایستا)
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
const dir = dirname(fileURLToPath(import.meta.url));
const body = readFileSync(join(dir, 'app.html'), 'utf8');
const html = '<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">\n</head>\n<body>\n' + body + '\n</body>\n</html>\n';
writeFileSync(join(dir, 'index.html'), html);
console.log('index.html written');
