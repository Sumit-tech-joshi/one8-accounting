export default function Seo({
  title,
  description,
  ogImage,
  canonical,
}: {
  title?: string;
  description?: string;
  ogImage?: string;
  canonical?: string;
}) {
  const siteTitle = "One8 Accounting";
  return (
    <>
      <title>{title ? `${title} | ${siteTitle}` : siteTitle}</title>
      <meta name="description" content={description ?? ""} />
      <meta property="og:title" content={title ?? siteTitle} />
      <meta property="og:description" content={description ?? ""} />
      {ogImage && <meta property="og:image" content={ogImage} />}
      {canonical && <link rel="canonical" href={canonical} />}
      <meta name="twitter:card" content="summary_large_image" />
    </>
  );
}