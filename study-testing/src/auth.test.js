import React from 'react';
import {render, screen} from '@testing-library/react';
import Auth from './auth';

describe('Auth component', () => {
    test('renders welcome message when logged in', () => {
        render(<Auth isLoggedIn={true}/>);
        const welcomeMessage = screen.getByText(/welcome back/i);
        expect(welcomeMessage).toBeInTheDocument();
    });

    test('renders login button when not logged in', () => {
        render(<Auth isLoggedIn={false}/>);
        const loginButton = screen.getByRole('button', {name: /login/i});
        expect(loginButton).toBeInTheDocument();
    });
});
