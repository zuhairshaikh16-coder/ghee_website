import JSZip from 'jszip';

// Helper to trigger browser file download from Blob
export function triggerFileDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 10000);
}

// Download existing pre-built zip via same-origin fetch (authenticated in iframe)
export async function downloadPrebuiltZip(): Promise<boolean> {
  try {
    const res = await fetch('/ghee-panjiri-website.zip');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const blob = await res.blob();
    triggerFileDownload(blob, 'ghee-panjiri-website.zip');
    return true;
  } catch (err) {
    console.warn('Pre-built zip fetch failed, falling back to dynamic bundler:', err);
    return false;
  }
}

// Complete dynamic in-browser project packager
export async function downloadDynamicProjectZip(onProgress?: (status: string) => void) {
  onProgress?.('Initializing ZIP packaging...');
  const zip = new JSZip();

  // Try fetching the prebuilt zip first
  onProgress?.('Attempting direct download...');
  const success = await downloadPrebuiltZip();
  if (success) {
    onProgress?.('Download started!');
    return;
  }

  // If pre-built failed, assemble in-memory
  onProgress?.('Packaging source files into memory...');

  // README with setup instructions
  zip.file(
    'README.md',
    `# Desi Ghee & Panjiri E-Commerce Website

Complete responsive React + Vite + Tailwind CSS storefront for handcrafted Panjiri and Pure Asli Desi Ghee.

## Quick Start (Visual Studio Code)

1. Open this folder in VS Code
2. Open terminal (\`Ctrl + \`\`)
3. Run \`npm install\`
4. Run \`npm run dev\`
5. Open http://localhost:3000 in your browser!

## Features Included:
- 100% Pure Desi Ghee & 6 Traditional Panjiri varieties with Rs. pricing
- Interactive AI Video & Canvas hero simulation (swirl hot ghee with mouse/finger)
- "Watch How Desi Ghee & Panjiri Is Made" multi-chapter interactive video section
- Pack size selection (250g, 500g, 1kg, 2kg) with instant price calculation
- Instant WhatsApp order generator & Cash on Delivery checkout
- Mobile-first responsive layout
`
  );

  // Core files
  const filePaths = [
    'package.json',
    'tsconfig.json',
    'vite.config.ts',
    'index.html',
    'metadata.json',
    'src/main.tsx',
    'src/App.tsx',
    'src/index.css',
    'src/types.ts',
    'src/data/products.ts',
    'src/components/HeroVideo.tsx',
    'src/components/HowItsMadeVideoSection.tsx',
    'src/components/ProductCard.tsx',
    'src/components/Navbar.tsx',
    'src/components/BilonaProcessSection.tsx',
    'src/components/BenefitsSection.tsx',
    'src/components/CartDrawer.tsx',
    'src/components/OriginalPosterModal.tsx',
    'src/components/DownloadZipModal.tsx',
    'src/components/Footer.tsx',
    'src/utils/downloadZip.ts',
  ];

  for (let i = 0; i < filePaths.length; i++) {
    const filePath = filePaths[i];
    onProgress?.(`Adding ${filePath} (${i + 1}/${filePaths.length})...`);
    try {
      const res = await fetch(`/${filePath}`);
      if (res.ok) {
        const text = await res.text();
        zip.file(filePath, text);
      }
    } catch (e) {
      console.warn(`Could not fetch ${filePath}:`, e);
    }
  }

  // Try adding images as binary blobs
  const imagePaths = [
    'assets/aistudio/image_9615a613.png',
    'src/assets/images/hero_bilona_ghee_pour_1793636454276.jpg',
    'src/assets/images/product_panjiri_bowl_1793636456547.jpg',
    'src/assets/images/product_a2_ghee_jar_1793636457180.jpg',
    'src/assets/images/tradition_vedic_bilona_1793636457582.jpg',
  ];

  for (const imgPath of imagePaths) {
    try {
      const res = await fetch(`/${imgPath}`);
      if (res.ok) {
        const blob = await res.blob();
        zip.file(imgPath, blob);
      }
    } catch (e) {
      console.warn(`Could not bundle image ${imgPath}:`, e);
    }
  }

  onProgress?.('Generating ZIP file (compressing)...');
  const zipBlob = await zip.generateAsync({
    type: 'blob',
    compression: 'DEFLATE',
    compressionOptions: { level: 6 },
  });

  onProgress?.('Saving file to your computer...');
  triggerFileDownload(zipBlob, 'ghee-panjiri-website.zip');
  onProgress?.('Download complete!');
}
