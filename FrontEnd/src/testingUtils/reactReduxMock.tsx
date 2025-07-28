export const mockDispatch = jest.fn();
jest.mock('react-redux', () => {
    const originalReactRedux = jest.requireActual('react-redux');
    return {
        ...originalReactRedux,
        useDispatch: () => ({
            dispatch: mockDispatch,
        }),
    };
});
