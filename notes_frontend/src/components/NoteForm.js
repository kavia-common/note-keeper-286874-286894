import React, { useEffect, useState } from 'react';

/**
 * NoteForm component for creating and editing notes.
 *
 * PUBLIC_INTERFACE
 *
 * Props:
 * - initialNote: optional note object to edit; if undefined, the form creates a new note.
 * - onSave: (data: { title: string; content: string }) => void - called when Save is clicked and validation passes.
 * - onCancel: () => void - called when edit is cancelled or form is cleared.
 */

// PUBLIC_INTERFACE
function NoteForm({ initialNote, onSave, onCancel }) {
  const [title, setTitle] = useState(initialNote?.title ?? '');
  const [content, setContent] = useState(initialNote?.content ?? '');
  const [error, setError] = useState('');

  useEffect(() => {
    setTitle(initialNote?.title ?? '');
    setContent(initialNote?.content ?? '');
    setError('');
  }, [initialNote]);

  const isEditing = Boolean(initialNote);

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmedTitle = title.trim();
    const trimmedContent = content.trim();

    if (!trimmedTitle && !trimmedContent) {
      setError('Please add a title or some content before saving.');
      return;
    }

    setError('');
    onSave({
      title: trimmedTitle,
      content: trimmedContent,
    });
    setTitle('');
    setContent('');
  };

  const handleClear = () => {
    setTitle('');
    setContent('');
    setError('');
    if (isEditing) {
      onCancel();
    }
  };

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <div className="note-form__header">
        <h2 className="note-form__title">
          {isEditing ? 'Edit note' : 'Create a note'}
        </h2>
        <p className="note-form__hint">
          {isEditing ? 'Update your note and save changes.' : 'Start with a title or just write.'}
        </p>
      </div>

      {isEditing && (
        <div className="note-form__status" aria-label="Editing existing note">
          <span className="note-form__status-dot" />
          <span>Editing existing note</span>
        </div>
      )}

      <div className="note-form__grid">
        <div className="form-field">
          <div className="form-label-row">
            <label className="form-label" htmlFor="note-title">
              Title
            </label>
            <span className="form-label-hint">Optional, but helpful to scan quickly</span>
          </div>
          <input
            id="note-title"
            className="form-input"
            type="text"
            placeholder="Project ideas, shopping list, meeting recap..."
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>

        <div className="form-field">
          <div className="form-label-row">
            <label className="form-label" htmlFor="note-content">
              Content
            </label>
            <span className="form-label-hint">Add details, links, or next steps</span>
          </div>
          <textarea
            id="note-content"
            className="form-textarea"
            placeholder="Capture your thoughts..."
            value={content}
            onChange={(event) => setContent(event.target.value)}
          />
        </div>
      </div>

      {error ? (
        <div className="form-error" role="alert">
          {error}
        </div>
      ) : null}

      <div className="note-form__actions">
        <div className="note-form__meta">
          <span>
            {title.length > 0 || content.length > 0
              ? 'Ready when you are – your note will be saved locally.'
              : 'Notes stay on this device until you clear your browser.'}
          </span>
        </div>
        <div style={{ display: 'flex', gap: '0.4rem' }}>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleClear}
          >
            {isEditing ? 'Cancel edit' : 'Clear'}
          </button>
          <button
            type="submit"
            className="btn btn-primary"
          >
            {isEditing ? 'Save changes' : 'Save note'}
          </button>
        </div>
      </div>
    </form>
  );
}

export default NoteForm;
