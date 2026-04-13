import React from 'react'
import Hero from '../components/About-com/Hero/Hero'
import Intero from '../components/About-com/Intero/Intero'
// import ServiceSlider from '../components/Home-com/Services/ServiceSlider'
// import ServicesCarousel from '../components/Home-com/Services/ServicesCarousel'
import Services from '../components/Home-com/Services/Services'
import Products from '../components/About-com/product/product'
import Industries from '../components/About-com/Industries/Industries'
import Contact from '../components/About-com/contact/Contact'
import Vision from '../components/About-com/vision/Vision'
import MilestoneCelebration from '../components/About-com/milestone/Milestone'
import IndustriesSection from '../components/service-com/IndustriesSection'
function About() {
  return (
    <>
    <Hero/>
   <Intero/>
   <Services/>
   <Products/>
   {/* <Industries/> */}
   <IndustriesSection/>
   <Vision/>
   <MilestoneCelebration/>
   <Contact/>
    </>
  )
}

export default About