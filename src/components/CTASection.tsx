import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Rocket } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-hero" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }} />
      </div>

      {/* Glow Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-physics-cyan/20 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 mb-8 animate-fade-in">
            <Rocket className="w-10 h-10 text-physics-gold" />
          </div>

          {/* Title */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            هل أنت مستعد للتفوق؟
          </h2>

          {/* Description */}
          <p className="text-lg sm:text-xl text-primary-foreground/80 mb-10 leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
            انضم إلى آلاف الطلاب الذين حققوا أحلامهم معنا. 
            ابدأ رحلتك التعليمية اليوم واستعد للنجاح في البكالوريا!
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Button asChild size="lg" className="h-14 px-8 text-lg rounded-xl bg-white text-physics-dark hover:bg-white/90 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <Link to="/lessons" className="gap-3">
                ابدأ الآن مجاناً
                <ArrowLeft className="w-5 h-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-14 px-8 text-lg rounded-xl border-2 border-white/30 text-primary-foreground hover:bg-white/10 backdrop-blur-sm transition-all duration-300">
              <Link to="/exams">
                تصفح المحتوى
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
