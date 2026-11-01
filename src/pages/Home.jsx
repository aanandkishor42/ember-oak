import Hero from '../components/sections/Hero';
import Marquee from '../components/sections/Marquee';
import About from '../components/sections/About';
import SignatureDishes from '../components/sections/SignatureDishes';
import MenuSection from '../components/sections/MenuSection';
import ChefSpecial from '../components/sections/ChefSpecial';
import Gallery from '../components/sections/Gallery';
import Testimonials from '../components/sections/Testimonials';
import ReservationSection from '../components/sections/ReservationSection';
import HoursLocation from '../components/sections/HoursLocation';
import DeferredSection from '../components/ui/DeferredSection';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <About />
      <SignatureDishes />
      <MenuSection />
      <ChefSpecial />
      <DeferredSection minHeight="80vh">
        <Gallery />
        <Testimonials />
      </DeferredSection>
      <DeferredSection minHeight="90vh">
        <ReservationSection />
        <HoursLocation />
      </DeferredSection>
    </>
  );
}
