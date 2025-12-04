import React, { useState, useEffect } from 'react';
import './App.css';
import './index.css';
import Header from './components/Header';
import NoteForm from './components/NoteForm';
import NotesList from './components/NotesList';
import { useNotes } from './hooks/useNotes';

/**
 * Optional API base URLs for future backend integration.
 * These are not required for the app to function.
 */
const API_BASE = process.env.REACT_APP_API_BASE || process.env.REACT_APP_BACKEND_URL || '';

/**
 * Layout:
 * - App shell with header
 * - Main content with NoteForm on top and NotesList below
 * - Theme toggle persists via data-theme attribute
 */

// PUBLIC_INTERFACE
function App() {
  const [theme, setTheme] = useState('light');
  const [editingNote, setEditingNote] = useState(null);

  const {
    notes,
    filteredNotes,
    searchQuery,
    setSearchQuery,
    createNote,
    updateNote,
    deleteNote,
    togglePin,
  } = useNotes();

  // Apply theme to document root for CSS variables
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const handleSaveNote = (noteData) => {
    if (editingNote) {
      updateNote(editingNote.id, noteData);
      setEditingNote(null);
    } else {
      createNote(noteData);
    }
  };

  const handleEditNote = (note) => {
    setEditingNote(note);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingNote(null);
  };

  return (
    <div className="App">
      <Header
        theme={theme}
        onToggleTheme={toggleTheme}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <main className="app-main">
        <section className="app-panel app-panel--form" aria-label="Create or edit note">
          <NoteForm
            key={editingNote ? editingNote.id : 'new'}
            initialNote={editingNote}
            onSave={handleSaveNote}
            onCancel={handleCancelEdit}
          />
        </section>
        <section className="app-panel app-panel--list" aria-label="Notes list">
          <NotesList
            notes={filteredNotes}
            allNotesCount={notes.length}
            searchQuery={searchQuery}
            onEdit={handleEditNote}
            onDelete={deleteNote}
            onTogglePin={togglePin}
          />
        </section>
      </main>
      {API_BASE ? (
        <footer className="app-footer">
          <small className="app-footer__hint">
            Connected to backend base URL: <code>{API_BASE}</code> (not yet used)
          </small>
        </footer>
      ) : (
        <footer className="app-footer">
          <small className="app-footer__hint">
            Notes are stored locally in your browser. Clearing browser data will remove them.
          </small>
        </footer>
      )}
    </div>
  );
}

export default App;
