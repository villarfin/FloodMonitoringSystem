// For mobile, we use the local IP of the machine running Django
// because 'localhost' refers to the mobile device itself.
const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://192.168.0.16:8000/api';

export const fetchFromApi = async (endpoint: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching from ${endpoint}:`, error);
    throw error;
  }
};

export const api = {
  getLocations: () => fetchFromApi('locations/'),
  getSensors: () => fetchFromApi('sensors/'),
  getFloodData: () => fetchFromApi('flood-data/'),
  getAlerts: () => fetchFromApi('alerts/'),
};
