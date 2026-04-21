const WP_API_URL = "https://stacklabx.com/wp-json/wp/v2";

export async function fetchAllPosts() {
  try {
    console.log("📡 [WP BRIDGE] Connecting to stacklabx.com...");

    const res = await fetch(`${WP_API_URL}/posts?_embed&per_page=100`, {
      cache: 'no-store', 
    });

    if (!res.ok) throw new Error(`WordPress API responded with status: ${res.status}`);

    const posts = await res.json();
    console.log(`📡 [WP BRIDGE] Downloaded ${posts.length} raw payloads.`);

    return posts.map((post: any) => {
      // 1. ADVANCED IMAGE EXTRACTION
      let featuredImage = null;
      
      // Standard WP Embed method
      if (post._embedded && post._embedded['wp:featuredmedia']) {
        const media = post._embedded['wp:featuredmedia'][0];
        featuredImage = media?.source_url || media?.media_details?.sizes?.full?.source_url || null;
      }
      
      // FALLBACK: Yoast SEO / RankMath Override (Very common on production sites)
      if (!featuredImage && post.yoast_head_json?.og_image?.[0]?.url) {
        featuredImage = post.yoast_head_json.og_image[0].url;
      }

      // 2. CATEGORY EXTRACTION
      let category = null;
      if (post._embedded && post._embedded['wp:term']) {
        // WordPress puts categories in the first array of wp:term
        const categories = post._embedded['wp:term'][0];
        if (categories && categories.length > 0) {
          category = {
            name: categories[0].name,
            slug: categories[0].slug,
          };
        }
      }

      console.log(`🔍 Scanner [${post.slug}]: Image: ${featuredImage ? '✅' : '❌'} | Category: ${category ? category.name : '❌'}`);

      return {
        slug: post.slug,
        title: post.title?.rendered || "Untitled Post",
        excerpt: post.excerpt?.rendered || "",
        content: post.content?.rendered || "",
        featuredImage,
        category, // Passing the extracted category to the Sync Engine
        date: post.date,
      };
    });

  } catch (error) {
    console.error("🔴 [WP BRIDGE] Connection Failure:", error);
    throw error;
  }
}

export async function getPostBySlug(slug: string) {
  return null; // Preserved to prevent build errors in old components
}