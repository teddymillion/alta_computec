import express from 'express';
import { createServer as createViteServer } from 'vite';
import { readdir } from 'fs/promises';
import { pathToFileURL } from 'url';
import path from 'path';

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
