import { About } from "@/components/about";
import { ContactFooter } from "@/components/contact-footer";
import { Experience } from "@/components/experience";
import { Hero } from "@/components/hero";
import { Projects } from "@/components/projects";
import { Services } from "@/components/services";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Projects />
      <Services />
      <Experience />
      <ContactFooter />
    </main>
  );
}
