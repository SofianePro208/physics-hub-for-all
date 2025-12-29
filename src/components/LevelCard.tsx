import { Link } from "react-router-dom";
import { ChevronLeft, GraduationCap, BookOpen, FileText, Video } from "lucide-react";

interface LevelCardProps {
  title: string;
  description: string;
  href: string;
  color: "blue" | "cyan" | "gold";
  branches?: { name: string; href: string }[];
  delay?: number;
}

const colorClasses = {
  blue: {
    gradient: "from-physics-blue/20 to-physics-blue/5",
    border: "border-physics-blue/20 hover:border-physics-blue/50",
    icon: "bg-physics-blue/10 text-physics-blue group-hover:bg-physics-blue group-hover:text-primary-foreground",
    glow: "group-hover:shadow-[0_0_40px_hsl(210_100%_45%/0.3)]",
    badge: "bg-physics-blue/10 text-physics-blue",
  },
  cyan: {
    gradient: "from-physics-cyan/20 to-physics-cyan/5",
    border: "border-physics-cyan/20 hover:border-physics-cyan/50",
    icon: "bg-physics-cyan/10 text-physics-cyan group-hover:bg-physics-cyan group-hover:text-primary-foreground",
    glow: "group-hover:shadow-[0_0_40px_hsl(180_75%_42%/0.3)]",
    badge: "bg-physics-cyan/10 text-physics-cyan",
  },
  gold: {
    gradient: "from-physics-gold/20 to-physics-gold/5",
    border: "border-physics-gold/20 hover:border-physics-gold/50",
    icon: "bg-physics-gold/10 text-physics-gold group-hover:bg-physics-gold group-hover:text-primary-foreground",
    glow: "group-hover:shadow-[0_0_40px_hsl(38_100%_55%/0.3)]",
    badge: "bg-physics-gold/10 text-physics-gold",
  },
};

const LevelCard = ({ title, description, href, color, branches, delay = 0 }: LevelCardProps) => {
  const styles = colorClasses[color];
  const hasBranches = branches && branches.length > 0;

  const CardContent = () => (
    <>
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

        {/* Branches */}
        {hasBranches && (
          <div className="space-y-2 mb-6">
            <p className="text-sm font-semibold text-foreground mb-3">اختر الشعبة:</p>
            <div className="flex flex-wrap gap-2">
              {branches.map((branch) => (
                <Link
                  key={branch.href}
                  to={branch.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${styles.badge} hover:opacity-80 transition-all hover:scale-105`}
                  onClick={(e) => e.stopPropagation()}
                >
                  {branch.name}
                </Link>
              ))}
            </div>
          </div>
        )}

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
        {!hasBranches && (
          <div className="flex items-center gap-2 text-primary font-semibold">
            <span>استكشف المحتوى</span>
            <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-2" />
          </div>
        )}
      </div>
    </>
  );

  if (hasBranches) {
    return (
      <div
        className={`group relative overflow-hidden rounded-2xl bg-card border-2 ${styles.border} ${styles.glow} p-6 lg:p-8 transition-all duration-500 animate-fade-in`}
        style={{ animationDelay: `${delay}s` }}
      >
        <CardContent />
      </div>
    );
  }

  return (
    <Link
      to={href}
      className="group block animate-fade-in"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className={`relative overflow-hidden rounded-2xl bg-card border-2 ${styles.border} ${styles.glow} p-6 lg:p-8 transition-all duration-500 hover:-translate-y-2`}>
        <CardContent />
      </div>
    </Link>
  );
};

export default LevelCard;
