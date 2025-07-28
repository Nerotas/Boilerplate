import { DisplayName } from 'models/common/DisplayName';

export class ProductsForTable {
    id: number = 1;
    name: string = '';
    defaultClientName: string = '';
    createdByEmail: string = '';
    createdOnUtc: string = '';
    deprecatedByEmail?: string;
    deprecatedOnUtc?: string;
    applicableProductSections?: string = '';
    applicableProductTypes?: string = '';
}
export class CreateProduct {
    name: string = '';
    defaultClientName: string = '';
    productSection?: ProductsAndSectionsForProducts = new ProductsAndSectionsForProducts();
    productTypes: DisplayName[] = [];
    personTypes: DisplayName[] = [];
    synonyms: string[] = [];
}
export class EditableProduct extends CreateProduct {
    id: number = 1;
}

export class ProductsAndSectionsForProducts {
    name: string = '';
    defaultClientName: string = '';
}

export class RawCSVProduct {
    name: string = '';
    defaultClientName: string = '';
    productSection: string = '';
    defaultProductSection: string = '';
    personTypes: string = '';
    productTypes: string = '';
    synonyms: string = '';
}

export class IndexCSVProduct {
    index: number = 0;
    values: RawCSVProduct = new RawCSVProduct();
}
