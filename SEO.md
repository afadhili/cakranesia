# SEO Documentation - Cakranesia

Complete guide for Search Engine Optimization implementation in Cakranesia.

## Overview

Cakranesia implements comprehensive SEO best practices to maximize visibility in search engines, particularly for Indonesian culinary content.

## SEO Strategy

### Target Keywords

**Primary Keywords:**
- Kuliner Indonesia
- Resep Indonesia
- Makanan Nusantara
- Resep Tradisional
- Masakan Indonesia

**Secondary Keywords:**
- Kuliner Nusantara
- Resep Daerah
- Makanan Khas Indonesia
- Food Blog Indonesia
- Komunitas Kuliner

**Long-tail Keywords:**
- Resep masakan tradisional Indonesia
- Makanan khas 34 provinsi Indonesia
- Cara membuat masakan Nusantara
- Resep autentik Indonesia
- Kuliner tradisional dari Sabang sampai Merauke

### Target Audience

- Indonesian food enthusiasts
- Home cooks looking for traditional recipes
- Food bloggers
- Culinary students
- Travelers interested in Indonesian cuisine
- Indonesian diaspora worldwide

---

## Technical SEO Implementation

### 1. Metadata System (`/lib/metadata.ts`)

Centralized metadata management for consistent SEO across all pages.

**Features:**
- Dynamic title generation
- Open Graph tags
- Twitter Card tags
- Structured data (JSON-LD)
- Canonical URLs
- Keyword management

**Usage:**
```typescript
import { generateMetadata } from "@/lib/metadata";

export const metadata = generateMetadata({
  title: "Resep Rendang Padang",
  description: "Resep rendang Padang autentik dengan bumbu lengkap",
  keywords: ["rendang", "masakan padang", "sumatra barat"],
  url: "/recipe/rendang-padang",
});
```

### 2. Robots.txt (`/public/robots.txt`)

Controls search engine crawler access.

**Configuration:**
- ✅ Allows all major search engines
- ✅ Blocks API routes and admin areas
- ✅ Blocks auth verification pages
- ✅ Points to sitemap
- ✅ Blocks aggressive crawlers (AhrefsBot, SemrushBot)

**Location:** `https://cakranesia.com/robots.txt`

### 3. Sitemap (`/app/sitemap.ts`)

Dynamic sitemap generation for search engines.

**Current Pages:**
- Homepage (Priority: 1.0)
- Authentication pages (Priority: 0.3-0.5)
- Legal pages (Priority: 0.4)
- Search page (Priority: 0.8)
- Community page (Priority: 0.7)
- About/Contact pages (Priority: 0.5)

**TODO - Dynamic Content:**
```typescript
// Add when database is ready:
// - Recipe pages (Priority: 0.8)
// - Blog posts (Priority: 0.6)
// - Province pages (Priority: 0.7)
// - User profiles (Priority: 0.5)
```

**Location:** `https://cakranesia.com/sitemap.xml`

### 4. Structured Data (Schema.org)

JSON-LD structured data for rich snippets.

**Implemented Schemas:**

#### Organization Schema
```json
{
  "@type": "Organization",
  "name": "Cakranesia",
  "description": "Platform komunitas pecinta kuliner Indonesia",
  "url": "https://cakranesia.com",
  "logo": "https://cakranesia.com/logo.webp",
  "contactPoint": {...},
  "sameAs": [...]
}
```

#### Website Schema
```json
{
  "@type": "WebSite",
  "name": "Cakranesia",
  "url": "https://cakranesia.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://cakranesia.com/search?q={search_term_string}"
  }
}
```

#### Recipe Schema (Template)
```typescript
generateRecipeSchema({
  name: "Rendang Padang",
  description: "Resep rendang Padang autentik",
  image: "/images/rendang.jpg",
  prepTime: "PT30M",
  cookTime: "PT4H",
  recipeYield: "8 servings",
  recipeIngredient: ["Daging sapi 1kg", "..."],
  recipeInstructions: ["Langkah 1", "..."],
  recipeCuisine: "Indonesian",
  recipeCategory: "Main Course"
})
```

#### Article Schema (Template)
```typescript
generateArticleSchema({
  headline: "Sejarah Rendang",
  description: "Mengenal sejarah rendang dari Minangkabau",
  image: "/images/article.jpg",
  author: "Author Name",
  datePublished: "2024-01-01",
  keywords: ["rendang", "sejarah"]
})
```

#### Breadcrumb Schema
```typescript
generateBreadcrumbSchema([
  { name: "Beranda", url: "/" },
  { name: "Resep", url: "/recipes" },
  { name: "Rendang", url: "/recipes/rendang" }
])
```

---

## On-Page SEO

### 1. Meta Tags

**Every page includes:**
- `<title>` - Unique, descriptive (50-60 characters)
- `<meta name="description">` - Compelling (150-160 characters)
- `<meta name="keywords">` - Relevant keywords
- `<link rel="canonical">` - Prevent duplicate content

**Open Graph Tags:**
- `og:title`
- `og:description`
- `og:image` (1200x630px)
- `og:url`
- `og:type`
- `og:locale` (id_ID)

**Twitter Card Tags:**
- `twitter:card` (summary_large_image)
- `twitter:title`
- `twitter:description`
- `twitter:image`

### 2. HTML Structure

**Semantic HTML:**
```html
<header> - Site header with navigation
<main> - Main content area
<article> - Recipe or blog content
<section> - Content sections
<aside> - Sidebar content
<footer> - Site footer
<nav> - Navigation menus
```

**Heading Hierarchy:**
```html
<h1> - Page title (one per page)
<h2> - Major sections
<h3> - Subsections
<h4-h6> - Further divisions
```

### 3. Content Optimization

**Best Practices:**
- ✅ Unique, original content
- ✅ 300+ words minimum per page
- ✅ Keyword density: 1-2%
- ✅ Use of LSI keywords
- ✅ Internal linking
- ✅ External links to authoritative sources
- ✅ Alt text for all images
- ✅ Image file names with keywords

**Content Checklist:**
- [ ] Unique meta title
- [ ] Compelling meta description
- [ ] H1 tag with primary keyword
- [ ] H2-H6 tags for structure
- [ ] Images with alt text
- [ ] Internal links (3-5 per page)
- [ ] External links (1-2 authoritative)
- [ ] Call-to-action (CTA)
- [ ] Mobile-friendly
- [ ] Fast loading speed

---

## Image SEO

### Optimization Guidelines

**File Format:**
- WebP (preferred) - Better compression
- JPEG - For photos
- PNG - For graphics with transparency
- SVG - For logos and icons

**File Size:**
- Hero images: < 200KB
- Content images: < 100KB
- Thumbnails: < 50KB

**File Naming:**
```
✅ Good: rendang-padang-sumatra-barat.webp
❌ Bad: IMG_1234.jpg
```

**Alt Text:**
```html
<!-- Good -->
<img src="rendang.webp" alt="Rendang Padang tradisional dengan bumbu lengkap dari Sumatra Barat" />

<!-- Bad -->
<img src="rendang.webp" alt="rendang" />
```

**Next.js Image Component:**
```typescript
import Image from "next/image";

<Image
  src="/images/rendang.webp"
  alt="Rendang Padang tradisional"
  width={800}
  height={600}
  loading="lazy"
  quality={85}
/>
```

---

## Mobile SEO

### Mobile-First Approach

**Implementation:**
- ✅ Responsive design with Tailwind CSS
- ✅ Touch-friendly buttons (44x44px minimum)
- ✅ Readable font sizes (16px minimum)
- ✅ Viewport meta tag
- ✅ Fast mobile loading

**PWA Features:**
- ✅ Web App Manifest (`/public/manifest.json`)
- ✅ Theme color
- ✅ App icons
- ✅ Standalone mode
- ⏳ Service Worker (TODO)
- ⏳ Offline support (TODO)

**Mobile Testing:**
- Google Mobile-Friendly Test
- PageSpeed Insights Mobile
- Chrome DevTools Device Mode

---

## Performance SEO

### Core Web Vitals

**Target Metrics:**
- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1

**Optimization Strategies:**
1. Next.js Image optimization
2. Font loading optimization (display: swap)
3. Code splitting
4. Lazy loading
5. CDN usage
6. Minification
7. Compression (gzip/brotli)

### Loading Speed

**Optimizations:**
- ✅ Next.js automatic code splitting
- ✅ Font optimization with next/font
- ✅ Image optimization with next/image
- ✅ CSS optimization with Tailwind
- ⏳ Static site generation (SSG)
- ⏳ Incremental static regeneration (ISR)

---

## Local SEO (Indonesian Focus)

### Language & Location

**HTML Lang Attribute:**
```html
<html lang="id">
```

**Locale in Metadata:**
```typescript
openGraph: {
  locale: "id_ID"
}
```

**Content Strategy:**
- All content in Bahasa Indonesia
- Province-specific pages (34 provinces)
- Regional recipe variations
- Local culinary terminology
- Indonesian food culture content

### Geographic Targeting

**Google Search Console:**
- Set geographic target: Indonesia
- Submit sitemap
- Monitor Indonesian search queries

**Hreflang Tags (Future):**
```html
<!-- For international versions -->
<link rel="alternate" hreflang="id" href="https://cakranesia.com/" />
<link rel="alternate" hreflang="en" href="https://cakranesia.com/en/" />
```

---

## Social Media SEO

### Social Sharing

**Open Graph Optimization:**
- Title: Max 60 characters
- Description: Max 200 characters
- Image: 1200x630px (1.91:1 ratio)

**Twitter Card Optimization:**
- Card type: summary_large_image
- Title: Max 70 characters
- Description: Max 200 characters
- Image: 1200x628px

**Social Media Links:**
```json
{
  "twitter": "@cakranesia",
  "instagram": "@cakranesia",
  "facebook": "cakranesia"
}
```

---

## Link Building Strategy

### Internal Linking

**Best Practices:**
- Link from high-authority pages to new content
- Use descriptive anchor text
- Create content hubs
- Breadcrumb navigation
- Related posts/recipes

**Example Structure:**
```
Homepage → Province Page → Recipe Category → Individual Recipe
Homepage → Blog → Article → Related Articles
```

### External Links

**Outbound Links:**
- Link to authoritative Indonesian food sources
- Government culinary websites
- Academic research on Indonesian cuisine
- Cultural heritage sites

**Backlink Strategy:**
- Food bloggers collaboration
- Recipe aggregator submissions
- Indonesian culinary forums
- Social media engagement
- Guest posting

---

## Analytics & Monitoring

### Google Search Console

**Setup:**
1. Verify domain ownership
2. Submit sitemap
3. Monitor search performance
4. Fix crawl errors
5. Track impressions & clicks

**Key Metrics:**
- Impressions
- Click-through rate (CTR)
- Average position
- Top queries
- Top pages

### Google Analytics (or Umami)

**Track:**
- Page views
- Bounce rate
- Session duration
- User flow
- Conversion goals
- Traffic sources

### Tools to Use

**SEO Audit:**
- Google PageSpeed Insights
- Lighthouse (built into Chrome)
- GTmetrix
- WebPageTest

**Keyword Research:**
- Google Keyword Planner
- Ubersuggest
- Answer the Public
- Google Trends (Indonesia)

**Monitoring:**
- Google Search Console
- Google Analytics / Umami
- Sentry (error tracking)

---

## Content Strategy

### Recipe Pages

**SEO Template:**
```
Title: [Nama Resep] - Resep [Daerah] Autentik | Cakranesia
H1: Resep [Nama Resep] Khas [Daerah]
H2: Bahan-bahan
H2: Cara Membuat
H2: Tips & Trik
H2: Variasi Resep
H2: Sejarah [Nama Resep]
```

**Content Elements:**
- Recipe name and origin
- Ingredient list
- Step-by-step instructions
- Cooking time and servings
- Nutritional information
- Photos/videos
- User ratings and reviews
- Related recipes

### Blog Posts

**SEO Template:**
```
Title: [Judul Artikel] | Blog Cakranesia
H1: [Judul Artikel]
H2: Introduction
H2: Main Points (3-5 sections)
H2: Conclusion
```

**Content Types:**
- Recipe history and culture
- Ingredient guides
- Cooking techniques
- Regional cuisine guides
- Food travel stories
- Chef interviews

### Province Pages

**SEO Template:**
```
Title: Kuliner Khas [Provinsi] - Resep & Makanan Tradisional
H1: Kuliner Khas [Provinsi]
H2: Makanan Khas Populer
H2: Resep [Provinsi]
H2: Sejarah Kuliner [Provinsi]
H2: Bahan Khas Daerah
```

---

## SEO Checklist

### Launch Checklist

- [x] Metadata system implemented
- [x] Robots.txt created
- [x] Sitemap.xml generated
- [x] Structured data (Organization, Website)
- [x] Open Graph tags
- [x] Twitter Card tags
- [x] Manifest.json (PWA)
- [x] Semantic HTML structure
- [x] Mobile-responsive design
- [x] Fast loading (Next.js optimizations)
- [ ] Google Search Console verification
- [ ] Google Analytics / Umami setup
- [ ] Submit sitemap to Google
- [ ] 301 redirects setup
- [ ] SSL certificate (HTTPS)
- [ ] Custom 404 page ✓
- [ ] Error handling ✓

### Content Checklist (Per Page)

- [ ] Unique meta title (50-60 chars)
- [ ] Compelling meta description (150-160 chars)
- [ ] Relevant keywords
- [ ] H1 tag with primary keyword
- [ ] H2-H6 hierarchy
- [ ] Images with alt text
- [ ] Image file names optimized
- [ ] Internal links (3-5)
- [ ] External links (1-2)
- [ ] Call-to-action
- [ ] Mobile-friendly
- [ ] Fast loading (< 3s)
- [ ] Structured data (if applicable)
- [ ] Canonical URL
- [ ] Social sharing tags

### Monthly SEO Tasks

- [ ] Monitor Google Search Console
- [ ] Analyze top-performing pages
- [ ] Update underperforming content
- [ ] Fix crawl errors
- [ ] Check broken links
- [ ] Update sitemap
- [ ] Review keyword rankings
- [ ] Competitor analysis
- [ ] Backlink monitoring
- [ ] Content gap analysis

---

## Future Enhancements

### Phase 1 (Immediate)
- [ ] Google Search Console setup
- [ ] Analytics integration (Umami)
- [ ] Submit sitemap to Google & Bing
- [ ] Create Google Business Profile
- [ ] Social media profiles optimization

### Phase 2 (Short-term)
- [ ] Recipe schema for all recipes
- [ ] Article schema for blog posts
- [ ] Breadcrumb schema everywhere
- [ ] FAQ schema
- [ ] Video schema (for cooking videos)
- [ ] Review schema (user ratings)

### Phase 3 (Medium-term)
- [ ] Service Worker for PWA
- [ ] Offline support
- [ ] Push notifications
- [ ] AMP pages (optional)
- [ ] Multilingual support (en, zh)
- [ ] Voice search optimization

### Phase 4 (Long-term)
- [ ] AI-generated meta descriptions
- [ ] Automatic keyword suggestions
- [ ] A/B testing for titles
- [ ] Advanced internal linking automation
- [ ] Content clustering
- [ ] Featured snippets optimization

---

## Resources

### Documentation
- [Next.js SEO](https://nextjs.org/learn/seo/introduction-to-seo)
- [Google Search Central](https://developers.google.com/search)
- [Schema.org](https://schema.org/)
- [Open Graph Protocol](https://ogp.me/)
- [Twitter Cards](https://developer.twitter.com/en/docs/twitter-for-websites/cards)

### Tools
- [Google Search Console](https://search.google.com/search-console)
- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [Lighthouse](https://developer.chrome.com/docs/lighthouse)
- [Screaming Frog SEO Spider](https://www.screamingfrogseospi.com/)

### Indonesian Resources
- Google Trends Indonesia
- Indonesian keyword research tools
- Indonesian food blogs and forums
- Indonesian culinary associations

---

## Support

For SEO-related questions or improvements:
- Email: id.cakranesia@gmail.com
- Review: `SEO.md` (this file)
- Check: `/lib/metadata.ts` for implementation

---

**Last Updated:** December 2024
**Version:** 1.0.0
**Status:** ✅ Core SEO Implemented, Ready for Content
