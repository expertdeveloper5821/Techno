import dynamic from 'next/dynamic';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';

// Lazy load below-the-fold components for better initial load performance
const About = dynamic(() => import('./components/About/About'), {
  loading: () => <div className="h-[800px] bg-[#0a0a0a]" />,
});
const Services = dynamic(() => import('./components/Services/Services'), {
  loading: () => <div className="h-[900px] bg-[#e5e5e5]" />,
});
const Products = dynamic(() => import('./components/Products/Products'), {
  loading: () => <div className="h-[1000px] bg-[#1a1a1a]" />,
});
const Technologies = dynamic(() => import('./components/Technologies/Technologies'), {
  loading: () => <div className="h-[600px] bg-[#0a0a0a]" />,
});
const Partners = dynamic(() => import('./components/Partners/Partners'), {
  loading: () => <div className="h-[500px] bg-[#e5e5e5]" />,
});
const FAQ = dynamic(() => import('./components/FAQ/FAQ'), {
  loading: () => <div className="h-[800px] bg-[#1a1a1a]" />,
});
const Contact = dynamic(() => import('./components/Contact/Contact'), {
  loading: () => <div className="h-[600px] bg-[#e5e5e5]" />,
});
const Footer = dynamic(() => import('./components/Footer/Footer'));

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      {/* 
        Unified Hero Section Wrapper 
        - This creates the continuous Blue-to-Black gradient behind Header, Text, and Services
      */}
      <div className="relative bg-[linear-gradient(180deg,#0094DB_0%,#00549A_70.41%,#030303_94.02%)]">
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