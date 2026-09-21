const fs = require('fs');
const path = require('path');
const https = require('https');

const logosToDownload = [
  {
    name: 'logo-studiolotus.png',
    url: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Studio_lotus_logo.png'
  },
  {
    name: 'logo-taj.png',
    url: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/8e/Taj_Hotels_logo.svg/800px-Taj_Hotels_logo.svg.png'
  },
  {
    name: 'logo-oberoi.png',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Oberoi_Hotels_%26_Resorts_logo.svg/800px-Oberoi_Hotels_%26_Resorts_logo.svg.png'
  },
  {
    name: 'logo-itc.png',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/ITC_Hotels_logo.svg/800px-ITC_Hotels_logo.svg.png'
  }
];

const targetDir = path.join(__dirname, '../public/images');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const req = https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        return downloadFile(response.headers.location, dest).then(resolve).catch(reject);
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close(() => resolve());
      });
    });
    req.on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function run() {
  console.log('Downloading partner brand logos...\n');
  for (const item of logosToDownload) {
    const destPath = path.join(targetDir, item.name);
    try {
      await downloadFile(item.url, destPath);
      console.log(`✓ Saved: ${item.name}`);
    } catch (err) {
      console.error(`✗ Failed: ${item.name}`, err.message);
    }
  }
  console.log('\nFinished downloading partner logos.');
}

run();
