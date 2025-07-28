import { IndexCSVProduct, CreateProduct, ProductsAndSectionsForProducts } from 'models/Products/Products';
import { DisplayName } from 'models/common/DisplayName';

// Converts comma-separated string to DisplayName[]
const parseDisplayNames = (input: string): DisplayName[] =>
    input
        ? input
              .split(',')
              .map((s) => ({ name: s.trim(), displayName: s.trim() }))
              .filter((d) => d.displayName)
        : [];

// Converts comma-separated string to string[]
const parseStringArray = (input: string): string[] =>
    input
        ? input
              .split(',')
              .map((s) => s.trim())
              .filter(Boolean)
        : [];

export function convertIndexCSVProductsToCreateProducts(indexedProducts: IndexCSVProduct[]): CreateProduct[] {
    return indexedProducts.map(({ values }: IndexCSVProduct) => {
        const product = new CreateProduct();
        product.name = values.name;
        product.defaultClientName = values.defaultClientName;
        product.productSection = new ProductsAndSectionsForProducts();
        product.productSection.name = values.productSection;
        product.productSection.defaultClientName = values.defaultProductSection;
        product.productTypes = parseDisplayNames(values.productTypes);
        product.personTypes = parseDisplayNames(values.personTypes);
        product.synonyms = parseStringArray(values.synonyms);
        return product;
    });
}
