// js/modules/blockchain.js - Immutable Location Logger

let logIndex = 0;

export function initBlockchainLogger() {
  console.log('[Blockchain] Logger initiated');

  setInterval(async () => {
    const coords = await getLastKnownLocation();
    const tx = await mockBlockchainCommit(coords);

    const output = document.getElementById('blockchain-log');
    if (output) {
      output.innerHTML = `<strong>Last Chain Commit:</strong><br>${tx.hash}<br><small>${new Date().toLocaleTimeString()}</small>`;
    }
  }, 20000);
}

async function mockBlockchainCommit(coords) {
  const hash = `0x${(Math.random() * 1e18).toString(16).padStart(64, '0')}`;
  console.log(`[Blockchain] Committed Location: (${coords.lat}, ${coords.lng}) -> ${hash}`);
  return { hash, timestamp: Date.now(), coords, index: ++logIndex };
}

async function getLastKnownLocation() {
  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition((pos) => {
      resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude });
    });
  });
}
