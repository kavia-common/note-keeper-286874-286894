const STORAGE_KEY = 'NOTE_KEEPER_NOTES';

/**
 * PUBLIC_INTERFACE
 * Safely load notes array from localStorage. Returns [] on failure or when empty.
 */
export function loadNotesFromStorage() {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);

    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed;
  } catch {
    return [];
  }
}

/**
 * PUBLIC_INTERFACE
 * Persist a notes array to localStorage. No-op in non-browser environments.
 */
export function saveNotesToStorage(notes) {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    const serialised = JSON.stringify(notes || []);
    window.localStorage.setItem(STORAGE_KEY, serialised);
  } catch {
    // Silently ignore persistence failures
  }
}

/**
 * PUBLIC_INTERFACE
 * Generate a reasonably unique string ID using timestamp and randomness.
 */
export function generateId() {
  const timestamp = Date.now().toString(36);
  const random = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)
    .toString(36)
    .slice(0, 6);
  return `${timestamp}-${random}`;
}
