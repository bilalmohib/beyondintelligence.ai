'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollRestoration() {
  const pathname = usePathname();

  useEffect(() => {
    // Immediately scroll to top on route change
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
