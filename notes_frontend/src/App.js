import React, { useState, useEffect } from 'react';
import './App.css';
import './index.css';
import PageShell from './components/Layout/PageShell';
import Header from './components/Layout/Header';
import NotesPage from './components/Notes/NotesPage';
import useNotes from './hooks/useNotes';

// Determine whether we are running with a backend or only local storage.
// PUBLIC_INTERFACE
export function getAppMode() {
  const apiBase = process.env.REACT_APP_API_BASE;
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  if (apiBase || backendUrl) {
    return {
      mode: 'connected',
      label: 'Connected',
      description: 'Using backend API for note storage.',
    };
  }

  return {
    mode: 'local',
    label: 'Local storage only',
    description: 'Notes are stored only in this browser.',
  };
}

// PUBLIC_INTERFACE
function App() {
  const [theme, setTheme] = useState('light');
  const { mode, label, description } = getAppMode();

  const {
    notes,
    selectedNote,
    loading,
    error,
    createNote,
    updateNote,
    deleteNote,
    selectNoteForEdit,
  } = useNotes();

  // Apply theme to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="app-root">
      <PageShell
        header={
          <Header
            theme={theme}
            onToggleTheme={toggleTheme}
            modeLabel={label}
            modeDescription={description}
          />
        }
        footer={
          <footer className="app-footer">
            <span className="footer-text">
              Mode: <strong>{label}</strong>
            </span>
            <span className="footer-subtle">{description}</span>
          </footer>
        }
      >
        <main className="app-main" aria-label="NoteKeeper main content">
          <NotesPage
            notes={notes}
            selectedNote={selectedNote}
            loading={loading}
            error={error}
            onCreateNote={createNote}
            onUpdateNote={updateNote}
            onDeleteNote={deleteNote}
            onSelectNote={selectNoteForEdit}
          />
        </main>
      </PageShell>
    </div>
  );
}

export default App;
