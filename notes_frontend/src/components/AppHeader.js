import React from 'react';

/**
 * PUBLIC_INTERFACE
 * AppHeader renders the top bar with branding, subtitle, and theme toggle.
 */
export function AppHeader({ theme, onToggleTheme }) {
  const nextThemeLabel = theme === 'dark' ? 'Light' : 'Dark';

  return (
    <header className="app-header" aria-label="Note Keeper header">
      <div className="app-header-left">
        <div className="app-logo" aria-hidden="true">
          N
        </div>
        <div className="app-title-wrap">
          <div className="app-title">
            <span>Note</span>
            <span className="app-title-highlight">Keeper</span>
          </div>
          <p className="app-subtitle">
            Capture quick thoughts and ideas with a focused, local-first notes workspace.
          </p>
        </div>
      </div>
      <div className="app-header-right">
        <span className="app-meta-pill">Local · Private</span>
        <button
          type="button"
          className="theme-toggle-btn"
          onClick={onToggleTheme}
          aria-label={`Switch to ${nextThemeLabel} theme`}
        >
          <span className="theme-toggle-thumb" aria-hidden="true">
            {theme === 'dark' ? '☾' : '☼'}
          </span>
          <span className="theme-toggle-label">{nextThemeLabel} mode</span>
        </button>
      </div>
    </header>
  );
}
