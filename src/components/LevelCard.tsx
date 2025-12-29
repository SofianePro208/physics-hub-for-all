import { Link } from "react-router-dom";
import { ArrowLeft, GraduationCap } from "lucide-react";

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
    gradient: "from-physics-blue to-physics-cyan",
    bg: "bg-physics-blue/10",
    text: "text-physics-blue",
    border: "border-physics-blue/20",
    hover: "group-hover:border-physics-blue/50",
    shadow: "group-hover:shadow-[0_20px_50px_-15px_hsl(210_100%_45%/0.3)]",
  },
  cyan: {
    gradient: "from-physics-cyan to-physics-blue",
    bg: "bg-physics-cyan/10",
    text: "text-physics-cyan",
    border: "border-physics-cyan/20",
    hover: "group-hover:border-physics-cyan/50",
    shadow: "group-hover:shadow-[0_20px_50px_-15px_hsl(180_75%_42%/0.3)]",
  },
  gold: {
    gradient: "from-physics-gold to-physics-cyan",
    bg: "bg-physics-gold/10",
    text: "text-physics-gold",
    border: "border-physics-gold/20",
    hover: "group-hover:border-physics-gold/50",
    shadow: "group-hover:shadow-[0_20px_50px_-15px_hsl(38_100%_55%/0.3)]",
  },
};

const LevelCard = ({ title, description, href, color, branches, delay = 0 }: LevelCardProps) => {
  const colors = colorClasses[color];

  return (
    <div
      className={`group relative bg-card rounded-2xl overflow-hidden border ${colors.border} ${colors.hover} shadow-card transition-all duration-500 animate-fade-in hover:-translate-y-2 ${colors.shadow}`}
      style={{ animationDelay: `${delay}s` }}
    >
      {/* Decorative top gradient line */}
      <div className={`h-1.5 bg-gradient-to-r ${colors.gradient}`} />
      
      {/* Shine effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
      </div>

      <div className="p-8 relative">
        {/* Icon */}
        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${colors.gradient} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
          <GraduationCap className="w-8 h-8 text-primary-foreground" />
        </div>

        <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-muted-foreground mb-6 leading-relaxed">
          {description}
        </p>

        {branches ? (
          <div className="space-y-3">
            <p className="text-sm font-medium text-muted-foreground mb-2">الشعب المتوفرة:</p>
            {branches.map((branch) => (
              <Link
                key={branch.href}
                to={branch.href}
                className={`flex items-center justify-between p-4 rounded-xl ${colors.bg} border ${colors.border} hover:bg-opacity-20 transition-all group/branch`}
              >
                <span className="font-medium text-foreground group-hover/branch:text-primary transition-colors">
                  {branch.name}
                </span>
                <ArrowLeft className={`w-5 h-5 ${colors.text} group-hover/branch:-translate-x-2 transition-transform`} />
              </Link>
            ))}
          </div>
        ) : (
          <Link
            to={href}
            className={`inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-gradient-to-r ${colors.gradient} text-primary-foreground font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300`}
          >
            استكشف المحتوى
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default LevelCard;
