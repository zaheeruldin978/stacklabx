import db from "@/lib/db";
import AdminClient from "./AdminClient";

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  // 1. ENTERPRISE DATA HYDRATION
  const [totalAssets, publishedAssets, draftAssets, recentDeployments] = await Promise.all([
    db.post.count({ where: { isDeleted: false } }),
    db.post.count({ where: { isDeleted: false, status: 'PUBLISHED' } }),
    db.post.count({ where: { isDeleted: false, status: 'DRAFT' } }),
    db.post.findMany({ 
      where: { isDeleted: false }, 
      orderBy: { createdAt: 'desc' },
      take: 5,
      select: { title: true, slug: true, status: true, createdAt: true }
    })
  ]);

  const telemetry = {
    totalAssets,
    publishedAssets,
    draftAssets,
    recentDeployments,
    uptime: "99.99%",
    serverRegion: "ap-south-1 (Gujranwala Node)"
  };

  // 2. RENDER THE HIGH-PERFORMANCE CLIENT UI
  return <AdminClient telemetry={telemetry} />;
}