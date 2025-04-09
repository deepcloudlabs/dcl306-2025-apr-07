import React from 'react';
import {render, screen} from '@testing-library/react';
import DelayedText from './delayed-text';

test('displays "Done!" after a delay', async () => {
    render(<DelayedText/>);

    // Initially shows "Loading..."
    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    // Wait for the "Done!" message to appear
    const doneText = await screen.findByText(/done/i);

    expect(doneText).toBeInTheDocument();
});
