"use server";

import { prisma } from "../../lib/prisma";

export async function migrateWordPressToPostgres() {
  const WP_API_URL = "https://stacklabx.com/wp-json/wp/v2/posts?_embed&per_page=100";

  try {
    const res = await fetch(WP_API_URL);
    const wpPosts = await res.json();

    let count = 0;
    for (const wpPost of wpPosts) {
      // We use 'upsert' which means: "If it exists, update it. If not, create it."
      await prisma.post.upsert({
        where: { wpId: wpPost.id },
        update: {}, // Don't change existing ones
        create: {
          wpId: wpPost.id,
          title: wpPost.title.rendered,
          content: wpPost.content.rendered,
          excerpt: wpPost.excerpt.rendered,
          slug: wpPost.slug,
          date: new Date(wpPost.date).toLocaleDateString(),
          image: wpPost._embedded?.['wp:featuredmedia']?.[0]?.source_url || null,
        },
      });
      count++;
    }

    return { success: true, count };
  } catch (error) {
    console.error("Migration failed:", error);
    return { success: false };
  }
}