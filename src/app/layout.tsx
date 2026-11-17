import type { Metadata, Viewport } from "next";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ScrollBackground } from "@/components/ScrollBackground";
import { PROFILE } from "@/data/portfolio";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: `${PROFILE.name} — ${PROFILE.role}`,
    template: `%s | ${PROFILE.name}`,
  },
  description:
    "Developer portfolio of Paven S., Information Technology student at Kongu Engineering College building practical Java backend systems, relational database applications, and TypeScript web interfaces.",
  keywords: [
    "Paven S",
    "Developer Portfolio",
    "Information Technology",
    "Kongu Engineering College",
    "Java",
    "TypeScript",
    "Next.js",
    "React",
    "MySQL",
  ],
  authors: [{ name: PROFILE.name, url: PROFILE.github }],
  openGraph: {
    title: `${PROFILE.name} — ${PROFILE.role}`,
    description: PROFILE.intro,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#242321",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=JetBrains+Mono:wght@400;500&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap"
        />
      </head>
      <body className="min-h-screen bg-charcoal text-amber/85">
        <ScrollBackground />
        <div className="relative z-10 flex min-h-screen flex-col">
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:border focus:border-amber focus:bg-charcoal focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:uppercase focus:tracking-widest focus:text-amber"
          >
            Skip to content
          </a>
          <Navbar />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
