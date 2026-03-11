/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useLayoutEffect } from 'react';
import { Navbar, Hero, About, Specialties, MenuPreview, Space, GranolaPromo, Testimonials, Info, Footer, Preloader } from './components/Sections';
import MenuPage from './pages/MenuPage';

// Scrolls to top instantly before the browser paints, on every route change.
// history.scrollRestoration = 'manual' disables the browser's built-in scroll
// restoration so the back button also lands at the top instead of mid-page.
function ScrollToTop() {
  const { pathname } = useLocation();
  useLayoutEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    document.documentElement.style.scrollBehavior = 'auto';
    window.scrollTo(0, 0);
    document.documentElement.style.scrollBehavior = '';
  }, [pathname]);
  return null;
}

function HomePage() {
  return (
    <div className="min-h-screen bg-[#F9F8F6] selection:bg-[#8A9A5B] selection:text-white overflow-x-hidden w-full">
      <Preloader />
      <Navbar />
      <Hero />
      <About />
      <Specialties />
      <MenuPreview />
      <Space />
      <GranolaPromo />
      <Testimonials />
      <Info />
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
