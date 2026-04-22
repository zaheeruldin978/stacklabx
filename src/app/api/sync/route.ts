import { NextResponse } from "next/server";
import db from "../../../lib/db"; 
import { fetchAllPosts, fetchCategories } from "../../../lib/wordpress"; 

const SYNC_SECRET = process.env.SYNC_SECRET || "stacklabx-secure-sync-2026";

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${SYNC_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    console.log("🟢 [SYNC ENGINE] Protocol Initiated for N-Level Tree...");

    const wpCategories = await fetchCategories();
    const wpIdToDbIdMap = new Map();

    // ============================================================================
    // PHASE 1: CREATE ALL CATEGORIES (Unlinked)
    // We must create everything first to generate Prisma DB IDs for the mapping.
    // ============================================================================
    for (const cat of wpCategories) {
      const dbCat = await db.category.upsert({
        where: { slug: cat.slug },
        update: { name: cat.name },
        create: { name: cat.name, slug: cat.slug },
      });
      wpIdToDbIdMap.set(cat.wpId, dbCat.id);
    }

    // ============================================================================
    // PHASE 2: LINK THE N-LEVEL HIERARCHY
    // Now that everything exists, we safely link parents to children 4-levels deep.
    // ============================================================================
    for (const cat of wpCategories) {
      if (cat.parentWpId) {
        const parentDbId = wpIdToDbIdMap.get(cat.parentWpId);
        if (parentDbId) {
          await db.category.update({
            where: { id: wpIdToDbIdMap.get(cat.wpId) },
            data: { parentId: parentDbId },
          });
        }
      }
    }
    console.log(`✅ [SYNC ENGINE] N-Level Taxonomy Tree reconstructed.`);

    // ============================================================================
    // PHASE 3: CONTENT SYNC
    // ============================================================================
    const wpPosts = await fetchAllPosts(); 
    let syncedCount = 0;

    for (const post of wpPosts) {
      const actualCategoryId = post.wpCategoryId ? wpIdToDbIdMap.get(post.wpCategoryId) || null : null;

      await db.post.upsert({
        where: { slug: post.slug }, 
        update: {
          title: post.title || "Untitled",
          excerpt: post.excerpt || "",
          content: post.content || "", 
          imageUrl: post.featuredImage || null, 
          status: "PUBLISHED",         
          isDeleted: false,
          categoryId: actualCategoryId, 
        },
        create: {
          slug: post.slug,
          title: post.title || "Untitled",
          excerpt: post.excerpt || "",
          content: post.content || "", 
          imageUrl: post.featuredImage || null, 
          status: "PUBLISHED",
          categoryId: actualCategoryId, 
        },
      });
      syncedCount++;
    }

    return NextResponse.json({ success: true, message: `Synced ${syncedCount} articles.` }, { status: 200 });

  } catch (error: any) {
    return NextResponse.json({ error: "Sync failed.", details: error.message }, { status: 500 });
  }
}