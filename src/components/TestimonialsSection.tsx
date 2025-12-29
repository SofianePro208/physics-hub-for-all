import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "أحمد بن علي",
    role: "طالب سنة ثالثة ثانوي - علوم تجريبية",
    content: "بفضل هذه المنصة تمكنت من فهم الدروس الصعبة وتحسين مستواي بشكل ملحوظ. الشروحات واضحة ومبسطة.",
    rating: 5,
    image: "أ",
  },
  {
    name: "فاطمة الزهراء",
    role: "طالبة سنة ثانية ثانوي - رياضيات",
    content: "الامتحانات المقترحة ساعدتني كثيراً في التحضير للفروض. أنصح بها كل الطلاب.",
    rating: 5,
    image: "ف",
  },
  {
    name: "محمد أمين",
    role: "طالب سنة أولى ثانوي",
    content: "الفيديوهات التعليمية رائعة جداً، خاصة في شرح التجارب العلمية. شكراً للأساتذة.",
    rating: 5,
    image: "م",
  },
  {
    name: "سارة بوعلام",
    role: "طالبة سنة ثالثة ثانوي - تقني رياضي",
    content: "المنصة ساعدتني في فهم الفيزياء بطريقة سهلة. الشروحات المفصلة غيرت نظرتي للمادة تماماً.",
    rating: 5,
    image: "س",
  },
  {
    name: "ياسين مراد",
    role: "طالب سنة ثانية ثانوي - علوم تجريبية",
    content: "أفضل منصة تعليمية استخدمتها. التمارين المحلولة ممتازة والأساتذة متميزون.",
    rating: 5,
    image: "ي",
  },
  {
    name: "نور الهدى",
    role: "طالبة سنة أولى ثانوي",
    content: "كنت أجد صعوبة في الكيمياء لكن بفضل الفيديوهات أصبحت من أفضل الطالبات في القسم.",
    rating: 5,
    image: "ن",
  },
  {
    name: "عبد الرحمن",
    role: "طالب سنة ثالثة ثانوي - رياضيات",
    content: "تحضيري للبكالوريا أصبح أسهل بكثير. المواضيع المقترحة مطابقة لمستوى الامتحانات الرسمية.",
    rating: 5,
    image: "ع",
  },
  {
    name: "إيمان بلقاسم",
    role: "طالبة سنة ثالثة ثانوي - علوم تجريبية",
    content: "الدروس منظمة ومرتبة بشكل ممتاز. أصبحت أحب مادة الفيزياء بفضل هذه المنصة الرائعة.",
    rating: 5,
    image: "إ",
  },
  {
    name: "كريم حسان",
    role: "طالب سنة ثانية ثانوي - تقني رياضي",
    content: "الملخصات والتمارين المحلولة وفرت علي الكثير من الوقت. منصة لا غنى عنها لكل طالب.",
    rating: 5,
    image: "ك",
  },
  {
    name: "أسماء معمري",
    role: "طالبة سنة أولى ثانوي",
    content: "أسلوب الشرح سهل وبسيط. حتى المفاهيم المعقدة أصبحت واضحة بفضل الفيديوهات التعليمية.",
    rating: 5,
    image: "أ",
  },
  {
    name: "رياض بوزيد",
    role: "طالب سنة ثالثة ثانوي - رياضيات",
    content: "حصلت على علامة ممتازة في البكالوريا بفضل التحضير عبر هذه المنصة. شكراً جزيلاً!",
    rating: 5,
    image: "ر",
  },
];

const TestimonialsSection = () => {
  // Duplicate testimonials for seamless infinite scroll
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="py-20 lg:py-32 bg-background relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-physics-cyan/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-physics-blue/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <span className="inline-block px-4 py-2 rounded-full bg-physics-gold/10 text-physics-gold text-sm font-semibold mb-4">
            آراء الطلاب
          </span>
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-4">
            ماذا يقول طلابنا؟
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            تجارب حقيقية من طلاب استفادوا من منصتنا التعليمية
          </p>
        </div>

        {/* Testimonials Marquee */}
        <div className="relative overflow-hidden w-full">
          <div className="flex gap-6 animate-marquee hover:[animation-play-state:paused] w-max">
            {duplicatedTestimonials.map((testimonial, index) => (
              <div
                key={index}
                className="group relative flex-shrink-0 w-[350px] bg-card rounded-2xl p-8 border border-border/50 hover:border-physics-cyan/30 shadow-card hover:shadow-card-hover transition-all duration-500"
              >
                {/* Quote Icon */}
                <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-physics-cyan/10 flex items-center justify-center">
                  <Quote className="w-6 h-6 text-physics-cyan" />
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-physics-gold text-physics-gold" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-muted-foreground leading-relaxed mb-8 line-clamp-4">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-physics-blue to-physics-cyan flex items-center justify-center text-xl font-bold text-primary-foreground">
                    {testimonial.image}
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
