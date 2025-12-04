# Notes App User Guide

## Overview

The Notes app is a simple, modern React web application that lets you quickly capture and organize notes. You can create, view, edit, delete, pin, and search notes in a focused, responsive interface. All notes are stored in your browser’s localStorage, so no backend service is required. The user interface is styled with the “Ocean Professional” theme, using blue and amber accents, soft shadows, and rounded corners.

## System Requirements

To use the Notes app, you need:

- A modern web browser such as Chrome, Firefox, Edge, or Safari (latest versions recommended).
- JavaScript enabled in the browser.
- No backend or database is required. The app runs entirely in your browser and uses localStorage for persistence.

## Setup and Running the App

### Running in the Preview Environment

In the provided development environment, the Notes app is already configured as a React application:

- The app is served on port `3000`.
- The running container is `notes_frontend`.

To use the app:

1. Start or open the preview for the `notes_frontend` container.
2. In your browser, open the preview URL (typically `http://localhost:3000` or the given cloud preview URL).
3. If the app is already running, simply refresh the page to get the latest version.

You do **not** need to run `npm start` or other commands manually to use the app in this environment, unless you are developing locally outside the managed container.

### Optional Local Development (Outside the Managed Preview)

If you clone this project and run it locally yourself:

1. Navigate to the frontend folder:

   ```bash
   cd note-keeper-286874-286894/notes_frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm start
   ```

4. Open `http://localhost:3000` in your browser.

This is optional and only needed if you are working with the source code on your own machine.

### Environment Variables

The Notes app is designed to work fully without any environment variables. All note data is stored in localStorage by default, and no backend calls are required.

However, several environment variables are defined for potential future enhancements (such as syncing to a backend). All of these are **optional** for current functionality.

You can define them in a `.env` file at the root of `notes_frontend` (for example `.env.local` or `.env.development.local` when using Create React App), using the standard `REACT_APP_` naming convention:

- `REACT_APP_API_BASE` (optional)  
  Intended base URL for a future notes API; currently **not required** and not used for CRUD operations.

- `REACT_APP_BACKEND_URL` (optional)  
  Alternate environment variable for a backend base URL. The app exposes this as part of an internal `API_BASE` value but does not yet send requests to it.

- `REACT_APP_FRONTEND_URL` (optional)  
  Optional configuration for the public URL of the frontend; not required for local use.

- `REACT_APP_WS_URL` (optional)  
  Placeholder for a future WebSocket endpoint; not currently used.

- `REACT_APP_NODE_ENV` (optional)  
  Custom environment hint; React already has `NODE_ENV`, so this is informational only for now.

- `REACT_APP_NEXT_TELEMETRY_DISABLED` (optional)  
  Reserved for future integration scenarios; not used by this app today.

- `REACT_APP_ENABLE_SOURCE_MAPS` (optional)  
  Could be used to control source map generation; not currently wired.

- `REACT_APP_PORT` (optional)  
  Intended port hint for hosting; not required when running via Create React App’s defaults or the managed preview.

- `REACT_APP_TRUST_PROXY` (optional)  
  Reserved for backend-aware deployments; not currently used.

- `REACT_APP_LOG_LEVEL` (optional)  
  Placeholder for adjustable logging; not yet implemented.

- `REACT_APP_HEALTHCHECK_PATH` (optional)  
  Potential path for health checks in a more complex deployment; not used now.

- `REACT_APP_FEATURE_FLAGS` (optional)  
  Placeholder for toggling experimental features; not currently interpreted.

- `REACT_APP_EXPERIMENTS_ENABLED` (optional)  
  Boolean-style flag for experiments; no effect in the current build.

#### Important Notes

- None of these variables are required to create, view, edit, delete, pin, or search notes.
- If `REACT_APP_API_BASE` or `REACT_APP_BACKEND_URL` is set, the app will show a small footer hint stating that a backend base URL is connected, but the app still uses localStorage for actual note storage.
- If no backend-related variables are set, the footer reminds you that notes are stored locally and can be lost if browser data is cleared.

## Using the App

### Home Screen Layout

When you open the app, you see three main areas:

1. **Header**
   - App title: “Note Keeper”.
   - A small “LOCAL” badge indicating that notes are stored locally.
   - A short subtitle describing the purpose of the app.
   - A search field to filter notes.
   - A theme toggle button to switch between Day (light) and Night (dark) modes.

2. **Main Content Area**
   - **Left panel: Note form**  
     Used to create a new note or edit an existing one. It includes:
     - Title field.
     - Content field.
     - Status messaging (e.g., “Editing existing note” when editing).
     - “Clear” / “Cancel edit” and “Save note” / “Save changes” buttons.
   - **Right panel: Notes list**  
     Shows your saved notes in a responsive grid. Notes can be pinned, edited, or deleted from here.

3. **Footer**
   - A short message indicating where notes are stored:
     - Either “Notes are stored locally in your browser. Clearing browser data will remove them.”
     - Or, if a backend URL is configured, a hint that a backend base URL is connected (though not yet used).

### Creating a Note

1. Go to the **Create a note** form in the left panel.
2. Enter a **Title** (optional) in the “Title” field, for example:  
   “Project ideas”, “Shopping list”, or “Meeting recap”.
3. Enter **Content** in the “Content” text area, such as bullet points, tasks, or thoughts.
4. You can leave either the title or content empty, but not both:
   - If you click **Save note** or **Save changes** with both fields empty, you will see an error:  
     “Please add a title or some content before saving.”
5. Click **Save note**.
6. The note will appear in the notes list on the right, and the form fields will reset.

Behind the scenes, the app:

- Creates a new note object with an ID, timestamps, and a `pinned: false` flag.
- Saves the updated notes array to `window.localStorage` using a stable storage key.
- Shows your new note at the top of the list, sorted by most recently created/updated.

### Viewing Notes

1. All notes are displayed in the **Your notes** panel on the right.
2. Each note card shows:
   - The note title or “Untitled note” if no title was provided.
   - A preview of the content (with a subtle fade at the bottom if it’s long).
   - Created timestamp (e.g., “Created Jan 05, 10:42”).
   - Updated timestamp if the note has been modified after creation.
3. Cards are arranged in a responsive grid:
   - On larger screens, multiple columns are shown.
   - On smaller screens, the layout adjusts to one or two columns.

### Editing a Note

1. In the notes list, find the note you want to modify.
2. Click the **Edit** button (pencil icon) on that note’s card.
3. The left-side form switches to **Edit note** mode:
   - The fields are pre-filled with the note’s existing title and content.
   - A status pill appears stating “Editing existing note”.
   - The primary button text changes to **Save changes**.
   - The secondary button text changes to **Cancel edit**.
4. Update the title and/or content as desired.
5. Click **Save changes**:
   - The note’s `updatedAt` timestamp is refreshed.
   - Changes are applied and stored in localStorage.
6. To stop editing without saving:
   - Click **Cancel edit**. The form clears and returns to create mode.

### Deleting a Note

1. In the notes list, locate the note you want to remove.
2. Click the **Delete** button (trash can icon) on the card.
3. The note is immediately removed from the list and from localStorage.

Because notes are local and there is no recycle bin, deletions are permanent:

- If you accidentally delete a note, there is no built-in undo.
- Consider editing notes or copying content elsewhere before deleting if you may need it later.

### Pinning a Note

Pinning allows you to keep important items at the top of the list.

1. On any note card, click the **Pin** button (thumbtack icon).
2. When a note is pinned:
   - The pin button shows an “active” style (highlighted).
   - A “Pinned” badge appears in the top-right corner of the note card.
3. Pinned notes are always grouped and displayed before unpinned notes.
4. Within each group (pinned and unpinned), notes are sorted by the most recently updated or created date.

To unpin a note:

1. Click the pin icon again.
2. The pin highlight and “Pinned” badge disappear.
3. The note returns to the normal unpinned sort order.

### Searching Notes

The search feature is available in the header.

1. Locate the **Search notes** input in the top-right of the header.
2. Type a word or phrase:
   - The list of notes automatically filters as you type.
   - Matching is case-insensitive and looks at both **title** and **content**.
3. While searching:
   - The notes count label may show something like “3 notes (filtered from 10)”.
   - Only notes whose title or content contains the search query are shown.

To clear the search:

1. Erase the query text from the search input, or
2. Use your browser’s built-in clear button (if available).

### Empty States

The app provides friendly empty-state messaging:

- If you have **no notes at all**:
  - The **Your notes** section shows:
    - “You have a blank canvas.”
    - A hint encouraging you to create your first note.

- If you **do have notes but none match your search**:
  - You see:
    - “No notes match your search.”
    - A hint suggesting that you adjust or clear your search terms.

These messages help you understand whether you need to add notes or adjust your search query.

### Persistence and LocalStorage

All notes are automatically saved in your browser’s `localStorage` under a dedicated key. This means:

- Notes persist across page refreshes and browser restarts on the same device and browser profile.
- If you open the app in a different browser or on a different device, your existing notes will **not** be there.
- If you clear your browser’s storage (cookies, site data, localStorage), your notes will be deleted.
- Using incognito/private browsing may cause notes to be cleared as soon as the private window is closed.

You do not need to manually save or export to keep notes locally; saving a note updates localStorage automatically.

## Theme and Accessibility

### Ocean Professional Theme

The app uses the “Ocean Professional” theme, with the following key colors:

- **Primary**: `#2563EB` (blue) – used for highlights and primary actions.
- **Secondary / Success**: `#F59E0B` (amber) – used for accents such as pin badges.
- **Error**: `#EF4444` – intended for error highlights and destructive actions.
- **Background**: `#f9fafb` – light background tone.
- **Surface**: `#ffffff` – card and form surfaces.
- **Text**: `#111827` – main text color in light mode.

In practice, the app layers these colors over a modern, gradient-backed layout with:

- Rounded corners on panels and buttons.
- Soft shadows for depth.
- Subtle animations on hover and focus.

### Light and Dark Mode

The app supports a Day (light) and Night (dark) theme:

- A toggle button in the header switches between **Day** and **Night**.
- The current mode is indicated by:
  - Icon: ☀️ for Day, 🌙 for Night.
  - Label: “Day” or “Night” inside the toggle pill.
- Under the hood, the app sets a `data-theme` attribute on the root HTML element:
  - `data-theme="light"` for the light palette.
  - `data-theme="dark"` for the dark palette.
- CSS variables change based on this attribute to adjust background, surface, border, and text colors.

### Accessibility Considerations

The app aims to be accessible and keyboard-friendly:

- Form inputs and search fields use visible focus outlines (`:focus-visible`) for keyboard navigation.
- The search input and action buttons include labels and ARIA attributes:
  - The search box has a hidden label “Search notes”.
  - Pin, edit, and delete icons have `aria-label` and tooltips (`title`).
  - The theme toggle uses `aria-label` describing the action (switch to light/dark).
- Empty states and status messages are written in plain, descriptive language.

General guidance:

- If you rely on keyboard navigation, use `Tab` and `Shift+Tab` to move through the header, form, and note cards.
- Screen readers should announce fields and buttons by their labels and ARIA attributes.

## Data and Privacy

Because the Notes app is local-first and has no configured backend by default:

- All note data is stored in your browser’s `localStorage`, under a dedicated key.
- Notes are **not** sent to any server or external service unless you integrate a backend yourself.
- Other users cannot see your notes unless they have access to your device and your browser profile.

Keep in mind:

- Clearing browser data (cookies, site data, localStorage) will delete your notes.
- Using incognito/private mode may cause your notes to disappear when you close the private session.
- The app does not provide encryption; if you store sensitive information, ensure your device and browser profile are secured.

## Troubleshooting

### “I don’t see my notes anymore”

Possible reasons and steps:

- **LocalStorage was cleared**  
  If you or your system cleared browsing data (cookies and site data), your notes were likely removed. Unfortunately, there is no built-in recovery.

- **Different browser or device**  
  Notes are stored per device and per browser. If you open the app in a different browser (e.g., Chrome vs. Firefox) or on another device, your existing notes will not be there.

- **Private/Incognito mode**  
  If you used the app in an incognito/private window, the notes may have been stored only for that session and are removed afterwards.

What you can do:

- Stick to using one browser profile for your notes.
- Avoid clearing site data if you want to keep notes.
- Consider copying important notes to a separate document or storage system.

### “The app doesn’t load”

If the app does not appear or shows a blank page:

1. **Refresh the preview**  
   Use your preview environment’s refresh feature or reload the page in your browser.

2. **Check the URL**  
   Ensure you are visiting the correct preview URL or `http://localhost:3000` if running locally.

3. **Browser support**  
   Make sure you are using a modern browser that supports ES6+ JavaScript and modern APIs.

4. **Local development only**  
   If running locally and the page fails:
   - Confirm that `npm install` completed without errors.
   - Ensure `npm start` is running in the terminal.

If it still fails, there may be a local configuration or network issue.

### “Styling looks off or broken”

If colors, spacing, or fonts look unexpectedly wrong:

1. **Hard refresh the page** to clear cached assets:
   - On Windows/Linux: `Ctrl + Shift + R`
   - On macOS: `Cmd + Shift + R`
2. **Disable aggressive browser extensions** that may inject CSS or modify pages.
3. **Try another browser** to see if the issue is specific to an extension or cache.

### “Search doesn’t find notes I expect”

If notes aren’t appearing in search results:

- Confirm that the search query wording actually appears in the note’s title or content.
- Remember that search:
  - Is case-insensitive.
  - Does not interpret special operators (no advanced syntax).
- Clear the search field entirely to see all notes again.
- If you recently deleted or edited notes, confirm that the note still exists and contains the expected text.

## FAQ

### Can I use the Notes app offline?

Yes. Once the app has loaded in your browser, you can continue to use it offline as long as:

- The app’s static files are still cached by your browser.
- You access it using the same URL and browser profile.

Notes are stored in localStorage, which does not require an internet connection.

### Can I sync notes across devices?

Not by default. The current version:

- Does **not** send notes to a cloud backend.
- Does **not** provide login, sync, or account features.

To sync notes across devices, a backend service and authentication system would be required, which is not part of this version.

### How do I export or import notes?

Export/import is **not built-in yet**.

Workarounds you can use today:

- **Copy and paste**  
  Open each note, copy its content, and paste it into another document (e.g., a text file, note app, or email).

- **Developer tools (advanced users)**  
  You can open your browser’s developer tools, inspect localStorage, and manually copy the stored JSON. This is recommended only if you are comfortable working with browser dev tools and JSON.

An explicit export/import feature is a potential future enhancement (see below).

### Are my notes encrypted?

No. Notes are stored as plain JSON in the browser’s localStorage:

- Anyone with access to your device and browser profile could theoretically read them.
- Use your operating system and browser security (passwords, OS accounts, disk encryption) to protect sensitive information.

### Does the app support attachments or images?

No. The current version only supports text-based notes (title and content). Attachments, images, and other rich content types are not supported yet.

## Future Enhancements (Not Yet Implemented)

The following ideas are **not** implemented in the current version but are potential future directions:

- **Backend Integration for Syncing**
  - Use `REACT_APP_API_BASE` or `REACT_APP_BACKEND_URL` to send note data to a backend service.
  - Enable syncing notes across devices and browsers.
  - Provide online backups and conflict resolution.

- **Authentication and Accounts**
  - Allow users to sign in, store notes per account, and access them from multiple devices.

- **Sharing and Collaboration**
  - Generate shareable links for individual notes.
  - Allow shared editing or read-only access.

- **Attachments and Rich Media**
  - Attach images, files, or links to notes.
  - Support basic formatting (bold, italics, lists).

- **Tags, Folders, and Organization**
  - Tag notes by topic.
  - Group notes into folders or projects.
  - Filter and search by tag.

- **Advanced Search and Filters**
  - Search by date ranges, pinned status, or tag.
  - Saved searches and smart views.

These features would require additional backend services or extended client logic and are currently only conceptual.

## Changelog

### Initial Release

- Core note features:
  - Create text-based notes.
  - View notes in a responsive grid.
  - Edit existing notes with automatic timestamp updates.
  - Delete notes.
  - Pin/unpin notes, with pinned notes displayed first.
- Search:
  - Filter notes by text in title and content.
- Persistence:
  - Automatic saving to browser localStorage using a dedicated storage key.
- UI and layout:
  - Ocean Professional theme with modern gradients, rounded corners, and subtle shadows.
  - Split layout with a note form on the left and a notes list on the right.
  - Light/dark (Day/Night) theme toggle in the header.
- Accessibility:
  - Focus states for interactive elements.
  - Semantic labels and ARIA attributes for header, search, and note actions.
- Environment:
  - Optional environment variable configuration for future backend integration, not required for core use.

This concludes the end-user guide for the Notes app. You can now confidently create, organize, and search your notes in a modern, focused interface.
