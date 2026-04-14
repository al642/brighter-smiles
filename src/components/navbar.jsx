import { useEffect, useRef, useState } from 'react';
import { Button } from './button.jsx';
import { BrandLogo } from './brand-logo.jsx';
import { useMediaQuery } from '../utils/use-media-query.js';

const navItems = [
  ['hero', 'Home'],
  ['about', 'About'],
  ['services', 'Services'],
  ['testimonials', 'Reviews'],
  ['contact', 'Contact']
];

export function Navbar({ activeSection, scrollTo, theme, onToggleTheme }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);
  const headerRef = useRef(null);
  const isMobile = useMediaQuery('(max-width: 820px)');

  useEffect(() => {
    if (!isMobile) {
      setIsMenuOpen(false);
    }
  }, [isMobile]);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateHeaderVisibility = () => {
      const currentScrollY = window.scrollY;
      const nearTop = currentScrollY < 40;
      const scrollingDown = currentScrollY > lastScrollY + 10;
      const scrollingUp = currentScrollY < lastScrollY - 6;

      if (nearTop || scrollingUp || isMenuOpen) {
        setIsHeaderHidden(false);
      } else if (scrollingDown && currentScrollY > 120) {
        setIsHeaderHidden(true);
      }

      lastScrollY = currentScrollY;
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateHeaderVisibility);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen || !isMobile) {
      return undefined;
    }

    const handlePointerDown = (event) => {
      if (!headerRef.current?.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    const handleScrollClose = () => {
      setIsMenuOpen(false);
    };

    document.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('scroll', handleScrollClose, { passive: true });

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('scroll', handleScrollClose);
    };
  }, [isMenuOpen, isMobile]);

  useEffect(() => {
    if (isMobile) {
      setIsMenuOpen(false);
    }
  }, [activeSection, isMobile]);

  const handleNavigate = (id) => {
    scrollTo(id);
    setIsMenuOpen(false);
  };

  const handleBookVisit = () => {
    scrollTo('contact');
    setIsMenuOpen(false);
  };

  return (
    <header ref={headerRef} className={isHeaderHidden ? 'site-header is-hidden' : 'site-header'}>
      <div className="shell-inner nav-row">
        <button className="brand" onClick={() => handleNavigate('hero')} aria-label="Go to top">
          <BrandLogo compact />
        </button>

        <nav className="site-nav" aria-label="Main navigation">
          {navItems.map(([id, label]) => (
            <button
              key={id}
              className={activeSection === id ? 'nav-link is-active' : 'nav-link'}
              onClick={() => handleNavigate(id)}
            >
              {label}
            </button>
          ))}
        </nav>

        <div className="nav-actions">
          <button
            type="button"
            className="theme-toggle"
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            aria-pressed={theme === 'light'}
          >
            <span className="theme-toggle__icon" aria-hidden="true">
              {theme === 'dark' ? '☀' : '☾'}
            </span>
          </button>

          <Button className="cta-button--small" onClick={handleBookVisit}>
            Book Visit
          </Button>
        </div>

        <button
          type="button"
          className={isMenuOpen ? 'mobile-menu-toggle is-open' : 'mobile-menu-toggle'}
          onClick={() => setIsMenuOpen((current) => !current)}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-nav-panel"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div
        id="mobile-nav-panel"
        className={isMenuOpen ? 'shell-inner mobile-menu-panel is-open' : 'shell-inner mobile-menu-panel'}
      >
        <nav className="mobile-panel-nav" aria-label="Mobile navigation">
          {navItems.map(([id, label]) => (
            <button
              key={id}
              className={activeSection === id ? 'mobile-panel-link is-active' : 'mobile-panel-link'}
              onClick={() => handleNavigate(id)}
            >
              {label}
            </button>
          ))}
        </nav>

        <div className="mobile-panel-actions">
          <button
            type="button"
            className="theme-toggle"
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            aria-pressed={theme === 'light'}
          >
            <span className="theme-toggle__icon" aria-hidden="true">
              {theme === 'dark' ? '☀' : '☾'}
            </span>
          </button>

          <Button className="cta-button--small" onClick={handleBookVisit}>
            Book Visit
          </Button>
        </div>
      </div>
    </header>
  );
}
