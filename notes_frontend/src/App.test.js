import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Note Keeper header and form', () => {
  render(<App />);

  // App title
  expect(screen.getByText(/note keeper/i)).toBeInTheDocument();

  // Search input in header
  expect(screen.getByLabelText(/search notes/i)).toBeInTheDocument();

  // Form title and content fields
  expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/content/i)).toBeInTheDocument();

  // Save button
  expect(screen.getByRole('button', { name: /save note/i })).toBeInTheDocument();
});
