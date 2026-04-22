import db from "../lib/db"; 
import HomeClient from "./HomeClient";

// 1. This tells Next.js to pre-build this page and refresh it every 60 seconds
// This means page load speed will be completely instantaneous for users.
export const revalidate = 60; 

export default async function HomePage() {
  
  // 2. Fetch the 3 newest published blogs from your actual database
  let recentPosts = [];
  try {
    recentPosts = await db.post.findMany({
      where: { status: "PUBLISHED", isDeleted: false },
      orderBy: { createdAt: "desc" },
      take: 3,
      include: { category: true },
    });
  } catch (error) {
    console.error("🔴 Failed to fetch posts for homepage:", error);
    // If DB fails, recentPosts remains empty array, and UI degrades gracefully
  }

  // 3. Pass the data instantly to the blazing fast Client UI
  return <HomeClient recentPosts={recentPosts} />;
}