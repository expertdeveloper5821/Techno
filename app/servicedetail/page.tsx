import Hero from '../components/servicedetail/hero/Hero';
import Partner from '../components/servicedetail/partner';
import Solution from '../components/servicedetail/solution';
import Contact from '../components/Home-com/Contact/Contact';
import { defaultProjectReview } from '../lib/data/project-review';
import Thought from '../components/industries-com/Thought/Thought';
import KeyFeature from '../components/servicedetail/keyfeature';
import Strategies from '../components/servicedetail/strategies';
import TrustedBrands from '../components/contact-com/trusted/TrustedBrands';
function Page() {
  return (
    <>
      <Hero />
      <Partner content={defaultProjectReview.about} />
      <Solution />
     <KeyFeature />
     <Strategies />
     <TrustedBrands />
     <Thought/>
    </>
  );
}

export default Page;
