import { ProductsService } from './products.service';
import { LoggerService } from '../logger/logger.service';
import { createNewProductDTO } from '../../types/products';
import { expect, describe, it, jest } from '@jest/globals';
import { vProducts, vProductsAttributes } from 'src/models/vProducts';
import { DisplayName } from 'src/types/common/DisplayName';

describe('ProductsService', () => {
  let service: ProductsService;
  let productsModel: any;
  let appLevelLogicAllModel: any;
  let logger: LoggerService;

  beforeEach(() => {
    productsModel = {
      findAll: jest.fn(),
      findOne: jest.fn(),
      sequelize: { query: jest.fn() },
    };
    appLevelLogicAllModel = {
      findAll: jest.fn(),
      sequelize: { query: jest.fn() },
    };
    logger = { info: jest.fn(), error: jest.fn(), warn: jest.fn() } as any;
    service = new ProductsService(productsModel, logger);
  });

  it('should get all products', async () => {
    const result = [{} as vProducts];
    productsModel.findAll.mockResolvedValue(result);
    expect(await service.getAllProducts()).toBe(result);
  });

  it('should get all product names', async () => {
    const result = [{ name: 'product1' }, { name: 'product2' }];
    productsModel.findAll.mockResolvedValue(result);
    expect(await service.getAllProductNames()).toEqual([
      'product1',
      'product2',
    ]);
  });

  it('should get all products client names', async () => {
    const result = [{} as vProducts];
    productsModel.findAll.mockResolvedValue(result);
    expect(await service.getAllProductsClientNames()).toBe(result);
  });

  it('should get products by product', async () => {
    const result = [{} as vProducts];
    productsModel.findAll.mockResolvedValue(result);
    expect(
      await service.getProductsByProduct({ name: 'prod' } as DisplayName),
    ).toBe(result);
  });

  it('should get products by name', async () => {
    const result = {} as vProducts;
    productsModel.findOne.mockResolvedValue(result);
    expect(await service.getProductsByName('product')).toBe(result);
  });

  it('should deprecate product', async () => {
    appLevelLogicAllModel.findAll.mockResolvedValue([{ id: 1 }]);
    appLevelLogicAllModel.sequelize.query.mockResolvedValue(undefined);
    productsModel.sequelize.query.mockResolvedValue(undefined);
    const body = { name: 'product' } as vProductsAttributes;
    const userEmail = 'test@example.com';
    const result = await service.deprecateProduct(1, body, userEmail);
    expect(result).toEqual({ message: 'Successfully deprecated product.' });
  });

  it('should update product', async () => {
    productsModel.sequelize.query.mockResolvedValue('updated');
    const body = {
      name: 'product',
      defaultClientName: 'sub',
    } as unknown as vProductsAttributes;
    const userEmail = 'test@example.com';
    const result = await service.updateProduct(1, body, userEmail);
    expect(result).toBe('updated');
  });

  it('should create product', async () => {
    productsModel.sequelize.query.mockResolvedValue(undefined);
    const body = {
      name: 'product',
      defaultClientName: 'sub',
      objectivity: 'SUBJECTIVE',
      productSection: { name: 'section', defaultClientName: 'sub' },
      productTypes: [],
      personTypes: [],
      synonyms: [],
    } as createNewProductDTO;
    const userEmail = 'test@example.com';
    const result = await service.createProduct(body, userEmail);
    expect(result).toHaveProperty('message');
  });

  it('should create bulk product', async () => {
    productsModel.sequelize.query.mockResolvedValue(undefined);
    const body = [
      {
        name: 'product',
        defaultClientName: 'sub',

        objectivity: 'SUBJECTIVE',
        productSection: { name: 'section', defaultClientName: 'sub' },
        productTypes: [],
        personTypes: [],
        synonyms: [],
      },
    ] as createNewProductDTO[];
    const userEmail = 'test@example.com';
    const result = await service.createBulkProduct(body, userEmail);
    expect(result).toHaveProperty('message');
  });
});
