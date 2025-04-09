import {render, screen} from '@testing-library/react';
import Greeting from "./Greeting";

test('renders Greeting', () => {
    render(<Greeting fullname={"Jack Shephard"} />);
    const h1 = screen.getByText(/Hello/i);
    expect(h1).toBeInTheDocument();
});
