// src/components/charts/RevenueLineChart.jsx
// Animated line chart showing revenue vs target using Recharts.

import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend,
} from 'recharts';
import { exportToCsv } from '../../utils/exportCsv';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-xl shadow-lg p-3 text-sm">
      <p className="font-semibold text-slate-700 dark:text-slate-200 mb-1">{label}</p>
      {payload.map((entry) => (
        <p key={entry.name} style={{ color: entry.color }} className="font-medium">
          {entry.name}: ${entry.value.toLocaleString()}
        </p>
      ))}
    </div>
  );
};

export function RevenueLineChart({ data }) {
  return (
    <div className="card card-light dark:bg-slate-800 dark:border-slate-700 p-5 animate-fadeUp" style={{ animationDelay: '200ms', opacity: 0, animationFillMode: 'forwards' }}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-slate-700 dark:text-slate-200">Revenue Trend</h3>
          <p className="text-xs text-slate-400 mt-0.5">Revenue vs. target over selected period</p>
        </div>
        <button
          onClick={() => exportToCsv('revenue-trend', data)}
          className="btn btn-ghost text-xs"
          title="Export CSV"
        >
          ↓ CSV
        </button>
      </div>

      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data} margin={{ top: 4, right: 12, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" strokeOpacity={0.6} />
          <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false}
            tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <Line
            type="monotone" dataKey="revenue" name="Revenue"
            stroke="#10b981" strokeWidth={2.5} dot={{ r: 4, fill: '#10b981' }}
            activeDot={{ r: 6 }} animationDuration={800}
          />
          <Line
            type="monotone" dataKey="target" name="Target"
            stroke="#94a3b8" strokeWidth={2} strokeDasharray="5 5"
            dot={false} animationDuration={1000}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
