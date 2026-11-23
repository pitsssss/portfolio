const WORDS = [
  "Full Stack",
  "AI Engineering",
  "Product Interfaces",
  "APIs And Data",
  "Ship The Work",
];

export function Marquee() {
  return (
    <section className="marquee" aria-label="Operating principles">
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <div className="marquee-group" key={copy} aria-hidden={copy === 1}>
            {WORDS.map((word) => (
              <span className="marquee-item" key={`${copy}-${word}`}>
                {word}
                <span className="marquee-dot" aria-hidden="true" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
