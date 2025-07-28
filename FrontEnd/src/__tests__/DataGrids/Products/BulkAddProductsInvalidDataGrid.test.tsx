import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import BulkAddProductInvalidDataGrid from 'components/Products/BulkAdd/BulkAddProductInvalidDataGrid';
import { mockStore } from 'testingUtils/mockStore';
import { mockPersonTypes } from 'testingUtils/MockData/mockPersonTypes';
import { mockProductTypes } from 'testingUtils/MockData/mockProductTypes';

// Create a new QueryClient instance
const queryClient = new QueryClient();

describe('BulkAddProductInvalidDataGrid', () => {
    it('renders the data grid with invalid rows', () => {
        render(
            <QueryClientProvider client={queryClient}>
                <Provider store={mockStore}>
                    <BulkAddProductInvalidDataGrid
                        personTypes={mockPersonTypes.map((pt) => ({
                            ...pt,
                            displayName: pt.displayName !== undefined ? pt.displayName : '',
                        }))}
                        products={mockProductTypes.map((pt) => ({
                            ...pt,
                            displayName: pt.displayName !== undefined ? pt.displayName : '',
                        }))}
                        productSections={[]}
                    />
                </Provider>
            </QueryClientProvider>
        );

        // Use getAllByText to handle multiple elements
        const invalidProducts = screen.getAllByText('InvalidProduct1');
        expect(invalidProducts.length).toBeGreaterThan(0); // Ensure at least one element is found
    });
});
