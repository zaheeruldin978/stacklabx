import db from "@/lib/db";
import { notFound } from "next/navigation";
import BlogPostClient from "./BlogPostClient";

export const dynamic = 'force-dynamic';

export default async function SingleBlogPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  
  const post = await db.post.findUnique({
    where: { 
      slug: resolvedParams.slug,
      isDeleted: false 
    }
  });

  if (!post) {
    notFound();
  }

  return <BlogPostClient post={post} />;
}