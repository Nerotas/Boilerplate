/* eslint-disable prefer-promise-reject-errors */
import { cleanup, fireEvent, render, screen, act, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';

// General test suite mocks should be before tested file
import { flushPromises } from '../testingUtils/commonTestingUtils';
import mockCustomTestComponent from '../testingUtils/CustomTestComponent';
import { mockStore, adminStore } from '../testingUtils/mockStore';
import '../testingUtils/muiMock';
import '../testingUtils/reactRouterDomMock';

import Sidebar from '../wrappers/Sidebar';
import ExternalNavButton from '../wrappers/Sidebar/ExternalNavButton';
import NavButton from '../wrappers/Sidebar/NavButton';
import { NavBarButtonStatus } from 'models/navigations/Sidebar';

jest.mock('../components/AuthorizationBar', () => {
    const CustomComponent = mockCustomTestComponent;
    return () => <CustomComponent data-testid="AuthorizationBar" />;
});

jest.mock('../components/AuthorizationBar/SignOutBar', () => {
    const CustomComponent = mockCustomTestComponent;
    return () => <CustomComponent data-testid="SignOutBar" />;
});

describe('Sidebar', () => {
    let renderedContainer: HTMLElement;
    beforeAll((done) => {
        done();
    });
    afterAll((done) => {
        done();
    });
    afterEach(cleanup);

    it('has rendered Navbar', async () => {
        (render as any)(
            <Provider store={mockStore}>
                <Sidebar defaultOpen={true} />
            </Provider>
        );
        expect(screen.getByTestId('Navbar')).toBeTruthy();
    }, 1000);
    it('has rendered Drawer', async () => {
        const { container }: { container: HTMLElement } = (render as any)(
            <Provider store={mockStore}>
                <Sidebar defaultOpen={true} />
            </Provider>
        );
        renderedContainer = container;
        const drawerComponent = screen.getByTestId('mock-mui-drawer');
        expect(drawerComponent).toBeTruthy();
        expect(drawerComponent.getAttribute('classes')).toEqual(
            '{"paper":{"marginTop":"40px","height":"95vh","boxSizing":"border-box","width":"280px"}}'
        );
        expect(drawerComponent.getAttribute('data-style')).toEqual(
            '{"width":220,"marginTop":"200px","flexShrink":0,"whiteSpace":"nowrap","boxSizing":"border-box","overflowX":"hidden","& .MuiDrawer-paper":{"width":220,"overflowX":"hidden"},"boxShadow":"0px 2px 4px 0px #00000026"}'
        );
        expect(drawerComponent.getAttribute('variant')).toEqual('permanent');
    }, 1000);
    it('has rendered User List', async () => {
        const { container }: { container: HTMLElement } = (render as any)(
            <Provider store={mockStore}>
                <Sidebar defaultOpen={true} />
            </Provider>
        );
        renderedContainer = container;
        const listComponent = screen.getByTestId('mock-mui-list');
        expect(listComponent).toBeTruthy();
        expect(listComponent.childElementCount).toEqual(30);
    }, 1000);
    it('has rendered Admin List', async () => {
        const { container }: { container: HTMLElement } = (render as any)(
            <Provider store={adminStore}>
                <Sidebar defaultOpen={true} />
            </Provider>
        );
        renderedContainer = container;
        const listComponent = screen.getByTestId('mock-mui-list');
        expect(listComponent).toBeTruthy();
        expect(listComponent.childElementCount).toEqual(35);
    }, 1000);
    it('has rendered DrawerHeader', async () => {
        const { container }: { container: HTMLElement } = (render as any)(
            <Provider store={mockStore}>
                <Sidebar defaultOpen={true} />
            </Provider>
        );
        renderedContainer = container;
        const listComponent = screen.getByTestId('mock-mui-list');
        const drawerHeaderComponent = listComponent.children[0];
        expect(drawerHeaderComponent).toBeTruthy();
        fireEvent.click(drawerHeaderComponent.children[0]);
        await flushPromises();
        expect(() => screen.getByTestId('mock-mui-drawer')).toThrow();
    }, 1000);

    it('has rendered main component', async () => {
        const { container }: { container: HTMLElement } = (render as any)(
            <Provider store={mockStore}>
                <Sidebar defaultOpen={true} />
            </Provider>
        );
        renderedContainer = container;
        const boxComponent = screen.getAllByTestId('mock-mui-box');
        expect(boxComponent[boxComponent.length - 1].getAttribute('component')).toEqual('main');
    }, 1000);
});

// Mock icon component
const MockIcon = () => <svg data-testid="mock-icon" />;

describe('ExternalNavButton', () => {
    const baseProps = {
        handleListItemClick: jest.fn(),
        index: 0,
        open: true,
        selectedIndex: 0,
        item: {
            label: 'External Link',
            redirectTo: '/external',
            icon: MockIcon,
            status: NavBarButtonStatus.CLICKABLE,
            newTab: true,
        },
    };

    it('renders label and icon when open', () => {
        render(<ExternalNavButton {...baseProps} />);
        waitFor(() => {
            expect(screen.getByText('External Link')).toBeInTheDocument();
            expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
        });
    });

    it('does not render label when closed', () => {
        render(<ExternalNavButton {...baseProps} open={false} />);
        waitFor(() => {
            expect(screen.queryByText('External Link')).toBeNull();
            expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
        });
    });

    it('calls handleListItemClick on click', () => {
        render(<ExternalNavButton {...baseProps} />);
        fireEvent.click(screen.getByTestId('navbar-item'));
        expect(baseProps.handleListItemClick).toHaveBeenCalled();
    });

    it('renders nothing if status is INVISIBLE', () => {
        render(<ExternalNavButton {...baseProps} item={{ ...baseProps.item, status: NavBarButtonStatus.INVISIBLE }} />);
        expect(screen.queryByTestId('navbar-item')).toBeNull();
    });

    it('is disabled if status is GREYED', () => {
        render(<ExternalNavButton {...baseProps} item={{ ...baseProps.item, status: NavBarButtonStatus.GREYED }} />);
        waitFor(() => {
            expect(screen.getByTestId('navbar-item')).toBeDisabled();
        });
    });
});

describe('NavButton', () => {
    const baseProps = {
        handleListItemClick: jest.fn(),
        index: 0,
        open: true,
        selectedIndex: 0,
        item: {
            label: 'Nav Link',
            redirectTo: '/nav',
            icon: MockIcon,
            status: NavBarButtonStatus.CLICKABLE,
        },
    };

    it('renders label and icon when open', () => {
        render(<NavButton {...baseProps} />);
        waitFor(() => {
            expect(screen.getByTestId('navbar-item')).toBeInTheDocument();
            expect(screen.getByTestId('navbar-item').getAttribute('to')).toEqual('/nav');
            expect(screen.getByTestId('navbar-item').getAttribute('data-cy')).toEqual('nav-link');
            expect(screen.getByText('Nav Link')).toBeInTheDocument();
            expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
        });
    });

    it('does not render label when closed', () => {
        render(<NavButton {...baseProps} open={false} />);
        waitFor(() => {
            expect(screen.queryByText('Nav Link')).toBeNull();
            expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
        });
    });

    it('calls handleListItemClick on click', () => {
        render(<NavButton {...baseProps} />);
        fireEvent.click(screen.getByTestId('navbar-item'));
        expect(baseProps.handleListItemClick).toHaveBeenCalled();
    });

    it('renders nothing if status is INVISIBLE', () => {
        render(<NavButton {...baseProps} item={{ ...baseProps.item, status: NavBarButtonStatus.INVISIBLE }} />);
        expect(screen.queryByTestId('navbar-item')).toBeNull();
    });

    it('is disabled if status is GREYED', () => {
        render(<NavButton {...baseProps} item={{ ...baseProps.item, status: NavBarButtonStatus.GREYED }} />);
        waitFor(() => {
            expect(screen.getByTestId('navbar-item')).toBeDisabled();
        });
    });
});
