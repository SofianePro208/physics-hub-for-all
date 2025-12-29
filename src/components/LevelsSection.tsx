import LevelCard from "./LevelCard";

const levels = [
  {
    title: "السنة الأولى ثانوي",
    description: "جذع مشترك علوم وتكنولوجيا - أساسيات الفيزياء والكيمياء",
    href: "/level/1as-st",
    color: "blue" as const,
  },
  {
    title: "السنة الثانية ثانوي - علوم تجريبية",
    description: "شعبة العلوم التجريبية - الميكانيك والكهرباء",
    href: "/level/2as-se",
    color: "cyan" as const,
  },
  {
    title: "السنة الثانية ثانوي - رياضيات وتقني",
    description: "شعبة الرياضيات والتقني رياضي - فيزياء متقدمة",
    href: "/level/2as-mt",
    color: "gold" as const,
  },
  {
    title: "السنة الثالثة ثانوي - علوم تجريبية",
    description: "شعبة العلوم التجريبية - تحضير البكالوريا",
    href: "/level/3as-se",
    color: "blue" as const,
  },
  {
    title: "السنة الثالثة ثانوي - رياضيات وتقني",
    description: "شعبة الرياضيات والتقني رياضي - تحضير البكالوريا",
    href: "/level/3as-mt",
    color: "cyan" as const,
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
            محتوى تعليمي شامل ومنظم حسب كل مستوى وشعبة
          </p>
        </div>

        {/* Levels Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {levels.map((level, index) => (
            <LevelCard
              key={level.href}
              {...level}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LevelsSection;
