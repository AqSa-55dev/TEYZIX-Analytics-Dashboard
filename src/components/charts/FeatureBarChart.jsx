// src/components/charts/FeatureBarChart.jsx
// Horizontal bar chart showing feature usage counts using Recharts.

import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Cell,
} from 'recharts';
import { exportToCsv } from '../../utils/exportCsv';

const COLORS = ['#10b981','#3b82f6','#f59e0b','#8b5cf6','#ef4444','#06b6d4','#ec4899'];

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0];
  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-xl shadow-lg p-3 text-sm">
      <p className="font-semibold text-slate-700 dark:text-slate-200 mb-1">{d.payload.name}</p>
      <p style={{ color: d.fill }}>Usage: <strong>{d.value.toLocaleString()}</strong></p>
      <p className={d.payload.change >= 0 ? 'text-emerald-500' : 'text-red-400'}>
        {d.payload.change >= 0 ? '▲' : '▼'} {Math.abs(d.payload.change)}% change
      </p>
    </div>
  );
};

export function FeatureBarChart({ data }) {
  return (
    <div className="card card-light dark:bg-slate-800 dark:border-slate-700 p-5 animate-fadeUp" style={{ animationDelay: '300ms', opacity: 0, animationFillMode: 'forwards' }}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-slate-700 dark:text-slate-200">Feature Usage</h3>
          <p className="text-xs text-slate-400 mt-0.5">Sessions per feature this period</p>
        </div>
        <button
          onClick={() => exportToCsv('feature-usage', data)}
          className="btn btn-ghost text-xs"
        >
          ↓ CSV
        </button>
      </div>

      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} layout="vertical" margin={{ top: 4, right: 16, left: 60, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" strokeOpacity={0.5} />
          <XAxis type="number" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false}
            tickFormatter={(v) => v.toLocaleString()} />
          <YAxis type="category" dataKey="name" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} width={56} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(148,163,184,0.08)' }} />
          <Bar dataKey="usage" radius={[0, 6, 6, 0]} animationDuration={900}>
            {data.map((_, idx) => (
              <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
