import mockCustomTestComponent from './CustomTestComponent';

export const mockNavigate = jest.fn();
export const mockUseLocation = jest.fn();

interface SimulateDefaultUseLocationParams {
    pathname?: string;
    [key: string]: any;
}

export const simulateDefaultUseLocation = (location?: SimulateDefaultUseLocationParams): void => {
    mockUseLocation.mockImplementation(() => location || { location: { pathname: '/' } });
};
jest.mock('react-router-dom', () => {
    const lib = jest.requireActual('react-router-dom');
    const CustomComponent = mockCustomTestComponent;

    const NavLink = ({ children, ...props }: { children?: React.ReactNode; [key: string]: any }) => (
        <CustomComponent data-testid="mock-react-router-dom-NavLink" {...props}>
            {children}
        </CustomComponent>
    );

    const Navigate = ({ to }: { to: string }) => <div data-testid={`navigate-to-${to}`} />;

    return {
        ...lib,
        Navigate,
        NavLink,
        useNavigate: () => mockNavigate,
        useLocation: mockUseLocation,
    };
});

jest.mock('react-router', () => {
    const lib = jest.requireActual('react-router');

    return {
        ...lib,
        useNavigate: () => mockNavigate,
    };
});
