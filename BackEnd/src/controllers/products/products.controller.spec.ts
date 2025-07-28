import { ProductsController } from './products.controller';
import { ProductsService } from '../../services/products/products.service';
import { BasicResponse } from '../../types/common/BasicResponse';
import { createNewProductDTO } from '../../types/products';
import { expect, describe, it, jest } from '@jest/globals';
import { vProducts, vProductsAttributes } from 'src/models/vProducts';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;
  const response = { message: 'ok' } as BasicResponse;
  const user = { userId: 'test-user-id', userEmail: 'test@example.com' };

  beforeEach(() => {
    // Provide real or stubbed dependencies for ProductsService
    const mockProductsModel = {} as any;
    const mockAppLevelLogicAllModel = {} as any;
    const mockLogger = {
      log: jest.fn(),
      error: jest.fn(),
      warn: jest.fn(),
      info: jest.fn(),
    } as any;
    // Instantiate the real service with stubs
    service = new ProductsService(mockProductsModel, mockLogger);
    controller = new ProductsController(service);
  });

  it('should return all products', async () => {
    const result = [{} as vProducts];
    jest.spyOn(service, 'getAllProducts').mockResolvedValue(result);
    await expect(controller.getAllProducts()).resolves.toEqual(result);
  });

  it('should return all product names', async () => {
    const result = ['product1', 'product2'];
    jest.spyOn(service, 'getAllProductNames').mockResolvedValue(result);
    await expect(controller.getAllProductNames()).resolves.toEqual(result);
  });

  it('should return products by product', async () => {
    const result = [{} as vProducts];
    jest.spyOn(service, 'getProductsByProduct').mockResolvedValue(result);
    await expect(controller.getProductsByProduct({} as any)).resolves.toEqual(
      result,
    );
  });

  it('should return product by name', async () => {
    const result = {} as vProducts;
    jest.spyOn(service, 'getProductsByName').mockResolvedValue(result);
    await expect(controller.getProductsByName('product')).resolves.toEqual(
      result,
    );
  });

  it('should return all products client names', async () => {
    const result = [{} as vProducts];
    jest.spyOn(service, 'getAllProductsClientNames').mockResolvedValue(result);
    await expect(controller.getAllProductsClientNames()).resolves.toEqual(
      result,
    );
  });

  it('should create a product', async () => {
    jest.spyOn(service, 'createProduct').mockResolvedValue(response);
    await expect(
      controller.createProduct({} as createNewProductDTO, user),
    ).resolves.toEqual(response);
  });

  it('should create bulk products', async () => {
    jest.spyOn(service, 'createBulkProduct').mockResolvedValue(response);
    await expect(
      controller.createBulkProduct([{} as createNewProductDTO], user),
    ).resolves.toEqual(response);
  });

  it('should update a product', async () => {
    jest.spyOn(service, 'updateProduct').mockResolvedValue(response);
    await expect(
      controller.updateProduct(1, {} as vProductsAttributes, user),
    ).resolves.toEqual(response);
  });

  it('should deprecate a product', async () => {
    jest.spyOn(service, 'deprecateProduct').mockResolvedValue(response);
    await expect(
      controller.deprecateProduct(1, {} as vProductsAttributes, user),
    ).resolves.toEqual(response);
  });

  it('should bulk deprecate products', async () => {
    const response = { message: 'Successfully deprecated product1, product2.' };
    jest.spyOn(service, 'bulkDeprecateProducts').mockResolvedValue(response);
    await expect(
      controller.bulkDeprecateProducts([1, 2], user),
    ).resolves.toEqual(response);
  });
});
