import { useEffect, useMemo, useState } from 'react';

const NOTES_STORAGE_KEY = 'notes_app_items_v1';

/**
 * Basic note shape used by the app.
 * @typedef {Object} Note
 * @property {string} id
 * @property {string} title
 * @property {string} content
 * @property {string[]} tags
 * @property {number} createdAt
 * @property {number} updatedAt
 */

/**
 * PUBLIC_INTERFACE
 * useNotes encapsulates all note-related state, including CRUD, search,
 * tag filtering, sorting, and localStorage persistence.
 */
export function useNotes() {
  const [notes, setNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTagFilter, setActiveTagFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('recent'); // 'recent' | 'alpha'

  // Load from localStorage
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(NOTES_STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        setNotes(parsed);
      }
    } catch {
      // fallback: ignore malformed data
    }
  }, []);

  // Persist to localStorage on changes
  useEffect(() => {
    try {
      window.localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(notes));
    } catch {
      // ignore
    }
  }, [notes]);

  /**
   * Normalize tags from a comma-separated string.
   */
  const parseTags = (tagsInput) => {
    if (!tagsInput) return [];
    if (Array.isArray(tagsInput)) return tagsInput;
    return String(tagsInput)
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean)
      .slice(0, 8);
  };

  /**
   * PUBLIC_INTERFACE
   * Create a new note. Accepts partial payload from form.
   */
  const createNote = ({ title, content, tags }) => {
    const now = Date.now();
    const note = {
      id: `${now}-${Math.random().toString(16).slice(2)}`,
      title: (title || '').trim() || 'Untitled',
      content: content || '',
      tags: parseTags(tags),
      createdAt: now,
      updatedAt: now,
    };
    setNotes((prev) => [note, ...prev]);
    return note;
  };

  /**
   * PUBLIC_INTERFACE
   * Update an existing note by id with partial fields.
   */
  const updateNote = (id, payload) => {
    setNotes((prev) =>
      prev.map((note) => {
        if (note.id !== id) return note;
        const merged = {
          ...note,
          ...payload,
          tags: payload.tags ? parseTags(payload.tags) : note.tags,
          updatedAt: Date.now(),
        };
        if (!merged.title || !merged.title.trim()) {
          merged.title = 'Untitled';
        }
        return merged;
      })
    );
  };

  /**
   * PUBLIC_INTERFACE
   * Delete a note by id.
   */
  const deleteNote = (id) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  /**
   * PUBLIC_INTERFACE
   * Clear all notes.
   */
  const clearAllNotes = () => {
    setNotes([]);
  };

  const filteredNotes = useMemo(() => {
    let result = notes;

    const q = searchQuery.trim().toLowerCase();
    if (q) {
      result = result.filter((note) => {
        const inTitle = note.title.toLowerCase().includes(q);
        const inContent = note.content.toLowerCase().includes(q);
        const inTags = (note.tags || []).some((t) => t.toLowerCase().includes(q));
        return inTitle || inContent || inTags;
      });
    }

    if (activeTagFilter !== 'all') {
      result = result.filter((note) => (note.tags || []).includes(activeTagFilter));
    }

    if (sortOrder === 'alpha') {
      result = [...result].sort((a, b) =>
        a.title.toLowerCase().localeCompare(b.title.toLowerCase())
      );
    } else {
      result = [...result].sort((a, b) => b.updatedAt - a.updatedAt);
    }

    return result;
  }, [notes, searchQuery, activeTagFilter, sortOrder]);

  const stats = useMemo(() => {
    const total = notes.length;
    const pinned = 0;
    const distinctTags = new Set();
    notes.forEach((n) => (n.tags || []).forEach((t) => distinctTags.add(t)));
    return {
      total,
      pinned,
      tagsCount: distinctTags.size,
    };
  }, [notes]);

  return {
    notes,
    filteredNotes,
    createNote,
    updateNote,
    deleteNote,
    clearAllNotes,
    searchQuery,
    setSearchQuery,
    activeTagFilter,
    setActiveTagFilter,
    sortOrder,
    setSortOrder,
    stats,
  };
}
