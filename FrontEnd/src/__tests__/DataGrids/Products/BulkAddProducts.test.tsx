/* eslint-disable prefer-promise-reject-errors */
import { cleanup, render, act, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

// General test suite mocks should be before tested file

import { simulateDefaultUseQueryClient } from 'testingUtils/reactQueryMock';
import { mockUseGet, simulateDefaultUseGet } from 'testingUtils/useGetMock';
import { mockStore } from 'testingUtils/mockStore';
import { mockProductTypes } from 'testingUtils/MockData/mockProductTypes';
import { mockRegistryNames } from 'testingUtils/MockData/mockRegistry';
import { mockAccountCodes } from 'testingUtils/MockData/mockAccountCodes';
import { mockPersonTypes } from 'testingUtils/MockData/mockPersonTypes';
import * as bulkAddProductsActions from 'redux-state/bulkAddProducts/actions';
import BulkAddProduct from 'containers/Products/BulkAdd';
import { mockProductSections } from 'testingUtils/MockData/mockProductSections';

describe('BulkAddProducts DataGrid', () => {
    let renderedContainer: HTMLElement;
    jest.spyOn(bulkAddProductsActions, 'addProduct').mockImplementation(jest.fn());

    beforeAll((done) => {
        done();
    });
    afterAll((done) => {
        done();
    });
    afterEach(cleanup);
    beforeEach(() => {
        (bulkAddProductsActions.addProduct as jest.Mock).mockImplementation(
            (payload: any) => (dispatch: (action: { type: string; payload: any }) => void) => {
                dispatch({
                    type: 'ADD_RECIPE',
                    payload,
                });
            }
        );

        simulateDefaultUseGet([], (apiLabel: string) => {
            switch (apiLabel) {
                case 'getAllPersonTypes':
                    return mockPersonTypes;
                case 'getRegistryNamesByProductType':
                    return mockRegistryNames;
                case 'getProductsSectionsNames':
                    return mockProductSections;
                case 'getAllProductTypes':
                    return mockProductTypes;
                default:
                    return [];
            }
        });
        simulateDefaultUseQueryClient();
        const { container } = render(
            <Provider store={mockStore}>
                <Router>
                    <BulkAddProduct />
                </Router>
            </Provider>
        );

        renderedContainer = container;
    });

    test('has correct title and page loads', async () => {
        await act(async () => {
            expect(renderedContainer.querySelector('title')?.textContent).toEqual('Erotas BOILERPLATE | Bulk Add Products');
            expect(screen.getByTestId('BulkAddProductGridUpperContainer')).toBeTruthy();
        });
    });

    test('Data and daproductrid loads', async () => {
        await act(async () => {
            const tableRendered = screen.getByTestId('BulkAddProduct-daproductrid');
            expect(tableRendered).toBeTruthy();
            //should get table info
            expect(mockUseGet).toHaveBeenNthCalledWith(1, { apiLabel: 'getProductsSectionsNames', url: '/productSections/names' });
            expect(mockUseGet).toHaveBeenNthCalledWith(2, { apiLabel: 'getAllProductTypes', url: '/productTypes/names' });
            expect(mockUseGet).toHaveBeenNthCalledWith(3, {
                apiLabel: 'getAllPersonTypes',
                url: '/persontypes/names',
            });
        });
    });

    test('Invalid table loads', async () => {
        await act(async () => {
            const tableRendered = screen.getByTestId('BulkInvalidAddProduct-daproductrid');
            expect(tableRendered).toBeTruthy();
        });
    });

    test('Headers and Toolbar Rendered', async () => {
        await act(async () => {
            //test table headers
            //default one hidden column
            const hiddenColumns = 0;
            const tableHeaders = screen.getAllByTestId('dataGridHeader');
            //both tables have same headers
            expect(tableHeaders.length).toBe(20 - hiddenColumns);
        });
    });
});
