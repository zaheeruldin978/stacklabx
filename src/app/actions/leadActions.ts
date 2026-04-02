"use server";

import { prisma } from "../../lib/prisma"; 
import { revalidatePath } from "next/cache";

// 1. Action to create a new lead (from your Services page)
export async function submitLead(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const service = formData.get("service") as string;

    if (!name || !email || !service) return { error: "Fields are required." };

    await prisma.lead.create({
      data: { name, email, service },
    });

    revalidatePath("/admin"); // Updates the dashboard automatically
    return { success: true };
  } catch (error: any) {
    if (error.code === 'P2002') return { error: "Email already registered." };
    return { error: "Database connection failed." };
  }
}

// 2. NEW: Action to delete a lead (from your Admin page)
export async function deleteLead(id: string) {
  try {
    await prisma.lead.delete({
      where: { id },
    });
    revalidatePath("/admin"); // Refreshes the table after deletion
    return { success: true };
  } catch (error) {
    return { error: "Failed to delete lead from PostgreSQL." };
  }
}