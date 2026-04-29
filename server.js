import express from 'express';
import { createServer as createViteServer } from 'vite';
import { readdir, readFile } from 'fs/promises';
import { pathToFileURL } from 'url';
import path from 'path';

// ─── Load .env.local into process.env before anything else ───────────────────
try {
  const envText = await readFile(new URL('.env.local', import.meta.url), 'utf8');
  for (const line of envText.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const val = trimmed.slice(eq + 1).trim();
    if (key && !(key in process.env)) process.env[key] = val;
  }
} catch {
  // .env.local not found — rely on system environment
}

const PORT = 3001;

async function start() {
  const app = express();

  // Mount every api/*.js file at /api/<name>
  const apiDir = path.resolve('api');
  const files = await readdir(apiDir);
  for (const file of files) {
    if (!file.endsWith('.js')) continue;
    const name = file.replace('.js', '');
    const mod = await import(pathToFileURL(path.join(apiDir, file)).href);
    app.all(`/api/${name}`, (req, res) => mod.default(req, res));
    console.log(`  ✓ /api/${name}`);
  }

  // Forward everything else to Vite
  const vite = await createViteServer({ server: { middlewareMode: true } });
  app.use(vite.middlewares);

  app.listen(PORT, () => console.log(`Dev server running at http://localhost:${PORT}`));
}

start();
