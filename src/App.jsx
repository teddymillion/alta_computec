import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Statistics from './components/Statistics';
import Solutions from './components/Solutions';
import Partners from './components/Partners';
import CaseStudies from './components/CaseStudies';
import About from './components/About';
import Testimonials from './components/Testimonials';
import CTABanner from './components/CTABanner';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AIAssistant from './components/AIAssistant';
import TrustBadges from './components/TrustBadges';
import BackToTop from './components/BackToTop';
import AnnouncementBanner from './components/AnnouncementBanner';
import LoadingScreen from './components/LoadingScreen';
import CookieConsent from './components/CookieConsent';

import AboutPage from './pages/AboutPage';
import SolutionsPage from './pages/SolutionsPage';
import IndustriesPage from './pages/IndustriesPage';
import CaseStudiesPage from './pages/CaseStudiesPage';
import ProductsPage from './pages/ProductsPage';
import ContactPage from './pages/ContactPage';
import CareersPage from './pages/CareersPage';
import BlogPage from './pages/BlogPage';
import GroupPage from './pages/GroupPage';

function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <Statistics />
        <Solutions />
        <Partners />
        <TrustBadges />
        <CaseStudies />
        <About />
        <Testimonials />
        <CTABanner />
        <Blog />
        <Contact />
      </main>
      <Footer />
      <AIAssistant />
      <BackToTop />
    </>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (loading) {
    return <LoadingScreen onDone={() => setLoading(false)} />;
  }

  return (
    <>
      <div id="scroll-progress" style={{ width: `${scrollProgress}%` }} aria-hidden="true" />
      <AnnouncementBanner />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/solutions" element={<SolutionsPage />} />
        <Route path="/industries" element={<IndustriesPage />} />
        <Route path="/case-studies" element={<CaseStudiesPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/group" element={<GroupPage />} />
      </Routes>
      <CookieConsent />
    </>
  );
}
