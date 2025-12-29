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
    gradient: "from-physics-blue via-physics-purple to-physics-cyan",
    bg: "bg-physics-blue/8",
    text: "text-physics-blue",
    border: "border-physics-blue/15",
    hover: "group-hover:border-physics-blue/40",
    shadow: "group-hover:shadow-[0_25px_60px_-15px_hsl(205_100%_50%/0.25)]",
    iconBg: "from-physics-blue to-physics-purple",
  },
  cyan: {
    gradient: "from-physics-cyan via-physics-blue to-physics-purple",
    bg: "bg-physics-cyan/8",
    text: "text-physics-cyan",
    border: "border-physics-cyan/15",
    hover: "group-hover:border-physics-cyan/40",
    shadow: "group-hover:shadow-[0_25px_60px_-15px_hsl(175_80%_40%/0.25)]",
    iconBg: "from-physics-cyan to-physics-blue",
  },
  gold: {
    gradient: "from-physics-gold via-physics-cyan to-physics-blue",
    bg: "bg-physics-gold/8",
    text: "text-physics-gold",
    border: "border-physics-gold/15",
    hover: "group-hover:border-physics-gold/40",
    shadow: "group-hover:shadow-[0_25px_60px_-15px_hsl(35_100%_55%/0.25)]",
    iconBg: "from-physics-gold to-physics-cyan",
  },
};

const LevelCard = ({ title, description, href, color, branches, delay = 0 }: LevelCardProps) => {
  const colors = colorClasses[color];

  return (
    <div
      className={`group relative bg-card rounded-3xl overflow-hidden border-2 ${colors.border} ${colors.hover} shadow-md transition-all duration-500 animate-fade-in hover:-translate-y-3 ${colors.shadow}`}
      style={{ animationDelay: `${delay}s` }}
    >
      {/* Decorative top gradient line */}
      <div className={`h-1.5 bg-gradient-to-r ${colors.gradient}`} />
      
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
        <div className={`absolute top-10 -left-20 w-40 h-40 rounded-full bg-gradient-to-br ${colors.gradient} blur-3xl`} />
        <div className={`absolute bottom-10 -right-20 w-32 h-32 rounded-full bg-gradient-to-br ${colors.gradient} blur-3xl`} />
      </div>
      
      {/* Shine effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
      </div>

      <div className="p-8 relative">
        {/* Icon */}
        <div className={`w-18 h-18 rounded-2xl bg-gradient-to-br ${colors.iconBg} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
          <GraduationCap className="w-9 h-9 text-primary-foreground" />
        </div>

        <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>
        <p className="text-muted-foreground mb-6 leading-relaxed text-base">
          {description}
        </p>

        {branches ? (
          <div className="space-y-3">
            <p className="text-sm font-semibold text-muted-foreground mb-3">الشعب المتوفرة:</p>
            {branches.map((branch) => (
              <Link
                key={branch.href}
                to={branch.href}
                className={`flex items-center justify-between p-4 rounded-2xl ${colors.bg} border-2 ${colors.border} hover:border-current hover:${colors.text} transition-all duration-300 group/branch backdrop-blur-sm`}
              >
                <span className="font-semibold text-foreground group-hover/branch:text-primary transition-colors">
                  {branch.name}
                </span>
                <ArrowLeft className={`w-5 h-5 ${colors.text} group-hover/branch:-translate-x-2 transition-transform duration-300`} />
              </Link>
            ))}
          </div>
        ) : (
          <Link
            to={href}
            className={`inline-flex items-center gap-3 px-7 py-4 rounded-2xl bg-gradient-to-r ${colors.iconBg} text-primary-foreground font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300`}
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
