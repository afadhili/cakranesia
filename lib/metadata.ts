import { Metadata } from "next";

// Base site configuration
export const siteConfig = {
  name: "Cakranesia",
  tagline: "Melestarikan Cita Rasa Indonesia",
  description:
    "Platform komunitas pecinta kuliner Indonesia. Temukan resep autentik, berbagi cerita kuliner, dan jelajahi kekayaan cita rasa Nusantara dari Sabang sampai Merauke.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://cakranesia.com",
  ogImage: "/og-image.jpg",
  keywords: [
    "kuliner indonesia",
    "resep indonesia",
    "makanan nusantara",
    "resep tradisional",
    "masakan indonesia",
    "kuliner nusantara",
    "resep daerah",
    "makanan khas indonesia",
    "food blog indonesia",
    "komunitas kuliner",
    "resep masakan",
    "cita rasa indonesia",
    "kuliner tradisional",
    "makanan daerah",
    "resep autentik",
  ],
  author: {
    name: "Cakranesia",
    email: "id.cakranesia@gmail.com",
    url: "https://cakranesia.com",
  },
  social: {
    twitter: "@cakranesia",
    instagram: "@cakranesia",
    facebook: "cakranesia",
  },
};

interface MetadataProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: "website" | "article" | "profile";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  section?: string;
  tags?: string[];
  noIndex?: boolean;
}

/**
 * Generate comprehensive metadata for SEO
 */
export function generateMetadata({
  title,
  description = siteConfig.description,
  keywords = [],
  image = siteConfig.ogImage,
  url = "",
  type = "website",
  publishedTime,
  modifiedTime,
  authors,
  section,
  tags,
  noIndex = false,
}: MetadataProps = {}): Metadata {
  const fullTitle = title
    ? `${title} | ${siteConfig.name}`
    : `${siteConfig.name} - ${siteConfig.tagline}`;

  const fullUrl = url ? `${siteConfig.url}${url}` : siteConfig.url;
  const imageUrl = image.startsWith("http")
    ? image
    : `${siteConfig.url}${image}`;

  const allKeywords = [...new Set([...siteConfig.keywords, ...keywords])];

  return {
    title: fullTitle,
    description,
    keywords: allKeywords,
    authors: authors
      ? authors.map((name) => ({ name }))
      : [{ name: siteConfig.author.name, url: siteConfig.author.url }],
    creator: siteConfig.author.name,
    publisher: siteConfig.name,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: fullUrl,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: fullUrl,
      siteName: siteConfig.name,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title || siteConfig.name,
        },
      ],
      locale: "id_ID",
      type: type,
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(authors && { authors }),
      ...(section && { section }),
      ...(tags && { tags }),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [imageUrl],
      creator: siteConfig.social.twitter,
      site: siteConfig.social.twitter,
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
          nocache: true,
          googleBot: {
            index: false,
            follow: false,
          },
        }
      : {
          index: true,
          follow: true,
          nocache: false,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
      yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
    },
    category: "food",
  };
}

/**
 * Generate JSON-LD structured data for Organization
 */
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.webp`,
    contactPoint: {
      "@type": "ContactPoint",
      email: siteConfig.author.email,
      contactType: "customer support",
      availableLanguage: ["Indonesian"],
    },
    sameAs: [
      `https://twitter.com/${siteConfig.social.twitter.replace("@", "")}`,
      `https://instagram.com/${siteConfig.social.instagram.replace("@", "")}`,
      `https://facebook.com/${siteConfig.social.facebook}`,
    ],
  };
}

/**
 * Generate JSON-LD structured data for Website
 */
export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: "id-ID",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * Generate JSON-LD structured data for Recipe
 */
export function generateRecipeSchema({
  name,
  description,
  image,
  prepTime,
  cookTime,
  totalTime,
  recipeYield,
  recipeIngredient,
  recipeInstructions,
  author,
  datePublished,
  keywords,
  recipeCategory,
  recipeCuisine = "Indonesian",
}: {
  name: string;
  description: string;
  image: string;
  prepTime?: string;
  cookTime?: string;
  totalTime?: string;
  recipeYield?: string;
  recipeIngredient?: string[];
  recipeInstructions?: string[];
  author?: string;
  datePublished?: string;
  keywords?: string[];
  recipeCategory?: string;
  recipeCuisine?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name,
    description,
    image: image.startsWith("http") ? image : `${siteConfig.url}${image}`,
    author: {
      "@type": "Person",
      name: author || siteConfig.author.name,
    },
    datePublished,
    prepTime,
    cookTime,
    totalTime,
    recipeYield,
    recipeIngredient,
    recipeInstructions: recipeInstructions?.map((instruction, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      text: instruction,
    })),
    keywords: keywords?.join(", "),
    recipeCategory,
    recipeCuisine,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      reviewCount: "1",
    },
  };
}

/**
 * Generate JSON-LD structured data for Article
 */
export function generateArticleSchema({
  headline,
  description,
  image,
  author,
  datePublished,
  dateModified,
  keywords,
}: {
  headline: string;
  description: string;
  image: string;
  author: string;
  datePublished: string;
  dateModified?: string;
  keywords?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    image: image.startsWith("http") ? image : `${siteConfig.url}${image}`,
    author: {
      "@type": "Person",
      name: author,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/logo.webp`,
      },
    },
    datePublished,
    dateModified: dateModified || datePublished,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": siteConfig.url,
    },
    keywords: keywords?.join(", "),
  };
}

/**
 * Generate JSON-LD structured data for Breadcrumb
 */
export function generateBreadcrumbSchema(
  items: { name: string; url: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http")
        ? item.url
        : `${siteConfig.url}${item.url}`,
    })),
  };
}
