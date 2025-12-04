import React, { useState } from 'react';

function formatDate(timestamp) {
  try {
    const date = new Date(timestamp);
    return date.toLocaleString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return '';
  }
}

/**
 * PUBLIC_INTERFACE
 * NoteCard displays a single note and allows inline editing and deletion.
 */
export function NoteCard({ note, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(note.title || '');
  const [draftContent, setDraftContent] = useState(note.content || '');
  const [draftTags, setDraftTags] = useState((note.tags || []).join(', '));

  const startEditing = () => {
    setDraftTitle(note.title || '');
    setDraftContent(note.content || '');
    setDraftTags((note.tags || []).join(', '));
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setIsEditing(false);
  };

  const saveChanges = () => {
    onUpdate(note.id, {
      title: draftTitle,
      content: draftContent,
      tags: draftTags,
    });
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDelete(note.id);
  };

  const showTags = (note.tags || []).length > 0;

  return (
    <article className="note-card">
      <header className="note-card-header">
        {isEditing ? (
          <input
            value={draftTitle}
            onChange={(e) => setDraftTitle(e.target.value)}
            className="note-form-input"
            style={{ fontSize: '0.85rem', padding: '5px 7px' }}
            aria-label="Edit title"
          />
        ) : (
          <div className="note-card-title-wrap">
            <h3 className="note-card-title">{note.title || 'Untitled'}</h3>
            <p className="note-card-date">{formatDate(note.updatedAt || note.createdAt)}</p>
          </div>
        )}
      </header>

      <div className="note-card-body">
        {isEditing ? (
          <textarea
            value={draftContent}
            onChange={(e) => setDraftContent(e.target.value)}
            className="note-form-textarea"
            style={{ fontSize: '0.8rem', minHeight: 70 }}
            aria-label="Edit body"
          />
        ) : (
          <p>{note.content}</p>
        )}
      </div>

      {isEditing && (
        <div className="note-card-tags" aria-label="Edit tags">
          <input
            value={draftTags}
            onChange={(e) => setDraftTags(e.target.value)}
            className="note-form-input"
            style={{ fontSize: '0.75rem', padding: '4px 7px' }}
            placeholder="tags, comma, separated"
          />
        </div>
      )}

      {!isEditing && showTags && (
        <div className="note-card-tags" aria-label="Tags">
          {note.tags.map((tag) => (
            <span key={tag} className="note-card-tag-pill">
              {tag}
            </span>
          ))}
        </div>
      )}

      <footer className="note-card-toolbar">
        {isEditing ? (
          <>
            <button
              type="button"
              className="icon-btn icon-btn-edit"
              onClick={saveChanges}
            >
              ✓ Save
            </button>
            <button
              type="button"
              className="icon-btn"
              onClick={cancelEditing}
            >
              ✕ Cancel
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              className="icon-btn icon-btn-edit"
              onClick={startEditing}
            >
              ✎ Edit
            </button>
            <button
              type="button"
              className="icon-btn icon-btn-delete"
              onClick={handleDelete}
            >
              ⌫ Delete
            </button>
          </>
        )}
      </footer>
    </article>
  );
}
