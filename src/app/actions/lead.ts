"use server";

import db from "../../lib/db";

export interface TelemetryData {
  traffic?: number;
  dbSize?: number;
  computeType?: string;
  standardCost?: number;
  stacklabCost?: number;
}

export async function submitLead(formData: FormData, telemetry?: TelemetryData) {
  const email = formData.get("email") as string;
  if (!email || !email.includes("@")) return { success: false, message: "Invalid email." };

  try {
    await db.lead.create({
      data: {
        email: email.toLowerCase().trim(),
        traffic: telemetry?.traffic ?? null,
        dbSize: telemetry?.dbSize ?? null,
        computeType: telemetry?.computeType ?? null,
        standardCost: telemetry?.standardCost ?? null,
        stacklabCost: telemetry?.stacklabCost ?? null,
        source: telemetry ? "Architecture Calculator" : "Global Homepage",
      },
    });

    console.log(`[HANDSHAKE] Lead intercepted: ${email}`);
    return { success: true };
  } catch (error) {
    console.error("DB_ERROR:", error);
    return { success: false };
  }
}