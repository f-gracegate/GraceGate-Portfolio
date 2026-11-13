import Preloader from '@/components/Preloader';
import ScrollProgress from '@/components/ScrollProgress';
import CursorGlow from '@/components/CursorGlow';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ToolMarquee from '@/components/ToolMarquee';
import About from '@/components/About';
import Services from '@/components/Services';
import Work from '@/components/Work';
import Process from '@/components/Process';
import WhyChoose from '@/components/WhyChoose';
import Testimonials from '@/components/Testimonials';
import CTA from '@/components/CTA';
import DeckShowcase from '@/components/showcase/DeckShowcase';
import FactCards from '@/components/showcase/FactCards';
import TiltWorkList from '@/components/showcase/TiltWorkList';
import Footer from '@/components/Footer';
import FloatingActions from '@/components/FloatingActions';

export default function Home() {
  return (
    <>
      <Preloader />
      <ScrollProgress />
      <CursorGlow />
      <Navbar />
      <main className="relative">
        <Hero />
        <DeckShowcase />
        <ToolMarquee />
        <About />
        <FactCards />
        <Services />
        <TiltWorkList />
        <Work />
        <Process />
        <WhyChoose />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
