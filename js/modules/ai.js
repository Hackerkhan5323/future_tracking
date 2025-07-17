// js/modules/ai.js - Predictive AI Engine

import * as tf from 'https://cdn.jsdelivr.net/npm/@tensorflow/tfjs';

let model;

export async function initAIEngine() {
  try {
    model = await tf.loadLayersModel('/assets/neural-nets/movement-predictor/model.json');
    console.log('[AI] Model loaded successfully');
    runPredictionLoop();
  } catch (err) {
    console.error('[AI] Model load failed:', err);
  }
}

async function runPredictionLoop() {
  setInterval(async () => {
    const coords = await getLastKnownLocation();
    const tensor = tf.tensor2d([[coords.lat, coords.lng]]);
    const prediction = model.predict(tensor);
    const [predLat, predLng] = prediction.dataSync();

    const output = document.getElementById('ai-prediction');
    if (output) {
      output.innerHTML = `<strong>Predicted Next Location:</strong><br>Lat: ${predLat.toFixed(6)}, Lng: ${predLng.toFixed(6)}`;
    }
  }, 10000);
}

async function getLastKnownLocation() {
  // Placeholder for smarter history logic or ML input buffering
  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition((pos) => {
      resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude });
    });
  });
}
