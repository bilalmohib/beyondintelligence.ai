'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

const POSITION_VALIDITY_MS = 30000;
const SCROLL_POSITION_KEY = 'scroll-position';

export default function ScrollRestoration() {
  const pathname = usePathname();
  const hasRestoredRef = useRef(false);
  const isNavigatingRef = useRef(false);

  useEffect(() => {
    let saveTimeout: NodeJS.Timeout;
    
    const saveScrollPosition = () => {
      const scrollData = {
        y: window.scrollY,
        pathname: pathname,
        timestamp: Date.now(),
      };
      sessionStorage.setItem(SCROLL_POSITION_KEY, JSON.stringify(scrollData));
    };

    // Throttle scroll handler for Safari performance
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          clearTimeout(saveTimeout);
          saveTimeout = setTimeout(saveScrollPosition, 200); // Increased debounce for Safari
          ticking = false;
        });
        ticking = true;
      }
    };

    const handleBeforeUnload = () => {
      saveScrollPosition();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      clearTimeout(saveTimeout);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [pathname]);

  useEffect(() => {
    if (!hasRestoredRef.current) {
      hasRestoredRef.current = true;

      setTimeout(() => {
        try {
          const savedData = sessionStorage.getItem(SCROLL_POSITION_KEY);
          
          if (savedData) {
            const { y, pathname: savedPathname, timestamp } = JSON.parse(savedData);
            const now = Date.now();
            const timeSinceLastSave = now - timestamp;

            if (
              savedPathname === pathname &&
              timeSinceLastSave < POSITION_VALIDITY_MS &&
              y > 100
            ) {
              window.scrollTo({
                top: y,
                behavior: 'smooth'
              });
            }
          }
        } catch (error) {
          console.error('Error restoring scroll position:', error);
        }
      }, 100);
    }
  }, []);

  useEffect(() => {
    if (hasRestoredRef.current && !isNavigatingRef.current) {
      isNavigatingRef.current = true;
      
      const savedData = sessionStorage.getItem(SCROLL_POSITION_KEY);
      if (savedData) {
        const { pathname: savedPathname } = JSON.parse(savedData);
        if (savedPathname !== pathname) {
          sessionStorage.removeItem(SCROLL_POSITION_KEY);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }

      setTimeout(() => {
        isNavigatingRef.current = false;
      }, 100);
    }
  }, [pathname]);

  return null;
}
