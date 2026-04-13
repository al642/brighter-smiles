import { contactDetails } from '../data/contactdetails.js';
import { Button } from './button.jsx';

export function Contact() {
  return (
    <section id="contact" className="contact-section">
      <div className="shell-inner contact-grid">
        <div className="contact-copy" data-reveal="slide-right">
          <p className="eyebrow">Contact</p>
          <h2>Ready to book a visit, ask a question, or plan your next step in care.</h2>
          <p>
            The clinic makes it easy to reach the team for routine appointments, treatment
            questions, and urgent dental needs.
          </p>
        </div>

        <div className="contact-card" data-reveal="zoom-in">
          <p className="contact-card-label">Opening hours</p>
          <h3>{contactDetails.hours.weekdays}</h3>
          <p>{contactDetails.hours.saturday}</p>
          <p>{contactDetails.hours.emergency}</p>
          <div className="contact-card-actions">
            <Button href="https://wa.me/256700726076">Message on WhatsApp</Button>
            <Button href="mailto:mugarurajoel@gmail.com" variant="ghost">
              Send Email
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
