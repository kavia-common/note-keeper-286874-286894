import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Header displays the NoteKeeper branding, environment mode label,
 * and a theme toggle control.
 *
 * Props:
 * - theme: 'light' | 'dark'
 * - onToggleTheme: () => void
 * - modeLabel: string - short label for current mode ("Connected" / "Local storage only")
 * - modeDescription: string - longer description for tooltip or context
 */
function Header({ theme, onToggleTheme, modeLabel, modeDescription }) {
  const isDark = theme === 'dark';
  const isConnected = /connected/i.test(modeLabel);

  return (
    <header className="app-header">
      <div className="app-header-left">
        <div className="app-logo-mark" aria-hidden="true">
          <span>N</span>
        </div>
        <div className="app-header-title">
          <h1 className="app-title">NoteKeeper</h1>
          <p className="app-subtitle">Lightweight notes with an Ocean Professional touch.</p>
        </div>
      </div>

      <div className="app-header-right">
        <div
          className={`mode-pill ${
            isConnected ? 'mode-pill-variant-connected' : 'mode-pill-variant-local'
          }`}
          aria-label={modeDescription}
          title={modeDescription}
        >
          <span className="mode-dot" aria-hidden="true" />
          <span>{modeLabel}</span>
        </div>

        <button
          type="button"
          className="theme-toggle"
          onClick={onToggleTheme}
          aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        >
          <span className="theme-toggle-icon" aria-hidden="true">
            {isDark ? '🌙' : '☀️'}
          </span>
          <span className="theme-toggle-label">{isDark ? 'Dark' : 'Light'} theme</span>
        </button>
      </div>
    </header>
  );
}

export default Header;
