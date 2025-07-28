import { QueryClient } from 'react-query';

export const mockGetQueryData = jest.fn();
export const mockUseQueryClient = jest.fn();

const mockData = {
    data: {
        pagination: {
            total: 1,
        },
        products: [
            {
                productId: 'productId_1',
                productCount: 2,
                processedOn: '2022-09-11T21:00:00.000Z',
                description: 'product_description',
                images: ['img_src_1', 'img_src_2', 'img_src_3', 'img_src_4', 'img_src_5'],
                personType: 'product_personType',
                productType: 'product_productType',
                skuId: 'product_skuId',
                productSections: [
                    { category: 'Length', products: ['Mini'] },
                    { category: 'Style', products: ['Shirt', 'Tunic'] },
                ],
                title: 'product_title',
            },
        ],
    },
};

interface Pagination {
    total: number;
}

interface ProductSection {
    category: string;
    products: string[];
}

interface Product {
    productId: string;
    productCount: number;
    processedOn: string;
    description: string;
    images: string[];
    personType: string;
    productType: string;
    skuId: string;
    productSections: ProductSection[];
    title: string;
}

interface MockData {
    data: {
        pagination: Pagination;
        products: Product[];
    };
}

export const simulateDefaultUseQueryClient = (dataValue?: MockData['data']): QueryClient => {
    mockGetQueryData.mockImplementation(() => ({ data: dataValue || mockData.data }));
    mockUseQueryClient.mockImplementation(() => ({
        getQueryData: mockGetQueryData,
    }));
    return new QueryClient();
};

jest.mock('@tanstack/react-query', () => {
    const original = jest.requireActual('@tanstack/react-query');
    return {
        ...original,
        useQueryClient: mockUseQueryClient,
        QueryClientProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    };
});
