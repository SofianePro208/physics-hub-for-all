import LevelCard from "./LevelCard";

const levels = [
  {
    title: "السنة الأولى ثانوي",
    description: "أساسيات الفيزياء والكيمياء للتعليم الثانوي",
    href: "/level/1as",
    color: "blue" as const,
  },
  {
    title: "السنة الثانية ثانوي",
    description: "دراسة معمقة للميكانيك والكهرباء والكيمياء",
    href: "/level/2as",
    color: "cyan" as const,
  },
  {
    title: "السنة الثالثة ثانوي",
    description: "تحضير شامل لامتحان البكالوريا مع مواضيع وحلول نموذجية",
    href: "/level/3as",
    color: "gold" as const,
  },
];

const LevelsSection = () => {
  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            المستويات الدراسية
          </span>
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-4">
            اختر مستواك الدراسي
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            محتوى تعليمي شامل ومنظم حسب كل مستوى دراسي
          </p>
        </div>

        {/* Levels Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {levels.map((level, index) => (
            <LevelCard
              key={level.href}
              {...level}
              delay={index * 0.15}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LevelsSection;
