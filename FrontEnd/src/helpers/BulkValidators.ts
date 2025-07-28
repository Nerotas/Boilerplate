import { acceptExportNameExpression, acceptProductsExpression } from 'constants/Regex';
import { DisplayName } from 'models/common/DisplayName';
import { CreateProduct, ProductsAndSectionsForProducts } from 'models/Products/Products';
import * as Yup from 'yup';

export const bulkProductsValidation = (
    products: CreateProduct[],
    productSections: ProductsAndSectionsForProducts[],
    productTypes: DisplayName[],
    personTypes: DisplayName[]
) => {
    const validationSchema = Yup.object({
        name: Yup.string().max(255).matches(acceptProductsExpression, 'Invalid charaters'),
        defaultClientName: Yup.string().max(255).matches(acceptExportNameExpression, 'Invalid charaters'),
        productSection: Yup.object()
            .shape({ name: Yup.string(), defaultClientName: Yup.string() })
            .required()
            .test('is-valid-productSection', 'Invalid productSection', function (value) {
                return productSections.some((section) => section.name === value.name && section.defaultClientName === value.defaultClientName);
            }),
        productTypes: Yup.array()
            .of(
                Yup.object()
                    .shape({ name: Yup.string(), displayName: Yup.string() })
                    .test('is-valid-productType', 'Invalid productType', function (value) {
                        return productTypes.some((product) => product.displayName === value.displayName);
                    })
            )
            .required(),
        objectivity: Yup.string().oneOf(['SUBJECTIVE', 'OBJECTIVE'], 'Invalid objectivity'),
        synonyms: Yup.array().of(Yup.string()),
        personTypes: Yup.array()
            .of(
                Yup.object()
                    .shape({ name: Yup.string(), displayName: Yup.string() })
                    .test('is-valid-personType', 'Invalid personType', function (value) {
                        return personTypes.some((person) => person.displayName === value.displayName);
                    })
            )
            .required(),
    });

    const validRows: CreateProduct[] = [];
    const invalidRows: CreateProduct[] = [];

    products.forEach((row: CreateProduct) => {
        try {
            validationSchema.isValidSync(row);
            validRows.push(row);
        } catch (err: any) {
            invalidRows.push(row);
            const validationErrors = err.inner?.map((e: any) => e.message) || [err.message];
            console.error(`Validation errors: ${JSON.stringify(row.name)} - ${validationErrors.join(', ')}`);
        }
    });
    return { validRows, invalidRows };
};
