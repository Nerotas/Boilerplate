export const mockCookiesGet = jest.fn();
export const mockCookiesSet = jest.fn();
export const mockCookiesRemove = jest.fn();

jest.mock('js-cookie', () => {
    const Cookies = {
        __esModule: true,
        default: {
            get: mockCookiesGet,
            set: mockCookiesSet,
            remove: mockCookiesRemove,
        },
    };
    return {
        __esModule: true,
        default: Cookies,
    };
});
