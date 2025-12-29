import ContentCard from "@/components/ContentCard";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GraduationCap, Calendar } from "lucide-react";

interface ContentItem {
  id: number | string;
  title: string;
  description: string;
  level: string;
  levelId: string;
  trimester?: number;
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

const trimesters = [
  { id: 1, name: "الفصل الأول" },
  { id: 2, name: "الفصل الثاني" },
  { id: 3, name: "الفصل الثالث" },
];

const ContentByLevel = ({ items, type }: ContentByLevelProps) => {
  const groupedItems = levels.map((level) => {
    const levelItems = items.filter((item) => 
      level.matches.includes(item.levelId) || item.levelId === level.id
    );
    return { ...level, items: levelItems, totalItems: levelItems.length };
  });

  const getItemsByTrimester = (levelItems: ContentItem[], trimesterId: number) => {
    return levelItems.filter(item => (item.trimester || 1) === trimesterId);
  };

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
              <Tabs defaultValue="1" className="pt-4">
                <TabsList className="grid grid-cols-3 mb-6 bg-muted/50">
                  {trimesters.map((trimester) => {
                    const count = getItemsByTrimester(level.items, trimester.id).length;
                    return (
                      <TabsTrigger 
                        key={trimester.id} 
                        value={trimester.id.toString()}
                        className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                      >
                        <Calendar className="w-4 h-4" />
                        <span className="hidden sm:inline">{trimester.name}</span>
                        <span className="sm:hidden">ف{trimester.id}</span>
                        {count > 0 && (
                          <span className="bg-background/20 text-xs px-1.5 py-0.5 rounded-full">
                            {count}
                          </span>
                        )}
                      </TabsTrigger>
                    );
                  })}
                </TabsList>
                {trimesters.map((trimester) => {
                  const trimesterItems = getItemsByTrimester(level.items, trimester.id);
                  return (
                    <TabsContent key={trimester.id} value={trimester.id.toString()}>
                      {trimesterItems.length > 0 ? (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          {trimesterItems.map((item, index) => (
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
                      ) : (
                        <div className="text-center py-8 text-muted-foreground">
                          <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
                          <p>لا يوجد محتوى في {trimester.name}</p>
                        </div>
                      )}
                    </TabsContent>
                  );
                })}
              </Tabs>
            </AccordionContent>
          </AccordionItem>
        )
      ))}
    </Accordion>
  );
};

export default ContentByLevel;
