"use server";

import { prisma } from "../../lib/prisma"; 

export async function submitLead(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const service = formData.get("service") as string;

    if (!name || !email || !service) return { error: "Fields are required." };

    // This pushes data to your local PostgreSQL
    await prisma.lead.create({
      data: { name, email, service },
    });

    return { success: true };
  } catch (error: any) {
    if (error.code === 'P2002') return { error: "Email already registered." };
    return { error: "Database connection failed. Is PostgreSQL running?" };
  }
}