import React from 'react';

/**
 * Header component for the Notes app.
 *
 * PUBLIC_INTERFACE
 * Renders the application title, search input, and theme toggle control.
 *
 * Props:
 * - theme: "light" | "dark" - current theme identifier.
 * - onToggleTheme: () => void - callback to toggle the theme.
 * - searchQuery: string - current search query text.
 * - onSearchChange: (value: string) => void - callback when the search input changes.
 */

// PUBLIC_INTERFACE
function Header({ theme, onToggleTheme, searchQuery, onSearchChange }) {
  const handleSearchChange = (event) => {
    onSearchChange(event.target.value);
  };

  const isDark = theme === 'dark';

  return (
    <header className="app-header">
      <div className="app-header__shell" aria-label="Note Keeper header">
        <div className="app-header__left">
          <div className="app-header__logo" aria-hidden="true">
            <span className="app-header__logo-ring" />
            <span className="app-header__logo-dot" />
          </div>
          <div className="app-header__titles">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <h1 className="app-header__title">Note Keeper</h1>
              <span className="app-badge">LOCAL</span>
            </div>
            <p className="app-header__subtitle">
              Capture quick thoughts, ideas, and tasks with a focused workspace.
            </p>
          </div>
        </div>

        <div className="app-header__right">
          <div className="header-search">
            <label className="visually-hidden" htmlFor="note-search">
              Search notes
            </label>
            <input
              id="note-search"
              type="search"
              placeholder="Search notes..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <span className="header-search__icon" aria-hidden="true">
              🔍
            </span>
          </div>

          <button
            type="button"
            className="theme-toggle-btn"
            onClick={onToggleTheme}
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
          >
            <div className="theme-toggle-btn-pill">
              <span className="theme-toggle-btn-pill-icon" aria-hidden="true">
                {isDark ? '🌙' : '☀️'}
              </span>
              <span className="theme-toggle-btn-pill-label">
                {isDark ? 'Night' : 'Day'}
              </span>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
