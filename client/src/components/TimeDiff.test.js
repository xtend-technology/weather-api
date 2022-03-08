import { render, screen } from '@testing-library/react';
import TimeDiff from './TimeDiff';


test('renders hours ahead', () => {
  render(<TimeDiff />);
  const linkElement = screen.getByText(/hours ahead/i);
  expect(linkElement).toBeInTheDocument();
});