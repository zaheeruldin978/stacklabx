import { NextResponse } from "next/server";
import db from "../../../lib/db"; 
import { fetchAllPosts } from "../../../lib/wordpress"; 

const SYNC_SECRET = process.env.SYNC_SECRET || "stacklabx-secure-sync-2026";

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${SYNC_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized. Invalid Sync Token." }, { status: 401 });
    }

    console.log("🟢 [SYNC ENGINE] Fetching latest publications from WordPress...");

    const wpPosts = await fetchAllPosts(); 

    if (!wpPosts || wpPosts.length === 0) {
      return NextResponse.json({ message: "No publications found in WordPress." }, { status: 200 });
    }

    console.log(`🟢 [SYNC ENGINE] Downloaded ${wpPosts.length} posts. Synchronizing Taxonomy & Content...`);

    let syncedCount = 0;

    for (const post of wpPosts) {
      let categoryId = null;

      // 1. SYNC THE CATEGORY FIRST
      if (post.category) {
        const dbCategory = await db.category.upsert({
          where: { slug: post.category.slug },
          update: { name: post.category.name },
          create: {
            name: post.category.name,
            slug: post.category.slug,
          },
        });
        categoryId = dbCategory.id; // Grab the ID to link it to the post below
      }

      // 2. SYNC THE POST (And link the Category ID)
      await db.post.upsert({
        where: { slug: post.slug }, 
        update: {
          title: post.title || "Untitled Payload",
          excerpt: post.excerpt || "",
          content: post.content || "", 
          imageUrl: post.featuredImage || null, 
          status: "PUBLISHED",         
          isDeleted: false,
          categoryId: categoryId, // <--- LINKING THE CATEGORY
        },
        create: {
          slug: post.slug,
          title: post.title || "Untitled Payload",
          excerpt: post.excerpt || "",
          content: post.content || "", 
          imageUrl: post.featuredImage || null, 
          status: "PUBLISHED",
          categoryId: categoryId, // <--- LINKING THE CATEGORY
        },
      });
      syncedCount++;
    }

    console.log(`✅ [SYNC ENGINE] Success! ${syncedCount} articles and their categories synchronized.`);

    return NextResponse.json({ 
      success: true, 
      message: `Protocol complete. ${syncedCount} articles permanently stored.`
    }, { status: 200 });

  } catch (error: any) {
    console.error("🔴 [SYNC ENGINE] Critical Failure:", error);
    return NextResponse.json({ 
      error: "Database synchronization failed.", 
      details: error.message || "Unknown server error"
    }, { status: 500 });
  }
}