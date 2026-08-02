const fs = require('fs');
const path = require('path');

const domain = 'https://kelurahanwatangsoreang.web.id';

const routes = [
  { path: '/', priority: '1.0', changefreq: 'daily' },
  { path: '/profil', priority: '0.8', changefreq: 'monthly' },
  { path: '/layanan', priority: '0.9', changefreq: 'monthly' },
  { path: '/aspirasi', priority: '0.8', changefreq: 'monthly' },
  { path: '/cuaca', priority: '0.9', changefreq: 'daily' },
  { path: '/peta', priority: '0.8', changefreq: 'weekly' },
  { path: '/faq', priority: '0.7', changefreq: 'monthly' },
  { path: '/kontak', priority: '0.8', changefreq: 'monthly' },
  { path: '/berita', priority: '0.9', changefreq: 'daily' },
  { path: '/pengumuman', priority: '0.9', changefreq: 'weekly' },
  { path: '/edukasi', priority: '0.7', changefreq: 'weekly' }
];

const today = new Date().toISOString().split('T')[0];

let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

routes.forEach(route => {
  xml += `  <url>\n`;
  xml += `    <loc>${domain}${route.path}</loc>\n`;
  xml += `    <lastmod>${today}</lastmod>\n`;
  xml += `    <changefreq>${route.changefreq}</changefreq>\n`;
  xml += `    <priority>${route.priority}</priority>\n`;
  xml += `  </url>\n`;
});

xml += `</urlset>\n`;

const outputPath = path.join(__dirname, 'public', 'sitemap.xml');
fs.writeFileSync(outputPath, xml, 'utf8');

console.log(`[SEO] sitemap.xml generated successfully at ${outputPath}`);
