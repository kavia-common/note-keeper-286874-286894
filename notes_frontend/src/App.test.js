import { render, screen } from '@testing-library/react';
import App from './App';

test('renders NoteKeeper title', () => {
  render(<App />);
  const titleElement = screen.getByText(/NoteKeeper/i);
  expect(titleElement).toBeInTheDocument();
});
