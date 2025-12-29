import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import SEOHead from "@/components/SEOHead";
import PageBreadcrumb from "@/components/PageBreadcrumb";
import { 
  GraduationCap, 
  Target, 
  Users, 
  Award, 
  BookOpen, 
  CheckCircle,
  Atom,
  Lightbulb,
  Heart
} from "lucide-react";

const stats = [
  { value: "10+", label: "سنوات خبرة", icon: Award },
  { value: "5000+", label: "طالب مستفيد", icon: Users },
  { value: "500+", label: "درس ومحتوى", icon: BookOpen },
  { value: "95%", label: "نسبة النجاح", icon: Target },
];

const values = [
  {
    icon: Lightbulb,
    title: "التبسيط",
    description: "نؤمن بأن الفيزياء يمكن فهمها بسهولة عند تقديمها بطريقة مبسطة وواضحة",
  },
  {
    icon: Target,
    title: "الجودة",
    description: "نحرص على تقديم محتوى عالي الجودة يتوافق مع المنهاج الرسمي ويتجاوزه",
  },
  {
    icon: Heart,
    title: "الشغف",
    description: "حب العلم والتعليم هو ما يدفعنا لتقديم الأفضل لطلابنا كل يوم",
  },
];

const milestones = [
  { year: "2018", title: "انطلاق المنصة", description: "بدأنا مسيرتنا بتقديم دروس مجانية للطلاب" },
  { year: "2020", title: "توسيع المحتوى", description: "إضافة امتحانات وحلول نموذجية لجميع المستويات" },
  { year: "2022", title: "الفيديوهات التعليمية", description: "إطلاق قناة الفيديوهات التعليمية" },
  { year: "2024", title: "المنصة الجديدة", description: "إطلاق النسخة الجديدة من المنصة بتصميم عصري" },
];

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="من نحن"
        description="تعرف على منصة العلوم الفيزيائية - منصة تعليمية متخصصة في تقديم محتوى عالي الجودة لطلاب التعليم الثانوي الجزائري."
        keywords="من نحن, منصة تعليمية, فيزياء الجزائر, تعليم ثانوي"
      />
      <Header />
      
      <main className="pt-24 lg:pt-28">
        {/* Hero Section */}
        <section className="gradient-hero py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <PageBreadcrumb 
              items={[{ label: "من نحن" }]} 
              className="mb-8"
              variant="light"
            />

            <div className="max-w-3xl animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-6">
                <Atom className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl lg:text-5xl font-bold text-white mb-4">
                من نحن
              </h1>
              <p className="text-xl text-white/80">
                نحن منصة تعليمية متخصصة في العلوم الفيزيائية للتعليم الثانوي الجزائري
              </p>
            </div>
          </div>
        </section>

        {/* About Content */}
        <section className="py-12 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Mission */}
              <div className="bg-card rounded-2xl border border-border/50 p-8 mb-8 shadow-card animate-fade-in">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <GraduationCap className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-2">رسالتنا</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      تأسست منصة "فيزياء الثانوي" بهدف مساعدة طلاب التعليم الثانوي في الجزائر على فهم وإتقان مادة العلوم الفيزيائية. 
                      نسعى لتقديم محتوى تعليمي عالي الجودة، مبسط وشامل، يتوافق مع المنهاج الرسمي ويساعد الطلاب على التفوق في امتحاناتهم.
                    </p>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="bg-card rounded-2xl border border-border/50 p-6 text-center shadow-card hover:shadow-card-hover transition-all duration-300 animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <stat.icon className="w-8 h-8 mx-auto mb-3 text-primary" />
                    <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Values */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-foreground mb-8 text-center">قيمنا</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {values.map((value, index) => (
                    <div
                      key={index}
                      className="bg-card rounded-2xl border border-border/50 p-6 shadow-card hover:shadow-card-hover transition-all duration-300 animate-fade-in group"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="w-12 h-12 rounded-xl bg-physics-cyan/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <value.icon className="w-6 h-6 text-physics-cyan" />
                      </div>
                      <h3 className="text-lg font-bold text-foreground mb-2">{value.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Timeline */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-foreground mb-8 text-center">مسيرتنا</h2>
                <div className="space-y-6">
                  {milestones.map((milestone, index) => (
                    <div
                      key={index}
                      className="flex gap-6 animate-fade-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-physics-blue to-physics-cyan flex items-center justify-center text-white font-bold text-sm">
                          {milestone.year}
                        </div>
                        {index < milestones.length - 1 && (
                          <div className="w-0.5 h-full bg-border mt-2" />
                        )}
                      </div>
                      <div className="bg-card rounded-xl border border-border/50 p-6 flex-1 shadow-card">
                        <h3 className="font-bold text-foreground mb-2">{milestone.title}</h3>
                        <p className="text-muted-foreground text-sm">{milestone.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* What We Offer */}
              <div className="bg-muted/50 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6 text-center">ما نقدمه</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    "دروس مفصلة ومبسطة لجميع الوحدات",
                    "امتحانات وفروض مع الحلول النموذجية",
                    "مواضيع بكالوريا السنوات السابقة",
                    "فيديوهات شرح للمفاهيم الصعبة",
                    "تمارين متنوعة حسب المستوى",
                    "متابعة مستمرة للمنهاج الرسمي",
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-physics-cyan shrink-0" />
                      <span className="text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default AboutPage;
