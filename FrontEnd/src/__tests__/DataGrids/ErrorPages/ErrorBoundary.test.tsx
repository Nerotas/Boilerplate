import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import ErrorBoundaryPage from 'components/ErrorBoundaryPage';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

describe('ErrorBoundaryPage Component', () => {
    it('renders the ErrorBoundaryPage component', () => {
        render(
            <BrowserRouter>
                <ErrorBoundaryPage />
            </BrowserRouter>
        );

        expect(screen.getByTestId('ErrorBoundaryPage')).toBeInTheDocument();
        expect(screen.getByAltText('Erotas.test')).toBeInTheDocument();
        expect(screen.getByText('Oops!')).toBeInTheDocument();
        expect(screen.getByText('Sorry, something went wrong.')).toBeInTheDocument();
        expect(screen.getByText('This page is currently unavailable.')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Try again/i })).toBeInTheDocument();
    });

    it('navigates to home when the button is clicked', () => {
        render(
            <BrowserRouter>
                <ErrorBoundaryPage />
            </BrowserRouter>
        );

        fireEvent.click(screen.getByRole('button', { name: /Try again/i }));
        expect(mockNavigate).toHaveBeenCalledWith('/');
    });

    it('has correct styles applied', () => {
        render(
            <BrowserRouter>
                <ErrorBoundaryPage />
            </BrowserRouter>
        );

        const container = screen.getByTestId('ErrorBoundaryPage');
        expect(container).toHaveStyle('background-color: #ebf6f9');
        expect(container).toHaveStyle('padding: 60px');
        expect(container).toHaveStyle('display: flex');
        expect(container).toHaveStyle('flex-direction: column');
        expect(container).toHaveStyle('background-size: 800px');
        expect(container).toHaveStyle('background-repeat: no-repeat');
        expect(container).toHaveStyle('background-position-x: right');
        expect(container).toHaveStyle('background-position-y: bottom');

        const heading = screen.getByText('Oops!');
        expect(heading).toHaveStyle('font-size: 94px');
        expect(heading).toHaveStyle('font-weight: 700');

        const subheading = screen.getByText('Sorry, something went wrong.');
        expect(subheading).toHaveStyle('font-size: 26px');
        expect(subheading).toHaveStyle('font-weight: 700');

        const paragraph = screen.getByText('This page is currently unavailable.');
        expect(paragraph).toHaveStyle('font-size: 20px');
    });

    it('button has correct styles applied', () => {
        render(
            <BrowserRouter>
                <ErrorBoundaryPage />
            </BrowserRouter>
        );

        const button = screen.getByRole('button', { name: /Try again/i });
        expect(button).toHaveStyle('margin-top: 16px');
        expect(button).toHaveStyle('background-color: ButtonFace;');
        expect(button).toHaveStyle('color: ButtonText');
    });
});
