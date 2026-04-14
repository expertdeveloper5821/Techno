import React from 'react'
import Hero from '../components/Prject-review/hero'
import AboutProject from '../components/Prject-review/about'
import ProjectCaseStudy from '../components/Prject-review/case-study'
import { defaultProjectReview } from '../lib/data/project-review'
import Thought from '../components/industries-com/Thought/Thought'

function page() {
  return (
    <>
    <Hero/>
    <AboutProject content={defaultProjectReview.about} />
    <ProjectCaseStudy content={defaultProjectReview.caseStudy} />
    <Thought/>
   
    </>
  )
}

export default page