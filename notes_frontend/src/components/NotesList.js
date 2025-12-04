import React from 'react';
import NoteCard from './NoteCard';

/**
 * NotesList component for rendering a collection of notes.
 *
 * PUBLIC_INTERFACE
 *
 * Props:
 * - notes: array of note objects to display (already filtered by search)
 * - allNotesCount: total number of notes before filtering
 * - searchQuery: string used to filter notes (for empty state messaging)
 * - onEdit: (note) => void
 * - onDelete: (id: string) => void
 * - onTogglePin: (id: string) => void
 */

// PUBLIC_INTERFACE
function NotesList({
  notes,
  allNotesCount,
  searchQuery,
  onEdit,
  onDelete,
  onTogglePin,
}) {
  const hasNotes = notes.length > 0;
  const isSearching = Boolean(searchQuery.trim());

  if (!hasNotes) {
    return (
      <div className="notes-list">
        <div className="notes-list__header">
          <h2 className="notes-list__title">Your notes</h2>
          <p className="notes-list__meta">
            {allNotesCount === 0 ? 'No notes yet' : 'No matching notes'}
          </p>
        </div>
        <div className="empty-state">
          <p className="empty-state__title">
            {allNotesCount === 0
              ? 'You have a blank canvas.'
              : 'No notes match your search.'}
          </p>
          <p className="empty-state__hint">
            {allNotesCount === 0
              ? 'Create your first note to keep track of ideas, tasks, and reminders.'
              : 'Try adjusting your search terms or clearing the search field.'}
          </p>
        </div>
      </div>
    );
  }

  const pinned = notes.filter((note) => note.pinned);
  const unpinned = notes.filter((note) => !note.pinned);

  const sortedPinned = [...pinned].sort(
    (a, b) => new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt),
  );
  const sortedUnpinned = [...unpinned].sort(
    (a, b) => new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt),
  );

  const displayNotes = [...sortedPinned, ...sortedUnpinned];

  return (
    <div className="notes-list">
      <div className="notes-list__header">
        <h2 className="notes-list__title">Your notes</h2>
        <p className="notes-list__meta">
          {notes.length} note{notes.length !== 1 ? 's' : ''}{' '}
          {isSearching ? `(filtered from ${allNotesCount})` : ''}
        </p>
      </div>
      <div className="notes-list__grid" aria-label="Saved notes">
        {displayNotes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            onEdit={onEdit}
            onDelete={onDelete}
            onTogglePin={onTogglePin}
          />
        ))}
      </div>
    </div>
  );
}

export default NotesList;
