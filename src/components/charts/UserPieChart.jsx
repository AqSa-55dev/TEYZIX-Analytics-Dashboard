// src/components/charts/UserPieChart.jsx
// Donut pie chart showing user segmentation using Recharts.

import {
  ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend,
} from 'recharts';
import { exportToCsv } from '../../utils/exportCsv';

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0];
  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-xl shadow-lg p-3 text-sm">
      <p className="font-semibold" style={{ color: d.payload.color }}>{d.name}</p>
      <p className="text-slate-600 dark:text-slate-300">{d.value}% of users</p>
    </div>
  );
};

const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  if (percent < 0.07) return null;
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.55;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={12} fontWeight={600}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export function UserPieChart({ data }) {
  return (
    <div className="card card-light dark:bg-slate-800 dark:border-slate-700 p-5 animate-fadeUp" style={{ animationDelay: '400ms', opacity: 0, animationFillMode: 'forwards' }}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-slate-700 dark:text-slate-200">User Segments</h3>
          <p className="text-xs text-slate-400 mt-0.5">Breakdown by plan tier</p>
        </div>
        <button
          onClick={() => exportToCsv('user-segments', data)}
          className="btn btn-ghost text-xs"
        >
          ↓ CSV
        </button>
      </div>

      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={data} cx="50%" cy="50%"
            innerRadius={65} outerRadius={105}
            paddingAngle={3} dataKey="value"
            labelLine={false} label={renderCustomLabel}
            animationDuration={1000}
          >
            {data.map((entry, idx) => (
              <Cell key={idx} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            iconType="circle" iconSize={8}
            formatter={(val) => <span className="text-xs text-slate-600 dark:text-slate-300">{val}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
