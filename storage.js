// Storage shim.
// Inside a Claude artifact, window.storage is provided natively and persists per user.
// On a normal deployed website, window.storage doesn't exist — so this falls back to
// the browser's own localStorage, keeping exactly the same App.jsx code working in both places.

const hasNativeStorage =
  typeof window !== 'undefined' &&
  window.storage &&
  typeof window.storage.get === 'function';

function localKey(key, shared) {
  return `promptforge:${shared ? 'shared' : 'personal'}:${key}`;
}

async function get(key, shared = false) {
  if (hasNativeStorage) return window.storage.get(key, shared);
  const raw = localStorage.getItem(localKey(key, shared));
  if (raw === null) throw new Error('not found');
  return { key, value: raw, shared };
}

async function set(key, value, shared = false) {
  if (hasNativeStorage) return window.storage.set(key, value, shared);
  localStorage.setItem(localKey(key, shared), value);
  return { key, value, shared };
}

async function del(key, shared = false) {
  if (hasNativeStorage) return window.storage.delete(key, shared);
  localStorage.removeItem(localKey(key, shared));
  return { key, deleted: true, shared };
}

async function list(prefix = '', shared = false) {
  if (hasNativeStorage) return window.storage.list(prefix, shared);
  const fullPrefix = localKey(prefix, shared);
  const keys = [];
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (k && k.startsWith(fullPrefix)) keys.push(k.replace(`promptforge:${shared ? 'shared' : 'personal'}:`, ''));
  }
  return { keys, prefix, shared };
}

export default { get, set, delete: del, list };
