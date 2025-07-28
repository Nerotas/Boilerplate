/* eslint-disable prefer-promise-reject-errors */
import { cleanup, render, act, screen, fireEvent, waitFor, getByTestId } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

// General test suite mocks should be before tested file
import { flushPromises } from '../../../testingUtils/commonTestingUtils';
import '../../../testingUtils/reactHelmetAsyncMock';
import { simulateDefaultUseQueryClient } from 'testingUtils/reactQueryMock';
import { simulateDefaultUseGet } from '../../../testingUtils/useGetMock';
import { mockDelete } from '../../../testingUtils/axiosInstanceMock';
import { mockProducts } from 'testingUtils/MockData/mockProducts';
import { adminStore, mockStore } from '../../../testingUtils/mockStore';
import ProductsAdmin from '../../../containers/Products';
import axiosMSALInstance from 'helpers/AxiosInstance';
import { DeactivateProductModal } from 'components/Products/FormComponents';

describe('Delete Modal for Admin', () => {
    let renderedContainer: HTMLElement;
    beforeAll((done) => {
        done();
    });
    afterAll((done) => {
        done();
    });
    afterEach(cleanup);
    beforeEach(() => {
        simulateDefaultUseGet([], (apiLabel: any) => {
            switch (apiLabel) {
                case 'getAllProducts':
                    return mockProducts;
                default:
                    return mockProducts;
            }
        });
        simulateDefaultUseQueryClient();
        const { container } = render(
            <Provider store={adminStore}>
                <Router>
                    <ProductsAdmin />
                </Router>
            </Provider>
        );

        renderedContainer = container;
    });

    test('Delete Product Modal Works admins', async () => {
        //modal opens
        const simulateMockDelete = jest.spyOn(axiosMSALInstance, 'delete');
        simulateMockDelete.mockReturnValue(Promise.resolve({ data: 'deleteData' }));
        fireEvent.click(screen.getByTestId('productsDeleteButton-21'));
        await flushPromises();
        expect(screen.getByTestId('DeleteProductModal')).toBeTruthy();
        expect(screen.getByTestId('DeleteProductSubmit')).toBeTruthy();
        fireEvent.click(screen.getByTestId('DeleteProductModalCancel'));
        await flushPromises();
        await waitFor(() => expect(() => getByTestId(renderedContainer, 'DeleteProductModal')).toThrow());
    });

    it('Delete Product Modal Submit', async () => {
        const simulateMockDelete = jest.spyOn(axiosMSALInstance, 'delete');
        simulateMockDelete.mockReturnValue(Promise.resolve({ data: 'deleteData' }));
        render(
            <Provider store={adminStore}>
                <DeactivateProductModal handleClose={() => jest.fn()} open={true} refreshTable={() => jest.fn()} row={mockProducts[0]} />
            </Provider>
        );

        await act(async () => {
            expect(screen.getByTestId('DeleteProductModal')).toBeTruthy();
            expect(screen.getByTestId('DeleteProductSubmit')).toBeTruthy();

            fireEvent.click(screen.getByTestId('DeleteProductSubmit'));
            await flushPromises();
            expect(mockDelete).nthCalledWith(1, '/products/21', {
                data: mockProducts[0],
            });
        });
    });
});

describe('Delete Modal for User', () => {
    let renderedContainer: HTMLElement;
    beforeAll((done) => {
        done();
    });
    afterAll((done) => {
        done();
    });
    afterEach(cleanup);
    beforeEach(() => {
        simulateDefaultUseGet([], (apiLabel: any) => {
            switch (apiLabel) {
                case 'getAllProducts':
                    return mockProducts;
                default:
                    return mockProducts;
            }
        });
        simulateDefaultUseQueryClient();
        const { container } = render(
            <Provider store={mockStore}>
                <Router>
                    <ProductsAdmin />
                </Router>
            </Provider>
        );

        renderedContainer = container;
    });

    //the following tests work on local but no in GH for some reason
    it('Delete Product Modal blocked', async () => {
        await act(async () => {
            //modal opens
            const simulateMockDelete = jest.spyOn(axiosMSALInstance, 'delete');
            simulateMockDelete.mockReturnValue(Promise.resolve({ data: 'deleteData' }));
            fireEvent.click(screen.getByTestId('productsDeleteButton-21'));
            await flushPromises();
            await waitFor(() => expect(() => getByTestId(renderedContainer, 'DeleteProductModal')).toThrow());
        });
    });

    it('Delete Product Modal Does NOT Submit normal user', async () => {
        const simulateMockDelete = jest.spyOn(axiosMSALInstance, 'delete');
        simulateMockDelete.mockReturnValue(Promise.resolve({ data: 'deleteData' }));
        render(
            <Provider store={mockStore}>
                <DeactivateProductModal handleClose={() => jest.fn()} open={true} refreshTable={() => jest.fn()} row={mockProducts[0]} />
            </Provider>
        );

        await act(async () => {
            expect(screen.getByTestId('DeleteProductModal')).toBeTruthy();
            expect(screen.getByTestId('DeleteProductSubmit')).toBeTruthy();

            fireEvent.click(screen.getByTestId('DeleteProductSubmit'));
            await flushPromises();
            expect(mockDelete).toHaveBeenCalledTimes(0);
        });
    });
});
