import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BookOpen, FileText, Video, Sparkles } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen gradient-hero overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-10 w-72 h-72 bg-physics-cyan/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-physics-gold/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-physics-blue/5 rounded-full blur-3xl" />
        
        {/* Floating Atoms */}
        <div className="absolute top-32 left-[15%] text-physics-cyan/20 animate-float">
          <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="3" />
            <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="currentColor" strokeWidth="1" />
            <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="currentColor" strokeWidth="1" transform="rotate(60 12 12)" />
            <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="currentColor" strokeWidth="1" transform="rotate(120 12 12)" />
          </svg>
        </div>
        <div className="absolute top-48 right-[20%] text-physics-gold/20 animate-float" style={{ animationDelay: "1s" }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="3" />
            <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="currentColor" strokeWidth="1" />
            <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="currentColor" strokeWidth="1" transform="rotate(60 12 12)" />
            <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="currentColor" strokeWidth="1" transform="rotate(120 12 12)" />
          </svg>
        </div>
        <div className="absolute bottom-32 right-[10%] text-primary-foreground/10 animate-float" style={{ animationDelay: "3s" }}>
          <svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="3" />
            <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="currentColor" strokeWidth="1" />
            <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="currentColor" strokeWidth="1" transform="rotate(60 12 12)" />
            <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="currentColor" strokeWidth="1" transform="rotate(120 12 12)" />
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 pt-32 pb-20 lg:pt-40 lg:pb-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4 text-physics-gold" />
            <span className="text-sm text-primary-foreground/90">منصة تعليمية شاملة للفيزياء</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-primary-foreground mb-6 leading-tight animate-fade-in" style={{ animationDelay: "0.2s" }}>
            العلوم الفيزيائية
            <span className="block mt-2 text-physics-cyan">للتعليم الثانوي</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-primary-foreground/80 mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: "0.4s" }}>
            دروس شاملة، امتحانات متنوعة، وفيديوهات تعليمية لجميع مستويات التعليم الثانوي
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: "0.6s" }}>
            <Link to="/lessons">
              <Button variant="gold" size="xl" className="gap-3">
                <BookOpen className="w-5 h-5" />
                تصفح الدروس
              </Button>
            </Link>
            <Link to="/exams">
              <Button variant="glass" size="xl" className="gap-3 text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/10">
                <FileText className="w-5 h-5" />
                الامتحانات
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 sm:gap-8 mt-16 lg:mt-24 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.8s" }}>
            {[
              { icon: BookOpen, value: "5", label: "مستويات دراسية" },
              { icon: FileText, value: "+100", label: "امتحان" },
              { icon: Video, value: "+50", label: "فيديو تعليمي" },
            ].map((stat, index) => (
              <div key={index} className="text-center p-4 rounded-2xl bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10">
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-physics-gold" />
                <div className="text-2xl sm:text-3xl font-bold text-primary-foreground">{stat.value}</div>
                <div className="text-xs sm:text-sm text-primary-foreground/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 120L48 110C96 100 192 80 288 70C384 60 480 60 576 65C672 70 768 80 864 85C960 90 1056 90 1152 85C1248 80 1344 70 1392 65L1440 60V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0Z" fill="hsl(var(--background))" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
