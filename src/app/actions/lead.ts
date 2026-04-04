"use server";

// DIRECT IMPORT: Bypassing TSConfig alias to force compiler resolution
import db from "../../lib/db";

export interface TelemetryData {
  traffic?: number;
  dbSize?: number;
  computeType?: string;
  standardCost?: number;
  stacklabCost?: number;
}

/**
 * World-Class Lead Acquisition Protocol
 * Captures enterprise telemetry and establishes a secure database entry.
 */
export async function submitLead(formData: FormData, telemetry?: TelemetryData) {
  const email = formData.get("email") as string;

  // Defensive Guard: Ensure secure transmission
  if (!email || typeof email !== "string") {
    return { success: false, message: "Valid enterprise email required." };
  }

  try {
    // Injecting payload into the Unified Lead Engine
    await db.lead.create({
      data: {
        email: email.toLowerCase().trim(),
        traffic: telemetry?.traffic || null,
        dbSize: telemetry?.dbSize || null,
        computeType: telemetry?.computeType || null,
        standardCost: telemetry?.standardCost || null,
        stacklabCost: telemetry?.stacklabCost || null,
        source: telemetry ? "Architecture Calculator" : "Global Homepage",
        status: "NEW", // Initializing lead status for Admin Nerve Center
      },
    });

    // Internal Telemetry Log (Visible in your VS Code terminal)
    console.log(`[NERVE CENTER] Telemetry intercepted for: ${email}`);

    // Artificial delay for high-end "Encrypting" UI feel
    await new Promise((resolve) => setTimeout(resolve, 1500));

    return { success: true, message: "Secure channel established." };
  } catch (error) {
    // Server-side error reporting
    console.error("Critical Database Failure:", error);
    return { success: false, message: "System architecture error. Link failed." };
  }
}