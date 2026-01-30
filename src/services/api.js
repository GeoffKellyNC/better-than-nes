import axios from 'axios';

const BASE_URL = 'https://utilisocial.io/datacapable/v2/p/NES';

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchOutages = async () => {
  try {
    const response = await apiClient.get('/map/events');
    return {
      success: true,
      data: response.data,
      error: null,
    };
  } catch (error) {
    console.error('Error fetching outages:', error);
    return {
      success: false,
      data: null,
      error: error.message || 'Failed to fetch outage data',
    };
  }
};

export default apiClient;
