import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://stacklabx.com'; // Replace with your actual domain

  return {
    rules: {
      userAgent: '*', // Allow ALL search engines
      allow: '/',     // Allow them to crawl the entire site
      disallow: [
        '/api/',      // Keep search engines out of your backend API routes
        '/admin/',    // Keep them out of any admin dashboards
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}