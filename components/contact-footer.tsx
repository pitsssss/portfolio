import { Eyebrow } from "@/components/eyebrow";
import { FadeUp, RevealHeading } from "@/components/reveal";

const SOCIALS = [
  ["GitHub", "https://github.com"],
  ["LinkedIn", "https://www.linkedin.com"],
  ["X / Twitter", "https://x.com"],
];

export function ContactFooter() {
  return (
    <footer className="contact" id="contact">
      <Eyebrow>Contact</Eyebrow>
      <RevealHeading
        className="contact-title"
        duration={940}
        text="Building something that needs an engineer?"
      />
      <FadeUp as="p" className="lead contact-lead" duration={520} y={16}>
        I take on full-stack products and AI engineering work. Send the problem, and I&apos;ll read
        it.
      </FadeUp>
      <a className="email-link" href="mailto:hello@petertoss.com">
        <span>hello@petertoss.com</span>
        <span className="email-arrow" aria-hidden="true">
          ↗
        </span>
      </a>

      <div className="footer-bar">
        <div className="footer-brand">
          <p className="signature">Peter Toss</p>
          <p className="signature-note">Software engineer. Full stack. AI.</p>
        </div>
        <nav className="footer-social" aria-label="Social">
          <ul className="social-list">
            {SOCIALS.map(([label, href]) => (
              <li key={label}>
                <a className="social-link" href={href} target="_blank" rel="noreferrer noopener">
                  <span className="social-rule" aria-hidden="true" />
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <p className="copyright footer-copy">© 2026 Peter Toss. All rights reserved.</p>
      </div>
    </footer>
  );
}
