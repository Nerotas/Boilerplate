/* eslint-disable prefer-promise-reject-errors */
import { cleanup, render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

// General test suite mocks should be before tested file
import '../testingUtils/reactHelmetAsyncMock';
import 'testingUtils/msalInstancesMocks';
import { mockStore } from '../testingUtils/mockStore';

import Login from '../containers/Login';
import AuthorizationBar from 'components/AuthorizationBar';
afterEach(cleanup);

test('has correct title and page loads', async () => {
    render(
        <Provider store={mockStore}>
            <Router>
                <Login />
            </Router>
        </Provider>
    );
    expect(screen.getByText('Erotas BOILERPLATE | Login')).toBeTruthy();
    expect(screen.getByTestId('loading')).toBeTruthy();
    //landingPageBottomText
}, 1000);

test('Login Button Renders', async () => {
    render(<AuthorizationBar />);
    const loginButton = screen.getByTestId('azure-login-button');
    expect(loginButton).toBeTruthy();
});

//todo figure out how to set state to get non loading screen
