import { ProductsForTable } from 'models/Products/Products';

export const mockProducts: ProductsForTable[] = [
    {
        id: 21,
        name: 'Simple-Dress',
        defaultClientName: 'SimpleDress',
        createdByEmail: 'testuser@erotas.test',
        createdOnUtc: '2022-10-26T13:46:56.000Z',
        applicableProductTypes: 'dresses,tops',
        deprecatedByEmail: undefined,
        deprecatedOnUtc: undefined,
    },
    {
        id: 22,
        name: 'Complex-Dress',
        defaultClientName: 'Complexdress',
        applicableProductTypes: 'dresses',
        createdByEmail: 'testuser@erotas.test',
        createdOnUtc: '2022-10-26T13:46:56.000Z',
        deprecatedByEmail: undefined,
        deprecatedOnUtc: undefined,
    },
];
