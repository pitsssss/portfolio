import type { Metadata } from "next";
import { Anton, Onest } from "next/font/google";
import { AdaptiveGrid } from "@/components/adaptive-grid";
import { Preloader } from "@/components/preloader";
import { SiteNav } from "@/components/site-nav";
import { SmoothScroll } from "@/components/smooth-scroll";
import { CONTACT, SITE_URL } from "@/content/profile";
import "./globals.css";

const TITLE = "Peter Toss | Full-Stack Software Engineer";
const DESCRIPTION =
  "Peter Toss is a Full-Stack Software Engineer focused on software architecture, web development, backend systems, and practical AI integration. Explore projects, experience, and engineering work.";

const PERSON = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Peter Toss",
  jobTitle: "Full-Stack Software Engineer",
  url: SITE_URL,
  email: CONTACT.mailto,
  sameAs: [CONTACT.github, CONTACT.linkedin],
};

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

const onest = Onest({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-onest",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "Peter Toss",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${anton.variable} ${onest.variable}`}>
      <body>
        <noscript>
          <style>{`.preloader{display:none}.name-letter,.role-line>span,.hero-copy,.hero-aside,.scroll-cue,.quote-word,.line-inner,.fade-up{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON) }} />
        <AdaptiveGrid />
        <SmoothScroll>
          <Preloader />
          <SiteNav />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
