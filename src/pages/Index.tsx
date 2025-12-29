import Header from "@/components/Header";
import Hero from "@/components/Hero";
import LevelsSection from "@/components/LevelsSection";
import FeaturesSection from "@/components/FeaturesSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <LevelsSection />
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
