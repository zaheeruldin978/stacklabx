"use server";

import db from "../../lib/db";
import { revalidatePath } from "next/cache";

export async function publishArticle(formData: FormData) {
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const excerpt = formData.get("excerpt") as string;
  const content = formData.get("content") as string;
  const image = formData.get("image") as string;

  // 1. Validation Shield
  if (!title || !slug || !content) {
    return { success: false, message: "Critical fields missing. Payload rejected." };
  }

  try {
    // 2. Algorithmically bypass the old WordPress ID requirement
    // Generates a unique 9-digit integer to satisfy the schema without migrations
    const simulatedWpId = Math.floor(100000000 + Math.random() * 900000000);
    
    // Format the date to match your schema's String requirement (e.g., "April 6, 2026")
    const dateStr = new Date().toLocaleDateString('en-US', { 
      year: 'numeric', month: 'long', day: 'numeric' 
    });

    // 3. Database Injection
    await db.post.create({
      data: {
        wpId: simulatedWpId,
        title: title.trim(),
        slug: slug.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
        excerpt: excerpt.trim(),
        content: content.trim(),
        image: image || null,
        date: dateStr,
      },
    });

    // 4. Force Edge Cache Revalidation
    // This tells Next.js 15 to instantly update the live blog without a server restart
    revalidatePath("/blog");
    revalidatePath("/");

    return { success: true, message: "Article injected into Global Network." };
  } catch (error: any) {
    console.error("PUBLISHING_FAILURE:", error);
    
    // Check for duplicate slugs
    if (error.code === 'P2002') {
      return { success: false, message: "URL Slug already exists. Choose a unique path." };
    }
    
    return { success: false, message: "Database write failure." };
  }
}