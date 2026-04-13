const https = require('https');

function fetchHtml(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return fetchHtml(res.headers.location).then(resolve).catch(reject);
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

fetchHtml('https://www.pexels.com/search/hoodie/')
  .then(html => {
    const urls = html.match(/https:\/\/images\.pexels\.com\/photos\/\d+\/pexels-photo-\d+\.jpeg/g);
    console.log(urls ? [...new Set(urls)].slice(0, 5) : 'No matches found');
  })
  .catch(console.error);
