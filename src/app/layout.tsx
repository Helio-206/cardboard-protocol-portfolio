import localFont from "next/font/local";
import "./globals.css";

const sans = localFont({
  src: [
    { path: "./fonts/DejaVuSans.ttf", weight: "400", style: "normal" },
    { path: "./fonts/DejaVuSans-Bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-sans",
  display: "swap",
});

const mono = localFont({
  src: "./fonts/DejaVuSansMono.ttf",
  variable: "--font-mono",
  display: "swap",
});

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
