import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ZodiacGrid from "@/components/ZodiacGrid";
import Forecast2026Promo from "@/components/Forecast2026Promo";
import CareerReadingPromo from "@/components/CareerReadingPromo";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <Hero />
        <Forecast2026Promo />
        <CareerReadingPromo />
        <ZodiacGrid />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
