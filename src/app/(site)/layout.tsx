import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollToTop from "@/components/Common/ScrollToTop";
import { buildMetadata } from "@/libs/metadata";
import { siteConfig } from "@/config/site";
import "../globals.css";
import "../prism-theme.css";
import SiteProviders from "./providers";

export const metadata: Metadata = buildMetadata({
  title: siteConfig.name,
  description: siteConfig.description,
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ro" suppressHydrationWarning>
      <body className="antialiased">
        <SiteProviders>
          <Header />
          {children}
          <Footer />
          <ScrollToTop />
        </SiteProviders>
      </body>
    </html>
  );
}
