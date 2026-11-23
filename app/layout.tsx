import type { Metadata } from "next";
import { Anton, Onest } from "next/font/google";
import { AdaptiveGrid } from "@/components/adaptive-grid";
import { Preloader } from "@/components/preloader";
import { SiteNav } from "@/components/site-nav";
import { SmoothScroll } from "@/components/smooth-scroll";
import "./globals.css";

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
  title: "Peter Toss — Software Engineer",
  description:
    "Peter Toss is a software engineer, full-stack developer, and AI engineering specialist.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${anton.variable} ${onest.variable}`}>
      <body>
        <noscript>
          <style>{`.preloader{display:none}.name-letter,.role-line>span,.hero-copy,.scroll-cue,.quote-word,.line-inner,.fade-up{opacity:1!important;transform:none!important}`}</style>
        </noscript>
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
