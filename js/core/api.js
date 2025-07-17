
// js/core/api.js - Location & Data API Integration

let watchId = null;

export async function getLiveLocation() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve(pos.coords),
      (err) => reject(err),
      { enableHighAccuracy: true }
    );
  });
}

export function streamLocation(callback) {
  if (!navigator.geolocation) {
    console.error('[API] Geolocation not supported');
    return;
  }

  watchId = navigator.geolocation.watchPosition(
    (position) => {
      const { latitude: lat, longitude: lng } = position.coords;
      callback({ lat, lng });
    },
    (err) => console.error('[API] Location error:', err),
    { enableHighAccuracy: true, maximumAge: 1000, timeout: 10000 }
  );
}

export function stopLocationStream() {
  if (watchId) navigator.geolocation.clearWatch(watchId);
}
