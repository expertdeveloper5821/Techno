import React from 'react'

import dynamic from 'next/dynamic';

// Lazy load below-the-fold components for better initial load performance
const About = dynamic(() => import('../components/Home-com/About/About'), {
  loading: () => <div className="h-[800px] bg-[#0a0a0a]" />,
});
const Services = dynamic(() => import('../components/Home-com/Services/Services'), {
  loading: () => <div className="h-[900px] bg-[#e5e5e5]" />,
});
const Products = dynamic(() => import('../components/Home-com/Products/Products'), {
  loading: () => <div className="h-[1000px] bg-[#1a1a1a]" />,
});
const Technologies = dynamic(() => import('../components/Home-com/Technologies/Technologies'), {
  loading: () => <div className="h-[600px] bg-[#0a0a0a]" />,
});
const Partners = dynamic(() => import('../components/Home-com/Partners/Partners'), {
  loading: () => <div className="h-[500px] bg-[#e5e5e5]" />,
});
const FAQ = dynamic(() => import('../components/Home-com/FAQ/FAQ'), {
  loading: () => <div className="h-[800px] bg-[#1a1a1a]" />,
});
const Contact = dynamic(() => import('../components/Home-com/Contact/Contact'), {
  loading: () => <div className="h-[600px] bg-[#e5e5e5]" />,
});
import ContactPopupLoader from '../components/Home-com/Contact/ContactPopupLoader';
import Hero from '../components/Home-com/Hero/Hero';




function Homeland() {
  return (
    <>
    <Hero/>
      <About />
      <Services />
      <Products />
      <Technologies />
      <Partners />
      <FAQ />
      <Contact />
      <ContactPopupLoader />

    </>
  )
}

export default Homeland