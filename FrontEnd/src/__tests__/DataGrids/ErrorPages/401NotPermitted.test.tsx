import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import NotPermitted from 'components/401NoPermission';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

describe('NotPermitted Component', () => {
    it('renders the NotPermitted component', () => {
        render(
            <BrowserRouter>
                <NotPermitted />
            </BrowserRouter>
        );

        expect(screen.getByTestId('401NoPermission')).toBeInTheDocument();
        expect(screen.getByText('401')).toBeInTheDocument();
        expect(screen.getByText('Not Permitted')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /GO TO HOME/i })).toBeInTheDocument();
    });

    it('navigates to home when the button is clicked', () => {
        render(
            <BrowserRouter>
                <NotPermitted />
            </BrowserRouter>
        );

        fireEvent.click(screen.getByRole('button', { name: /GO TO HOME/i }));
        expect(mockNavigate).toHaveBeenCalledWith('/personTypes');
    });
});
