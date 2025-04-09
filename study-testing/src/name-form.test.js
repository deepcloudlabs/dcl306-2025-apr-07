import React from 'react';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NameForm from './name-form';

test('updates displayed name as user types', async () => {
    render(<NameForm/>);

    const input = screen.getByLabelText(/name input/i);
    const user = userEvent.setup();

    await user.type(input, 'Binnur Kurt');

    expect(screen.getByText(/your name is: binnur kurt/i)).toBeInTheDocument();
});
