// Pointing directly to your live StacklabX WordPress database
const WP_API_URL = "https://stacklabx.com/wp-json/wp/v2";

export async function getLatestPosts() {
  try {
    // Fetching up to 100 posts at a time
    const res = await fetch(`${WP_API_URL}/posts?_embed&per_page=100`, {
      next: { revalidate: 3600 }, 
    });
    
    if (!res.ok) throw new Error("Failed to sync with WordPress");
    
    const posts = await res.json();
    return posts.map((post: any) => ({
      id: post.id,
      title: post.title.rendered,
      excerpt: post.excerpt.rendered.replace(/<[^>]+>/g, '').substring(0, 120) + "...",
      slug: post.slug,
      date: new Date(post.date).toLocaleDateString(),
      image: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null,
    }));
  } catch (error) {
    console.error("WP Sync Error:", error);
    return [];
  }
}

// NEW: This function fetches all the data, images, and formatting for ONE specific article
export async function getPostBySlug(slug: string) {
  try {
    const res = await fetch(`${WP_API_URL}/posts?_embed&slug=${slug}`, {
      next: { revalidate: 3600 },
    });
    
    if (!res.ok) throw new Error("Failed to fetch specific post");
    
    const posts = await res.json();
    if (posts.length === 0) return null;

    const post = posts[0];
    return {
      id: post.id,
      title: post.title.rendered,
      content: post.content.rendered, // THIS is the full article HTML
      date: new Date(post.date).toLocaleDateString(),
      image: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null,
    };
  } catch (error) {
    console.error("WP Single Post Error:", error);
    return null;
  }
}