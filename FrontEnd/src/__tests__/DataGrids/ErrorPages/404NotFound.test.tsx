import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import NotFound from 'components/404NotFound';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

describe('NotFound Component', () => {
    it('renders the NotFound component', () => {
        render(
            <BrowserRouter>
                <NotFound />
            </BrowserRouter>
        );

        expect(screen.getByTestId('404NotFound')).toBeInTheDocument();
        expect(screen.getByText('404')).toBeInTheDocument();
        expect(screen.getByText('Page not found')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /GO TO HOME/i })).toBeInTheDocument();
    });

    it('navigates to home when the button is clicked', () => {
        render(
            <BrowserRouter>
                <NotFound />
            </BrowserRouter>
        );

        fireEvent.click(screen.getByRole('button', { name: /GO TO HOME/i }));
        expect(mockNavigate).toHaveBeenCalledWith('/personTypes');
    });

    it('has correct styles applied', () => {
        render(
            <BrowserRouter>
                <NotFound />
            </BrowserRouter>
        );

        const container = screen.getByTestId('404NotFound');
        expect(container).toHaveStyle('background-color: #fff');
        expect(container).toHaveStyle('padding: 20px 10px 220px 30px');
        expect(container).toHaveStyle('margin: 51px 0 100px -30px');
        expect(container).toHaveStyle('height: 61vh');

        const heading = screen.getByText('404');
        expect(heading).toHaveStyle('top: 100px');
        expect(heading).toHaveStyle('text-align: center');
        expect(heading).toHaveStyle('font-size: 250px');
        expect(heading).toHaveStyle('font-family: proxima-nova');
        expect(heading).toHaveStyle('color: #1D1D1F');

        const paragraph = screen.getByText('Page not found');
        expect(paragraph).toHaveStyle('text-align: center');
        expect(paragraph).toHaveStyle('font-size: 65px');
        expect(paragraph).toHaveStyle('color: #1D1D1F');
    });

    it('button has correct styles applied', () => {
        render(
            <BrowserRouter>
                <NotFound />
            </BrowserRouter>
        );

        const button = screen.getByRole('button', { name: /GO TO HOME/i });
        expect(button).toHaveStyle('background-color: ButtonFace');
        expect(button).toHaveStyle('color: ButtonText');
        expect(button).toHaveStyle('padding: 6px 8px');
    });
});
