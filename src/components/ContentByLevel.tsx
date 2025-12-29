import ContentCard from "@/components/ContentCard";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { GraduationCap } from "lucide-react";

interface ContentItem {
  id: number | string;
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
  { 
    id: "1as", 
    name: "السنة الأولى ثانوي", 
    matches: ["1as", "1as-st"]
  },
  { 
    id: "2as", 
    name: "السنة الثانية ثانوي", 
    matches: ["2as", "2as-se", "2as-mt", "2as-tm"]
  },
  { 
    id: "3as", 
    name: "السنة الثالثة ثانوي", 
    matches: ["3as", "3as-se", "3as-mt", "3as-tm"]
  },
];

const ContentByLevel = ({ items, type }: ContentByLevelProps) => {
  const groupedItems = levels.map((level) => {
    const levelItems = items.filter((item) => 
      level.matches.includes(item.levelId) || item.levelId === level.id
    );
    return { ...level, items: levelItems, totalItems: levelItems.length };
  });

  return (
    <Accordion type="multiple" defaultValue={levels.map(l => l.id)} className="space-y-4">
      {groupedItems.map((level) => (
        level.totalItems > 0 && (
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
                  <p className="text-sm text-muted-foreground">{level.totalItems} عنصر</p>
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
                    level={level.name}
                    href={`/content/${type}/${item.id}`}
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
