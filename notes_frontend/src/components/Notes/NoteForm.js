import React, { useEffect, useRef, useState } from 'react';

/**
 * PUBLIC_INTERFACE
 * NoteForm handles creating and editing notes. It exposes a simple
 * callback-based interface and manages its own local input state.
 *
 * Props:
 * - mode: 'create' | 'edit'
 * - initialTitle: string
 * - initialContent: string
 * - onSubmit: ({ title: string, content: string }) => void | Promise<void>
 * - onCancelEdit?: () => void
 */
function NoteForm({ mode, initialTitle, initialContent, onSubmit, onCancelEdit }) {
  const [title, setTitle] = useState(initialTitle || '');
  const [content, setContent] = useState(initialContent || '');
  const [submitting, setSubmitting] = useState(false);
  const titleRef = useRef(null);

  const isEdit = mode === 'edit';

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.focus();
      titleRef.current.select();
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const trimmedTitle = title.trim();
    const trimmedContent = content.trim();

    if (!trimmedTitle) {
      if (titleRef.current) {
        titleRef.current.focus();
      }
      return;
    }

    try {
      setSubmitting(true);
      await onSubmit({
        title: trimmedTitle,
        content: trimmedContent,
      });

      if (!isEdit) {
        setTitle('');
        setContent('');
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (onCancelEdit) {
      onCancelEdit();
    } else {
      setTitle('');
      setContent('');
    }
  };

  return (
    <form onSubmit={handleSubmit} aria-label={isEdit ? 'Edit note form' : 'Create note form'}>
      <div className="field">
        <label htmlFor="note-title" className="field-label">
          Title<span>*</span>
        </label>
        <input
          id="note-title"
          ref={titleRef}
          className="field-input"
          type="text"
          placeholder="Quick idea, meeting notes, or reminder…"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="field">
        <label htmlFor="note-content" className="field-label">
          Details
        </label>
        <textarea
          id="note-content"
          className="field-textarea"
          placeholder="Add any supporting details, links, or action items."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      <div className="btn-row">
        <button
          type="submit"
          className="btn btn-primary"
          disabled={submitting || !title.trim()}
        >
          {isEdit ? 'Update note' : 'Save note'}
        </button>
        {isEdit && (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleCancel}
            disabled={submitting}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default NoteForm;
