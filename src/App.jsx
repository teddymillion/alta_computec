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

export default function App() {
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
    </>
  );
}
