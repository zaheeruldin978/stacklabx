import db from "../../lib/db";
import BlogClient from "./BlogClient";

export const revalidate = 60; 

export default async function BlogPage() {
  const posts = await db.post.findMany({
    where: { status: "PUBLISHED", isDeleted: false },
    orderBy: { createdAt: "desc" },
    include: {
      category: true, 
    },
  });

  // Fetch only top-level categories, but include their children
  const categories = await db.category.findMany({
    where: { parentId: null }, // Only grab main categories
    orderBy: { name: "asc" },
    include: {
      children: {
        orderBy: { name: "asc" }
      }
    }
  });

  return <BlogClient posts={posts} categories={categories} />;
}