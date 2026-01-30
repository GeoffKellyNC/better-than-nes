import { useState, useCallback, useEffect } from 'react';
import { reverseGeocode } from '../services/geocoding';

export const useGeocoding = (outages = []) => {
  const [addresses, setAddresses] = useState({});
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0 });

  const getAddress = useCallback((outageId) => {
    return addresses[outageId] || null;
  }, [addresses]);

  const geocodeOutages = useCallback(async (outagesToGeocode) => {
    if (!outagesToGeocode || outagesToGeocode.length === 0) return;

    setLoading(true);
    setProgress({ current: 0, total: outagesToGeocode.length });

    const newAddresses = { ...addresses };
    let processed = 0;

    for (const outage of outagesToGeocode) {
      if (!newAddresses[outage.id] && outage.latitude && outage.longitude) {
        try {
          const address = await reverseGeocode(outage.latitude, outage.longitude);
          newAddresses[outage.id] = address;
        } catch (error) {
          console.error(`Failed to geocode outage ${outage.id}:`, error);
          newAddresses[outage.id] = {
            formatted: 'Nashville, TN',
            city: 'Nashville',
            state: 'TN',
            street: '',
            zip: '',
          };
        }
      }

      processed++;
      setProgress({ current: processed, total: outagesToGeocode.length });
      setAddresses({ ...newAddresses });
    }

    setLoading(false);
  }, [addresses]);

  useEffect(() => {
    if (outages.length > 0) {
      const topOutages = outages
        .sort((a, b) => b.numPeople - a.numPeople)
        .slice(0, 20);

      geocodeOutages(topOutages);
    }
  }, [outages]);

  return {
    addresses,
    getAddress,
    loading,
    progress,
    geocodeOutages,
  };
};
