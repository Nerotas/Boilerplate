import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';

jest.mock('wrappers/Sidebar', () => () => <div data-testid="sidebar" />);
jest.mock('wrappers/RoleProvider', () => ({ children }: any) => <div data-testid="role-provider">{children}</div>);
jest.mock('wrappers/MsalAuthenticationTemplateWrapper', () => ({ children }: any) => <div data-testid="msal-auth">{children}</div>);
jest.mock('wrappers/MSALDecider', () => ({ children }: any) => <div data-testid="msal-decider">{children}</div>);
jest.mock('components/VersionInfo/VersionInfo', () => () => <div data-testid="version-info" />);

describe('App', () => {
    it('renders the main layout and providers', () => {
        waitFor(() => render(<App />));
        waitFor(() => {
            expect(screen.getByTestId('sidebar')).toBeInTheDocument();
            expect(screen.getByTestId('role-provider')).toBeInTheDocument();
            expect(screen.getByTestId('msal-auth')).toBeInTheDocument();
            expect(screen.getByTestId('msal-decider')).toBeInTheDocument();
            expect(screen.getByTestId('version-info')).toBeInTheDocument();
        });
    });
});
