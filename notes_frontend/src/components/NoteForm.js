import React, { useState } from 'react';

/**
 * PUBLIC_INTERFACE
 * NoteForm provides a simple form for creating new notes.
 * Currently it always creates new notes; editing is handled inline in NoteCard.
 */
export function NoteForm({ onCreate }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tagsInput, setTagsInput] = useState('');

  const reset = () => {
    setTitle('');
    setContent('');
    setTagsInput('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmedTitle = title.trim();
    const trimmedContent = content.trim();

    if (!trimmedTitle && !trimmedContent && !tagsInput.trim()) {
      return;
    }

    onCreate({
      title: trimmedTitle,
      content: trimmedContent,
      tags: tagsInput,
    });

    reset();
  };

  return (
    <section className="panel" aria-label="New note">
      <div className="panel-inner">
        <div className="panel-title">
          Capture
          <span className="panel-title-pill">Quick Note</span>
        </div>
        <p className="panel-subtitle">
          Jot down an idea, reminder, or scratchpad entry. Everything stays in your browser.
        </p>
        <form className="note-form" onSubmit={handleSubmit}>
          <div className="note-form-row">
            <label className="note-form-label" htmlFor="note-title">
              Title
            </label>
            <input
              id="note-title"
              className="note-form-input"
              placeholder="Morning standup notes, product ideas, reminders…"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="note-form-row">
            <label className="note-form-label" htmlFor="note-content">
              Body
            </label>
            <textarea
              id="note-content"
              className="note-form-textarea"
              placeholder="Write your note here…"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          <div className="note-form-row" aria-label="Tags input row">
            <label className="note-form-label" htmlFor="note-tags">
              Tags
            </label>
            <div style={{ flex: 1 }}>
              <input
                id="note-tags"
                className="note-form-input"
                placeholder="comma, separated, tags"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
              />
              <div className="note-tags-helper">
                Separate tags with commas. For example:{' '}
                <span className="tag-pill">
                  work<span>•</span>today<span>•</span>ideas
                </span>
              </div>
            </div>
          </div>

          <div className="btn-row">
            <div className="btn-group">
              <button type="submit" className="btn">
                <span>Save note</span>
              </button>
              <button
                type="button"
                className="btn-secondary btn"
                onClick={reset}
              >
                Clear
              </button>
            </div>
            <span className="badge-muted" aria-hidden="true">
              Local-only · No sync
            </span>
          </div>
        </form>
      </div>
    </section>
  );
}
