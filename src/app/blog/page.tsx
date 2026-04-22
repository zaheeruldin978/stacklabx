import db from "../../lib/db";
import BlogClient from "./BlogClient";

export const revalidate = 60; 

export default async function BlogPage() {
  const posts = await db.post.findMany({
    where: { status: "PUBLISHED", isDeleted: false },
    orderBy: { createdAt: "desc" },
    include: { category: true },
  });

  // Fetch the N-Level Tree (Up to 4 levels deep: Parent -> Child -> Grandchild -> Great-Grandchild)
  const categories = await db.category.findMany({
    where: { parentId: null },
    orderBy: { name: "asc" },
    include: {
      children: {
        orderBy: { name: "asc" },
        include: {
          children: {
            orderBy: { name: "asc" },
            include: {
              children: {
                orderBy: { name: "asc" }
              }
            }
          }
        }
      }
    }
  });

  return <BlogClient posts={posts} categories={categories} />;
}