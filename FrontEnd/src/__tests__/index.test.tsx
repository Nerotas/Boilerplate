jest.mock('react-dom/client', () => {
    const actual = jest.requireActual('react-dom/client');
    return {
        ...actual,
        createRoot: jest.fn(() => ({
            render: jest.fn(),
        })),
    };
});

jest.mock('wrappers/GlobalSnackbarWrapper', () => () => <div data-testid="global-snackbar" />);
jest.mock('@tanstack/react-query-devtools', () => ({
    ReactQueryDevtools: () => <div data-testid="react-query-devtools" />,
}));

jest.mock('../AllRoutes/Routes', () => ({}));
jest.mock('../redux-state/store', () => ({}));

describe('index.tsx', () => {
    it('renders without crashing', () => {
        // This will import and run the index file, triggering createRoot().render()
        expect(() => {
            require('../index');
        }).not.toThrow();
    });
});
