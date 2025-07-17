// workers/analytics.js - Background Behavior & Heatmap Analysis

let locationHistory = [];

self.addEventListener('message', (event) => {
  const { action, payload } = event.data;

  if (action === 'track') {
    locationHistory.push(payload);
    if (locationHistory.length > 100) locationHistory.shift();

    const avgLat = locationHistory.reduce((a, b) => a + b.lat, 0) / locationHistory.length;
    const avgLng = locationHistory.reduce((a, b) => a + b.lng, 0) / locationHistory.length;

    self.postMessage({ status: 'heatmap', center: { lat: avgLat, lng: avgLng } });
  }
});
