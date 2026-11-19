import { readdir, readFile } from 'node:fs/promises';
import { createServer } from 'node:http';

const host = '127.0.0.1';
const port = Number(process.env.PORT ?? 4174);
const iconFolder = '../public/assets/icons/Windows_XP - Icons_Kit/';
const routes = new Map([
  ['/', ['./index.html', 'text/html; charset=utf-8']],
  ['/design-system.css', ['./design-system.css', 'text/css; charset=utf-8']],
  ['/styles.css', ['./styles.css', 'text/css; charset=utf-8']],
  ['/assets/fonts/VT323-Regular.ttf', ['../public/assets/fonts/VT323-Regular.ttf', 'font/ttf']],
  ['/session.mjs', ['./session.mjs', 'text/javascript; charset=utf-8']],
  ['/desktop/', ['./desktop/index.html', 'text/html; charset=utf-8']],
  ['/desktop/styles.css', ['./desktop/styles.css', 'text/css; charset=utf-8']],
  ['/desktop/desktop.js', ['./desktop/desktop.js', 'text/javascript; charset=utf-8']],
  ['/desktop/windows.mjs', ['./desktop/windows.mjs', 'text/javascript; charset=utf-8']],
  ['/desktop/apps/internet/internet.mjs', ['./desktop/apps/internet/internet.mjs', 'text/javascript; charset=utf-8']],
  ['/desktop/apps/internet/years-2000.mjs', ['./desktop/apps/internet/years-2000.mjs', 'text/javascript; charset=utf-8']],
  ['/desktop/apps/internet/styles.css', ['./desktop/apps/internet/styles.css', 'text/css; charset=utf-8']],
  ['/assets/flag.png', [iconFolder + 'Windows Flag.png', 'image/png']],
  ['/assets/profile-logo.png', ['../public/assets/logo/Windows_XP_Logo.png', 'image/png']],
  ['/assets/user.png', [iconFolder + 'User Account.png', 'image/png']],
  ['/assets/wallpaper.jpg', ['../public/assets/wallpapers/Windows_XP - Wallpaper_hd.jpg', 'image/jpeg']],
]);
for (const icon of await readdir(new URL(iconFolder, import.meta.url))) {
  if (icon.endsWith('.png')) {
    routes.set('/desktop/icons/' + encodeURIComponent(icon), [iconFolder + icon, 'image/png']);
  }
}

const server = createServer(async (request, response) => {
  if (!['GET', 'HEAD'].includes(request.method)) {
    response.writeHead(405, { Allow: 'GET, HEAD' }).end();
    return;
  }
  const route = routes.get(request.url.split('?', 1)[0]);
  if (!route) {
    response.writeHead(404).end();
    return;
  }
  const [path, contentType] = route;
  try {
    const contents = await readFile(new URL(path, import.meta.url));
    response.writeHead(200, { 'Content-Type': contentType, 'Content-Length': contents.length });
    response.end(request.method === 'HEAD' ? undefined : contents);
  } catch (error) {
    console.error(path, error.message);
    response.writeHead(error.code === 'ENOENT' ? 404 : 500).end();
  }
});

server.on('error', error => {
  console.error('Impossible de lancer Rewind XP V1.', error.message);
  process.exitCode = 1;
});
server.listen(port, host, () => console.log(`Rewind XP V1 : http://${host}:${server.address().port}/`));
