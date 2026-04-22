const WP_API_URL = "https://stacklabx.com/wp-json/wp/v2";

// --- 1. FETCH ALL CATEGORIES WITH HIERARCHY ---
export async function fetchCategories() {
  try {
    console.log("📡 [WP BRIDGE] Downloading Taxonomy Tree...");
    
    // Fetch categories (per_page=100 ensures we get the full tree)
    const res = await fetch(`${WP_API_URL}/categories?per_page=100`, { cache: 'no-store' });
    if (!res.ok) throw new Error("Failed to fetch categories");

    const wpCategories = await res.json();
    
    // Map them into a clean format, tracking the parent ID
    const categories = wpCategories.map((cat: any) => ({
      wpId: cat.id, 
      name: cat.name,
      slug: cat.slug,
      parentWpId: cat.parent !== 0 ? cat.parent : null, // 0 in WP means it's a top-level parent
    }));

    console.log(`✅ [WP BRIDGE] Found ${categories.length} Categories.`);
    return categories;

  } catch (error) {
    console.error("🔴 [WP BRIDGE] Category Sync Failed:", error);
    return [];
  }
}

// --- 2. FETCH ALL POSTS ---
export async function fetchAllPosts() {
  try {
    console.log("📡 [WP BRIDGE] Connecting to stacklabx.com for publications...");

    const res = await fetch(`${WP_API_URL}/posts?_embed&per_page=100`, {
      cache: 'no-store', 
    });

    if (!res.ok) throw new Error(`WordPress API responded with status: ${res.status}`);

    const posts = await res.json();
    console.log(`📡 [WP BRIDGE] Downloaded ${posts.length} raw payloads.`);

    return posts.map((post: any) => {
      // 1. ADVANCED IMAGE EXTRACTION
      let featuredImage = null;
      if (post._embedded && post._embedded['wp:featuredmedia']) {
        const media = post._embedded['wp:featuredmedia'][0];
        featuredImage = media?.source_url || media?.media_details?.sizes?.full?.source_url || null;
      }
      if (!featuredImage && post.yoast_head_json?.og_image?.[0]?.url) {
        featuredImage = post.yoast_head_json.og_image[0].url;
      }

      // 2. RAW CATEGORY ID EXTRACTION
      let wpCategoryId = null;
      if (post.categories && post.categories.length > 0) {
        wpCategoryId = post.categories[0]; // Grab the primary WP Category ID
      }

      return {
        slug: post.slug,
        title: post.title?.rendered || "Untitled Post",
        excerpt: post.excerpt?.rendered || "",
        content: post.content?.rendered || "",
        featuredImage,
        wpCategoryId, // Passing the raw ID to the Sync Engine to link it
        date: post.date,
      };
    });

  } catch (error) {
    console.error("🔴 [WP BRIDGE] Connection Failure:", error);
    throw error;
  }
}

export async function getPostBySlug(slug: string) {
  return null; // Preserved to prevent build errors
}