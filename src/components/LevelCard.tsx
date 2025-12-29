import { Link } from "react-router-dom";
import { ChevronLeft, GraduationCap } from "lucide-react";

interface LevelCardProps {
  title: string;
  description: string;
  href: string;
  color: "blue" | "cyan" | "gold";
  delay?: number;
}

const colorClasses = {
  blue: "from-physics-blue to-physics-dark border-physics-blue/30 hover:border-physics-blue/50",
  cyan: "from-physics-cyan to-physics-blue border-physics-cyan/30 hover:border-physics-cyan/50",
  gold: "from-physics-gold to-physics-cyan border-physics-gold/30 hover:border-physics-gold/50",
};

const iconColorClasses = {
  blue: "bg-physics-blue/20 text-physics-blue",
  cyan: "bg-physics-cyan/20 text-physics-cyan",
  gold: "bg-physics-gold/20 text-physics-gold",
};

const LevelCard = ({ title, description, href, color, delay = 0 }: LevelCardProps) => {
  return (
    <Link
      to={href}
      className="group block animate-fade-in"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className={`relative overflow-hidden rounded-2xl bg-card border-2 ${colorClasses[color]} p-6 lg:p-8 transition-all duration-500 hover:shadow-card-hover hover:-translate-y-2`}>
        {/* Background Gradient */}
        <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br ${colorClasses[color]}`} />
        
        {/* Icon */}
        <div className={`w-14 h-14 rounded-xl ${iconColorClasses[color]} flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110`}>
          <GraduationCap className="w-7 h-7" />
        </div>

        {/* Content */}
        <h3 className="text-xl lg:text-2xl font-bold text-foreground mb-3 group-hover:text-physics-blue transition-colors">
          {title}
        </h3>
        <p className="text-muted-foreground mb-6 leading-relaxed">
          {description}
        </p>

        {/* Action */}
        <div className="flex items-center gap-2 text-primary font-semibold">
          <span>استكشف المحتوى</span>
          <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-2" />
        </div>
      </div>
    </Link>
  );
};

export default LevelCard;
