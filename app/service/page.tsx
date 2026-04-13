import React from 'react'
import Hero from '../components/service-com/hero/hero'
import WhatWeDo from '../components/service-com/WhatWeDo'
import ServiceTechStack from '../components/service-com/ServiceTechStack'
import ProcessFlow from '../components/service-com/ProcessFlow'
import Contact from '../components/service-com/contact/Contact'
import Slider from '../components/service-com/slider/Slider'
import IndustriesSection from '../components/service-com/IndustriesSection'
function page() {
  return (
    <>
      <Hero />
      <WhatWeDo />
      <ServiceTechStack />
      <IndustriesSection/>
      <ProcessFlow />
      <Slider/>
      <Contact/>
    </>
  )
}

export default page