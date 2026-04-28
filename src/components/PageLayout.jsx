import { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import AIAssistant from './AIAssistant';
import BackToTop from './BackToTop';
import TickerBar from './TickerBar';

export default function PageLayout({ children, ticker }) {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const tickerEl = ticker !== undefined ? ticker : <TickerBar />;
  return (
    <>
      <Navbar />
      <main id="main-content">{children}</main>
      {tickerEl}
      <Footer />
      <AIAssistant />
      <BackToTop />
    </>
  );
}
