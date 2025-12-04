import React from 'react';
import './App.css';
import './index.css';
import { useNotes } from './hooks/useNotes';
import { useTheme } from './hooks/useTheme';
import { AppHeader } from './components/AppHeader';
import { NoteForm } from './components/NoteForm';
import { NotesToolbar } from './components/NotesToolbar';
import { NotesList } from './components/NotesList';

/**
 * Root application component for the Notes app.
 * Manages notes state via useNotes and visual theme via useTheme.
 */
// PUBLIC_INTERFACE
function App() {
  const {
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
  } = useNotes();

  const { theme, toggleTheme } = useTheme();

  return (
    <div className={`app-root theme-${theme}`}>
      <div className="app-shell">
        <AppHeader theme={theme} onToggleTheme={toggleTheme} />

        <main className="app-main" aria-label="Notes application">
          <section className="left-column" aria-label="Create or edit note">
            <NoteForm
              onCreate={createNote}
              onUpdate={updateNote}
            />
          </section>

          <section className="right-column" aria-label="Notes list and controls">
            <NotesToolbar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              activeTagFilter={activeTagFilter}
              onTagFilterChange={setActiveTagFilter}
              sortOrder={sortOrder}
              onSortOrderChange={setSortOrder}
              onClearAll={clearAllNotes}
              stats={stats}
            />
            <NotesList
              notes={filteredNotes}
              onUpdate={updateNote}
              onDelete={deleteNote}
            />
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;
