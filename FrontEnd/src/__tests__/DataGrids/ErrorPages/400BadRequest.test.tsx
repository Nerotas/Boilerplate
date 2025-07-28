import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import BadRequest from 'components/400BadRequest';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

describe('BadRequest Component', () => {
    it('renders the BadRequest component', () => {
        render(
            <BrowserRouter>
                <BadRequest />
            </BrowserRouter>
        );

        expect(screen.getByTestId('400BadRequest')).toBeInTheDocument();
        expect(screen.getByText('400')).toBeInTheDocument();
        expect(screen.getByText('Bad Request')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /GO TO HOME/i })).toBeInTheDocument();
    });

    it('navigates to home when the button is clicked', () => {
        render(
            <BrowserRouter>
                <BadRequest />
            </BrowserRouter>
        );

        fireEvent.click(screen.getByRole('button', { name: /GO TO HOME/i }));
        expect(mockNavigate).toHaveBeenCalledWith('/');
    });
});
