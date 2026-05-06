// src/hooks/useDashboardData.js
// Custom hook: fetches all dashboard data, auto-polls every 30 seconds,
// and exposes loading / error states and a manual refresh trigger.

import { useState, useEffect, useCallback, useRef } from 'react';
import { fetchDashboardData } from '../api/mockApi';

const POLL_INTERVAL = 30_000; // 30 seconds as required

export function useDashboardData(dateRange) {
  const [data,      setData]      = useState(null);
  const [loading,   setLoading]   = useState(true);
  const [error,     setError]     = useState(null);
  const [lastFetch, setLastFetch] = useState(null);
  const timerRef = useRef(null);

  const load = useCallback(async (showFullLoader = false) => {
    if (showFullLoader) setLoading(true);
    setError(null);
    try {
      const res = await fetchDashboardData(dateRange);
      setData(res.data);
      setLastFetch(new Date());
    } catch (err) {
      setError(err?.message || 'Failed to load dashboard data.');
    } finally {
      setLoading(false);
    }
  }, [dateRange]);

  // Fetch on mount and whenever dateRange changes
  useEffect(() => {
    load(true);
  }, [load]);

  // Auto-poll every 30 seconds (seamless — no full loader)
  useEffect(() => {
    timerRef.current = setInterval(() => load(false), POLL_INTERVAL);
    return () => clearInterval(timerRef.current);
  }, [load]);

  const refresh = useCallback(() => load(true), [load]);

  return { data, loading, error, lastFetch, refresh };
}
