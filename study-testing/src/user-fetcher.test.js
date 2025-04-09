import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import UserProfile from './user-fetcher.js';

global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({ name: 'Alice' }),
    })
);

afterEach(() => {
    fetch.mockClear();
});

test('displays user data after fetch', async () => {
    render(<UserProfile />);

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

    await waitFor(() => expect(screen.getByText(/User: Alice/i)).toBeInTheDocument());

    expect(fetch).toHaveBeenCalledWith('/api/user');
});
