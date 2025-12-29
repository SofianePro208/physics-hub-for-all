import { Skeleton } from "@/components/ui/skeleton";

interface ContentSkeletonProps {
  count?: number;
  type?: "card" | "list" | "hero";
}

export const CardSkeleton = () => (
  <div className="bg-card rounded-2xl border border-border/50 p-6 shadow-card">
    <div className="flex items-start gap-4">
      <Skeleton className="w-12 h-12 rounded-xl shrink-0" />
      <div className="flex-1 space-y-3">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </div>
    <div className="mt-4 flex gap-2">
      <Skeleton className="h-8 w-20 rounded-full" />
      <Skeleton className="h-8 w-24 rounded-full" />
    </div>
  </div>
);

export const ListSkeleton = () => (
  <div className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border/50">
    <Skeleton className="w-10 h-10 rounded-lg shrink-0" />
    <div className="flex-1 space-y-2">
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-3 w-3/4" />
    </div>
    <Skeleton className="h-8 w-16 rounded-lg" />
  </div>
);

export const HeroSkeleton = () => (
  <div className="gradient-hero py-16 lg:py-24">
    <div className="container mx-auto px-4">
      <div className="max-w-3xl space-y-6">
        <Skeleton className="w-16 h-16 rounded-2xl bg-white/10" />
        <Skeleton className="h-12 w-2/3 bg-white/10" />
        <Skeleton className="h-6 w-full bg-white/10" />
        <Skeleton className="h-6 w-3/4 bg-white/10" />
      </div>
    </div>
  </div>
);

const ContentSkeleton = ({ count = 6, type = "card" }: ContentSkeletonProps) => {
  if (type === "hero") {
    return <HeroSkeleton />;
  }

  return (
    <div className={type === "card" ? "grid sm:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
      {Array.from({ length: count }).map((_, index) => (
        type === "card" ? <CardSkeleton key={index} /> : <ListSkeleton key={index} />
      ))}
    </div>
  );
};

export default ContentSkeleton;
