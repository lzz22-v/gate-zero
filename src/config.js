export const CONFIG = {
  apiKey: import.meta.env.VITE_AERODATABOX_KEY,
  airportIata: import.meta.env.VITE_AIRPORT_IATA || 'GIG',
  refreshIntervalMs: Number(import.meta.env.VITE_REFRESH_INTERVAL_MS) || 60000,
  pageSize: Number(import.meta.env.VITE_PAGE_SIZE) || 8,
  pageIntervalMs: Number(import.meta.env.VITE_PAGE_INTERVAL_MS) || 10000,
  apiHost: 'aerodatabox.p.rapidapi.com',
};

if (!CONFIG.apiKey) {
  console.error('VITE_AERODATABOX_KEY não definida. Configure o arquivo .env.');
}