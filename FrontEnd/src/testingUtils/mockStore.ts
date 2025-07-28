import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const initialState = {
    oauth: { roles: ['users'] },
    GlobalSnackbar: {
        open: false,
        message: '',
        severity: 'INFO',
        title: '',
    },
    recipeChecker: { rows: [] },
    bulkAddProducts: {
        rows: [],
        invalidRows: [
            {
                name: 'InvalidProduct1',
                defaultClientName: 'InvalidProduct1',
                objectivity: 'SUBJECTIVE',
                productSection: {
                    name: 'Activity',
                    defaultClientName: 'Activity',
                },
                productTypes: [
                    {
                        name: 'Dresses',
                        displayName: 'Dresses',
                    },
                ],
                personTypes: [
                    {
                        name: 'Women',
                        displayName: 'Women',
                    },
                ],
                synonyms: [],
            },
        ],
    },
    bulkAddClientCatalog: {
        rows: [
            {
                catalogId: '25',
                productName: 'productName',
                productSectionName: 'productSectionName',
                registryId: [50],
                externalProductName: 'ExtProduct1',
                externalProductSectionName: 'externalProductSectionName',
                externalProductSectionID: null,
            },
        ],
        invalidRows: [
            {
                catalogId: '5',
                productName: 'productName',
                productSectionName: 'productSectionName',
                registryId: [50],
                externalProductName: 'ExtProduct1',
                externalProductSectionName: 'externalProductSectionName',
                externalProductSectionID: null,
            },
        ],
    },
    bulkAddAppLogic: {
        rows: [
            {
                accountCode: 'terra',
                parsingMode: 'AND',
                removeBeforeAdd: true,
                personType: 'women',
                productType: 'dresses',
                productsToAdd: ['1/4-Back'],
                productsToCheck: ['1/4-Back'],
                productsToRemove: [],
            },
            {
                accountCode: 'terra',
                parsingMode: 'AND',
                removeBeforeAdd: true,
                personType: 'women',
                productType: 'dresses',
                productsToAdd: ['hello', ' world'],
                productsToCheck: ['products To Add'],
                productsToRemove: [],
            },
        ],
        invalidRows: [
            {
                accountCode: 'terra',
                parsingMode: 'AND',
                removeBeforeAdd: true,
                personType: 'women',
                productType: 'dresses',
                productsToAdd: ['1/4-Back'],
                productsToCheck: ['1/4-Back'],
                productsToRemove: [],
            },
            {
                accountCode: 'terra',
                parsingMode: 'AND',
                removeBeforeAdd: true,
                personType: 'women',
                productType: 'dresses',
                productsToAdd: ['hello', ' world'],
                productsToCheck: ['products To Add'],
                productsToRemove: [],
            },
        ],
    },
    navbarTitle: { title: 'Test' },
    bulkSearchTerms: {
        rows: ['test1', 'test2'],
        invalidRows: ['test3', 'test4'],
        clientId: '40',
    },
    bulkRegistry: {
        rows: [
            {
                productSectionName: 'Capacity',
                productName: '<1-Oz',
                productTypes: ['activewear_dresses'],
                personTypes: ['women'],
            },
        ],
        invalidRows: [
            {
                productSectionName: 'Capacity',
                productName: '<1-Oz',
                productTypes: ['activewear_dresses'],
                personTypes: ['women'],
            },
        ],
    },
};

const blankState = {
    oauth: { roles: [] },
    navbarTitle: { title: 'Test' },
};

const adminState = {
    oauth: { roles: ['admin'] },
    GlobalSnackbar: {
        open: false,
        message: '',
        severity: 'INFO',
        title: '',
    },
    recipeChecker: { rows: [] },
    bulkAddProducts: {
        rows: [],
        invalidRows: [
            {
                name: 'InvalidProduct1',
                defaultClientName: 'InvalidProduct1',
                tier: 1,
                objectivity: 'SUBJECTIVE',
                productSection: {
                    name: 'Activity',
                    defaultClientName: 'Activity',
                },
                productTypes: [
                    {
                        name: 'Dresses',
                        displayName: 'Dresses',
                    },
                ],
                personTypes: [
                    {
                        name: 'Women',
                        displayName: 'Women',
                    },
                ],
                synonyms: [],
            },
        ],
    },
    bulkAddClientCatalog: {
        rows: [
            {
                catalogId: '25',
                productName: 'productName',
                productSectionName: 'productSectionName',
                registryId: [50],
                externalProductName: 'ExtProduct1',
                externalProductSectionName: 'externalProductSectionName',
                externalProductSectionID: null,
            },
        ],
        invalidRows: [
            {
                catalogId: '5',
                productName: 'productName',
                productSectionName: 'productSectionName',
                registryId: [50],
                externalProductName: 'ExtProduct1',
                externalProductSectionName: 'externalProductSectionName',
                externalProductSectionID: null,
            },
        ],
    },
    bulkAddAppLogic: {
        rows: [
            {
                accountCode: 'terra',
                parsingMode: 'AND',
                removeBeforeAdd: true,
                personType: 'women',
                productType: 'dresses',
                productsToAdd: ['1/4-Back'],
                productsToCheck: ['1/4-Back'],
                productsToRemove: [],
            },
            {
                accountCode: 'terra',
                parsingMode: 'AND',
                removeBeforeAdd: true,
                personType: 'women',
                productType: 'dresses',
                productsToAdd: ['hello', ' world'],
                productsToCheck: ['products To Add'],
                productsToRemove: [],
            },
        ],
        invalidRows: [
            {
                accountCode: 'terra',
                parsingMode: 'AND',
                removeBeforeAdd: true,
                personType: 'women',
                productType: 'dresses',
                productsToAdd: ['1/4-Back'],
                productsToCheck: ['1/4-Back'],
                productsToRemove: [],
            },
            {
                accountCode: 'terra',
                parsingMode: 'AND',
                removeBeforeAdd: true,
                personType: 'women',
                productType: 'dresses',
                productsToAdd: ['hello', ' world'],
                productsToCheck: ['products To Add'],
                productsToRemove: [],
            },
        ],
    },
    bulkSearchTerms: {
        rows: ['test1', 'test2'],
        invalidRows: ['test3', 'test4'],
        clientId: '40',
    },
    navbarTitle: { title: 'Test' },
    bulkRegistry: {
        rows: [
            {
                productSectionName: 'Capacity',
                productName: '<1-Oz',
                productTypes: ['activewear_dresses'],
                personTypes: ['women'],
            },
        ],
        invalidRows: [
            {
                productSectionName: 'Capacity',
                productName: '<1-Oz',
                productTypes: ['activewear_dresses'],
                personTypes: ['women'],
            },
        ],
    },
};

const middlewares = [thunk];
const storeCreator = configureStore(middlewares);

export const mockStore = storeCreator(initialState);

export const blankStore = storeCreator(blankState);

export const adminStore = storeCreator(adminState);

interface CustomInitialState {
    [key: string]: any;
}

type Middleware = any; // You can replace 'any' with the actual middleware type if available

export const createMockStore = (customInitialState: CustomInitialState = {}, customMiddlewares: Middleware[] = [], isDiff?: boolean) => {
    if (isDiff) {
        const storeCreator = configureStore([...middlewares, ...customMiddlewares]);
        return storeCreator({ ...initialState, ...customInitialState });
    }

    const storeCreator = configureStore(customMiddlewares);
    return storeCreator(customInitialState);
};
