import 'testingUtils/axiosInstanceMock';
import { cleanup } from '@testing-library/react';
import { acceptProductsExpression, acceptProductPersonExpression, stringWithSpaces, acceptExportNameExpression, accountName } from 'constants/Regex';

interface defaultTestObj {
    name: string;
    chapter: number;
}

afterEach(cleanup);

describe('Regex constants', () => {
    it('acceptProductsExpression matches valid products', () => {
        expect(acceptProductsExpression.test('Product123')).toBe(true);
        expect(acceptProductsExpression.test('Product!')).toBe(false);
        expect(acceptProductsExpression.test('Product-Name_123')).toBe(true);
        expect(acceptProductsExpression.test('Product&Name')).toBe(true);
        expect(acceptProductsExpression.test('Product@Name')).toBe(false);
        expect(acceptProductsExpression.test('Product:Name')).toBe(true);
        expect(acceptProductsExpression.test('Product=Name')).toBe(true);
        expect(acceptProductsExpression.test('Product<Name>')).toBe(true);
        expect(acceptProductsExpression.test('Product/Name')).toBe(true);
        expect(acceptProductsExpression.test('Product.Name')).toBe(true);
        expect(acceptProductsExpression.test('Product+Name')).toBe(true);
        expect(acceptProductsExpression.test('Product(Name)')).toBe(true);
    });

    it('acceptProductPersonExpression matches only alphanumeric and underscores', () => {
        expect(acceptProductPersonExpression.test('Product1')).toBe(true);
        expect(acceptProductPersonExpression.test('Product_1')).toBe(true);
        expect(acceptProductPersonExpression.test('Product-1')).toBe(false);
        expect(acceptProductPersonExpression.test('Product Name')).toBe(false);
        expect(acceptProductPersonExpression.test('Product!')).toBe(false);
    });

    it('stringWithSpaces matches only letters and spaces', () => {
        expect(stringWithSpaces.test('Hello World')).toBe(true);
        expect(stringWithSpaces.test('HelloWorld')).toBe(true);
        expect(stringWithSpaces.test('Hello123')).toBe(false);
        expect(stringWithSpaces.test('Hello_World')).toBe(false);
        expect(stringWithSpaces.test('Hello-World')).toBe(false);
    });

    it('acceptExportNameExpression matches export names', () => {
        expect(acceptExportNameExpression.test('Export Name 123')).toBe(true);
        expect(acceptExportNameExpression.test('Export&Name')).toBe(true);
        expect(acceptExportNameExpression.test('Export@Name')).toBe(false);
        expect(acceptExportNameExpression.test('Export:Name')).toBe(true);
        expect(acceptExportNameExpression.test('Export=Name')).toBe(true);
        expect(acceptExportNameExpression.test('Export<Name>')).toBe(true);
        expect(acceptExportNameExpression.test('Export/Name')).toBe(true);
        expect(acceptExportNameExpression.test('Export.Name')).toBe(true);
        expect(acceptExportNameExpression.test('Export+Name')).toBe(true);
        expect(acceptExportNameExpression.test('Export(Name)')).toBe(true);
    });

    it('accountName matches only alphanumeric, spaces, and underscores', () => {
        expect(accountName.test('Account_1')).toBe(true);
        expect(accountName.test('Account 1')).toBe(true);
        expect(accountName.test('Account-1')).toBe(false);
        expect(accountName.test('Account!')).toBe(false);
        expect(accountName.test('Account&Name')).toBe(false);
    });
});
