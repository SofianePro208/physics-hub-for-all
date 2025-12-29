import { useEffect } from "react";

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: "website" | "article";
}

const SEOHead = ({
  title,
  description,
  keywords = "فيزياء, كيمياء, دروس, امتحانات, بكالوريا, ثانوي, الجزائر",
  canonicalUrl,
  ogImage = "/og-image.png",
  ogType = "website",
}: SEOHeadProps) => {
  const fullTitle = `${title} | Prof Sofiane - Physics Academy`;
  const siteUrl = window.location.origin;
  const currentUrl = canonicalUrl || window.location.href;

  useEffect(() => {
    // Update document title
    document.title = fullTitle;

    // Helper to update or create meta tag
    const updateMeta = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? "property" : "name";
      let meta = document.querySelector(`meta[${attr}="${name}"]`);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute(attr, name);
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    };

    // Update meta tags
    updateMeta("description", description);
    updateMeta("keywords", keywords);
    updateMeta("robots", "index, follow");
    updateMeta("author", "Prof Sofiane");

    // Open Graph tags
    updateMeta("og:title", fullTitle, true);
    updateMeta("og:description", description, true);
    updateMeta("og:type", ogType, true);
    updateMeta("og:url", currentUrl, true);
    updateMeta("og:image", `${siteUrl}${ogImage}`, true);
    updateMeta("og:site_name", "Prof Sofiane | Physics Academy", true);
    updateMeta("og:locale", "ar_DZ", true);

    // Twitter Card tags
    updateMeta("twitter:card", "summary_large_image");
    updateMeta("twitter:title", fullTitle);
    updateMeta("twitter:description", description);
    updateMeta("twitter:image", `${siteUrl}${ogImage}`);

    // Update canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", currentUrl);

    // Cleanup on unmount
    return () => {
      document.title = "Prof Sofiane | Physics Academy";
    };
  }, [fullTitle, description, keywords, currentUrl, ogImage, ogType, siteUrl]);

  return null;
};

export default SEOHead;
