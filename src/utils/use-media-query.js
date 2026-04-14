import { useEffect, useState } from 'react';

export function useMediaQuery(query) {
  const getMatches = () => {
    if (typeof window === 'undefined') {
      return false;
    }

    return window.matchMedia(query).matches;
  };

  const [matches, setMatches] = useState(getMatches);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);

    const syncMatches = (event) => {
      setMatches(event.matches);
    };

    setMatches(mediaQuery.matches);

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', syncMatches);
      return () => mediaQuery.removeEventListener('change', syncMatches);
    }

    mediaQuery.addListener(syncMatches);
    return () => mediaQuery.removeListener(syncMatches);
  }, [query]);

  return matches;
}
