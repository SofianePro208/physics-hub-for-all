import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Atom, Menu, X, Home, ChevronDown, Mail, Info, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import SearchDialog from "@/components/SearchDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navLinks = [
  { label: "الرئيسية", href: "/", icon: Home },
  { label: "من نحن", href: "/about", icon: Info },
  { label: "الأسئلة الشائعة", href: "/faq", icon: HelpCircle },
  { label: "اتصل بنا", href: "/contact", icon: Mail },
];

const levels = [
  { label: "السنة الأولى ثانوي", href: "/level/1as" },
  { label: "السنة الثانية ثانوي", href: "/level/2as" },
  { label: "السنة الثالثة ثانوي", href: "/level/3as" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) => location.pathname === href;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? "bg-background/80 backdrop-blur-xl shadow-lg border-b border-border/50" : "bg-transparent"}`}>
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-xl gradient-accent flex items-center justify-center shadow-lg">
              <Atom className="w-7 h-7 text-primary-foreground" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-foreground">Prof Sofiane</h1>
              <p className="text-xs text-muted-foreground">Physics Academy</p>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} to={link.href} className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 ${isActive(link.href) ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`}>
                <link.icon className="w-4 h-4" />
                {link.label}
              </Link>
            ))}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2 text-muted-foreground hover:text-foreground">
                  المستويات
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-popover">
                {levels.map((level) => (
                  <DropdownMenuItem key={level.href} asChild>
                    <Link to={level.href}>{level.label}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <SearchDialog />
            <ThemeToggle />
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <SearchDialog />
            <ThemeToggle />
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        <div className={`lg:hidden overflow-hidden transition-all duration-300 ${isOpen ? "max-h-[600px] pb-6" : "max-h-0"}`}>
          <div className="space-y-2 pt-4">
            {navLinks.map((link) => (
              <Link key={link.href} to={link.href} onClick={() => setIsOpen(false)} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive(link.href) ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"}`}>
                <link.icon className="w-5 h-5" />{link.label}
              </Link>
            ))}
            <div className="border-t border-border/50 pt-4 mt-4">
              <p className="text-sm font-semibold text-foreground mb-3 px-4">المستويات الدراسية</p>
              {levels.map((level) => (
                <Link
                  key={level.href}
                  to={level.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {level.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
