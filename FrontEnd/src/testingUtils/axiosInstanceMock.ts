export const mockGet = jest.fn();
export const mockPost = jest.fn();
export const mockPut = jest.fn();
export const mockDelete = jest.fn();

export const simulateMockGet = (data?: any) => mockGet.mockImplementation(() => Promise.resolve({ data }));
export const simulateMockPost = () => mockPost.mockImplementation(() => Promise.resolve({ status: 200, data: 'postData' }));
export const simulateMockPut = (data?: any) => mockPut.mockImplementation(() => Promise.resolve({ data: data || 'putData' }));
export const simulateMockDelete = (data?: any) => mockDelete.mockImplementation(() => Promise.resolve({ data: data || 'deleteData' }));

export const mockAcquireTokenSilent = (): Promise<{ idToken: string }> => Promise.resolve({ idToken: 'testIdToken' });
export const mockLoginPopup = jest.fn();
export const mockLoginRedirect = jest.fn();
export const mockLogoutRedirect = jest.fn();
export const mockHandleRedirectPromise = (): Promise<{}> => Promise.resolve({});
export const mockGetAllAccounts = jest.fn();
export const mockGetAccountByUsername = jest.fn();
export const mockGetActiveAccount = jest.fn();
export const mockSetActiveAccount = jest.fn();

export const mockInstance = {
    testName: 'internalInstance',
    acquireTokenSilent: mockAcquireTokenSilent,
    loginPopup: mockLoginPopup,
    loginRedirect: mockLoginRedirect,
    logoutRedirect: mockLogoutRedirect,
    handleRedirectPromise: mockHandleRedirectPromise,
    getAllAccounts: mockGetAllAccounts,
    getAccountByUsername: mockGetAccountByUsername,
    getActiveAccount: mockGetActiveAccount,
    setActiveAccount: mockSetActiveAccount,
};

jest.mock('helpers/msLogin', () => ({
    msalInstance: mockInstance,
}));

jest.mock('helpers/AxiosInstance', () => ({
    __esModule: true,
    default: { get: mockGet, post: mockPost, put: mockPut, delete: mockDelete },
}));
