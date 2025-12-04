# Notes Frontend – User Guide

## Overview

**Notes Frontend** is a lightweight React application for capturing, managing, and organizing notes quickly and privately. All data is stored locally in your browser for privacy and speed—no account or internet required to use the core functions.

The app offers a modern, ocean-inspired UI—clean, responsive, and easy to use on both desktop and mobile devices.

---

## Table of Contents

- [Installation & Setup](#installation--setup)
- [Quick Start](#quick-start)
- [Available Scripts](#available-scripts)
- [Configuration & Environment Variables](#configuration--environment-variables)
- [Features](#features)
- [Usage Guide & Keyboard Tips](#usage-guide--keyboard-tips)
- [Data Persistence & Privacy](#data-persistence--privacy)
- [Troubleshooting & FAQ](#troubleshooting--faq)
- [Further Resources](#further-resources)

---

## Installation & Setup

### Prerequisites

- [Node.js](https://nodejs.org/) (version 14 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Steps

1. **Clone the repository** (if needed):

   ```bash
   git clone <repository-url>
   cd note-keeper-286874-286894/notes_frontend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

---

## Quick Start

To run the application locally (in development mode):

```bash
npm start
```

- This will start the React development server.
- Open [http://localhost:3000](http://localhost:3000) in your browser.
- The app supports hot reload—changes to files will update your browser automatically.

---

## Available Scripts

You can run these scripts in the project directory:

- **`npm start`** – Start the app in development mode.
- **`npm test`** – Run tests in interactive mode.
- **`npm run build`** – Build a production bundle (`build/` folder).
- **`npm run eject`** – [Advanced] Ejects configuration and dependencies. _(Not recommended for most users)_

---

## Configuration & Environment Variables

Environment variables allow customization of certain behaviors, especially for advanced deployments. For **default local usage**, no extra setup is required—these variables are optional.

**Defined environment variables:**

| Variable                      | Default/Typical Use                 | Description                                    |
|-------------------------------|-------------------------------------|------------------------------------------------|
| REACT_APP_API_BASE            | *(unused by default)*               | API endpoint for backend (not used—local only)  |
| REACT_APP_BACKEND_URL         | *(unused by default)*               | Backend URL (not used—local only)               |
| REACT_APP_FRONTEND_URL        | *(unused by default)*               | Base URL to the frontend UI                     |
| REACT_APP_WS_URL              | *(unused by default)*               | WebSocket URL if applicable (not used here)     |
| REACT_APP_NODE_ENV            | `'development'` or `'production'`   | Environment mode (auto, no need to set)         |
| REACT_APP_NEXT_TELEMETRY_DISABLED | `'1'` or `'true'`               | Disable telemetry (not relevant here)           |
| REACT_APP_ENABLE_SOURCE_MAPS  | `'true'` (for debugging)            | Include source maps in build                    |
| REACT_APP_PORT                | `3000` (default by React)           | Port for local dev server                       |
| REACT_APP_TRUST_PROXY         | *(unused by default)*               | For deployments behind a proxy                  |
| REACT_APP_LOG_LEVEL           | `info` (default)                    | Logging verbosity (not surfaced to UI)          |
| REACT_APP_HEALTHCHECK_PATH    | `/healthz` (not used by app)        | Healthcheck endpoint (not used by frontend)     |
| REACT_APP_FEATURE_FLAGS       | *(unused by default)*               | Comma-separated experimentation flags           |
| REACT_APP_EXPERIMENTS_ENABLED | 'false'                             | Enable experimental features                    |

For most users, leave these at their defaults. To set variables, create a `.env` file in the root of `notes_frontend/`:

```env
REACT_APP_PORT=3000
REACT_APP_NODE_ENV=development
```

---

## Features

- **Create, View, Edit, Delete Notes**
  - Each note has a title, body, and optional comma-separated tags.
  - Edit and delete notes directly from note cards.

- **Search & Filter**
  - Search by title, body, or tags (live filter).
  - Filter notes by built-in tag chips (e.g., "All", "Work", "Personal").

- **Sort**
  - Toggle sorting between most-recent and alphabetical.

- **Theme Toggle**
  - Switch between "Light" and "Dark" mode (persists your choice in browser).

- **Responsive Layout**
  - Works great on desktop and mobile.

- **Local-Only Data**
  - All notes, tags, and theme preferences are stored in your browser’s `localStorage`. No notes are ever sent to a server unless you modify the source code.

---

## Usage Guide & Keyboard Tips

### Creating a Note

1. Enter a title (optional), body, and comma-separated tags in the form.
2. Click "Save note" (`Enter` in a field does **not** submit, use the button).
3. Tags example: `work, today, ideas` will create tags for each.

### Editing & Deleting Notes

- Click the "✎ Edit" button on a note card to edit title, body, or tags.
- Click "✓ Save" to update changes, or "✕ Cancel" to discard.
- Click "⌫ Delete" to permanently remove the note.

### Searching, Filtering & Sorting

- Use the search bar to filter notes by any text in title, body, or tags.
- Use tag filter buttons to show notes by tag.
- Use the "Sort" button to toggle note ordering:
  - "Recent" – by last edited (default)
  - "A → Z" – by title alphabetically

### Theme Switch

- Use the top-right toggle to switch Light/Dark modes.
- Your choice is remembered for future visits.

### Tag & Bulk Actions

- Filter notes using tag chips (e.g., Work, Personal).
- Click "Clear all" to delete **all** notes (cannot be undone).

### Keyboard/Ctrl Tips

- **Clear search:** When typing in the search box, click "Esc" button to immediately empty search.
- **Tab Navigation:** All buttons, inputs, and controls are keyboard-accessible via tab and arrow keys.

---

## Data Persistence & Privacy

- **Persistence:** Notes and settings are stored in your browser’s `localStorage`.
  - Closing/reloading the browser or computer will not erase data.
  - Clearing browser site data or using a different browser/OS will start with a blank workspace.
- **Portability:** There is no built-in export/import feature (but you can copy/paste text).
- **Privacy Promise:** No data leaves your device. No server is contacted or used. *(Unless you modify the code to connect to a backend)*

---

## Troubleshooting & FAQ

### The app won’t start / blank page appears

- Ensure you’re running `npm install` first.
- Node.js version must be >=14.
- Try `npm cache clean --force` then `npm install`.
- Try deleting `node_modules/` and `package-lock.json`, then reinstalling dependencies.

### Notes disappeared!

- If you cleared your browser's local storage or site data, all notes are lost.
- Switching browsers/devices does not transfer notes.
- There is no sync or cloud storage by default.

### Theme toggle doesn’t work

- Make sure you are not using Privacy/Incognito mode with blocked localStorage features.

### Can I use my own tags?

- Yes! Enter comma-separated tags in the tags field. New tags are created automatically.

### How do I export or backup my notes?

- No built-in export yet. However, you can:
  - Open Developer Tools > Console.
  - Run:
    ```js
    JSON.parse(localStorage.getItem('notes_app_items_v1'))
    ```
  - Copy the output to a file.
  - To import, manually set in localStorage.

### Why do I see "Local · Private" in the header?

- This is to remind users that all notes and settings stay on your device and are never synced or sent to a server.

### Advanced tip – Reset or wipe all notes

- Use the "Clear all" button in the toolbar. There is no undo, so be careful.

---

## Further Resources

- [React documentation](https://reactjs.org/)
- [Troubleshooting guide for create-react-app](https://facebook.github.io/create-react-app/docs/troubleshooting)

---

## Support/Contributing

This app is designed for local-only, minimal note-taking. Feel free to contribute improvements or request features via your team’s standard workflow.

For style/theme customization, see CSS variables in `src/App.css`.

---

*Enjoy fast, focused, private note-taking with Notes Frontend!*

