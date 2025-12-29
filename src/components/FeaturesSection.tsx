import { BookOpen, FileText, Video, Download, Clock, Award, Zap, Shield } from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "دروس شاملة",
    description: "شروحات مفصلة لجميع الوحدات التعليمية مع أمثلة تطبيقية وتمارين محلولة",
    color: "from-physics-blue to-physics-cyan",
  },
  {
    icon: FileText,
    title: "امتحانات متنوعة",
    description: "تمارين وامتحانات سابقة من البكالوريا والفروض مع الحلول النموذجية",
    color: "from-physics-gold to-physics-cyan",
  },
  {
    icon: Video,
    title: "فيديوهات تعليمية",
    description: "شروحات مرئية للمفاهيم الصعبة والتجارب العلمية بجودة عالية",
    color: "from-physics-cyan to-physics-blue",
  },
  {
    icon: Download,
    title: "تحميل المحتوى",
    description: "إمكانية تحميل الدروس والامتحانات بصيغة PDF للمراجعة بدون إنترنت",
    color: "from-physics-blue to-physics-gold",
  },
  {
    icon: Zap,
    title: "تحديث مستمر",
    description: "إضافة محتوى جديد باستمرار يتوافق مع المنهاج الرسمي",
    color: "from-physics-gold to-physics-blue",
  },
  {
    icon: Award,
    title: "جودة عالية",
    description: "محتوى مُعد من طرف أساتذة متخصصين ذوي خبرة طويلة",
    color: "from-physics-cyan to-physics-gold",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-20 lg:py-32 bg-muted/50 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-physics-blue/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-physics-cyan/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <span className="inline-block px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-semibold mb-4">
            مميزات المنصة
          </span>
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-4">
            كل ما تحتاجه للنجاح
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            أدوات تعليمية متكاملة لمساعدتك في فهم الفيزياء والتفوق في امتحاناتك
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-card rounded-2xl p-8 border border-border/50 hover:border-transparent shadow-card hover:shadow-xl transition-all duration-500 animate-fade-in overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Hover Gradient Border */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`} />
              <div className="absolute inset-[2px] bg-card rounded-2xl" />
              
              <div className="relative z-10">
                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
                  <feature.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
