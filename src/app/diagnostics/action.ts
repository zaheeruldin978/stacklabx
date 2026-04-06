"use server";

import db from "@/lib/db";
import { revalidatePath } from "next/cache";

/**
 * STACKLABX DIAGNOSTIC INJECTION PROTOCOL
 * Optimized for high-frequency lead generation and real-time dashboard sync.
 */
export async function submitDiagnostic(formData: FormData) {
  // 1. DATA EXTRACTION
  const email = formData.get("email") as string;
  const trafficRaw = formData.get("traffic");
  const computeType = formData.get("computeType") as string;

  // 2. ENTERPRISE VALIDATION LAYER
  if (!email || !email.includes("@")) {
    return { 
      success: false, 
      error: "System requires a valid enterprise email for report generation." 
    };
  }

  // Convert traffic to integer safely
  const traffic = parseInt(trafficRaw as string) || 0;

  try {
    // 3. SECURE DATABASE INJECTION
    // We let the Prisma Schema handle 'status' (NEW) and 'isDeleted' (false) via defaults
    await db.lead.create({
      data: {
        email: email.toLowerCase().trim(), // Sanitize email
        traffic: traffic,
        computeType: computeType || "Cloud Architecture",
        source: "Diagnostic Matrix Tool",
      }
    });

    // 4. REAL-TIME CACHE REVALIDATION
    // This is the "World Class" part: It forces the /admin page to refresh its data
    // so the lead appears on your dashboard the split-second it is submitted.
    revalidatePath("/admin");

    return { success: true };
  } catch (error) {
    // Log the error with a high-visibility prefix for server logs
    console.error("CRITICAL_DIAGNOSTIC_FAILURE:", error);
    
    return { 
      success: false, 
      error: "Protocol transmission failed. Please verify infrastructure and retry." 
    };
  }
}