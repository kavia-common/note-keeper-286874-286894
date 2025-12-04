import React from 'react';

/**
 * PUBLIC_INTERFACE
 * NotesToolbar renders search, filters, sort controls, and quick stats.
 */
export function NotesToolbar({
  searchQuery,
  onSearchChange,
  activeTagFilter,
  onTagFilterChange,
  sortOrder,
  onSortOrderChange,
  onClearAll,
  stats,
}) {
  const handleSearchChange = (event) => {
    onSearchChange(event.target.value);
  };

  const clearSearch = () => {
    onSearchChange('');
  };

  const toggleSort = () => {
    onSortOrderChange(sortOrder === 'recent' ? 'alpha' : 'recent');
  };

  const handleTagFilter = (value) => {
    onTagFilterChange(value);
  };

  return (
    <section className="notes-toolbar" aria-label="Notes filters and actions">
      <div className="notes-toolbar-top">
        <div className="toolbar-search" role="search">
          <span className="toolbar-search-icon" aria-hidden="true">
            🔍
          </span>
          <input
            type="search"
            className="toolbar-search-input"
            placeholder="Search by title, body, or tag…"
            value={searchQuery}
            onChange={handleSearchChange}
            aria-label="Search notes"
          />
          {searchQuery && (
            <button
              type="button"
              className="toolbar-search-clear"
              onClick={clearSearch}
              aria-label="Clear search"
            >
              Esc
            </button>
          )}
        </div>

        <div className="toolbar-filters" aria-label="Tag filters">
          <button
            type="button"
            className={`filter-chip ${
              activeTagFilter === 'all' ? 'filter-chip-active' : ''
            }`}
            onClick={() => handleTagFilter('all')}
          >
            <span className="filter-chip-label">All</span>
          </button>
          <button
            type="button"
            className={`filter-chip ${
              activeTagFilter === 'work' ? 'filter-chip-active filter-chip-hot' : ''
            }`}
            onClick={() => handleTagFilter('work')}
          >
            <span className="filter-chip-label">Work</span>
          </button>
          <button
            type="button"
            className={`filter-chip ${
              activeTagFilter === 'personal'
                ? 'filter-chip-active filter-chip-hot'
                : ''
            }`}
            onClick={() => handleTagFilter('personal')}
          >
            <span className="filter-chip-label">Personal</span>
          </button>
        </div>
      </div>

      <div className="notes-toolbar-bottom">
        <div className="toolbar-meta">
          <div className="stats-pill">
            <span className="stats-dot" aria-hidden="true" />
            <span>
              {stats.total} note{stats.total === 1 ? '' : 's'}
            </span>
            <span aria-hidden="true">·</span>
            <span>{stats.tagsCount} tags</span>
          </div>
        </div>

        <div className="btn-group">
          <button
            type="button"
            className="btn-secondary btn"
            onClick={toggleSort}
          >
            Sort: {sortOrder === 'recent' ? 'Recent' : 'A → Z'}
          </button>
          <button
            type="button"
            className="btn-ghost btn"
            onClick={onClearAll}
          >
            Clear all
          </button>
        </div>
      </div>
    </section>
  );
}
