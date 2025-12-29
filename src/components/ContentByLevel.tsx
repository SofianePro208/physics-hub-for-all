import ContentCard from "@/components/ContentCard";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { GraduationCap } from "lucide-react";

interface ContentItem {
  id: number;
  title: string;
  description: string;
  level: string;
  levelId: string;
}

interface ContentByLevelProps {
  items: ContentItem[];
  type: "lesson" | "exam" | "video";
}

const levels = [
  { id: "1as-st", name: "السنة الأولى ثانوي", subtitle: "جذع مشترك علوم وتكنولوجيا" },
  { id: "2as-se", name: "السنة الثانية ثانوي", subtitle: "علوم تجريبية" },
  { id: "2as-mt", name: "السنة الثانية ثانوي", subtitle: "رياضيات وتقني رياضي" },
  { id: "3as-se", name: "السنة الثالثة ثانوي", subtitle: "علوم تجريبية" },
  { id: "3as-mt", name: "السنة الثالثة ثانوي", subtitle: "رياضيات وتقني رياضي" },
];

const typeRoutes = {
  lesson: "lesson",
  exam: "exam",
  video: "video",
};

const ContentByLevel = ({ items, type }: ContentByLevelProps) => {
  const groupedItems = levels.map((level) => ({
    ...level,
    items: items.filter((item) => item.levelId === level.id),
  }));

  return (
    <Accordion type="multiple" defaultValue={levels.map(l => l.id)} className="space-y-4">
      {groupedItems.map((level) => (
        level.items.length > 0 && (
          <AccordionItem
            key={level.id}
            value={level.id}
            className="bg-card border border-border/50 rounded-2xl overflow-hidden shadow-card"
          >
            <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-primary" />
                </div>
                <div className="text-right">
                  <h3 className="text-lg font-bold text-foreground">{level.name}</h3>
                  <p className="text-sm text-muted-foreground">{level.subtitle} • {level.items.length} عنصر</p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
                {level.items.map((item, index) => (
                  <ContentCard
                    key={item.id}
                    type={type}
                    title={item.title}
                    description={item.description}
                    level={item.level}
                    href={`/level/${item.levelId}/${typeRoutes[type]}/${item.id}`}
                    downloadUrl={type === "exam" ? "#" : undefined}
                    delay={index * 0.05}
                  />
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        )
      ))}
    </Accordion>
  );
};

export default ContentByLevel;
