import { Link } from "react-router-dom";
import { ArrowLeft, GraduationCap, BookOpen, FileText, Video } from "lucide-react";
import { useState } from "react";

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
    glowColor: "rgba(59, 130, 246, 0.5)",
  },
  cyan: {
    gradient: "from-physics-cyan via-physics-blue to-physics-purple",
    bg: "bg-physics-cyan/8",
    text: "text-physics-cyan",
    border: "border-physics-cyan/15",
    hover: "group-hover:border-physics-cyan/40",
    shadow: "group-hover:shadow-[0_25px_60px_-15px_hsl(175_80%_40%/0.25)]",
    iconBg: "from-physics-cyan to-physics-blue",
    glowColor: "rgba(6, 182, 212, 0.5)",
  },
  gold: {
    gradient: "from-physics-gold via-physics-cyan to-physics-blue",
    bg: "bg-physics-gold/8",
    text: "text-physics-gold",
    border: "border-physics-gold/15",
    hover: "group-hover:border-physics-gold/40",
    shadow: "group-hover:shadow-[0_25px_60px_-15px_hsl(35_100%_55%/0.25)]",
    iconBg: "from-physics-gold to-physics-cyan",
    glowColor: "rgba(245, 158, 11, 0.5)",
  },
};

const LevelCard = ({ title, description, href, color, branches, delay = 0 }: LevelCardProps) => {
  const colors = colorClasses[color];
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`group relative bg-card rounded-3xl overflow-hidden border-2 ${colors.border} ${colors.hover} shadow-md transition-all duration-500 animate-fade-in hover:-translate-y-3 ${colors.shadow}`}
      style={{ animationDelay: `${delay}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated top gradient line */}
      <div className={`h-1.5 bg-gradient-to-r ${colors.gradient} relative overflow-hidden`}>
        <div 
          className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-1000 ${isHovered ? 'translate-x-full' : '-translate-x-full'}`} 
        />
      </div>
      
      {/* Background decoration with animation */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
        <div 
          className={`absolute top-10 -left-20 w-40 h-40 rounded-full bg-gradient-to-br ${colors.gradient} blur-3xl transition-transform duration-700 ${isHovered ? 'scale-150' : 'scale-100'}`} 
        />
        <div 
          className={`absolute bottom-10 -right-20 w-32 h-32 rounded-full bg-gradient-to-br ${colors.gradient} blur-3xl transition-transform duration-700 ${isHovered ? 'scale-150' : 'scale-100'}`} 
        />
      </div>
      
      {/* Shine effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
      </div>

      <div className="p-8 relative">
        {/* Floating particles effect */}
        <div className={`absolute top-4 right-4 transition-all duration-500 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
          <BookOpen className={`w-4 h-4 ${colors.text} animate-bounce-subtle`} style={{ animationDelay: '0s' }} />
        </div>
        <div className={`absolute top-8 right-12 transition-all duration-500 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`} style={{ transitionDelay: '100ms' }}>
          <FileText className={`w-3 h-3 ${colors.text} animate-bounce-subtle`} style={{ animationDelay: '0.3s' }} />
        </div>
        <div className={`absolute top-6 right-20 transition-all duration-500 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`} style={{ transitionDelay: '200ms' }}>
          <Video className={`w-3 h-3 ${colors.text} animate-bounce-subtle`} style={{ animationDelay: '0.6s' }} />
        </div>

        {/* Icon with enhanced animation */}
        <div 
          className={`w-18 h-18 rounded-2xl bg-gradient-to-br ${colors.iconBg} flex items-center justify-center mb-6 shadow-lg transition-all duration-500`}
          style={{
            transform: isHovered ? 'scale(1.1) rotate(6deg)' : 'scale(1) rotate(0deg)',
            boxShadow: isHovered ? `0 20px 40px -10px ${colors.glowColor}` : '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
          }}
        >
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
            {branches.map((branch, index) => (
              <Link
                key={branch.href}
                to={branch.href}
                className={`flex items-center justify-between p-4 rounded-2xl ${colors.bg} border-2 ${colors.border} hover:border-current transition-all duration-300 group/branch backdrop-blur-sm hover:scale-[1.02] hover:shadow-md`}
                style={{ animationDelay: `${index * 0.1}s` }}
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
            className={`inline-flex items-center gap-3 px-7 py-4 rounded-2xl bg-gradient-to-r ${colors.iconBg} text-primary-foreground font-bold shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group/btn`}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-700" />
            <span className="relative">استكشف المحتوى</span>
            <ArrowLeft className="w-5 h-5 relative group-hover/btn:-translate-x-1 transition-transform" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default LevelCard;
