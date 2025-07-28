import { GoogleSheetFetcherController } from './googleSheetFetcher.controller';
import { GoogleSheetFetcherService } from '../../services/googleSheetFetcher/googleSheetFetcher.service';
import { LoggerService } from '../../services/logger/logger.service';
import { createNewProductDTO } from '../../types/products';

import { expect, describe, it, jest } from '@jest/globals';

describe('GoogleSheetFetcherController', () => {
  let controller: GoogleSheetFetcherController;
  let service: GoogleSheetFetcherService;
  let logger: LoggerService;

  beforeEach(() => {
    service = {
      getGoogleSheetDataForProducts: jest.fn(),
      getGoogleSheetDataForClientCatalog: jest.fn(),
      getGoogleSheetDataForAppLevelLogic: jest.fn(),
      getGoogleSheetDataForSearchTerms: jest.fn(),
      getGoogleSheetDataForRegistry: jest.fn(),
    } as any;
    logger = {
      info: jest.fn(),
      error: jest.fn(),
    } as any;
    controller = new GoogleSheetFetcherController(service, logger);
  });

  it('should fetch Google Sheet for products', async () => {
    const result = [{} as createNewProductDTO];
    jest
      .spyOn(service, 'getGoogleSheetDataForProducts')
      .mockResolvedValue(result);
    await expect(
      controller.fetchGoogleSheetForProducts('url'),
    ).resolves.toEqual(result);
  });

  it('should throw if service throws for products', async () => {
    jest
      .spyOn(service, 'getGoogleSheetDataForProducts')
      .mockRejectedValue(new Error('service error'));
    await expect(controller.fetchGoogleSheetForProducts('url')).rejects.toThrow(
      'service error',
    );
  });
});
