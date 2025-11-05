interface StructuredDataProps {
  data: object;
}

/**
 * Component to render JSON-LD structured data for SEO
 * Use this to add schema.org structured data to your pages
 */
export function StructuredData({ data }: StructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
