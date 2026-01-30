import { useState, useEffect, useCallback } from 'react';
import { fetchOutages } from '../services/api';

const REFRESH_INTERVAL = 3 * 60 * 1000;
const CACHE_KEY = 'betterthannes_outages';
const CACHE_DURATION = 5 * 60 * 1000;

export const useOutages = () => {
  const [outages, setOutages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const loadOutages = useCallback(async (skipCache = false) => {
    try {
      if (!skipCache) {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const { data, timestamp } = JSON.parse(cached);
          const age = Date.now() - timestamp;

          if (age < CACHE_DURATION) {
            setOutages(data);
            setLastUpdated(timestamp);
            setLoading(false);
            return;
          }
        }
      }

      setLoading(true);
      setError(null);

      const result = await fetchOutages();

      if (result.success && result.data) {
        setOutages(result.data);
        setLastUpdated(Date.now());
        setError(null);

        try {
          localStorage.setItem(
            CACHE_KEY,
            JSON.stringify({
              data: result.data,
              timestamp: Date.now(),
            })
          );
        } catch (err) {
          console.warn('Failed to cache outages:', err);
        }
      } else {
        setError(result.error);
      }
    } catch (err) {
      console.error('Error loading outages:', err);
      setError(err.message || 'Failed to load outages');
    } finally {
      setLoading(false);
    }
  }, []);

  const refetch = useCallback(() => {
    loadOutages(true);
  }, [loadOutages]);

  useEffect(() => {
    loadOutages();

    const interval = setInterval(() => {
      loadOutages(true);
    }, REFRESH_INTERVAL);

    return () => clearInterval(interval);
  }, [loadOutages]);

  return {
    outages,
    loading,
    error,
    refetch,
    lastUpdated,
  };
};
