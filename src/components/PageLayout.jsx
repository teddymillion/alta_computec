import { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import AIAssistant from './AIAssistant';
import BackToTop from './BackToTop';

export default function PageLayout({ children }) {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <>
      <Navbar />
      <main id="main-content">{children}</main>
      <Footer />
      <AIAssistant />
      <BackToTop />
    </>
  );
}
