const fs = require('fs');
const path = require('path');
const https = require('https');

const imagesToDownload = [
  { name: 'logo.png', url: 'https://parasharlighting.com/wp-content/uploads/2024/03/cropped-Screenshot_2024-03-14_at_2.52.22_PM-removebg-preview.png' },
  { name: 'hero-1.jpg', url: 'https://parasharlighting.com/wp-content/uploads/2025/08/itcrajputana-lobby.png' },
  { name: 'hero-2.jpg', url: 'https://parasharlighting.com/wp-content/uploads/2024/07/ornate-rajasthani-villa-palladio-jaipur-is-flooded-with-vibrant-maximalist-details.jpg' },
  { name: 'hero-3.jpg', url: 'https://parasharlighting.com/wp-content/uploads/2025/09/Glass51.jpg' },
  { name: 'proj-1.jpg', url: 'https://parasharlighting.com/wp-content/uploads/2024/07/bestnewluxuryhotelinjaipurindia2.jpg' },
  { name: 'proj-2.jpg', url: 'https://parasharlighting.com/wp-content/uploads/2025/09/PHOTO-2025-03-05-10-44-45.jpg' },
  { name: 'proj-3.jpg', url: 'https://parasharlighting.com/wp-content/uploads/2025/09/PHOTO-2025-03-23-15-48-23.jpg' },
  { name: 'prod-ch1001.png', url: 'https://parasharlighting.com/wp-content/uploads/2024/03/CH1001.png' },
  { name: 'prod-ch1002.png', url: 'https://parasharlighting.com/wp-content/uploads/2024/03/CH1002.png' },
  { name: 'prod-h2001.png', url: 'https://parasharlighting.com/wp-content/uploads/2024/03/H2001.png' },
  { name: 'prod-tl3001.png', url: 'https://parasharlighting.com/wp-content/uploads/2024/03/TL3001.png' },
  { name: 'prod-vintage-1.jpg', url: 'https://parasharlighting.com/wp-content/uploads/2025/08/PHOTO-2024-01-28-11-03-54.jpg' },
  { name: 'prod-vintage-2.jpg', url: 'https://parasharlighting.com/wp-content/uploads/2025/08/PHOTO-2024-12-19-12-44-37.jpg' },
  { name: 'prod-vintage-3.jpg', url: 'https://parasharlighting.com/wp-content/uploads/2025/08/PHOTO-2024-12-24-22-57-51.jpg' },
  { name: 'prod-vintage-4.jpg', url: 'https://parasharlighting.com/wp-content/uploads/2025/08/PHOTO-2025-03-24-13-45-34.jpg' },
  { name: 'logo-fairmont.png', url: 'https://parasharlighting.com/wp-content/uploads/2025/03/fairmont-logo-png_seeklogo-51678-1.png' },
  { name: 'logo-raffles.png', url: 'https://parasharlighting.com/wp-content/uploads/2025/03/Raffles-Hotels-Resorts-Logo-1.png' },
  { name: 'logo-hilton.jpg', url: 'https://parasharlighting.com/wp-content/uploads/2025/08/28-280010_hilton-hotel-and-resort-logo-hd-png-download.jpg' },
];

const targetDir = path.join(__dirname, '../public/images');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        return downloadFile(response.headers.location, dest).then(resolve).catch(reject);
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close(() => resolve());
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function run() {
  console.log('Downloading high-resolution original images from parasharlighting.com...\n');
  for (const item of imagesToDownload) {
    const destPath = path.join(targetDir, item.name);
    try {
      await downloadFile(item.url, destPath);
      console.log(`✓ Saved: ${item.name} (${item.url})`);
    } catch (err) {
      console.error(`✗ Failed: ${item.name}`, err.message);
    }
  }
  console.log('\nAll images downloaded successfully to public/images/');
}

run();
