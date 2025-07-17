// js/libs/wasm-loader.js - WebAssembly Bootstrap Loader

export async function loadWASM(path) {
  try {
    const response = await fetch(path);
    const buffer = await response.arrayBuffer();
    const module = await WebAssembly.instantiate(buffer);
    console.log('[WASM] Module loaded:', path);
    return module.instance;
  } catch (err) {
    console.error('[WASM] Load error:', err);
    return null;
  }
}

// Example usage on load
loadWASM('/assets/wasm/geo-compute.wasm').then((instance) => {
  if (instance) {
    console.log('[WASM] Exported functions:', Object.keys(instance.exports));
  }
});
