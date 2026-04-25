import { useEffect, useState } from 'react';
import { Button } from './button.jsx';
import { heroSlides } from '../data/heroslides.js';
import { useMediaQuery } from '../utils/use-media-query.js';

const stats = [
  { value: '5,000+', label: 'Patients served' },
  { value: '15+', label: 'Years of care' },
  { value: '4.9/5', label: 'Patient satisfaction' }
];

export function Hero({ scrollTo, onBookAppointment }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const isMobile = useMediaQuery('(max-width: 820px)');

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveSlide((currentSlide) => (currentSlide + 1) % heroSlides.length);
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, []);

  function stepSlide(direction) {
    setActiveSlide((currentSlide) => (currentSlide + direction + heroSlides.length) % heroSlides.length);
  }

  return (
    <section id="hero" className={isMobile ? 'hero-panel hero-panel--mobile-gallery' : 'hero-panel'}>
      {isMobile ? (
        <>
          <div className="hero-mobile-gallery" aria-hidden="true">
            {heroSlides.map((slide, index) => (
              <img
                key={slide.image}
                src={slide.image}
                alt=""
                className={index === activeSlide ? 'hero-mobile-image is-active' : 'hero-mobile-image'}
              />
            ))}
          </div>
          <div className="hero-mobile-scrim" />
        </>
      ) : null}
      <div className="hero-noise" />
      <div className="hero-glow hero-glow--red" />
      <div className="hero-glow hero-glow--green" />
      <div className="shell-inner hero-grid">
        <div className="hero-copy" data-reveal="slide-up">
          <p className="eyebrow">Mbarara&apos;s modern dental home</p>
          <h1>
            A cleaner, calmer
            <span> Brighter Smiles experience.</span>
          </h1>
          <p className="hero-text">
            Trusted dental care for families, professionals, and children with a warm approach,
            modern treatment options, and a clinic experience built around comfort.
          </p>
          <div className="hero-actions">
            <Button onClick={onBookAppointment}>Schedule Appointment</Button>
            <Button variant="ghost" onClick={() => scrollTo('services')}>
              Explore Services
            </Button>
          </div>
          <div className="stat-strip">
            {stats.map((item) => (
              <article key={item.label} className="stat-chip">
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </article>
            ))}
          </div>
          {isMobile ? (
            <div className="hero-mobile-dots" aria-label="Hero gallery">
              {heroSlides.map((slide, index) => (
                <button
                  key={slide.image}
                  type="button"
                  className={index === activeSlide ? 'hero-mobile-dot is-active' : 'hero-mobile-dot'}
                  aria-label={`Show hero photo ${index + 1}`}
                  aria-pressed={index === activeSlide}
                  onClick={() => setActiveSlide(index)}
                />
              ))}
            </div>
          ) : null}
        </div>

        {!isMobile ? (
          <div className="hero-stage" data-reveal="zoom-in">
            <div className="hero-stage-backdrop" />
            <div className="hero-slider" aria-label="Brighter Smiles community gallery">
              <div className="hero-slider-status">
                <span>Community moments</span>
                <strong>{`${String(activeSlide + 1).padStart(2, '0')} / ${String(heroSlides.length).padStart(2, '0')}`}</strong>
              </div>

              <div className="hero-slider-viewport">
                {heroSlides.map((slide, index) => (
                  <figure
                    key={slide.image}
                    className={`hero-slide ${index === activeSlide ? 'is-active' : ''}`}
                    aria-hidden={index === activeSlide ? 'false' : 'true'}
                  >
                    <img src={slide.image} alt={slide.alt} className="hero-slide-image" />
                    <figcaption className="hero-slide-copy">
                      <span>{slide.kicker}</span>
                      <h2>{slide.title}</h2>
                      <p>{slide.description}</p>
                    </figcaption>
                  </figure>
                ))}
              </div>

              <div className="hero-slider-controls">
                <div className="hero-slider-dots" role="tablist" aria-label="Hero slides">
                  {heroSlides.map((slide, index) => (
                    <button
                      key={slide.image}
                      type="button"
                      className={`hero-slider-dot ${index === activeSlide ? 'is-active' : ''}`}
                      aria-label={`Show slide ${index + 1}: ${slide.title}`}
                      aria-selected={index === activeSlide}
                      onClick={() => setActiveSlide(index)}
                    />
                  ))}
                </div>

                <div className="hero-slider-arrows">
                  <button
                    type="button"
                    className="hero-slider-arrow"
                    aria-label="Previous hero slide"
                    onClick={() => stepSlide(-1)}
                  >
                    Prev
                  </button>
                  <button
                    type="button"
                    className="hero-slider-arrow"
                    aria-label="Next hero slide"
                    onClick={() => stepSlide(1)}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
