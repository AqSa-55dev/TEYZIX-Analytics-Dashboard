// src/App.jsx
import { useState, useEffect } from 'react';
import { Navbar }         from './components/ui/Navbar';
import { KpiCard }        from './components/ui/KpiCard';
import { KpiSkeleton, ChartSkeleton } from './components/ui/Skeleton';
// AFTER — loads charts only when needed
import { lazy, Suspense } from 'react'

const RevenueChart = lazy(() => import('./components/RevenueChart'))
const FeatureChart = lazy(() => import('./components/FeatureChart'))
import { UserPieChart     } from './components/charts/UserPieChart';
import { useDashboardData } from './hooks/useDashboardData';

export default function App() {
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem('theme') === 'dark'
      || (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)
  );
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const [dateRange, setDateRange] = useState('30d');
  const { data, loading, error, lastFetch, refresh } = useDashboardData(dateRange);
  const kpis = data?.kpis;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <Navbar
        dateRange={dateRange} setDateRange={setDateRange}
        darkMode={darkMode} setDarkMode={setDarkMode}
        onRefresh={refresh} loading={loading} lastFetch={lastFetch}
      />
      <main className="max-w-screen-xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        <div>
          <h1 className="text-2xl font-semibold text-slate-800 dark:text-slate-100">Dashboard Overview</h1>
          <p className="text-sm text-slate-400 mt-1">SaaS performance metrics · Auto-refreshes every 30 seconds</p>
        </div>

        {error && (
          <div className="rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 p-4 text-sm text-red-600 dark:text-red-400">
            ⚠ {error} — <button onClick={refresh} className="underline font-medium">Retry</button>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => <KpiSkeleton key={i} />)
          ) : kpis ? (
            <>
              <KpiCard title="Total Users"  value={kpis.totalUsers}  trend={kpis.usersTrend}   icon="👥" color="emerald" delay={0}   />
              <KpiCard title="Active Users" value={kpis.activeUsers} trend={kpis.activeTrend}  icon="⚡" color="blue"    delay={80}  />
              <KpiCard title="Revenue"      value={kpis.revenue}     trend={kpis.revenueTrend} icon="💰" color="amber"   delay={160} prefix="$" />
              <KpiCard title="Churn Rate"   value={kpis.churnRate}   trend={-kpis.churnTrend}  icon="📉" color="red"     delay={240} suffix="%" />
            </>
          ) : null}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {loading ? (
            [0,1,2,3].map(i => <ChartSkeleton key={i} height="h-72" />)
          ) : data ? (
            <>
              <div className="xl:col-span-2">
              
              <Suspense fallback={<div>Loading...</div>}>
                <RevenueChart />
              </Suspense>
              </div>
              
              <Suspense fallback={<div>Loading...</div>}>
                <FeatureChart/>
              </Suspense>
              <UserPieChart    data={data.userSegments}  />
            </>
          ) : null}
        </div>

        <footer className="text-center text-xs text-slate-400 dark:text-slate-600 pb-4">
          TEYZIX Internship Program · Task FE-1 · Analytics Dashboard · Data refreshes every 30s
        </footer>
      </main>
    </div>
  );
}
