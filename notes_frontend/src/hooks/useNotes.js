import { useEffect, useMemo, useState } from 'react';
import {
  loadNotesFromStorage,
  saveNotesToStorage,
  STORAGE_KEY_NOTES,
} from '../utils/storage';

/**
 * PUBLIC_INTERFACE
 * useNotes hook encapsulates notes state, CRUD operations, and search filtering.
 *
 * Note model:
 * {
 *   id: string;
 *   title: string;
 *   content: string;
 *   createdAt: string ISO;
 *   updatedAt: string ISO;
 *   pinned?: boolean;
 *   color?: string | null;
 * }
 */

// PUBLIC_INTERFACE
export function useNotes() {
  const [notes, setNotes] = useState(() => loadNotesFromStorage(STORAGE_KEY_NOTES));
  const [searchQuery, setSearchQuery] = useState('');

  // Persist notes whenever they change
  useEffect(() => {
    saveNotesToStorage(STORAGE_KEY_NOTES, notes);
  }, [notes]);

  const createNote = (data) => {
    const now = new Date().toISOString();
    const note = {
      id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
      title: data.title || '',
      content: data.content || '',
      createdAt: now,
      updatedAt: now,
      pinned: false,
      color: null,
    };
    setNotes((prev) => [note, ...prev]);
  };

  const updateNote = (id, data) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id
          ? {
              ...note,
              title: data.title ?? note.title,
              content: data.content ?? note.content,
              updatedAt: new Date().toISOString(),
            }
          : note,
      ),
    );
  };

  const deleteNote = (id) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  const togglePin = (id) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id
          ? {
              ...note,
              pinned: !note.pinned,
              updatedAt: new Date().toISOString(),
            }
          : note,
      ),
    );
  };

  const filteredNotes = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) {
      return notes;
    }
    return notes.filter((note) => {
      const haystack = `${note.title || ''} ${note.content || ''}`.toLowerCase();
      return haystack.includes(query);
    });
  }, [notes, searchQuery]);

  return {
    notes,
    filteredNotes,
    searchQuery,
    setSearchQuery,
    createNote,
    updateNote,
    deleteNote,
    togglePin,
  };
}
