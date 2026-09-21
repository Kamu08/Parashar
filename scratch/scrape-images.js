const fs = require('fs');
const path = require('path');
const https = require('https');

const pageUrls = [
  'https://parasharlighting.com/',
  'https://parasharlighting.com/products/',
  'https://parasharlighting.com/projects/',
  'https://parasharlighting.com/product-category/chandelier/',
  'https://parasharlighting.com/product-category/hanging/',
  'https://parasharlighting.com/product-category/lamp/',
  'https://parasharlighting.com/collections/',
];

function fetchPage(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function main() {
  const allImages = new Set();

  for (const pageUrl of pageUrls) {
    try {
      console.log('Fetching:', pageUrl);
      const html = await fetchPage(pageUrl);
      // Match all wp-content/uploads images
      const matches = html.match(/https?:\/\/[^\s"'<>]+\.(?:png|jpg|jpeg|webp)/g) || [];
      matches.forEach((imgUrl) => {
        if (imgUrl.includes('wp-content/uploads') || imgUrl.includes('parasharlighting.com')) {
          // Remove thumbnail dimensions like -300x300, -150x150, -1024x1024 to get FULL RESOLUTION original image
          const fullResUrl = imgUrl.replace(/-\d+x\d+\.(jpg|jpeg|png|webp)$/i, '.$1');
          allImages.add(fullResUrl);
        }
      });
    } catch (err) {
      console.error('Error fetching:', pageUrl, err.message);
    }
  }

  console.log('\nExtracted Full-Resolution Image URLs:');
  const imageList = Array.from(allImages);
  imageList.forEach((url, index) => {
    console.log(`${index + 1}: ${url}`);
  });

  // Save to JSON scratch file
  const scratchDir = path.join(__dirname, '../scratch');
  if (!fs.existsSync(scratchDir)) {
    fs.mkdirSync(scratchDir, { recursive: true });
  }
  fs.writeFileSync(
    path.join(scratchDir, 'extracted-images.json'),
    JSON.stringify(imageList, null, 2)
  );

  console.log(`\nSaved ${imageList.length} full-resolution image URLs to extracted-images.json`);
}

main();
