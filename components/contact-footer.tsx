import { Eyebrow } from "@/components/eyebrow";
import { FadeUp, RevealHeading } from "@/components/reveal";
import { NAV, CONTACT } from "@/content/profile";

const LINKS = [
  { label: "GitHub", href: CONTACT.github },
  { label: "LinkedIn", href: CONTACT.linkedin },
  { label: "Email", href: CONTACT.mailto },
];

export function ContactFooter() {
  return (
    <footer className="contact" id="contact">
      <Eyebrow>05 / Contact</Eyebrow>
      <RevealHeading className="contact-title" duration={940} text="Have a problem worth solving?" />
      <FadeUp as="p" className="lead contact-lead" duration={520} y={16}>
        Whether you&apos;re building a product, improving an existing system, or exploring a practical
        AI integration, I&apos;d be interested in hearing what you&apos;re working on.
      </FadeUp>
      <FadeUp as="p" className="lead contact-lead contact-follow" duration={520} y={16}>
        Tell me about the challenge, the people it&apos;s for, and what you want to achieve.
      </FadeUp>
      <a className="email-link" href={CONTACT.mailto} aria-label={`Contact via email: ${CONTACT.email}`}>
        <span>Contact via email</span>
        <span className="email-arrow" aria-hidden="true">
          ↗
        </span>
      </a>
      <p className="contact-note">
        Open to meaningful projects, engineering collaborations, and new opportunities.
      </p>

      <div className="footer-bar">
        <div className="footer-brand">
          <p className="signature">Peter Toss</p>
          <p className="signature-role">Full-Stack Software Engineer</p>
          <p className="signature-note">
            Building thoughtful products, reliable systems, and practical AI experiences.
          </p>
        </div>
        <nav className="footer-nav" aria-label="Footer">
          <ul className="social-list">
            {NAV.map((item) => (
              <li key={item.href}>
                <a className="social-link" href={item.href}>
                  <span className="social-rule" aria-hidden="true" />
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <nav className="footer-social" aria-label="Contact links">
          <ul className="social-list">
            {LINKS.map((item) => (
              <li key={item.label}>
                <a
                  className="social-link"
                  href={item.href}
                  {...(item.href.startsWith("http")
                    ? { target: "_blank", rel: "noreferrer noopener" }
                    : {})}
                >
                  <span className="social-rule" aria-hidden="true" />
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="footer-end">
          <p className="copyright">© 2026 Peter Toss.</p>
          <p className="footer-signoff">Designed with intention. Engineered with care.</p>
        </div>
      </div>
    </footer>
  );
}
