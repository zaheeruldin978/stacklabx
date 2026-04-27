import { servicesConfig } from "@/lib/servicesData";
import ServiceClient from "./ServiceClient";
import { notFound } from "next/navigation";

// --- NEXT.JS STATIC SITE GENERATOR (SSG) ---
// This safely generates all 40 pages at build time from our Data Hub
export async function generateStaticParams() {
  return servicesConfig.map((service) => ({
    service: service.slug,
  }));
}

// --- SERVER COMPONENT SHELL ---
export default async function Page({ params }: { params: Promise<{ service: string }> }) {
  // In Next.js 15+, params is a Promise that must be awaited
  const resolvedParams = await params;
  const slug = resolvedParams.service;

  // Security layer: If a user tries to type a URL that doesn't exist, throw a 404
  const serviceExists = servicesConfig.find(s => s.slug === slug);
  if (!serviceExists) {
    notFound();
  }

  return <ServiceClient slug={slug} />;
}