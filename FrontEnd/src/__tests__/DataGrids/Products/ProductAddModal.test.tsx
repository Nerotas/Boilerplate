/* eslint-disable prefer-promise-reject-errors */
import { cleanup, render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

// General test suite mocks should be before tested file
import { flushPromises } from 'testingUtils/commonTestingUtils';

import { simulateDefaultUseQueryClient } from 'testingUtils/reactQueryMock';
import { simulateDefaultUseGet } from 'testingUtils/useGetMock';
import { mockPost, simulateMockPost } from 'testingUtils/axiosInstanceMock';
import { mockProducts } from 'testingUtils/MockData/mockProducts';
import { mockStore } from 'testingUtils/mockStore';
import { AddProductModal } from 'components/Products/FormComponents';

//the following tests work on local but no in GH for some reason
describe('Products Add', () => {
    let renderedContainer;
    beforeAll((done) => {
        done();
    });
    afterAll((done) => {
        done();
    });
    afterEach(cleanup);
    beforeEach(() => {
        simulateDefaultUseGet([], (apiLabel: string) => {
            switch (apiLabel) {
                case 'getAllProducts':
                    return mockProducts;
                default:
                    return mockProducts;
            }
        });
        simulateMockPost();
        simulateDefaultUseQueryClient();
        const { container } = render(
            <Provider store={mockStore}>
                <Router>
                    <AddProductModal handleClose={() => {}} open={true} refreshTable={() => {}} />
                </Router>
            </Provider>
        );

        renderedContainer = container;
    });

    it('Add Product Modal', async () => {
        expect(screen.getByTestId('AddProductModal')).toBeTruthy();

        //form works
        const inputName = screen.getByTestId('addProductModalName') as HTMLInputElement;
        fireEvent.change(inputName, { target: { value: 'TestProduct' } });
        expect(inputName.value).toBe('TestProduct');

        const inputSubName = screen.getByTestId('addProductModalDefaultClientName') as HTMLInputElement;
        fireEvent.change(inputSubName, { target: { value: 'TestSubProduct' } });
        expect(inputSubName.value).toBe('TestSubProduct');

        //submit form works
        fireEvent.click(screen.getByTestId('SubmitAddProductModal'));
        await flushPromises();
        await flushPromises();
        expect(mockPost).nthCalledWith(1, '/products', {
            defaultClientName: 'TestSubProduct',
            rolloutToAll: false,
            personTypes: [],
            productTypes: [],
            synonyms: [],
            productSection: {
                defaultClientName: '',
                name: '',
            },
            tier: 1,
            name: 'TestProduct',
            objectivity: 'SUBJECTIVE',
        });
    }, 10000);
});
