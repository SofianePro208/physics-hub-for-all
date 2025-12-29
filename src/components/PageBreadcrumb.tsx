import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";

interface BreadcrumbItemType {
  label: string;
  href?: string;
}

interface PageBreadcrumbProps {
  items: BreadcrumbItemType[];
  className?: string;
  variant?: "light" | "dark";
}

const PageBreadcrumb = ({ items, className, variant = "light" }: PageBreadcrumbProps) => {
  const textColor = variant === "light" 
    ? "text-white/70 hover:text-white" 
    : "text-muted-foreground hover:text-foreground";
  const activeColor = variant === "light" ? "text-white" : "text-foreground";
  const separatorColor = variant === "light" ? "text-white/50" : "text-muted-foreground";

  return (
    <Breadcrumb className={cn("animate-fade-in", className)}>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/" className={cn("transition-colors", textColor)}>
              الرئيسية
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {items.map((item, index) => (
          <BreadcrumbItem key={index}>
            <BreadcrumbSeparator className={separatorColor} />
            {item.href ? (
              <BreadcrumbLink asChild>
                <Link to={item.href} className={cn("transition-colors", textColor)}>
                  {item.label}
                </Link>
              </BreadcrumbLink>
            ) : (
              <BreadcrumbPage className={activeColor}>{item.label}</BreadcrumbPage>
            )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default PageBreadcrumb;
