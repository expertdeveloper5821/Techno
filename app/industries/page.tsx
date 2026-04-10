import React from 'react'
import Hero from '../components/industries-com/hero/Hero'
import Landscape from '../components/industries-com/landscape/Landscape'
import Ecommerce from '../components/industries-com/ecommerce/Ecommerce'
import EdtechServices from '../components/industries-com/edtech/EdtechServices'
import Solution from '../components/industries-com/solution-design/Solution'
import ServiceTechStack from '../components/service-com/ServiceTechStack'
import Thought from '../components/industries-com/Thought/Thought'
function page() {
  return (
   <>
   <Hero/>
   <Landscape/>
   <Ecommerce/>
   <EdtechServices/>
   <Solution/>
   <ServiceTechStack/>
   <Thought/>
   </>
  )
}

export default page