import fs from 'fs';
import path from 'path';

const rootDir = process.cwd();
const publicDir = path.join(rootDir, 'public');
const distDir = path.join(rootDir, 'dist');
const manifestPath = path.join(publicDir, 'vite', '.vite', 'manifest.json');

// 1. Recursive copy function
function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();

  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach((childItemName) => {
      copyRecursiveSync(
        path.join(src, childItemName),
        path.join(dest, childItemName)
      );
    });
  } else if (exists) {
    const destDir = path.dirname(dest);
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }
    fs.copyFileSync(src, dest);
  }
}

// 2. Clear and recreate dist
if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true, force: true });
}
fs.mkdirSync(distDir, { recursive: true });

// 3. Copy public/ contents to dist/
copyRecursiveSync(publicDir, distDir);

// 4. Parse manifest.json to get compiled JS and CSS paths
let jsFile = '';
let cssFile = '';

if (fs.existsSync(manifestPath)) {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  const jsxEntry = manifest['entrypoints/application.jsx'];
  if (jsxEntry) {
    jsFile = jsxEntry.file;
    if (jsxEntry.css && jsxEntry.css.length > 0) {
      cssFile = jsxEntry.css[0];
    }
  }
}

// 5. Write static index.html into dist/
const indexHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Crafta Creatives | Digital & Creative Media Studio</title>
    <link rel="icon" type="image/svg+xml" href="/icon.svg" />
    ${cssFile ? `<link rel="stylesheet" href="/vite/${cssFile}" />` : ''}
    ${jsFile ? `<script type="module" src="/vite/${jsFile}"></script>` : ''}
  </head>
  <body class="bg-gray-50 text-gray-900 selection:bg-blue-600 selection:text-white">
    <div id="root"></div>
  </body>
</html>`;

fs.writeFileSync(path.join(distDir, 'index.html'), indexHtml);
console.log('✅ Static build complete! Output written to dist/');
