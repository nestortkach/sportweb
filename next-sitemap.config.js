/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://byformation.com',
  generateRobotsTxt: true, // (optional)
  // ...other options
  sitemapSize: 7000,
  changefreq: 'daily',
  priority: 0.7,
  exclude: [
    '/edit-symbol',
    '/get-started',
    '/server-sitemap.xml',
    '/api/*',
    '/_next/*',
    '/blog',
    '/blog/*',
    '/experiences',
    '/experiences/*',
  ],
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://byformation.com/server-sitemap.xml',
    ],
  },
}