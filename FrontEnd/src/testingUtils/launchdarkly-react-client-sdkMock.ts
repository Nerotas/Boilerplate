export const mockLDIdentify = jest.fn();

const mockAllFlags = jest.fn();
const mockUseFlags = jest.fn();

export const simulateUseFlags = (flags?: Record<string, boolean>) =>
    mockUseFlags.mockReturnValue(flags || { forceGalleryViewTempCatalog20230502: false });

export const simulateDefaultLDIdentify = () => mockLDIdentify.mockImplementation(() => Promise.resolve());

jest.mock('launchdarkly-react-client-sdk', () => {
    const originalLib = jest.requireActual('launchdarkly-react-client-sdk');

    const useLDClient = () => ({
        identify: mockLDIdentify,
        allFlags: mockAllFlags.mockReturnValue({ isAnalytics21EnabledPermAnalytics2120230428: true }),
    });

    const lib = {
        ...originalLib,
        useFlags: mockUseFlags,
        useLDClient,
    };

    return lib;
});
