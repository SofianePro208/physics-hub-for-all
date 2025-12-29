import { Link } from "react-router-dom";
import { Home, Search, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <SEOHead title="الصفحة غير موجودة" description="عذراً، الصفحة التي تبحث عنها غير موجودة." />
      
      <div className="text-center max-w-lg">
        {/* Animated 404 with physics theme */}
        <div className="relative mb-8">
          <div className="text-[180px] font-bold text-gradient leading-none select-none animate-pulse-slow">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-28 h-28 rounded-full gradient-accent flex items-center justify-center shadow-glow animate-float">
              <Compass className="w-14 h-14 text-white" />
            </div>
          </div>
        </div>

        <h1 className="text-4xl font-bold text-foreground mb-4">
          الصفحة غير موجودة
        </h1>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          يبدو أنك ضللت الطريق! الصفحة التي تبحث عنها غير موجودة أو تم نقلها إلى عنوان آخر.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button size="lg" className="gap-2 w-full sm:w-auto shadow-lg hover:shadow-xl transition-shadow">
              <Home className="w-5 h-5" />
              الصفحة الرئيسية
            </Button>
          </Link>
          <Link to="/lessons">
            <Button variant="outline" size="lg" className="gap-2 w-full sm:w-auto">
              <Search className="w-5 h-5" />
              تصفح الدروس
            </Button>
          </Link>
        </div>

        {/* Decorative elements */}
        <div className="mt-12 flex justify-center gap-4 opacity-30">
          <div className="w-3 h-3 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0s" }} />
          <div className="w-3 h-3 rounded-full bg-secondary animate-bounce" style={{ animationDelay: "0.2s" }} />
          <div className="w-3 h-3 rounded-full bg-accent animate-bounce" style={{ animationDelay: "0.4s" }} />
        </div>
      </div>
    </div>
  );
};

export default NotFound;
