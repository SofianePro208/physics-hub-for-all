import { Link } from "react-router-dom";
import { Atom, Mail, Phone, MapPin, Facebook, Youtube, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-physics-dark text-primary-foreground relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-physics-cyan/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-physics-blue/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 py-16 relative">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-6 group">
              <div className="w-14 h-14 rounded-xl gradient-accent flex items-center justify-center shadow-lg group-hover:shadow-glow transition-all duration-300">
                <Atom className="w-8 h-8 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-xl font-bold">فيزياء الثانوي</h3>
                <p className="text-sm text-primary-foreground/70">منصة تعليمية متكاملة</p>
              </div>
            </Link>
            <p className="text-primary-foreground/70 leading-relaxed mb-6">
              منصة تعليمية متخصصة في العلوم الفيزيائية للتعليم الثانوي الجزائري. نقدم محتوى تعليمي عالي الجودة لمساعدة الطلاب على التفوق.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-3">
              <a href="#" className="w-10 h-10 rounded-lg bg-white/10 hover:bg-physics-cyan/20 flex items-center justify-center transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-white/10 hover:bg-physics-cyan/20 flex items-center justify-center transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-white/10 hover:bg-physics-cyan/20 flex items-center justify-center transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
              <div className="w-1 h-6 bg-physics-cyan rounded-full" />
              روابط سريعة
            </h4>
            <ul className="space-y-3">
              {[
                { label: "الرئيسية", href: "/" },
                { label: "الدروس", href: "/lessons" },
                { label: "الامتحانات", href: "/exams" },
                { label: "الفيديوهات", href: "/videos" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-primary-foreground/70 hover:text-physics-cyan transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-physics-cyan transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Levels */}
          <div>
            <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
              <div className="w-1 h-6 bg-physics-gold rounded-full" />
              المستويات
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/level/1as" className="text-primary-foreground/70 hover:text-physics-gold transition-colors flex items-center gap-2 group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-physics-gold transition-all duration-300" />
                  السنة الأولى ثانوي
                </Link>
              </li>
              <li className="space-y-2">
                <span className="text-primary-foreground/90 font-medium">السنة الثانية ثانوي</span>
                <div className="pr-4 space-y-2">
                  <Link to="/level/2as-se" className="block text-sm text-primary-foreground/60 hover:text-physics-gold transition-colors">علوم تجريبية</Link>
                  <Link to="/level/2as-mt" className="block text-sm text-primary-foreground/60 hover:text-physics-gold transition-colors">رياضيات</Link>
                  <Link to="/level/2as-tm" className="block text-sm text-primary-foreground/60 hover:text-physics-gold transition-colors">تقني رياضي</Link>
                </div>
              </li>
              <li className="space-y-2">
                <span className="text-primary-foreground/90 font-medium">السنة الثالثة ثانوي</span>
                <div className="pr-4 space-y-2">
                  <Link to="/level/3as-se" className="block text-sm text-primary-foreground/60 hover:text-physics-gold transition-colors">علوم تجريبية</Link>
                  <Link to="/level/3as-mt" className="block text-sm text-primary-foreground/60 hover:text-physics-gold transition-colors">رياضيات</Link>
                  <Link to="/level/3as-tm" className="block text-sm text-primary-foreground/60 hover:text-physics-gold transition-colors">تقني رياضي</Link>
                </div>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
              <div className="w-1 h-6 bg-physics-blue rounded-full" />
              تواصل معنا
            </h4>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3 text-primary-foreground/70">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-physics-cyan" />
                </div>
                <span>contact@physics-edu.dz</span>
              </li>
              <li className="flex items-center gap-3 text-primary-foreground/70">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-physics-cyan" />
                </div>
                <span dir="ltr">+213 XX XX XX XX</span>
              </li>
              <li className="flex items-center gap-3 text-primary-foreground/70">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-physics-cyan" />
                </div>
                <span>الجزائر</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-primary-foreground/60 text-center sm:text-right">
              جميع الحقوق محفوظة © {new Date().getFullYear()} - فيزياء الثانوي
            </p>
            <div className="flex items-center gap-6 text-sm text-primary-foreground/60">
              <a href="#" className="hover:text-physics-cyan transition-colors">سياسة الخصوصية</a>
              <a href="#" className="hover:text-physics-cyan transition-colors">شروط الاستخدام</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
