import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  loadNotesFromStorage,
  saveNotesToStorage,
  generateId,
} from '../utils/storage';
import * as notesApi from '../services/notesApi';

/**
 * PUBLIC_INTERFACE
 * useNotes encapsulates all state and behaviors related to notes.
 * It provides localStorage-backed CRUD with optional backend integration
 * when REACT_APP_API_BASE or REACT_APP_BACKEND_URL are configured.
 *
 * Returns:
 * - notes: array of notes
 * - selectedNote: currently edited note or null
 * - loading: boolean
 * - error: string | null
 * - createNote({ title, content })
 * - updateNote(id, { title, content })
 * - deleteNote(id)
 * - selectNoteForEdit(note | null)
 */
function useNotes() {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const hasBackend = useMemo(() => {
    return Boolean(process.env.REACT_APP_API_BASE || process.env.REACT_APP_BACKEND_URL);
  }, []);

  const persistLocal = useCallback((nextNotes) => {
    setNotes(nextNotes);
    saveNotesToStorage(nextNotes);
  }, []);

  const loadNotes = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      if (hasBackend) {
        const remoteNotes = await notesApi.fetchNotes();
        setNotes(remoteNotes);
        saveNotesToStorage(remoteNotes);
      } else {
        const localNotes = loadNotesFromStorage();
        setNotes(localNotes);
      }
    } catch (e) {
      // Fallback to local storage on error
      const localNotes = loadNotesFromStorage();
      setNotes(localNotes);
      setError('Failed to load notes from backend.');
    } finally {
      setLoading(false);
    }
  }, [hasBackend]);

  useEffect(() => {
    loadNotes();
  }, [loadNotes]);

  const createNote = useCallback(
    async ({ title, content }) => {
      const newNote = {
        id: generateId(),
        title,
        content,
        createdAt: new Date().toISOString(),
      };

      // Optimistic local update
      const optimistic = [newNote, ...notes];
      persistLocal(optimistic);

      if (!hasBackend) return;

      try {
        const created = await notesApi.createNote(newNote);
        // Replace placeholder note with one from backend if ID changed
        persistLocal([created, ...notes.filter((n) => n.id !== newNote.id)]);
      } catch (e) {
        setError('Failed to save note to backend.');
      }
    },
    [notes, persistLocal, hasBackend],
  );

  const updateNote = useCallback(
    async (id, { title, content }) => {
      const existing = notes.find((n) => n.id === id);
      if (!existing) return;

      const updated = {
        ...existing,
        title,
        content,
      };

      const optimistic = notes.map((n) => (n.id === id ? updated : n));
      persistLocal(optimistic);
      setSelectedNote(null);

      if (!hasBackend) return;

      try {
        const persisted = await notesApi.updateNote(id, updated);
        const next = optimistic.map((n) => (n.id === id ? persisted : n));
        persistLocal(next);
      } catch (e) {
        setError('Failed to update note on backend.');
      }
    },
    [notes, persistLocal, hasBackend],
  );

  const deleteNote = useCallback(
    async (id) => {
      const optimistic = notes.filter((n) => n.id !== id);
      persistLocal(optimistic);
      if (selectedNote && selectedNote.id === id) {
        setSelectedNote(null);
      }

      if (!hasBackend) return;

      try {
        await notesApi.deleteNote(id);
      } catch (e) {
        setError('Failed to delete note on backend.');
      }
    },
    [notes, persistLocal, selectedNote, hasBackend],
  );

  const selectNoteForEdit = useCallback((note) => {
    setSelectedNote(note);
  }, []);

  return {
    notes,
    selectedNote,
    loading,
    error,
    loadNotes,
    createNote,
    updateNote,
    deleteNote,
    selectNoteForEdit,
  };
}

export default useNotes;
