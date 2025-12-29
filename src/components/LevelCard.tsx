import { Link } from "react-router-dom";
import { ChevronLeft, GraduationCap, BookOpen, FileText, Video } from "lucide-react";

interface LevelCardProps {
  title: string;
  description: string;
  href: string;
  color: "blue" | "cyan" | "gold";
  delay?: number;
}

const colorClasses = {
  blue: {
    gradient: "from-physics-blue/20 to-physics-blue/5",
    border: "border-physics-blue/20 hover:border-physics-blue/50",
    icon: "bg-physics-blue/10 text-physics-blue group-hover:bg-physics-blue group-hover:text-primary-foreground",
    glow: "group-hover:shadow-[0_0_40px_hsl(210_100%_45%/0.3)]",
  },
  cyan: {
    gradient: "from-physics-cyan/20 to-physics-cyan/5",
    border: "border-physics-cyan/20 hover:border-physics-cyan/50",
    icon: "bg-physics-cyan/10 text-physics-cyan group-hover:bg-physics-cyan group-hover:text-primary-foreground",
    glow: "group-hover:shadow-[0_0_40px_hsl(180_75%_42%/0.3)]",
  },
  gold: {
    gradient: "from-physics-gold/20 to-physics-gold/5",
    border: "border-physics-gold/20 hover:border-physics-gold/50",
    icon: "bg-physics-gold/10 text-physics-gold group-hover:bg-physics-gold group-hover:text-primary-foreground",
    glow: "group-hover:shadow-[0_0_40px_hsl(38_100%_55%/0.3)]",
  },
};

const LevelCard = ({ title, description, href, color, delay = 0 }: LevelCardProps) => {
  const styles = colorClasses[color];

  return (
    <Link
      to={href}
      className="group block animate-fade-in"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className={`relative overflow-hidden rounded-2xl bg-card border-2 ${styles.border} ${styles.glow} p-6 lg:p-8 transition-all duration-500 hover:-translate-y-2`}>
        {/* Background Gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${styles.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
        
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-transparent to-current opacity-5 rounded-full -translate-y-1/2 translate-x-1/2" />
        
        <div className="relative z-10">
          {/* Icon */}
          <div className={`w-16 h-16 rounded-2xl ${styles.icon} flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3`}>
            <GraduationCap className="w-8 h-8" />
          </div>

          {/* Content */}
          <h3 className="text-xl lg:text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            {description}
          </p>

          {/* Stats */}
          <div className="flex items-center gap-4 mb-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <BookOpen className="w-4 h-4" />
              <span>20+ درس</span>
            </div>
            <div className="flex items-center gap-1">
              <FileText className="w-4 h-4" />
              <span>15+ امتحان</span>
            </div>
            <div className="flex items-center gap-1">
              <Video className="w-4 h-4" />
              <span>10+ فيديو</span>
            </div>
          </div>

          {/* Action */}
          <div className="flex items-center gap-2 text-primary font-semibold">
            <span>استكشف المحتوى</span>
            <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-2" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default LevelCard;
