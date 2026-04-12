"use server";

import db from "../../lib/db";
import { revalidatePath } from "next/cache";

export interface TelemetryData {
  traffic?: number;
  dbSize?: number;
  computeType?: string;
  standardCost?: number;
  stacklabCost?: number;
}

export async function submitLead(formData: FormData, telemetry?: TelemetryData) {
  // 1. Extract standard fields
  const email = formData.get("email") as string;
  const name = formData.get("name") as string | null;
  const service = formData.get("service") as string | null;

  // 2. Validation Shield
  if (!email || !email.includes("@")) {
    return { success: false, message: "Invalid or missing enterprise email." };
  }

  try {
    // 3. Unified Database Injection
    await db.lead.create({
      data: {
        email: email.toLowerCase().trim(),
        name: name?.trim() || null,
        service: service?.trim() || null,
        
        // Inject telemetry if the payload originated from the Architecture Calculator
        traffic: telemetry?.traffic ?? null,
        dbSize: telemetry?.dbSize ?? null,
        computeType: telemetry?.computeType ?? null,
        standardCost: telemetry?.standardCost ?? null,
        stacklabCost: telemetry?.stacklabCost ?? null,
        
        // Dynamically flag the origin source
        source: telemetry ? "Architecture Calculator" : (service ? "Services Handshake" : "Global Network"),
      },
    });

    console.log(`[HANDSHAKE] Lead intercepted: ${email}`);
    
    // 4. Force Edge Cache Revalidation for Admin UI
    revalidatePath("/admin");
    revalidatePath("/admin/trash");

    return { success: true };
  } catch (error: any) {
    console.error("DB_ERROR:", error);
    
    // Handle Prisma unique constraint violation (duplicate emails) gracefully
    if (error.code === 'P2002') {
        return { success: false, message: "Target identity (Email) already registered." };
    }
    return { success: false, message: "Database synchronization failed." };
  }
}