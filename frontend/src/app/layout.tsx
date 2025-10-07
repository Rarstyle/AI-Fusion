import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Fusion - Real-Time Exercise Form Coach",
  description:
    "Turn your phone camera into an AI-powered technique coach for squats, deadlifts, push-ups, rows, and overhead press. Get instant feedback, accurate rep counting, and personalized corrective plans.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-oid="b1jifow">
      <body className="antialiased" data-oid="hqec2:a">
        {children}
        <Script
          type="module"
          strategy="afterInteractive"
          src="https://cdn.jsdelivr.net/gh/onlook-dev/onlook@d3887f2/apps/web/client/public/onlook-preload-script.js"
          data-oid="zxbuq9a"
        />
      </body>
    </html>
  );
}
