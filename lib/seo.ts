export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://growme.blog").replace(/\/+$/, "");

export const organization = {
  "@type": "Organization",
  "@id": `${siteUrl}/#organization`,
  name: "Grow Me",
  url: siteUrl,
  logo: `${siteUrl}/icon.svg`,
  email: "grow37me@gmail.com",
  sameAs: ["https://instagram.com/growmew", "https://www.youtube.com/@growmew"],
};
