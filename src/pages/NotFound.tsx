import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, Search, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        {/* Animated 404 */}
        <div className="relative mb-8">
          <div className="text-[150px] font-bold text-muted/20 leading-none select-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-destructive/10 flex items-center justify-center animate-pulse">
              <AlertCircle className="w-12 h-12 text-destructive" />
            </div>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-foreground mb-4">
          الصفحة غير موجودة
        </h1>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها إلى عنوان آخر.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button size="lg" className="gap-2 w-full sm:w-auto">
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
      </div>
    </div>
  );
};

export default NotFound;
