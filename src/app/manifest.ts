import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Hélio Matondo — CARDBOARD PROTOCOL",
    short_name: "Hélio Matondo",
    description: "Portfolio of Hélio Matondo, Full-Stack Software Engineer and Systems Architect.",
    start_url: "/en",
    display: "standalone",
    background_color: "#B8895A",
    theme_color: "#735033",
    icons: [
      { src: "/icons/icon-192", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512", sizes: "512x512", type: "image/png" },
      { src: "/icons/icon-512", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
