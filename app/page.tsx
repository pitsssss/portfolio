import { About } from "@/components/about";
import { ContactFooter } from "@/components/contact-footer";
import { Hero } from "@/components/hero";
import { Marquee } from "@/components/marquee";
import { Projects } from "@/components/projects";

export default function Home() {
  return (
    <main>
      <Hero />
      <Marquee />
      <About />
      <Projects />
      <ContactFooter />
    </main>
  );
}
