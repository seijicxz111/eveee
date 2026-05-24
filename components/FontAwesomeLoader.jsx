'use client';

import { useEffect } from 'react';

/**
 * Loads Font Awesome asynchronously so it never blocks the initial render.
 * The CSS is injected after the page is interactive, eliminating the 900ms
 * render-blocking chain: FA CSS → fa-brands woff2 → fa-solid woff2.
 */
export default function FontAwesomeLoader() {
  useEffect(() => {
    // Avoid duplicate injection on HMR / StrictMode double-invocation
    if (document.getElementById('fa-stylesheet')) return;

    const link = document.createElement('link');
    link.id   = 'fa-stylesheet';
    link.rel  = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css';
    document.head.appendChild(link);
  }, []);

  return null;
}
