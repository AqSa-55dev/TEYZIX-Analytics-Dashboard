// src/components/ui/KpiCard.jsx
// Displays a single KPI metric with trend indicator.

export function KpiCard({ title, value, trend, prefix = '', suffix = '', icon, color = 'emerald', delay = 0 }) {
  const isPositive = trend > 0;
  const isNeutral  = trend === 0;

  const colorMap = {
    emerald: 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400',
    blue:    'bg-blue-50   dark:bg-blue-900/30   text-blue-600   dark:text-blue-400',
    amber:   'bg-amber-50  dark:bg-amber-900/30  text-amber-600  dark:text-amber-400',
    red:     'bg-red-50    dark:bg-red-900/30    text-red-600    dark:text-red-400',
  };

  return (
    <div
      className="card card-light dark:bg-slate-800 dark:border-slate-700 p-5 space-y-3 animate-fadeUp"
      style={{ animationDelay: `${delay}ms`, opacity: 0, animationFillMode: 'forwards' }}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</span>
        {icon && (
          <span className={`p-2 rounded-xl text-lg ${colorMap[color]}`}>{icon}</span>
        )}
      </div>

      <div className="text-2xl font-semibold text-slate-800 dark:text-slate-100 tracking-tight">
        {prefix}{typeof value === 'number' ? value.toLocaleString() : value}{suffix}
      </div>

      {trend !== undefined && (
        <div className="flex items-center gap-1.5 text-xs font-medium">
          <span className={isNeutral ? 'text-slate-400' : isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500'}>
            {isNeutral ? '—' : isPositive ? '▲' : '▼'} {Math.abs(trend)}%
          </span>
          <span className="text-slate-400 dark:text-slate-500">vs last period</span>
        </div>
      )}
    </div>
  );
}
