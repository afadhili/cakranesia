import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://cakranesia.com";

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/auth/sign-in`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/auth/sign-up`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/auth/forgot-password`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.4,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.4,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/komunitas`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/tentang`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/kontak`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
  ];

  // TODO: Add dynamic pages when database is ready
  // Example for recipes:
  // const recipes = await db.query.recipes.findMany({
  //   columns: { slug: true, updatedAt: true },
  // });
  // const recipePages = recipes.map((recipe) => ({
  //   url: `${baseUrl}/recipe/${recipe.slug}`,
  //   lastModified: recipe.updatedAt,
  //   changeFrequency: "weekly" as const,
  //   priority: 0.8,
  // }));

  // TODO: Add blog posts
  // const posts = await db.query.blogs.findMany({
  //   columns: { slug: true, updatedAt: true },
  // });
  // const blogPages = posts.map((post) => ({
  //   url: `${baseUrl}/blog/${post.slug}`,
  //   lastModified: post.updatedAt,
  //   changeFrequency: "monthly" as const,
  //   priority: 0.6,
  // }));

  // TODO: Add province pages
  // const provinces = [
  //   "aceh", "sumatra-utara", "sumatra-barat", "riau", "jambi",
  //   "sumatra-selatan", "bengkulu", "lampung", "bangka-belitung",
  //   "kepulauan-riau", "dki-jakarta", "jawa-barat", "jawa-tengah",
  //   "di-yogyakarta", "jawa-timur", "banten", "bali", "nusa-tenggara-barat",
  //   "nusa-tenggara-timur", "kalimantan-barat", "kalimantan-tengah",
  //   "kalimantan-selatan", "kalimantan-timur", "kalimantan-utara",
  //   "sulawesi-utara", "sulawesi-tengah", "sulawesi-selatan",
  //   "sulawesi-tenggara", "gorontalo", "sulawesi-barat", "maluku",
  //   "maluku-utara", "papua-barat", "papua"
  // ];
  // const provincePages = provinces.map((province) => ({
  //   url: `${baseUrl}/provinsi/${province}`,
  //   lastModified: new Date(),
  //   changeFrequency: "weekly" as const,
  //   priority: 0.7,
  // }));

  return [
    ...staticPages,
    // ...recipePages,
    // ...blogPages,
    // ...provincePages,
  ];
}
