// src/components/ui/Skeleton.jsx
// Reusable shimmer skeleton for loading states.

export function Skeleton({ className = '' }) {
  return <div className={`skeleton ${className}`} />;
}

export function KpiSkeleton() {
  return (
    <div className="card card-light dark:card-dark p-5 space-y-3">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-8 w-32" />
      <Skeleton className="h-3 w-20" />
    </div>
  );
}

export function ChartSkeleton({ height = 'h-64' }) {
  return (
    <div className={`card card-light dark:card-dark p-5 space-y-3`}>
      <Skeleton className="h-4 w-36" />
      <Skeleton className={`${height} w-full`} />
    </div>
  );
}
