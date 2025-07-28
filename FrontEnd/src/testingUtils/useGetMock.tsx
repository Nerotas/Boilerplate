export const mockGetData = jest.fn();
export const mockUseGet = jest.fn();

export const mockMutate = jest.fn();
export const mockUsePost = jest.fn();
export const mockUseMutationData = jest.fn();
export const mockAcquireTokenSilent = () => Promise.resolve({ idToken: 'testIdToken' });
export const mockLoginPopup = jest.fn();
export const mockLoginRedirect = jest.fn();
export const mockLogoutRedirect = jest.fn();
export const mockHandleRedirectPromise = () => Promise.resolve({});
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

interface UseGetOptions {
    isError: boolean;
    isFetched: boolean;
    isFetching: boolean;
    isLoading: boolean;
    refetch: typeof mockGetData;
    data: unknown;
}

type DataValuesDecider = (apiLabel: string) => unknown;

export const simulateDefaultUseGet = (dataValue: unknown, dataValuesDecider?: DataValuesDecider): void => {
    const sharedOptions: Omit<UseGetOptions, 'data'> = {
        isError: false,
        isFetched: true,
        isFetching: false,
        isLoading: false,
        refetch: mockGetData,
    };
    mockUseGet.mockImplementation(
        ({ apiLabel }: { apiLabel: string }): UseGetOptions => ({
            data: dataValuesDecider ? dataValuesDecider(apiLabel) : dataValue || {},
            ...sharedOptions,
        })
    );
};

interface UsePostOptions {
    data: unknown;
    isError: boolean;
    isFetched: boolean;
    isFetching: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    mutate: typeof mockMutate;
}

export const simulateDefaultUsePost = (dataValue: unknown): void => {
    mockUsePost.mockImplementation(
        (): UsePostOptions => ({
            data: dataValue || {},
            isError: false,
            isFetched: true,
            isFetching: false,
            isLoading: false,
            isSuccess: true,
            mutate: mockMutate,
        })
    );
};

jest.mock('hooks', () => ({
    useGet: mockUseGet,
    usePost: mockUsePost,
    useMutationData: mockUseMutationData,
}));
