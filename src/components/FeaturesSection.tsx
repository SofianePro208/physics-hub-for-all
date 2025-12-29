import { BookOpen, FileText, Video, Download, Clock, Award } from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "دروس شاملة",
    description: "شروحات مفصلة لجميع الوحدات التعليمية مع أمثلة تطبيقية",
  },
  {
    icon: FileText,
    title: "امتحانات متنوعة",
    description: "تمارين وامتحانات سابقة مع الحلول النموذجية",
  },
  {
    icon: Video,
    title: "فيديوهات تعليمية",
    description: "شروحات مرئية للمفاهيم الصعبة والتجارب العلمية",
  },
  {
    icon: Download,
    title: "تحميل المحتوى",
    description: "إمكانية تحميل الدروس والامتحانات بصيغة PDF",
  },
  {
    icon: Clock,
    title: "متاح دائماً",
    description: "الوصول للمحتوى في أي وقت ومن أي مكان",
  },
  {
    icon: Award,
    title: "جودة عالية",
    description: "محتوى مُعد من طرف أساتذة متخصصين",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-20 lg:py-32 bg-muted/50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <span className="inline-block px-4 py-2 rounded-full bg-secondary/20 text-secondary text-sm font-semibold mb-4">
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
              className="group bg-card rounded-2xl p-8 border border-border/50 hover:border-primary/30 shadow-card hover:shadow-card-hover transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
