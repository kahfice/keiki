import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import BestSellers from '@/components/home/BestSellers';
import AboutPreview from '@/components/home/AboutPreview';
import InstagramShowcase from '@/components/home/InstagramShowcase';
import Testimonials from '@/components/home/Testimonials';
import OrderCTA from '@/components/home/OrderCTA';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <WhyChooseUs />
        <BestSellers />
        <AboutPreview />
        <InstagramShowcase />
        <Testimonials />
        <OrderCTA />
      </main>
      <Footer />
    </>
  );
}
