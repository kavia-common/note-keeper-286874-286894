import React from 'react';
import NoteCard from './NoteCard';
import EmptyState from './EmptyState';

/**
 * PUBLIC_INTERFACE
 * NotesList renders a collection of notes or an empty state when no notes exist.
 *
 * Props:
 * - notes: Array<{ id: string, title: string, content: string, createdAt?: string }>
 * - onEditNote: (note) => void
 * - onDeleteNote: (id: string) => void
 */
function NotesList({ notes, onEditNote, onDeleteNote }) {
  const total = notes.length;

  const handleDelete = (id) => {
    const confirmDelete = window.confirm('Delete this note? This cannot be undone.');
    if (confirmDelete) {
      onDeleteNote(id);
    }
  };

  return (
    <div>
      <div className="notes-header">
        <h2 className="notes-header-title">Your notes</h2>
        <span className="notes-counter">
          {total === 0 ? 'No notes yet' : `${total} note${total === 1 ? '' : 's'}`}
        </span>
      </div>

      {total === 0 ? (
        <EmptyState />
      ) : (
        <div className="notes-list" aria-label="Notes collection">
          {notes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onEdit={() => onEditNote(note)}
              onDelete={() => handleDelete(note.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default NotesList;
