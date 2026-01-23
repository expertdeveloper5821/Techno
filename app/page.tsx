import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Services from './components/Services/Services';
import About from './components/About/About';
import Products from './components/Products/Products';
import Technologies from './components/Technologies/Technologies';
import Partners from './components/Partners/Partners';
import FAQ from './components/FAQ/FAQ';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      {/* 
        Unified Hero Section Wrapper 
        - This creates the continuous Blue-to-Black gradient behind Header, Text, and Services
      */}
      <div className="relative bg-linear-to-b from-[#0073a8] via-[#004b75] to-[#0a0a0a]">
        <Header />
        <Hero />
      </div>

      {/* Rest of the page content */}
      <About />
      <Services />
      <Products />
      <Technologies />
      <Partners />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
}