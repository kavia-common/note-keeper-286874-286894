import React from 'react';

/**
 * PUBLIC_INTERFACE
 * PageShell is the primary layout wrapper for the NoteKeeper app.
 * It centers a white surface card on top of a subtle gradient background,
 * providing regions for the header, main content (children), and an optional footer.
 *
 * Props:
 * - header: ReactNode displayed at the top of the surface
 * - children: main content
 * - footer: ReactNode displayed below the surface
 */
function PageShell({ header, children, footer }) {
  return (
    <div className="app-shell">
      <div className="app-surface">
        {header}
        {children}
      </div>
      {footer}
    </div>
  );
}

export default PageShell;
