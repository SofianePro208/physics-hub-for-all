import { Link } from "react-router-dom";
import { Atom, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-physics-dark text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl gradient-accent flex items-center justify-center">
                <Atom className="w-7 h-7 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-xl font-bold">فيزياء الثانوي</h3>
                <p className="text-sm text-primary-foreground/70">منصة تعليمية متكاملة</p>
              </div>
            </Link>
            <p className="text-primary-foreground/70 leading-relaxed">
              منصة تعليمية متخصصة في العلوم الفيزيائية للتعليم الثانوي الجزائري
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6">روابط سريعة</h4>
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
                    className="text-primary-foreground/70 hover:text-physics-cyan transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Levels */}
          <div>
            <h4 className="text-lg font-bold mb-6">المستويات</h4>
            <ul className="space-y-3">
              {[
                { label: "السنة الأولى ثانوي", href: "/level/1as-st" },
                { label: "السنة الثانية - علوم تجريبية", href: "/level/2as-se" },
                { label: "السنة الثانية - رياضيات", href: "/level/2as-mt" },
                { label: "السنة الثالثة - علوم تجريبية", href: "/level/3as-se" },
                { label: "السنة الثالثة - رياضيات", href: "/level/3as-mt" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-primary-foreground/70 hover:text-physics-cyan transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-6">تواصل معنا</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-primary-foreground/70">
                <Mail className="w-5 h-5 text-physics-cyan" />
                <span>contact@physics-edu.dz</span>
              </li>
              <li className="flex items-center gap-3 text-primary-foreground/70">
                <Phone className="w-5 h-5 text-physics-cyan" />
                <span dir="ltr">+213 XX XX XX XX</span>
              </li>
              <li className="flex items-center gap-3 text-primary-foreground/70">
                <MapPin className="w-5 h-5 text-physics-cyan" />
                <span>الجزائر</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/10 text-center text-primary-foreground/60">
          <p>جميع الحقوق محفوظة © {new Date().getFullYear()} - فيزياء الثانوي</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
