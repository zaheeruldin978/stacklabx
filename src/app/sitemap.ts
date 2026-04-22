import { MetadataRoute } from 'next';
import db from '../lib/db'; // Adjust this path if your db is located elsewhere

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://stacklabx.com'; // Replace with your actual domain when live

  // 1. Define your static core pages
  const staticRoutes = [
    '',
    '/services',
    '/portfolio',
    '/about',
    '/contact',
    '/blog',
    '/privacy',
    '/terms',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // 2. Fetch your dynamic blog posts from the database
  let dynamicRoutes: MetadataRoute.Sitemap = [];
  try {
    const posts = await db.post.findMany({
      where: { status: 'PUBLISHED', isDeleted: false },
      select: { slug: true, updatedAt: true },
    });

    dynamicRoutes = posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));
  } catch (error) {
    console.error("🔴 Failed to generate sitemap for posts:", error);
  }

  // 3. Combine and return everything to Google
  return [...staticRoutes, ...dynamicRoutes];
}