import React from 'react';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from './login-form';

test('calls onLogin with the entered email on form submit', async () => {
    const mockLogin = jest.fn();
    render(<LoginForm onLogin={mockLogin}/>);

    const user = userEvent.setup();
    const emailInput = screen.getByPlaceholderText(/email/i);
    const submitButton = screen.getByRole('button', {name: /login/i});

    await user.type(emailInput, 'binnur.kurt@deepcloudlabs.com');
    await user.click(submitButton);

    expect(mockLogin).toHaveBeenCalledTimes(1);
    expect(mockLogin).toHaveBeenCalledWith('binnur.kurt@deepcloudlabs.com');
});
