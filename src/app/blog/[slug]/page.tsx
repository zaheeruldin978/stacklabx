import db from "@/lib/db";
import { notFound } from "next/navigation";
import BlogPostClient from "./BlogPostClient";
import { Metadata } from 'next';

// --- NEW: Dynamic SEO Metadata Generator ---
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  
  // Fetch the specific post
  const post = await db.post.findUnique({
    where: { 
      slug: resolvedParams.slug, 
      status: 'PUBLISHED', 
      isDeleted: false 
    },
  });

  // Fallback if post isn't found
  if (!post) {
    return { title: 'Post Not Found | StacklabX' };
  }

  return {
    title: `${post.title} | StacklabX Insights`,
    description: post.excerpt || "Read the latest engineering and business insights from StacklabX.",
    openGraph: {
      title: post.title,
      description: post.excerpt || "Read the latest engineering and business insights from StacklabX.",
      images: post.imageUrl ? [{ url: post.imageUrl }] : [],
      type: 'article',
    },
  };
}

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

  // Your layout remains untouched here as it still calls the same client component
  return <BlogPostClient post={post} />;
}