import { contactDetails } from '../data/contactdetails.js';
import { BrandLogo } from './brand-logo.jsx';

function SocialIcon({ icon }) {
  if (icon === 'instagram') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M7.2 3.8h9.6a3.4 3.4 0 0 1 3.4 3.4v9.6a3.4 3.4 0 0 1-3.4 3.4H7.2a3.4 3.4 0 0 1-3.4-3.4V7.2a3.4 3.4 0 0 1 3.4-3.4Zm0 1.8A1.6 1.6 0 0 0 5.6 7.2v9.6a1.6 1.6 0 0 0 1.6 1.6h9.6a1.6 1.6 0 0 0 1.6-1.6V7.2a1.6 1.6 0 0 0-1.6-1.6H7.2Zm10 1.1a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2ZM12 7.6A4.4 4.4 0 1 1 7.6 12 4.4 4.4 0 0 1 12 7.6Zm0 1.8A2.6 2.6 0 1 0 14.6 12 2.6 2.6 0 0 0 12 9.4Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  if (icon === 'whatsapp') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M12 4.4a7.6 7.6 0 0 0-6.5 11.6L4.4 20l4.2-1.1A7.6 7.6 0 1 0 12 4.4Zm4.4 10.8c-.2.5-1 .9-1.5 1-.4.1-.9.2-2.9-.7-2.4-1-4-3.5-4.1-3.6-.1-.2-1-1.3-1-2.4s.6-1.7.8-2c.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.5.2.5.8 1.8.8 1.9.1.2.1.4 0 .6-.1.2-.2.3-.4.5l-.4.4c-.1.1-.3.3-.1.6.2.3.8 1.3 1.8 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.7-.1.2-.2.9-1 .9-1.3.1-.2.3-.2.5-.1l1.8.8c.2.1.4.2.4.4 0 .1-.2.8-.4 1.3Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M21.8 7.2a3 3 0 0 0-2.1-2.1C17.8 4.6 12 4.6 12 4.6s-5.8 0-7.7.5A3 3 0 0 0 2.2 7.2 31.8 31.8 0 0 0 1.7 12c0 1.7.2 3.3.5 4.8a3 3 0 0 0 2.1 2.1c1.9.5 7.7.5 7.7.5s5.8 0 7.7-.5a3 3 0 0 0 2.1-2.1c.3-1.5.5-3.1.5-4.8s-.2-3.3-.5-4.8ZM9.8 15.1V8.9l5.3 3.1-5.3 3.1Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function Footer({ scrollTo }) {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="shell-inner footer-grid">
        <div className="footer-brand">
          <div className="footer-brand-mark">
            <BrandLogo compact />
          </div>
          <p>
            Modern dental care with a welcoming atmosphere, experienced clinicians, and community
            outreach rooted in Mbarara.
          </p>
        </div>

        <nav className="footer-links" aria-label="Footer quick links">
          {contactDetails.quickLinks.map((link) => (
            <a
              key={link.id}
              className="footer-link"
              href={link.href}
              onClick={(event) => {
                event.preventDefault();
                scrollTo(link.id);
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="footer-contact">
          <span>{contactDetails.location}</span>
          {contactDetails.alternatePhones.map((entry) => (
            <div key={entry.number} className="footer-contact-line">
              <a href={entry.href}>{entry.number}</a>
            </div>
          ))}
          <a href={`mailto:${contactDetails.email}`}>{contactDetails.email}</a>
          <div className="footer-socials" aria-label="Social media links">
            {contactDetails.socialLinks.map((link) => (
              <a
                key={link.label}
                className="footer-social"
                href={link.href}
                target="_blank"
                rel="noreferrer"
                aria-label={link.label}
                title={link.label}
              >
                <SocialIcon icon={link.icon} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="shell-inner footer-bottom">
        <p>{`Copyright © ${year} Brighter Smiles Dental Services. All rights reserved.`}</p>
      </div>
    </footer>
  );
}
