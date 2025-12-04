import React from 'react';
import { NoteCard } from './NoteCard';

/**
 * PUBLIC_INTERFACE
 * NotesList renders all notes using NoteCard; handles empty state.
 */
export function NotesList({ notes, onUpdate, onDelete }) {
  const hasNotes = notes && notes.length > 0;

  return (
    <section className="notes-panel" aria-label="Notes list">
      {!hasNotes && (
        <div className="notes-empty">
          No notes yet. Capture your first idea on the left — everything is stored locally
          in this browser.
        </div>
      )}
      {hasNotes && (
        <div className="notes-grid">
          {notes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </section>
  );
}
