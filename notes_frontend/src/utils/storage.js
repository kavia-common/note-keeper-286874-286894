const isBrowser = typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';

export const STORAGE_KEY_NOTES = 'note_keeper_notes_v1';

/**
 * PUBLIC_INTERFACE
 * Safely load notes from localStorage using a given key.
 *
 * Returns an array of notes; falls back to [] on any error or invalid data.
 */
// PUBLIC_INTERFACE
export function loadNotesFromStorage(key = STORAGE_KEY_NOTES) {
  if (!isBrowser) {
    return [];
  }
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed;
  } catch (error) {
    // Swallow parsing / access errors and return an empty array
    return [];
  }
}

/**
 * PUBLIC_INTERFACE
 * Safely persist notes array to localStorage.
 *
 * Silently fails if localStorage is not available or quota is exceeded.
 */
// PUBLIC_INTERFACE
export function saveNotesToStorage(key = STORAGE_KEY_NOTES, notes) {
  if (!isBrowser) {
    return;
  }
  try {
    const payload = JSON.stringify(notes ?? []);
    window.localStorage.setItem(key, payload);
  } catch (error) {
    // Intentionally ignore write errors for local-only storage
  }
}
