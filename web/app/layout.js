export const metadata = {
  title: "Sonitus — Dublin Noise Intelligence",
  description: "Dublin noise intelligence from Sonitus monitors.",
};

const apiBase = process.env.NEXT_PUBLIC_API_BASE || "";
const siteBase = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.SONITUS_API = ${JSON.stringify(apiBase)};window.SONITUS_BASE = ${JSON.stringify(siteBase)};`,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,650;1,9..144,400;1,9..144,500&family=Outfit:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
