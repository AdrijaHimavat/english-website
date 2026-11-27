// Deploys astrology-app/dist (built by build.mjs) as its own Vercel project, through the Vercel REST API.
// usage: node astrology-app/build.mjs && node astrology-app/deploy-vercel.mjs [project-name]
// The token is read from VERCEL_TOKEN (in Claude's cloud sessions the network proxy adds it instead).
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { dirname, join, relative } from 'node:path';

const dist = join(dirname(fileURLToPath(import.meta.url)), 'dist');
const name = process.argv[2] || 'akhtarnameh';
const API = 'https://api.vercel.com';
const team = process.env.VERCEL_TEAM_ID ? '?teamId=' + process.env.VERCEL_TEAM_ID : '';
const auth = { Authorization: 'Bearer ' + (process.env.VERCEL_TOKEN || 'proxy-injected') };

function walk(d) { return readdirSync(d).flatMap(f => { const p = join(d, f); return statSync(p).isDirectory() ? walk(p) : [p]; }); }
async function api(path, opts) {
  const res = await fetch(API + path + (path.includes('?') ? team.replace('?', '&') : team), opts);
  const text = await res.text();
  let body; try { body = JSON.parse(text); } catch (e) { body = text; }
  if (!res.ok) throw new Error(res.status + ' ' + path + ': ' + (body.error ? body.error.message : text));
  return body;
}

const files = walk(dist).map(p => { const data = readFileSync(p); return { file: relative(dist, p).split('\\').join('/'), data, sha: createHash('sha1').update(data).digest('hex'), size: data.length }; });
console.log('uploading', files.length, 'files…');
for (const f of files) {
  await api('/v2/files', { method: 'POST', headers: { ...auth, 'Content-Type': 'application/octet-stream', 'x-vercel-digest': f.sha, 'Content-Length': String(f.size) }, body: f.data });
}
const dep = await api('/v13/deployments', {
  method: 'POST', headers: { ...auth, 'Content-Type': 'application/json' },
  body: JSON.stringify({ name, target: 'production', files: files.map(f => ({ file: f.file, sha: f.sha, size: f.size })), projectSettings: { framework: null, buildCommand: null, installCommand: null, outputDirectory: null } })
});
console.log('deployment', dep.id, dep.readyState, 'https://' + dep.url);
let d = dep;
for (let i = 0; i < 60 && !['READY', 'ERROR', 'CANCELED'].includes(d.readyState); i++) {
  await new Promise(r => setTimeout(r, 3000));
  d = await api('/v13/deployments/' + dep.id, { headers: auth });
}
console.log('state:', d.readyState);
if (d.alias && d.alias.length) console.log('live at:', d.alias.map(a => 'https://' + a).join(' '));
