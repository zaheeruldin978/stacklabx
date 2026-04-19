"use server";

import db from "@/lib/db";
import { revalidatePath } from "next/cache";

// --- CATEGORY ACTIONS ---

export async function createCategory(formData: FormData) {
  const name = formData.get("name") as string;
  const slug = formData.get("slug") as string;
  const description = formData.get("description") as string;
  const parentId = formData.get("parentId") as string | null;

  if (!name || !slug) return { success: false, message: "Name and Slug are required." };

  try {
    await db.category.create({
      data: {
        name,
        // Enforce strict URL-safe slugs
        slug: slug.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
        description,
        parentId: parentId && parentId !== "none" ? parentId : null,
      }
    });
    
    // Instantly update the dashboard cache
    revalidatePath("/admin/taxonomy");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to deploy. Slug or Name might already exist." };
  }
}

// FIX: Accepts 'id' as a string to work securely with Next.js Server Action binding
export async function deleteCategory(id: string) {
  if (!id) return;

  try {
    await db.category.delete({ where: { id } });
    revalidatePath("/admin/taxonomy");
  } catch (error) {
    console.error("Failed to delete category", error);
  }
}