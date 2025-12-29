import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Atom, Menu, X, BookOpen, FileText, Video, Home, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

const navLinks = [
  { label: "الرئيسية", href: "/", icon: Home },
  { label: "الدروس", href: "/lessons", icon: BookOpen },
  { label: "الامتحانات", href: "/exams", icon: FileText },
  { label: "الفيديوهات", href: "/videos", icon: Video },
];

const levels = [
  {
    label: "السنة الأولى ثانوي",
    href: "/level/1as",
  },
  {
    label: "السنة الثانية ثانوي",
    branches: [
      { label: "علوم تجريبية", href: "/level/2as-se" },
      { label: "رياضيات", href: "/level/2as-mt" },
      { label: "تقني رياضي", href: "/level/2as-tm" },
    ],
  },
  {
    label: "السنة الثالثة ثانوي",
    branches: [
      { label: "علوم تجريبية", href: "/level/3as-se" },
      { label: "رياضيات", href: "/level/3as-mt" },
      { label: "تقني رياضي", href: "/level/3as-tm" },
    ],
  },
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
              <h1 className="text-xl font-bold text-foreground">فيزياء الثانوي</h1>
              <p className="text-xs text-muted-foreground">منصة تعليمية متكاملة</p>
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
                {levels.map((level, index) => (
                  level.branches ? (
                    <DropdownMenuSub key={index}>
                      <DropdownMenuSubTrigger className="cursor-pointer">
                        {level.label}
                      </DropdownMenuSubTrigger>
                      <DropdownMenuSubContent className="bg-popover">
                        {level.branches.map((branch) => (
                          <DropdownMenuItem key={branch.href} asChild>
                            <Link to={branch.href}>{branch.label}</Link>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuSubContent>
                    </DropdownMenuSub>
                  ) : (
                    <DropdownMenuItem key={level.href} asChild>
                      <Link to={level.href!}>{level.label}</Link>
                    </DropdownMenuItem>
                  )
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <ThemeToggle />
          </div>

          <div className="flex items-center gap-2 lg:hidden">
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
              {levels.map((level, index) => (
                <div key={index} className="mb-2">
                  {level.branches ? (
                    <>
                      <p className="px-4 py-2 text-sm font-medium text-foreground">{level.label}</p>
                      <div className="pr-8 space-y-1">
                        {level.branches.map((branch) => (
                          <Link
                            key={branch.href}
                            to={branch.href}
                            onClick={() => setIsOpen(false)}
                            className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                          >
                            {branch.label}
                          </Link>
                        ))}
                      </div>
                    </>
                  ) : (
                    <Link
                      to={level.href!}
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {level.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
