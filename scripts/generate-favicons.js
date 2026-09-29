/**
 * Script to generate favicon PNG files from SVG
 * 
 * To use this script:
 * 1. Install sharp: npm install --save-dev sharp
 * 2. Run: node scripts/generate-favicons.js
 */

const fs = require('fs');
const path = require('path');

// Check if sharp is available
let sharp;
try {
  sharp = require('sharp');
} catch (e) {
  console.error('Error: sharp is not installed.');
  console.error('Please install it by running: npm install --save-dev sharp');
  process.exit(1);
}

const svgPath = path.join(__dirname, '../public/favicon.svg');
const publicDir = path.join(__dirname, '../public');

// Sizes to generate
const sizes = [
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'android-chrome-192x192.png', size: 192 },
  { name: 'android-chrome-512x512.png', size: 512 },
];

async function generateFavicons() {
  try {
    // Read SVG file
    const svgBuffer = fs.readFileSync(svgPath);
    
    console.log('Generating favicon files...');
    
    // Generate each size
    for (const { name, size } of sizes) {
      const outputPath = path.join(publicDir, name);
      
      await sharp(svgBuffer)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 0 }
        })
        .png()
        .toFile(outputPath);
      
      console.log(`✓ Generated ${name} (${size}x${size})`);
    }
    
    // ICO supports PNG-encoded entries. Include both standard tab-icon sizes.
    const icoPath = path.join(publicDir, 'favicon.ico');
    const icoSizes = [16, 32];
    const icoImages = await Promise.all(icoSizes.map((size) =>
      sharp(svgBuffer).resize(size, size).png().toBuffer()
    ));
    const header = Buffer.alloc(6);
    header.writeUInt16LE(1, 2); // Icon type
    header.writeUInt16LE(icoImages.length, 4);
    let offset = header.length + icoImages.length * 16;
    const entries = icoImages.map((png, index) => {
      const entry = Buffer.alloc(16);
      entry.writeUInt8(icoSizes[index], 0);
      entry.writeUInt8(icoSizes[index], 1);
      entry.writeUInt16LE(1, 4); // Color planes
      entry.writeUInt16LE(32, 6); // Bits per pixel
      entry.writeUInt32LE(png.length, 8);
      entry.writeUInt32LE(offset, 12);
      offset += png.length;
      return entry;
    });
    fs.writeFileSync(icoPath, Buffer.concat([header, ...entries, ...icoImages]));

    console.log('✓ Generated favicon.ico (16x16 and 32x32)');
    console.log('\n✅ All favicon files generated successfully!');
    
  } catch (error) {
    console.error('Error generating favicons:', error);
    process.exit(1);
  }
}

generateFavicons();
