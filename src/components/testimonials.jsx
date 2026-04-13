import { testimonials } from '../data/testimonials.js';

export function Testimonials() {
  return (
    <section id="testimonials" className="testimonial-section">
      <div className="shell-inner">
        <div className="section-heading" data-reveal="slide-up">
          <p className="eyebrow">Patient voices</p>
          <h2>Care is remembered most when people leave feeling informed and genuinely looked after.</h2>
          <p>
            These stories reinforce the same message the clinic is built around: skilled treatment
            matters, but the experience around it matters too.
          </p>
        </div>

        <div className="testimonial-grid">
          {testimonials.map((item, index) => (
            <article
              key={item.name}
              className="testimonial-card"
              data-reveal={index % 2 === 0 ? 'slide-up' : 'slide-left'}
            >
              <p className="testimonial-quote">&ldquo;{item.quote}&rdquo;</p>
              <strong>{item.name}</strong>
              <span>{item.detail}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
