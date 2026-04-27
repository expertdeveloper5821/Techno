import React from 'react'
import Hero from '../components/Career-com/Hero/Hero'
import WhyChoose from '../components/Career-com/WhyChoose/WhyChoose'
import Life from '../components/Career-com/life/Life'
import Opportunities from '../components/Career-com/opportunities/Opportunities'
import Growth from '../components/Career-com/Growth/Growth'
import Contact from '../components/Career-com/contact/Contact'
function page() {
  return (
    <>
    <Hero/>
    <WhyChoose />
    <Opportunities />
    <Life />
    <Growth />
    <Contact />
    </>
  )
}

export default page