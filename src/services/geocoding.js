import axios from 'axios';

const NOMINATIM_URL = 'https://nominatim.openstreetmap.org/reverse';
const CACHE_KEY = 'betterthannes_geocache';
const RATE_LIMIT_DELAY = 1000;

let lastRequestTime = 0;
let requestQueue = [];
let isProcessing = false;

const getCache = () => {
  try {
    const cache = localStorage.getItem(CACHE_KEY);
    return cache ? JSON.parse(cache) : {};
  } catch {
    return {};
  }
};

const setCache = (cache) => {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch (error) {
    console.warn('Failed to cache geocoding data:', error);
  }
};

const getCacheKey = (lat, lon) => `${lat.toFixed(5)},${lon.toFixed(5)}`;

const processQueue = async () => {
  if (isProcessing || requestQueue.length === 0) return;

  isProcessing = true;

  while (requestQueue.length > 0) {
    const { lat, lon, resolve, reject } = requestQueue.shift();

    const now = Date.now();
    const timeSinceLastRequest = now - lastRequestTime;

    if (timeSinceLastRequest < RATE_LIMIT_DELAY) {
      await new Promise(r => setTimeout(r, RATE_LIMIT_DELAY - timeSinceLastRequest));
    }

    try {
      const response = await axios.get(NOMINATIM_URL, {
        params: {
          lat,
          lon,
          format: 'json',
          addressdetails: 1,
        },
        headers: {
          'User-Agent': 'BetterThanNES/1.0',
        },
      });

      lastRequestTime = Date.now();

      const address = response.data?.address || {};
      const result = {
        street: address.road || address.street || '',
        city: address.city || address.town || address.village || 'Nashville',
        state: address.state || 'TN',
        zip: address.postcode || '',
        neighborhood: address.neighbourhood || address.suburb || '',
        displayName: response.data?.display_name || '',
        formatted: formatAddress(address),
      };

      const cache = getCache();
      cache[getCacheKey(lat, lon)] = {
        ...result,
        timestamp: Date.now(),
      };
      setCache(cache);

      resolve(result);
    } catch (error) {
      console.error('Geocoding error:', error);
      reject(error);
    }
  }

  isProcessing = false;
};

const formatAddress = (address) => {
  const parts = [];

  if (address.road || address.street) {
    parts.push(address.road || address.street);
  } else if (address.neighbourhood || address.suburb) {
    parts.push(address.neighbourhood || address.suburb);
  }

  if (address.city || address.town || address.village) {
    parts.push(address.city || address.town || address.village);
  }

  if (address.postcode) {
    parts.push(address.postcode);
  }

  return parts.length > 0 ? parts.join(', ') : 'Nashville, TN';
};

export const reverseGeocode = (lat, lon) => {
  const cacheKey = getCacheKey(lat, lon);
  const cache = getCache();

  if (cache[cacheKey]) {
    const cachedData = cache[cacheKey];
    const age = Date.now() - cachedData.timestamp;

    if (age < 7 * 24 * 60 * 60 * 1000) {
      return Promise.resolve(cachedData);
    }
  }

  return new Promise((resolve, reject) => {
    requestQueue.push({ lat, lon, resolve, reject });
    processQueue();
  });
};

export const clearGeocodingCache = () => {
  try {
    localStorage.removeItem(CACHE_KEY);
  } catch (error) {
    console.warn('Failed to clear geocoding cache:', error);
  }
};
