import { GoogleSheetFetcherService } from './googleSheetFetcher.service';
import { LoggerService } from '../logger/logger.service';
import { HttpException } from '@nestjs/common';
import getGoogleSheet from '../../helpers/GoogleServiceHelper';
import { expect, describe, it, jest } from '@jest/globals';

jest.mock('../../helpers/GoogleServiceHelper');

describe('GoogleSheetFetcherService', () => {
  let service: GoogleSheetFetcherService;
  let logger: LoggerService;

  beforeEach(() => {
    logger = { info: jest.fn(), error: jest.fn() } as any;
    service = new GoogleSheetFetcherService(logger);
  });

  it('should extract sheet id from url', () => {
    const url = 'https://docs.google.com/spreadsheets/d/abc1234567/edit#gid=0';
    expect(service['extractSheetId'](url)).toBe('abc1234567');
  });

  it('should throw if url is invalid', () => {
    expect(() => service['extractSheetId']('invalid-url')).toThrow(
      HttpException,
    );
  });

  it('should fetch products from Google Sheet', async () => {
    const mockedGetGoogleSheet = getGoogleSheet as jest.MockedFunction<
      typeof getGoogleSheet
    >;
    mockedGetGoogleSheet.mockResolvedValue([
      {
        _rawData: [
          'name',
          'sub',
          '',
          '',
          'section',
          'sub',
          '',
          '',
          'TRUE',
          'syn1,syn2',
        ],
      },
    ] as never);
    const result = await service.getGoogleSheetDataForProducts(
      'https://docs.google.com/spreadsheets/d/abc1234567/edit#gid=0',
    );
    expect(result[0].name).toBe('name');
    expect(result[0].synonyms).toEqual(['syn1', 'syn2']);
  });
});
