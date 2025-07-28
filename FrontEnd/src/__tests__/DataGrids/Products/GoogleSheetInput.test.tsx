import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import GoogleSheetInput from 'components/Products/BulkAdd/FormComponents/GoogleSheetProductsInput';
import axiosInstance from 'helpers/AxiosInstance';
import { mockStore } from 'testingUtils/mockStore';

// Mock axiosInstance
jest.mock('helpers/AxiosInstance', () => ({
    get: jest.fn(),
}));

// Create a new QueryClient instance
const queryClient = new QueryClient();

describe('GoogleSheetInput', () => {
    it('submits a valid URL and processes data', async () => {
        // Mock axiosInstance.get to return a resolved promise
        (axiosInstance.get as jest.Mock).mockResolvedValue({
            data: [
                { name: 'Product1', defaultClientName: 'Client1' },
                { name: 'InvalidProduct', defaultClientName: 'InvalidClient' },
            ],
        });

        render(
            <QueryClientProvider client={queryClient}>
                <Provider store={mockStore}>
                    <GoogleSheetInput personTypes={[]} products={[]} productSections={[]} />
                </Provider>
            </QueryClientProvider>
        );

        fireEvent.change(screen.getByLabelText('Google Sheet URL'), { target: { value: 'http://valid.url' } });
        fireEvent.click(screen.getByText('Submit'));

        await waitFor(() => {
            expect(axiosInstance.get).toHaveBeenCalledWith(expect.stringContaining('http://valid.url'));
        });
    });
});
