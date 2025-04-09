import {render, screen,  fireEvent} from '@testing-library/react';
import Counter from './Counter';

test('increments count when button is clicked', () => {
    render(<Counter/>);
    fireEvent.click(screen.getByText('Increment'));
    expect(screen.getByTestId('count').textContent).toBe('Counter: 1');
});