import store from '../store';
import { addProducts, addInvalidProducts, removeInvalidProduct, clearProducts, removeProduct } from '../bulkAddProducts/actions';

describe('Bulk Add Products Actions and Reducers', () => {
    beforeEach(() => (store.dispatch as any)(clearProducts()));

    const products = [
        {
            name: 'Product1',
            defaultClientName: 'Client1',
            tier: 1,
            productTypes: [],
            personTypes: [],
            synonyms: [],
            rolloutToAll: false,
            isActive: true,
        },
        {
            name: 'Product2',
            defaultClientName: 'Client2',
            tier: 1,
            productTypes: [],
            personTypes: [],
            synonyms: [],
            rolloutToAll: false,
            isActive: true,
        },
    ];

    const invalidRows = [
        {
            name: 'InvalidProduct1',
            defaultClientName: 'InvalidClient1',
            tier: 1,
            productTypes: [],
            personTypes: [],
            synonyms: [],
            rolloutToAll: false,
            isActive: true,
        },
        {
            name: 'InvalidProduct2',
            defaultClientName: 'InvalidClient2',
            tier: 1,
            productTypes: [],
            personTypes: [],
            synonyms: [],
            rolloutToAll: false,
            isActive: true,
        },
    ];

    it('should add products', () => {
        (store.dispatch as any as any)(addProducts(products));
        (store.dispatch as any as any)(removeProduct('Product1'));
        expect(store.getState().bulkAddProducts.rows).toEqual([
            {
                name: 'Product2',
                defaultClientName: 'Client2',
                tier: 1,
                productTypes: [],
                personTypes: [],
                synonyms: [],
                rolloutToAll: false,
                isActive: true,
            },
        ]);
    });

    it('should remove a product', () => {
        (store.dispatch as any as any)(addProducts(products));
        (store.dispatch as any as any)(removeProduct('Product1'));
        expect(store.getState().bulkAddProducts.rows).toEqual([
            {
                name: 'Product2',
                defaultClientName: 'Client2',
                tier: 1,
                productTypes: [],
                personTypes: [],
                synonyms: [],
                rolloutToAll: false,
                isActive: true,
            },
        ]);
    });

    test('Default state', async () => {
        expect(store.getState().bulkAddProducts).toEqual({
            rows: [],
            invalidRows: [],
            loading: false,
        });
    });

    test('Add Products', async () => {
        (store.dispatch as any)(addProducts(products));
        expect(store.getState().bulkAddProducts).toEqual({
            rows: [
                {
                    name: 'Product1',
                    defaultClientName: 'Client1',
                    tier: 1,
                    productTypes: [],
                    personTypes: [],
                    synonyms: [],
                    rolloutToAll: false,
                    isActive: true,
                },
                {
                    name: 'Product2',
                    defaultClientName: 'Client2',
                    tier: 1,
                    productTypes: [],
                    personTypes: [],
                    synonyms: [],
                    rolloutToAll: false,
                    isActive: true,
                },
            ],
            invalidRows: [],
            loading: false,
        });
    });

    test('Add Invalid Products', async () => {
        (store.dispatch as any)(addInvalidProducts(invalidRows));
        expect(store.getState().bulkAddProducts).toEqual({
            rows: [],
            invalidRows,
            loading: false,
        });
    });

    test('Remove Product', async () => {
        (store.dispatch as any)(addProducts(products));
        (store.dispatch as any)(removeProduct('Product1'));
        expect(store.getState().bulkAddProducts).toEqual({
            rows: [
                {
                    name: 'Product2',
                    defaultClientName: 'Client2',
                    tier: 1,
                    productTypes: [],
                    personTypes: [],
                    synonyms: [],
                    rolloutToAll: false,
                    isActive: true,
                },
            ],
            invalidRows: [],
            loading: false,
        });
    });

    test('Remove Invalid Product', async () => {
        (store.dispatch as any)(addInvalidProducts(invalidRows));
        (store.dispatch as any)(removeInvalidProduct('InvalidProduct1'));
        expect(store.getState().bulkAddProducts).toEqual({
            rows: [],
            invalidRows: [
                {
                    name: 'InvalidProduct2',
                    defaultClientName: 'InvalidClient2',
                    tier: 1,
                    productTypes: [],
                    personTypes: [],
                    synonyms: [],
                    rolloutToAll: false,
                    isActive: true,
                },
            ],
            loading: false,
        });
    });

    test('Add Products sorted', async () => {
        const createProductRows = [
            {
                name: 'Product1',
                defaultClientName: 'Client1',
                tier: 1,
                productTypes: [],
                personTypes: [],
                synonyms: [],
                rolloutToAll: false,
                isActive: true,
            },
            {
                name: 'Product2',
                defaultClientName: 'Client2',
                tier: 1,
                productTypes: [],
                personTypes: [],
                synonyms: [],
                rolloutToAll: false,
                isActive: true,
            },
        ];
        (store.dispatch as any as any)(addProducts(createProductRows));
        const receivedState = store.getState().bulkAddProducts;
        const sortedRows = [...receivedState.rows].sort((a, b) => a.name.localeCompare(b.name));
        expect({
            ...receivedState,
            rows: sortedRows,
        }).toEqual({
            rows: [...createProductRows].sort((a, b) => a.name.localeCompare(b.name)),
            invalidRows: [],
            loading: false,
        });
    });
});
