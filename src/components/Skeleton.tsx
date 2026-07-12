export function CardSkeleton() {
  return (
    <div className="bg-white/80 rounded-2xl overflow-hidden border border-slate-200 shadow-sm animate-pulse">
      <div className="h-48 bg-gradient-to-br from-[#6b8af6]/30 to-[#3c45b9]/30" />
      <div className="p-6 space-y-4">
        <div className="h-5 bg-slate-200 rounded w-3/4" />
        <div className="h-4 bg-slate-200 rounded w-1/2" />
        <div className="space-y-2">
          <div className="h-3 bg-slate-200 rounded w-full" />
          <div className="h-3 bg-slate-200 rounded w-5/6" />
        </div>
        <div className="flex gap-2 pt-2">
          <div className="h-6 bg-slate-200 rounded w-16" />
          <div className="h-6 bg-slate-200 rounded w-20" />
          <div className="h-6 bg-slate-200 rounded w-14" />
        </div>
      </div>
    </div>
  );
}

export function ProfileCardSkeleton() {
  return (
    <div className="w-[260px] h-[480px] bg-gray-200 animate-pulse rounded-2xl" />
  );
}

export function BlogCardSkeleton() {
  return (
    <div className="bg-white/80 rounded-2xl overflow-hidden border border-slate-200 shadow-sm animate-pulse">
      <div className="h-48 bg-gradient-to-br from-slate-400 to-slate-500" />
      <div className="p-6 space-y-3">
        <div className="flex gap-3">
          <div className="h-3 bg-slate-200 rounded w-20" />
          <div className="h-3 bg-slate-200 rounded w-16" />
        </div>
        <div className="h-5 bg-slate-200 rounded w-3/4" />
        <div className="space-y-2">
          <div className="h-3 bg-slate-200 rounded w-full" />
          <div className="h-3 bg-slate-200 rounded w-4/5" />
        </div>
        <div className="flex gap-2 pt-2">
          <div className="h-6 bg-slate-200 rounded w-14" />
          <div className="h-6 bg-slate-200 rounded w-16" />
        </div>
        <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
          <div className="w-8 h-8 rounded-full bg-slate-200" />
          <div className="h-3 bg-slate-200 rounded w-24" />
        </div>
      </div>
    </div>
  );
}

export function GridSkeleton({ count = 3, Card = CardSkeleton }: { count?: number; Card?: React.ComponentType }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 max-w-7xl mx-auto w-full">
      {Array.from({ length: count }).map((_, i) => (
        <Card key={i} />
      ))}
    </div>
  );
}
