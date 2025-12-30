import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BookOpen, FileText, Video, Sparkles, Atom } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen gradient-hero overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Glowing orbs */}
        <div className="absolute top-16 right-[10%] w-80 h-80 bg-physics-cyan/15 rounded-full blur-[100px] animate-pulse-slow" />
        <div className="absolute bottom-24 left-[5%] w-[500px] h-[500px] bg-physics-gold/10 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-physics-blue/8 rounded-full blur-[150px]" />
        <div className="absolute top-[20%] left-[30%] w-64 h-64 bg-physics-purple/10 rounded-full blur-[80px] animate-pulse-slow" style={{ animationDelay: "1s" }} />
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
        
        {/* Floating Atoms */}
        <div className="absolute top-28 left-[12%] text-physics-cyan/25 animate-float">
          <Atom className="w-16 h-16" strokeWidth={1} />
        </div>
        <div className="absolute top-40 right-[18%] text-physics-gold/20 animate-float" style={{ animationDelay: "1.5s" }}>
          <Atom className="w-12 h-12" strokeWidth={1} />
        </div>
        <div className="absolute bottom-40 right-[8%] text-primary-foreground/15 animate-float" style={{ animationDelay: "3s" }}>
          <Atom className="w-20 h-20" strokeWidth={1} />
        </div>
        <div className="absolute bottom-[30%] left-[8%] text-physics-purple/15 animate-float" style={{ animationDelay: "2s" }}>
          <Atom className="w-14 h-14" strokeWidth={1} />
        </div>
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 pt-32 pb-20 lg:pt-40 lg:pb-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-primary-foreground/10 backdrop-blur-md border border-primary-foreground/20 mb-10 animate-fade-in shadow-lg">
            <Sparkles className="w-5 h-5 text-physics-gold" />
            <span className="text-sm font-medium text-primary-foreground">منصة تعليمية شاملة للفيزياء والكيمياء</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-primary-foreground mb-8 leading-tight animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Prof Sofiane
            <span className="block mt-3 bg-gradient-to-l from-physics-cyan via-physics-gold to-physics-cyan bg-clip-text text-transparent">Physics Academy</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-primary-foreground/85 mb-14 max-w-2xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: "0.4s" }}>
            دروس شاملة، امتحانات متنوعة، وفيديوهات تعليمية لجميع مستويات التعليم الثانوي في الجزائر
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-6 animate-fade-in" style={{ animationDelay: "0.6s" }}>
            <Link to="/lessons" className="group">
              <Button 
                variant="gold" 
                size="xl" 
                className="relative gap-3 text-lg shadow-xl hover:shadow-2xl overflow-hidden transition-all duration-500 hover:scale-105"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-physics-gold/0 via-white/20 to-physics-gold/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                <BookOpen className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
                <span>تصفح الدروس</span>
              </Button>
            </Link>
            <Link to="/exams" className="group">
              <Button 
                variant="ghost" 
                size="xl" 
                className="relative gap-3 text-lg !text-white border-2 border-white/30 bg-transparent hover:bg-white/15 hover:border-physics-cyan backdrop-blur-md overflow-hidden transition-all duration-500 hover:scale-105"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-physics-cyan/0 via-physics-cyan/20 to-physics-cyan/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                <FileText className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
                <span>الامتحانات</span>
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-5 sm:gap-10 mt-20 lg:mt-28 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.8s" }}>
            {[
              { icon: BookOpen, value: "5", label: "مستويات دراسية", color: "text-physics-blue" },
              { icon: FileText, value: "+100", label: "امتحان", color: "text-physics-gold" },
              { icon: Video, value: "+50", label: "فيديو تعليمي", color: "text-physics-cyan" },
            ].map((stat, index) => (
              <div 
                key={index} 
                className="group text-center p-5 rounded-3xl bg-primary-foreground/8 backdrop-blur-md border border-primary-foreground/15 hover:bg-primary-foreground/15 hover:border-primary-foreground/30 transition-all duration-400 hover:-translate-y-2 hover:shadow-xl"
              >
                <stat.icon className={`w-7 h-7 mx-auto mb-3 ${stat.color} group-hover:scale-110 transition-transform duration-300`} />
                <div className="text-3xl sm:text-4xl font-bold text-primary-foreground">{stat.value}</div>
                <div className="text-xs sm:text-sm text-primary-foreground/70 mt-1">{stat.label}</div>
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
