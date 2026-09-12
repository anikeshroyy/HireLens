import { useEffect } from "react";

const SITE_NAME = "HireLens";
const BASE_URL = "https://gethire.vercel.app";
const DEFAULT_IMAGE = `${BASE_URL}/hirelens_og_image.png`;

const SEO = ({
  title,
  description = "HireLens is an intelligent hiring platform powered by AI resume parsing and smart job discovery. Match skills to the right opportunities effortlessly.",
  path = "",
  image = DEFAULT_IMAGE,
  type = "website",
  noindex = false,
}) => {
  const fullTitle = title
    ? `${title} | ${SITE_NAME}`
    : `${SITE_NAME} — AI Resume Parser & Smart Job Discovery Platform`;

  const canonicalUrl = `${BASE_URL}${
    path ? (path.startsWith("/") ? path : `/${path}`) : "/"
  }`;

  useEffect(() => {
    // Update document title
    document.title = fullTitle;

    // Helper to update meta tag content
    const updateMetaTag = (selector, attributeName, value) => {
      let element = document.querySelector(selector);
      if (element) {
        element.setAttribute(attributeName, value);
      }
    };

    updateMetaTag('meta[name="description"]', "content", description);
    updateMetaTag('meta[name="title"]', "content", fullTitle);
    updateMetaTag('meta[property="og:title"]', "content", fullTitle);
    updateMetaTag('meta[property="og:description"]', "content", description);
    updateMetaTag('meta[property="og:url"]', "content", canonicalUrl);
    updateMetaTag('meta[property="og:image"]', "content", image);
    updateMetaTag('meta[name="twitter:title"]', "content", fullTitle);
    updateMetaTag('meta[name="twitter:description"]', "content", description);
    updateMetaTag('meta[name="twitter:image"]', "content", image);
    updateMetaTag(
      'meta[name="robots"]',
      "content",
      noindex
        ? "noindex, nofollow"
        : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
    );

    const canonicalEl = document.querySelector('link[rel="canonical"]');
    if (canonicalEl) {
      canonicalEl.setAttribute("href", canonicalUrl);
    }
  }, [fullTitle, description, canonicalUrl, image, noindex]);

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta
        name="robots"
        content={
          noindex
            ? "noindex, nofollow"
            : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        }
      />
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={image} />
      <meta property="og:type" content={type} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </>
  );
};

export default SEO;
