"use server";

import db from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function getArticle(slug: string) {
  try {
    return await db.post.findUnique({ where: { slug } });
  } catch (error) {
    console.error("FETCH_ERROR:", error);
    return null;
  }
}

export async function updateArticle(formData: FormData, originalSlug: string) {
  try {
    const title = formData.get("title") as string;
    const newSlug = formData.get("slug") as string;
    const excerpt = formData.get("excerpt") as string;
    const content = formData.get("content") as string;
    const image = formData.get("image") as string;

    await db.post.update({
      where: { slug: originalSlug },
      data: {
        title,
        slug: newSlug,
        excerpt,
        content,
        image: image || null,
      }
    });

    // Force edge cache refresh across all potential routes
    revalidatePath("/admin/protocols");
    revalidatePath("/blog");
    revalidatePath(`/blog/${newSlug}`);

    return { success: true, message: "Payload Updated & Synchronized." };
  } catch (error: any) {
    console.error("UPDATE_ERROR:", error);
    if (error.code === 'P2002') return { success: false, message: "URL Slug already exists." };
    return { success: false, message: "Database update failed." };
  }
}