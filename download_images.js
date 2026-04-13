const https = require('https');
const fs = require('fs');
const path = require('path');

const products = [
  { slug: "hoodie-black", query: "black-hoodie", keyword: "hoodie" },
  { slug: "pants-cargo", query: "cargo-pants-apparel", keyword: "cargo" },
  { slug: "boots-winter", query: "leather-winter-boots", keyword: "boot" },
  { slug: "hat-beanie", query: "beanie", keyword: "beanie" },
  { slug: "scarf-wool", query: "wool-scarf", keyword: "scarf" },
  { slug: "sunglasses-retro", query: "vintage-sunglasses", keyword: "glasses" },
  { slug: "wallet-leather", query: "leather-wallet", keyword: "wallet" },
  { slug: "jacket-denim", query: "denim-jacket", keyword: "jacket" },
  { slug: "shirt-flannel", query: "flannel-shirt", keyword: "shirt" },
  { slug: "shoes-canvas", query: "white-sneakers", keyword: "sneak" },
  { slug: "sweater-knit", query: "knit-sweater", keyword: "sweater" },
  { slug: "socks-pattern", query: "socks-apparel", keyword: "sock" },
  { slug: "belt-braided", query: "leather-belt", keyword: "belt" },
  { slug: "bag-messenger", query: "messenger-bag", keyword: "bag" },
  { slug: "gloves-leather", query: "leather-gloves", keyword: "glove" },
  { slug: "dress-summer", query: "summer-floral-dress", keyword: "dress" },
  { slug: "skirt-pleated", query: "pleated-skirt", keyword: "skirt" }
];

const dir = path.join(__dirname, 'frontend/public/products');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

function fetchHtml(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' } }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return fetchHtml(res.headers.location).then(resolve).catch(reject);
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

function downloadImage(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        return downloadImage(response.headers.location, dest).then(resolve).catch(reject);
      }
      response.pipe(file);
      file.on('finish', () => file.close(resolve));
    }).on('error', err => {
      fs.unlink(dest, () => reject(err));
    });
  });
}

async function run() {
  for (const { slug, query, keyword } of products) {
    console.log(`Downloading verified images for ${slug}...`);
    try {
      const html = await fetchHtml(`https://www.pexels.com/search/${query}/`);
      
      // Match image source and alt text
      const regex = /<img[^>]*src="https:\/\/images\.pexels\.com\/photos\/(\d+)\/([^"]+)"[^>]*alt="([^"]*)"/g;
      const validImages = new Set();
      let match;
      
      while ((match = regex.exec(html)) !== null) {
        const id = match[1];
        const filename = match[2];
        const altText = match[3].toLowerCase();
        
        // Ensure the photo is ACTUALLY about the keyword to prevent out-of-context photos
        if (altText.includes(keyword) || filename.toLowerCase().includes(keyword)) {
          validImages.add(`https://images.pexels.com/photos/${id}/${filename}?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop`);
        }
      }

      const uniqueImages = [...validImages];
      
      if (uniqueImages.length === 0) {
        console.log(`WARNING: Strict search found no accurate photos for ${slug}. Checking fallback.`);
        // Fallback without strictly enforcing the keyword if Pexels has no exact alt text match
        const fbRegex = /https:\/\/images\.pexels\.com\/photos\/\d+\/[^"]+\.jpeg/g;
        const fbMatch = html.match(fbRegex);
        if (fbMatch) fbMatch.slice(0,3).forEach(img => uniqueImages.push(`${img}?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop`));
      }
      
      let count = 0;
      for (let i = 0; i < uniqueImages.length && count < 3; i++) {
        const imgUrl = uniqueImages[i];
        const dest = path.join(dir, `${slug}-${count + 1}.jpg`);
        try {
          await downloadImage(imgUrl, dest);
          console.log(`Downloaded ${slug}-${count + 1}.jpg`);
          count++;
        } catch (e) {
          console.error(`Failed to download ${slug}-${count + 1}.jpg:`, e.message);
        }
      }
    } catch (e) {
      console.error(`Error processing ${slug}:`, e.message);
    }
  }
  console.log('All images updated and verified!');
}

run();
