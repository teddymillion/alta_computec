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

import AboutPage from './pages/AboutPage';
import SolutionsPage from './pages/SolutionsPage';
import IndustriesPage from './pages/IndustriesPage';
import CaseStudiesPage from './pages/CaseStudiesPage';
import ProductsPage from './pages/ProductsPage';
import ContactPage from './pages/ContactPage';
import CareersPage from './pages/CareersPage';
import BlogPage from './pages/BlogPage';

function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <Statistics />
        <Solutions />
        <Partners />
        <CaseStudies />
        <About />
        <Testimonials />
        <CTABanner />
        <Blog />
        <Contact />
      </main>
      <Footer />
      <AIAssistant />
    </>
  );
}

export default function App() {
  return (
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
    </Routes>
  );
}
