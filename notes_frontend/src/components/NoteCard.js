import React from 'react';

/**
 * NoteCard component to display a single note.
 *
 * PUBLIC_INTERFACE
 *
 * Props:
 * - note: { id, title, content, createdAt, updatedAt, pinned?, color? }
 * - onEdit: (note) => void
 * - onDelete: (id: string) => void
 * - onTogglePin: (id: string) => void
 */

// PUBLIC_INTERFACE
function NoteCard({ note, onEdit, onDelete, onTogglePin }) {
  const { id, title, content, createdAt, updatedAt, pinned } = note;

  const createdLabel = new Date(createdAt).toLocaleString(undefined, {
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });

  const updatedLabel =
    updatedAt && updatedAt !== createdAt
      ? new Date(updatedAt).toLocaleString(undefined, {
          month: 'short',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
        })
      : null;

  return (
    <article className="note-card">
      {pinned && (
        <div className="note-card__pin-badge" aria-label="Pinned note">
          <span aria-hidden="true">📌</span>
          <span>Pinned</span>
        </div>
      )}
      <h3 className="note-card__title">
        {title || <span style={{ opacity: 0.8, fontStyle: 'italic' }}>Untitled note</span>}
      </h3>
      {content ? (
        <p className="note-card__content">{content}</p>
      ) : (
        <p className="note-card__content" style={{ fontStyle: 'italic', opacity: 0.9 }}>
          No additional details.
        </p>
      )}
      <div className="note-card__meta">
        <span>
          Created&nbsp;
          <time dateTime={createdAt}>{createdLabel}</time>
        </span>
        {updatedLabel ? (
          <span>
            Updated&nbsp;
            <time dateTime={updatedAt}>{updatedLabel}</time>
          </span>
        ) : (
          <span />
        )}
      </div>
      <div className="note-card__actions" aria-label="Note actions">
        <button
          type="button"
          className={`btn-icon ${pinned ? 'btn-icon--pin-active' : ''}`}
          onClick={() => onTogglePin(id)}
          aria-pressed={pinned}
          aria-label={pinned ? 'Unpin note' : 'Pin note'}
          title={pinned ? 'Unpin note' : 'Pin note'}
        >
          📌
        </button>
        <button
          type="button"
          className="btn-icon"
          onClick={() => onEdit(note)}
          aria-label="Edit note"
          title="Edit note"
        >
          ✏️
        </button>
        <button
          type="button"
          className="btn-icon btn-icon--danger"
          onClick={() => onDelete(id)}
          aria-label="Delete note"
          title="Delete note"
        >
          🗑
        </button>
      </div>
    </article>
  );
}

export default NoteCard;
