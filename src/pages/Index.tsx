import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ZodiacGrid from "@/components/ZodiacGrid";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <Hero />
        <ZodiacGrid />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
