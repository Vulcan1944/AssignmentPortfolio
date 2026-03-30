/* ============================================================
   SCROLL TO TOP COMPONENT
   Automatically scrolls the window to the top whenever the
   user navigates to a new page via React Router.
   This component renders nothing — it's purely functional.
   ============================================================ */

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
}
