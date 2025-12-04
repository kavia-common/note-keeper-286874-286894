import React from 'react';
import NoteForm from './NoteForm';
import NotesList from './NotesList';

/**
 * PUBLIC_INTERFACE
 * NotesPage composes the note creation/editing form with the notes list
 * in a responsive two-column layout.
 *
 * Props:
 * - notes: Array of note objects
 * - selectedNote: note object currently being edited, or null
 * - loading: boolean indicating if notes are being loaded or synced
 * - error: string | null describing last error state
 * - onCreateNote: (noteInput) => Promise<void> | void
 * - onUpdateNote: (id, noteInput) => Promise<void> | void
 * - onDeleteNote: (id) => Promise<void> | void
 * - onSelectNote: (note | null) => void
 */
function NotesPage({
  notes,
  selectedNote,
  loading,
  error,
  onCreateNote,
  onUpdateNote,
  onDeleteNote,
  onSelectNote,
}) {
  const handleSubmit = (data) => {
    if (selectedNote) {
      return onUpdateNote(selectedNote.id, data);
    }
    return onCreateNote(data);
  };

  const handleCancelEdit = () => {
    onSelectNote(null);
  };

  return (
    <section className="notes-layout">
      <div className="notes-column" aria-label="Note editor">
        <div className="status-row">
          {loading && <span className="status-pill loading">Syncing…</span>}
          {error && <span className="status-pill error">Something went wrong.</span>}
        </div>
        <NoteForm
          key={selectedNote ? selectedNote.id : 'new'}
          mode={selectedNote ? 'edit' : 'create'}
          initialTitle={selectedNote?.title || ''}
          initialContent={selectedNote?.content || ''}
          onSubmit={handleSubmit}
          onCancelEdit={handleCancelEdit}
        />
      </div>

      <div className="notes-column" aria-label="Notes list">
        <NotesList
          notes={notes}
          onEditNote={onSelectNote}
          onDeleteNote={onDeleteNote}
        />
      </div>
    </section>
  );
}

export default NotesPage;
