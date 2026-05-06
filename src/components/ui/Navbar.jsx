// src/components/ui/Navbar.jsx
// Top navigation bar with TEYZIX branding, date range filter, theme toggle, and refresh.

const DATE_RANGES = [
  { value: '7d',   label: '7 Days'   },
  { value: '30d',  label: '30 Days'  },
  { value: '90d',  label: '3 Months' },
  { value: '180d', label: '6 Months' },
  { value: '1y',   label: '1 Year'   },
];

export function Navbar({ dateRange, setDateRange, darkMode, setDarkMode, onRefresh, loading, lastFetch }) {
  const timeStr = lastFetch
    ? lastFetch.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : null;

  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 px-4 sm:px-6 py-3">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between gap-4 flex-wrap">

        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-emerald-500 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-sm">
            T
          </div>
          <div>
            <span className="font-semibold text-slate-800 dark:text-slate-100 text-sm leading-tight block">
              TEYZIX Analytics
            </span>
            {timeStr && (
              <span className="text-[10px] text-slate-400 leading-tight block">
                Updated {timeStr}
              </span>
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2 flex-wrap">

          {/* Date Range Filter */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 rounded-xl p-1 border border-slate-200 dark:border-slate-700">
            {DATE_RANGES.map((r) => (
              <button
                key={r.value}
                onClick={() => setDateRange(r.value)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all duration-150 ${
                  dateRange === r.value
                    ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>

          {/* Refresh */}
          <button
            onClick={onRefresh}
            disabled={loading}
            className="btn-icon"
            title="Refresh data"
          >
            <svg
              className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`}
              viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="btn-icon"
            title="Toggle theme"
          >
            {darkMode ? (
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="5"/><path strokeLinecap="round" d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
              </svg>
            ) : (
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
              </svg>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
