import { render, screen } from '@testing-library/react';
import AlgoTrader from './AlgoTrader';

test('renders learn react link', () => {
  render(<AlgoTrader />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
