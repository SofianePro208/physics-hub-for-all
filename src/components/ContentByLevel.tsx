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
  { 
    id: "1as", 
    name: "السنة الأولى ثانوي", 
    subtitle: "جذع مشترك علوم وتكنولوجيا",
    matches: ["1as", "1as-st"]
  },
  { 
    id: "2as", 
    name: "السنة الثانية ثانوي", 
    subtitle: "جميع الشعب",
    branches: [
      { id: "2as-se", name: "علوم تجريبية" },
      { id: "2as-mt", name: "رياضيات وتقني رياضي", matches: ["2as-mt", "2as-tm"] },
    ]
  },
  { 
    id: "3as", 
    name: "السنة الثالثة ثانوي", 
    subtitle: "جميع الشعب",
    branches: [
      { id: "3as-se", name: "علوم تجريبية" },
      { id: "3as-mt", name: "رياضيات وتقني رياضي", matches: ["3as-mt", "3as-tm"] },
    ]
  },
];

const typeRoutes = {
  lesson: "lesson",
  exam: "exam",
  video: "video",
};

const ContentByLevel = ({ items, type }: ContentByLevelProps) => {
  const groupedItems = levels.map((level) => {
    if (level.branches) {
      // Group by branches
      const branchItems = level.branches.map(branch => ({
        ...branch,
        items: items.filter((item) => 
          branch.matches ? branch.matches.includes(item.levelId) : item.levelId === branch.id
        ),
      }));
      const totalItems = branchItems.reduce((sum, b) => sum + b.items.length, 0);
      return { ...level, branchItems, totalItems };
    } else {
      // Single level (1as)
      const levelItems = items.filter((item) => 
        level.matches?.includes(item.levelId) || item.levelId === level.id
      );
      return { ...level, items: levelItems, totalItems: levelItems.length };
    }
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
                  <p className="text-sm text-muted-foreground">{level.subtitle} • {level.totalItems} عنصر</p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              {'branchItems' in level ? (
                // Render branches
                <div className="space-y-6 pt-4">
                  {level.branchItems.map((branch) => (
                    branch.items.length > 0 && (
                      <div key={branch.id}>
                        <h4 className="text-md font-semibold text-foreground mb-4 flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-primary" />
                          {branch.name}
                          <span className="text-sm text-muted-foreground font-normal">({branch.items.length})</span>
                        </h4>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          {branch.items.map((item, index) => (
                            <ContentCard
                              key={item.id}
                              type={type}
                              title={item.title}
                              description={item.description}
                              level={branch.name}
                              href={`/level/${item.levelId}/${typeRoutes[type]}/${item.id}`}
                              downloadUrl={type === "exam" ? "#" : undefined}
                              delay={index * 0.05}
                            />
                          ))}
                        </div>
                      </div>
                    )
                  ))}
                </div>
              ) : (
                // Render single level items
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
                  {level.items?.map((item, index) => (
                    <ContentCard
                      key={item.id}
                      type={type}
                      title={item.title}
                      description={item.description}
                      level={level.name}
                      href={`/level/${item.levelId}/${typeRoutes[type]}/${item.id}`}
                      downloadUrl={type === "exam" ? "#" : undefined}
                      delay={index * 0.05}
                    />
                  ))}
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        )
      ))}
    </Accordion>
  );
};

export default ContentByLevel;
