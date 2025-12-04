import React from 'react';

/**
 * PUBLIC_INTERFACE
 * EmptyState is shown when the user has not created any notes yet.
 */
function EmptyState() {
  return (
    <div className="empty-state" role="status" aria-live="polite">
      <div className="empty-state-title">No notes yet</div>
      <div className="empty-state-body">
        Start by giving your note a title on the left. Notes are saved automatically to this
        browser, and can optionally sync to a backend when configured.
      </div>
    </div>
  );
}

export default EmptyState;
