const apiBase =
  process.env.REACT_APP_API_BASE ||
  process.env.REACT_APP_BACKEND_URL ||
  '';

function buildUrl(path) {
  if (!apiBase) {
    throw new Error('Backend API base URL is not configured.');
  }
  const trimmedBase = apiBase.replace(/\/+$/, '');
  const trimmedPath = path.replace(/^\/+/, '');
  return `${trimmedBase}/${trimmedPath}`;
}

async function request(path, options = {}) {
  const url = buildUrl(path);
  const resp = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });

  const isJson = resp.headers.get('content-type')?.includes('application/json');
  const body = isJson ? await resp.json() : await resp.text();

  if (!resp.ok) {
    const message =
      (body && typeof body === 'object' && body.message) ||
      resp.statusText ||
      'Request failed';
    const error = new Error(message);
    error.status = resp.status;
    error.body = body;
    throw error;
  }

  return body;
}

/**
 * PUBLIC_INTERFACE
 * Fetch all notes from backend.
 */
export async function fetchNotes() {
  return request('/notes', { method: 'GET' });
}

/**
 * PUBLIC_INTERFACE
 * Create a new note on backend.
 */
export async function createNote(note) {
  return request('/notes', {
    method: 'POST',
    body: JSON.stringify(note),
  });
}

/**
 * PUBLIC_INTERFACE
 * Update an existing note.
 */
export async function updateNote(id, note) {
  return request(`/notes/${encodeURIComponent(id)}`, {
    method: 'PUT',
    body: JSON.stringify(note),
  });
}

/**
 * PUBLIC_INTERFACE
 * Delete a note by ID.
 */
export async function deleteNote(id) {
  return request(`/notes/${encodeURIComponent(id)}`, {
    method: 'DELETE',
  });
}
