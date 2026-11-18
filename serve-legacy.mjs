import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';

const host = '127.0.0.1';
const port = Number(process.env.PORT ?? 4173);
const prototype = '/legacy/Rewind_Xp_Prototype_v1.html';
const assets = [
  ['bliss.jpg', 'wallpapers/Windows_XP - Wallpaper_hd.jpg', 'image/jpeg'],
  ['Windows%20Flag.png', 'icons/Windows_XP - Icons_Kit/Windows Flag.png', 'image/png'],
];
const routes = new Map([[prototype, ['.' + prototype, 'text/html; charset=utf-8']]]);
for (const [name, file, type] of assets) {
  routes.set('/legacy/assets/' + name, ['./public/assets/' + file, type]);
}

const server = createServer(async (request, response) => {
  const pathname = request.url.split('?', 1)[0];
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    response.writeHead(405, { Allow: 'GET, HEAD' }).end();
    return;
  }
  if (pathname === '/') {
    response.writeHead(302, { Location: prototype }).end();
    return;
  }
  const route = routes.get(pathname);
  if (!route) {
    response.writeHead(404).end('Fichier introuvable');
    return;
  }
  const [file, type] = route;
  try {
    const data = await readFile(new URL(file, import.meta.url));
    response.writeHead(200, { 'Content-Type': type, 'Content-Length': data.length });
    response.end(request.method === 'HEAD' ? undefined : data);
  } catch (error) {
    console.error(file, error.message);
    response.writeHead(error.code === 'ENOENT' ? 404 : 500).end();
  }
});

server.on('error', (error) => {
  console.error('Impossible de lancer le prototype.', error.message);
  process.exitCode = 1;
});
server.listen(port, host, () => {
  console.log(`Rewind XP : http://${host}:${server.address().port}/`);
});
