export const mockAnalyticsPage = jest.fn();
export const mockAnalyticsIdentify = jest.fn();
export const mockAnalyticsTrack = jest.fn();
export const mockAnalyticsReset = jest.fn();

jest.mock('../helpers/analytics.ts', () => {
    const analytics = {
        page: mockAnalyticsPage,
        identify: mockAnalyticsIdentify,
        track: mockAnalyticsTrack,
        reset: mockAnalyticsReset,
    };
    return {
        __esModule: true,
        default: analytics,
    };
});
