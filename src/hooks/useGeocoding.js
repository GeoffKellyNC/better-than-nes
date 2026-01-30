import { useState, useCallback, useEffect, useRef } from 'react';
import { reverseGeocode } from '../services/geocoding';

export const useGeocoding = (outages = []) => {
  const [addresses, setAddresses] = useState({});
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const geocodedIdsRef = useRef(new Set());

  const getAddress = useCallback((outageId) => {
    return addresses[outageId] || null;
  }, [addresses]);

  const geocodeOutages = useCallback(async (outagesToGeocode) => {
    if (!outagesToGeocode || outagesToGeocode.length === 0) return;

    setLoading(true);
    setProgress({ current: 0, total: outagesToGeocode.length });

    let processed = 0;

    for (const outage of outagesToGeocode) {
      if (!geocodedIdsRef.current.has(outage.id) && outage.latitude && outage.longitude) {
        try {
          const address = await reverseGeocode(outage.latitude, outage.longitude);
          geocodedIdsRef.current.add(outage.id);

          setAddresses(prev => ({
            ...prev,
            [outage.id]: address
          }));
        } catch (error) {
          console.error(`Failed to geocode outage ${outage.id}:`, error);
          geocodedIdsRef.current.add(outage.id);

          setAddresses(prev => ({
            ...prev,
            [outage.id]: {
              formatted: 'Nashville, TN',
              city: 'Nashville',
              state: 'TN',
              street: '',
              zip: '',
            }
          }));
        }
      }

      processed++;
      setProgress({ current: processed, total: outagesToGeocode.length });
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    if (outages.length > 0) {
      const topOutages = outages
        .filter(o => !geocodedIdsRef.current.has(o.id))
        .sort((a, b) => b.numPeople - a.numPeople)
        .slice(0, 20);

      if (topOutages.length > 0) {
        geocodeOutages(topOutages);
      }
    }
  }, [outages, geocodeOutages]);

  return {
    addresses,
    getAddress,
    loading,
    progress,
    geocodeOutages,
  };
};
