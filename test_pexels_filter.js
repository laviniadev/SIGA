const https = require('https');

function fetchHtml(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function test() {
  const query = 'socks';
  const html = await fetchHtml(`https://www.pexels.com/search/${query}/`);
  // Match <img src="https://images.pexels.com/photos/..." alt="..."/>
  const regex = /<img[^>]*src="https:\/\/images\.pexels\.com\/photos\/(\d+)\/[^"]+"[^>]*alt="([^"]+)"/g;
  let match;
  let matches = [];
  while ((match = regex.exec(html)) !== null) {
    if (match[2].toLowerCase().includes('sock')) {
      matches.push({ id: match[1], alt: match[2] });
    }
  }
  console.log(matches.slice(0, 5));
}

test();
