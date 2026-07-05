import { Helmet } from "react-helmet-async";

export default function SEO({ title, description }) {
  const siteTitle = "Karsa Studio | Creative Digital Agency";
  const currentTitle = title ? `${title} | Karsa Studio` : siteTitle;
  const currentDescription =
    description ||
    "Agensi UI/UX dan Web Development profesional yang siap mengubah visi bisnis Anda menjadi produk digital unggulan.";

  return (
    <Helmet>
      <title>{currentTitle}</title>
      <meta name="description" content={currentDescription} />
      <meta property="og:title" content={currentTitle} />
      <meta property="og:description" content={currentDescription} />
      <meta name="twitter:title" content={currentTitle} />
      <meta name="twitter:description" content={currentDescription} />
    </Helmet>
  );
}
