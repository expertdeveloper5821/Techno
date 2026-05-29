import Hero from '../components/terms-com/hero';
import Topics from '../components/terms-com/topics';
import Contact from '../components/terms-com/contact';

export const metadata = {
  title: 'Terms & Conditions | Technogetic',
  description:
    'Read the Terms & Conditions for using Technogetic services. Understand your rights, responsibilities, and our commitments to you.',
};

export default function TermsPage() {
  return (
    <>
      <Hero />
      <Topics />
      <Contact />
    </>
  );
}
