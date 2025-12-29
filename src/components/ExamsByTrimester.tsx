import ContentCard from "@/components/ContentCard";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GraduationCap, FileText, ClipboardList, BookOpen } from "lucide-react";

interface ExamItem {
  id: string;
  title: string;
  description: string;
  level: string;
  levelId: string;
  trimester: number;
  examType: string;
}

interface ExamsByTrimesterProps {
  items: ExamItem[];
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

const trimesters = [
  { id: 1, name: "الفصل الأول" },
  { id: 2, name: "الفصل الثاني" },
  { id: 3, name: "الفصل الثالث" },
];

const examTypes = [
  { id: "assignment", name: "فروض", icon: ClipboardList },
  { id: "test", name: "اختبارات", icon: FileText },
  { id: "exercises", name: "سلاسل تمارين", icon: BookOpen },
];

const ExamsByTrimester = ({ items }: ExamsByTrimesterProps) => {
  const filterItems = (levelId: string, matches?: string[], trimester?: number, examType?: string) => {
    return items.filter((item) => {
      const levelMatch = matches ? matches.includes(item.levelId) : item.levelId === levelId;
      const trimesterMatch = trimester ? item.trimester === trimester : true;
      const typeMatch = examType ? item.examType === examType : true;
      return levelMatch && trimesterMatch && typeMatch;
    });
  };

  const getLevelItems = (level: typeof levels[0], trimester: number, examType: string): { id: string; name: string; items: ExamItem[] }[] | ExamItem[] => {
    if (level.branches) {
      return level.branches.map(branch => ({
        ...branch,
        items: filterItems(branch.id, branch.matches, trimester, examType),
      }));
    }
    return filterItems(level.id, level.matches, trimester, examType);
  };

  const hasItemsInTrimester = (level: typeof levels[0], trimester: number, examType: string): boolean => {
    const levelData = getLevelItems(level, trimester, examType);
    if (level.branches) {
      return (levelData as { id: string; name: string; items: ExamItem[] }[]).some(b => b.items.length > 0);
    }
    return (levelData as ExamItem[]).length > 0;
  };

  const isTrimesterEmpty = (level: typeof levels[0], trimester: number): boolean => {
    return examTypes.every((examType) => !hasItemsInTrimester(level, trimester, examType.id));
  };

  const getLevelTotalForTrimester = (level: typeof levels[0], trimester: number) => {
    if (level.branches) {
      return level.branches.reduce((sum, branch) => {
        return sum + filterItems(branch.id, branch.matches, trimester).length;
      }, 0);
    }
    return filterItems(level.id, level.matches, trimester).length;
  };

  return (
    <Accordion type="multiple" defaultValue={levels.map(l => l.id)} className="space-y-4">
      {levels.map((level) => {
        const totalItems = trimesters.reduce((sum, t) => sum + getLevelTotalForTrimester(level, t.id), 0);
        
        if (totalItems === 0) return null;

        return (
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
                  <p className="text-sm text-muted-foreground">{level.subtitle} • {totalItems} عنصر</p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <Tabs defaultValue="1" className="pt-4">
                <TabsList className="grid grid-cols-3 mb-6 w-full max-w-md mx-auto">
                  {trimesters.map((trimester) => (
                    <TabsTrigger key={trimester.id} value={trimester.id.toString()}>
                      {trimester.name}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {trimesters.map((trimester) => (
                  <TabsContent key={trimester.id} value={trimester.id.toString()} className="space-y-6">
                    {examTypes.map((examType) => {
                      const TypeIcon = examType.icon;
                      const levelData = getLevelItems(level, trimester.id, examType.id);
                      
                      // Check if there are any items for this exam type
                      const hasItems = hasItemsInTrimester(level, trimester.id, examType.id);

                      if (!hasItems) return null;

                      return (
                        <div key={examType.id} className="bg-muted/30 rounded-xl p-4">
                          <h4 className="text-md font-semibold text-foreground mb-4 flex items-center gap-2">
                            <TypeIcon className="w-5 h-5 text-primary" />
                            {examType.name}
                          </h4>

                          {level.branches ? (
                            // Render branches
                            <div className="space-y-4">
                              {(levelData as { id: string; name: string; items: ExamItem[] }[]).map((branch) => (
                                branch.items.length > 0 && (
                                  <div key={branch.id}>
                                    <h5 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                                      <div className="w-2 h-2 rounded-full bg-primary" />
                                      {branch.name}
                                      <span className="text-xs">({branch.items.length})</span>
                                    </h5>
                                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                      {branch.items.map((item, index) => (
                                        <ContentCard
                                          key={item.id}
                                          type="exam"
                                          title={item.title}
                                          description={item.description}
                                          level={branch.name}
                                          href={`/content/exam/${item.id}`}
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
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                              {(levelData as ExamItem[]).map((item, index) => (
                                <ContentCard
                                  key={item.id}
                                  type="exam"
                                  title={item.title}
                                  description={item.description}
                                  level={level.name}
                                  href={`/content/exam/${item.id}`}
                                  delay={index * 0.05}
                                />
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}

                    {/* Empty state for trimester */}
                    {isTrimesterEmpty(level, trimester.id) && (
                      <div className="text-center py-8 text-muted-foreground">
                        <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
                        <p>لا يوجد محتوى في هذا الفصل حالياً</p>
                      </div>
                    )}
                  </TabsContent>
                ))}
              </Tabs>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};

export default ExamsByTrimester;
