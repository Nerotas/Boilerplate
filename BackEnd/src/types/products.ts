import { DisplayName } from './common/DisplayName';

export class CreateProductResponse {
  'LAST_INSERT_ID()': number;
  name: string = '';
  displayName: string = '';
  created_by: string = '';
}

export class createNewProductDTO {
  name: string = '';
  defaultClientName: string = '';
  objectivity?: string = 'SUBJECTIVE';
  productSection: ProductsAndSectionsForProducts =
    new ProductsAndSectionsForProducts();
  productTypes: DisplayName[] = [];
  personTypes: DisplayName[] = [];
  synonyms: string[] = [];
}

export class IdsAndName {
  name: string = '';
  id: string = '';
}

export class ProductsAndSectionsForProducts {
  name: string = '';
  defaultClientName: string = '';
}

export class ProductsfromGoogleSheet {
  productName: string = '';
  productSection: string = '';
  productType: string = '';
}
