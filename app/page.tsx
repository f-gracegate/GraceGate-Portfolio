import Preloader from '@/components/Preloader';
import ScrollProgress from '@/components/ScrollProgress';
import CursorGlow from '@/components/CursorGlow';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ToolMarquee from '@/components/ToolMarquee';
import About from '@/components/About';
import Services from '@/components/Services';
import Work from '@/components/Work';
import DesignGallery from '@/components/DesignGallery';
import Process from '@/components/Process';
import WhyChoose from '@/components/WhyChoose';
import Testimonials from '@/components/Testimonials';
import CTA from '@/components/CTA';
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
        <ToolMarquee />
        <About />
        <Services />
        <Work />
        <DesignGallery />
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
