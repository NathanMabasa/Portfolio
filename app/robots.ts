import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: 'https://nathanmabasa.com/sitemap.xml',
    host: 'https://nathanmabasa.com',
  }
}
