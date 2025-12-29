import Header from "@/components/Header";
import Hero from "@/components/Hero";
import LevelsSection from "@/components/LevelsSection";
import RecentContentSection from "@/components/RecentContentSection";
import FeaturesSection from "@/components/FeaturesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import SEOHead from "@/components/SEOHead";

const Index = () => {
  return (
    <div className="min-h-screen">
      <SEOHead
        title="الرئيسية"
        description="منصة تعليمية متخصصة في العلوم الفيزيائية للتعليم الثانوي الجزائري. دروس، امتحانات، وفيديوهات تعليمية لجميع المستويات."
        keywords="فيزياء, كيمياء, دروس, امتحانات, بكالوريا, ثانوي, الجزائر, تعليم, علوم"
      />
      <Header />
      <main>
        <Hero />
        <LevelsSection />
        <RecentContentSection />
        <FeaturesSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;
