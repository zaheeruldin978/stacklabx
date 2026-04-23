"use server";

import db from "../../lib/db";
import { revalidatePath } from "next/cache";

export async function publishArticle(formData: FormData) {
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const excerpt = formData.get("excerpt") as string;
  const content = formData.get("content") as string;
  const image = formData.get("image") as string;
  const status = (formData.get("status") as string) || "PUBLISHED";

  const category = (formData.get("category") as string) || "Uncategorized";
  const visibility = (formData.get("visibility") as string) || "PUBLIC";
  
  // Parse tags securely (Fallback to empty array)
  const tagsRaw = formData.get("tags") as string;
  let tags: string[] = [];
  try { tags = tagsRaw ? JSON.parse(tagsRaw) : []; } catch (e) { tags = []; }

  // Parse Scheduled Date
  const publishedAtRaw = formData.get("publishedAt") as string;
  const publishedAt = publishedAtRaw ? new Date(publishedAtRaw) : new Date();

  // 1. Validation Shield
  if (!title || !slug || !content) {
    return { success: false, message: "Critical fields missing. Payload rejected." };
  }

  // Generate a safe slug specifically for the Category
  const categorySlug = category.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

  try {
    // 2. Secure Database Injection
    await db.post.create({
      data: {
        title: title.trim(),
        slug: slug.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
        excerpt: excerpt?.trim() || "",
        content: content.trim(),
        imageUrl: image || null,
        status: status,
        visibility: visibility,
        publishedAt: publishedAt,
        
        // Relational Mapping: Category
        category: {
          connectOrCreate: {
            where: { name: category },
            create: { 
              name: category,
              slug: categorySlug 
            }
          }
        },
        
        // ELITE FIX: Relational Mapping for Multiple Tags
        tags: {
          connectOrCreate: tags.map((tagName: string) => {
            const tagSlug = tagName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
            return {
              where: { name: tagName },
              create: { 
                name: tagName, 
                slug: tagSlug 
              }
            };
          })
        },
      },
    });

    // 3. Force Edge Cache Revalidation
    revalidatePath("/admin");
    revalidatePath("/blog");
    revalidatePath("/");

    return { 
      success: true, 
      message: status === "DRAFT" ? "Draft saved securely to vault." : "Protocol Deployed to Global Network." 
    };

  } catch (error: any) {
    console.error("PUBLISHING_FAILURE:", error);
    
    // Catch Duplicate Slugs Instantly
    if (error.code === 'P2002') {
      return { success: false, message: "CRITICAL: URL Slug already exists. Choose a unique path." };
    }

    // ELITE DEBUGGING
    const exactError = error.message ? error.message.split('\n').pop() : "Unknown system failure";
    
    return { success: false, message: `DB Schema Error: ${exactError}` };
  }
}