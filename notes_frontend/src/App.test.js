import { render, screen } from '@testing-library/react';
import App from './App';

test('renders NoteKeeper title and title input field', () => {
  render(<App />);

  const titleElement = screen.getByText(/notekeeper/i);
  expect(titleElement).toBeInTheDocument();

  const titleInput = screen.getByLabelText(/title/i);
  expect(titleInput).toBeInTheDocument();
});
