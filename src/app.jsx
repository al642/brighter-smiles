import { useEffect, useState } from 'react';
import { About } from './components/about.jsx';
import { Contact } from './components/contact.jsx';
import { Footer } from './components/footer.jsx';
import { Hero } from './components/hero.jsx';
import { Navbar } from './components/navbar.jsx';
import { Services } from './components/services.jsx';
import { Testimonials } from './components/testimonials.jsx';

function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const revealItems = document.querySelectorAll('[data-reveal]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.18 }
    );

    revealItems.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const sectionElements = Array.from(document.querySelectorAll('section[id]'));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target?.id) {
          setActiveSection(visible.target.id);
        }
      },
      { threshold: [0.3, 0.5, 0.7] }
    );

    sectionElements.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let ticking = false;

    const updateScrollState = () => {
      const hero = document.getElementById('hero');

      if (hero) {
        const heroRect = hero.getBoundingClientRect();
        const heroProgress = Math.max(0, Math.min(1, -heroRect.top / heroRect.height));
        hero.style.setProperty('--hero-shift', `${heroProgress * 90}px`);
        hero.style.setProperty('--hero-fade', `${1 - heroProgress * 0.65}`);
      }

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollState);
        ticking = true;
      }
    };

    updateScrollState();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className="site-shell">
      <Navbar
        activeSection={activeSection}
        scrollTo={scrollTo}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <main>
        <Hero scrollTo={scrollTo} />
        <About />
        <Services />
        <Testimonials />
        <Contact />
      </main>

      <Footer scrollTo={scrollTo} />
    </div>
  );
}

export default App;
