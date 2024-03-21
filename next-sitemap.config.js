// eslint-disable-next-line no-undef
const SITEMAP_URL = process.env.SITEMAP_URL || 'https://localhost:3000';

/** @type {import('next-sitemap').IConfig} */
// eslint-disable-next-line no-undef
module.exports = {
  siteUrl: SITEMAP_URL || 'https://localhost:3000',
  generateRobotsTxt: true,
  exclude: ['/server-sitemap-index.xml', '/static/*', '/xrml/*'],
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/', disallow: ['/static*/', '/xrml*/', '/400'] }],
    additionalSitemaps: [
      `${SITEMAP_URL}/server-sitemap.xml`,
      `${SITEMAP_URL}/en/server-sitemap.xml`,
      `${SITEMAP_URL}/ja/server-sitemap.xml`,
    ],
  },
};
