import React from 'react';

/**
 * PUBLIC_INTERFACE
 * NoteCard displays a single note with title, content preview, and actions.
 *
 * Props:
 * - note: { id: string, title: string, content: string, createdAt?: string }
 * - onEdit: () => void
 * - onDelete: () => void
 */
function NoteCard({ note, onEdit, onDelete }) {
  const { title, content, createdAt } = note;

  const createdLabel = createdAt
    ? new Date(createdAt).toLocaleString(undefined, {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : '';

  const preview =
    content && content.trim().length > 0
      ? content.trim().length > 160
        ? `${content.trim().slice(0, 157)}…`
        : content.trim()
      : 'No additional details.';

  return (
    <article className="note-card">
      <div className="note-card-header">
        <h3 className="note-card-title">{title}</h3>
        {createdLabel && <span className="note-card-meta">{createdLabel}</span>}
      </div>
      <div className="note-card-body">{preview}</div>
      <div className="note-card-actions">
        <button type="button" className="btn btn-ghost" onClick={onEdit}>
          Edit
        </button>
        <button type="button" className="btn btn-danger" onClick={onDelete}>
          Delete
        </button>
      </div>
    </article>
  );
}

export default NoteCard;
