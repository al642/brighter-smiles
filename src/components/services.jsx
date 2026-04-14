import { useEffect, useState } from 'react';
import { carePrograms } from '../data/careprograms.js';
import { services } from '../data/services.js';
import { assetUrl } from '../utils/asset-url.js';

export function Services() {
  const [expandedService, setExpandedService] = useState(null);
  const [isTouchMode, setIsTouchMode] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(hover: none), (pointer: coarse), (any-pointer: coarse)');

    const syncInputMode = (event) => {
      setIsTouchMode(event.matches);
    };

    syncInputMode(mediaQuery);

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', syncInputMode);
      return () => mediaQuery.removeEventListener('change', syncInputMode);
    }

    mediaQuery.addListener(syncInputMode);
    return () => mediaQuery.removeListener(syncInputMode);
  }, []);

  useEffect(() => {
    if (!isTouchMode) {
      setExpandedService(null);
    }
  }, [isTouchMode]);

  function toggleService(index) {
    setExpandedService((currentIndex) => (currentIndex === index ? null : index));
  }

  return (
    <section id="services" className="services-section">
      <div className="services-hero">
        <img
          src={assetUrl('images/hero/services-smile-mirror.jpg')}
          alt="A patient smiling into a hand mirror during dental care."
          className="services-hero-image"
        />
        <div className="services-hero-scrim" />
        <div className="shell-inner services-hero-inner">
          <div className="section-heading services-hero-copy">
            <p className="eyebrow">Services and programs</p>
            <h2>Clinical care presented with confidence, clarity, and real follow-through.</h2>
            <p>
              The clinic supports everyday dental needs while also guiding longer-term care
              journeys for families, restorative patients, and outreach communities.
            </p>
          </div>
        </div>
      </div>

      <div className="shell-inner">
        <div className="service-grid">
          {services.map((service, index) => (
            <article
              key={service.title}
              className={`service-card ${expandedService === index ? 'is-active' : ''}`}
            >
              <div className="service-card-frame">
                <img src={service.image} alt={service.alt} className="service-card-image" />
                <div className="service-card-scrim" />
                {isTouchMode ? (
                  <button
                    type="button"
                    className="service-card-trigger"
                    aria-expanded={expandedService === index}
                    aria-label={`${expandedService === index ? 'Collapse' : 'Expand'} ${service.title} details`}
                    onClick={() => toggleService(index)}
                  />
                ) : null}
                <div className="service-card-body">
                  <div className="service-card-meta">
                    <div className="service-badge">{`0${index + 1}`}</div>
                  </div>
                  <div className="service-card-copy">
                    <h3>{service.title}</h3>
                    <p>{service.text}</p>
                    <div className="service-card-extra">
                      <p>{service.detail}</p>
                      <ul className="service-card-points">
                        {service.highlights.map((highlight) => (
                          <li key={highlight}>{highlight}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="program-strip">
          {carePrograms.map((program) => (
            <article key={program.title} className="program-card">
              <h3>{program.title}</h3>
              <p>{program.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
