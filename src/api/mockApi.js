// src/api/mockApi.js
// Simulates Axios-style API calls with mock data for the TEYZIX internship dashboard.
// In production, replace these with real Axios calls to your backend.

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

// ── Seed data generators ──────────────────────────────────────────────────────

function generateRevenueTrend(range) {
  const months = {
    '7d':  ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
    '30d': ['W1','W2','W3','W4'],
    '90d': ['Jan','Feb','Mar'],
    '180d':['Jan','Feb','Mar','Apr','May','Jun'],
    '1y':  ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
  };
  const labels = months[range] || months['30d'];
  return labels.map((label) => ({
    name: label,
    revenue: Math.round(18000 + Math.random() * 24000),
    target:  Math.round(22000 + Math.random() * 8000),
  }));
}

function generateFeatureUsage() {
  const features = ['Analytics','Reports','Exports','Integrations','API','Webhooks','Billing'];
  return features.map((name) => ({
    name,
    usage: Math.round(200 + Math.random() * 1800),
    change: +(Math.random() * 40 - 10).toFixed(1),
  }));
}

function generateUserSegments() {
  return [
    { name: 'Free',       value: 45, color: '#94a3b8' },
    { name: 'Starter',    value: 25, color: '#34d399' },
    { name: 'Pro',        value: 20, color: '#3b82f6' },
    { name: 'Enterprise', value: 10, color: '#f59e0b' },
  ];
}

function generateKPIs(range) {
  const multipliers = { '7d': 0.25, '30d': 1, '90d': 3, '180d': 6, '1y': 12 };
  const m = multipliers[range] || 1;
  return {
    totalUsers:    Math.round(12840 + Math.random() * 500),
    activeUsers:   Math.round(7420  * m / 30 + Math.random() * 200),
    revenue:       Math.round(89400 * m / 30 + Math.random() * 3000),
    churnRate:     +(2.1 + Math.random() * 0.8).toFixed(2),
    usersTrend:    +(Math.random() * 20 - 5).toFixed(1),
    activeTrend:   +(Math.random() * 15 - 3).toFixed(1),
    revenueTrend:  +(Math.random() * 25 - 8).toFixed(1),
    churnTrend:    +(Math.random() * 2 - 1).toFixed(2),
  };
}

// ── Public API functions (Axios-style async) ──────────────────────────────────

export async function fetchDashboardData(dateRange = '30d') {
  await delay(900 + Math.random() * 400); // simulate network latency
  return {
    data: {
      kpis:         generateKPIs(dateRange),
      revenueTrend: generateRevenueTrend(dateRange),
      featureUsage: generateFeatureUsage(),
      userSegments: generateUserSegments(),
      lastUpdated:  new Date().toISOString(),
    },
    status: 200,
  };
}

export async function fetchRevenueTrend(dateRange = '30d') {
  await delay(600);
  return { data: generateRevenueTrend(dateRange), status: 200 };
}

export async function fetchFeatureUsage() {
  await delay(500);
  return { data: generateFeatureUsage(), status: 200 };
}
