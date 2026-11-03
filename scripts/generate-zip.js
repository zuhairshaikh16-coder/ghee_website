import fs from 'fs';
import path from 'path';
import JSZip from 'jszip';

const zip = new JSZip();
const rootDir = process.cwd();

const EXCLUDE_DIRS = new Set(['node_modules', '.git', 'dist', '.cache']);
const EXCLUDE_FILES = new Set(['.DS_Store']);

function addDirectoryToZip(currentDir, zipFolder) {
  const items = fs.readdirSync(currentDir);
  for (const item of items) {
    if (EXCLUDE_DIRS.has(item) || EXCLUDE_FILES.has(item)) continue;
    // Don't zip existing zip file if in public
    if (item.endsWith('.zip')) continue;

    const fullPath = path.join(currentDir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      const subFolder = zipFolder.folder(item);
      addDirectoryToZip(fullPath, subFolder);
    } else {
      const content = fs.readFileSync(fullPath);
      zipFolder.file(item, content);
    }
  }
}

async function buildZip() {
  console.log('Packaging project into ZIP...');
  addDirectoryToZip(rootDir, zip);

  const publicDir = path.join(rootDir, 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const zipBuffer = await zip.generateAsync({
    type: 'nodebuffer',
    compression: 'DEFLATE',
    compressionOptions: { level: 6 }
  });

  const targetPath = path.join(publicDir, 'ghee-panjiri-store.zip');
  fs.writeFileSync(targetPath, zipBuffer);
  console.log(`Created zip at ${targetPath} (${(zipBuffer.length / 1024 / 1024).toFixed(2)} MB)`);
}

buildZip().catch(console.error);
