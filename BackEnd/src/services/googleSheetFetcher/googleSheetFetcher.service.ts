import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { LoggerService } from '../logger/logger.service';
import { createNewProductDTO } from '../../types/products';
import { size } from 'lodash';

import { InjectModel } from '@nestjs/sequelize';
import getGoogleSheet from '../../helpers/GoogleServiceHelper';

@Injectable()
export class GoogleSheetFetcherService {
  private ns = '[GoogleSheetFetcherService]';
  constructor(private readonly logger: LoggerService) {}

  async getGoogleSheetDataForProducts(
    URL: string,
  ): Promise<createNewProductDTO[]> {
    const fn = `${this.ns}[getGoogleSheetDataForProducts]:`;
    this.logger.info(`${fn} start`);
    try {
      const sheetId = this.extractSheetId(URL);
      const rows: any = await getGoogleSheet(sheetId);

      const bulkProducts = rows.reduce((acc: createNewProductDTO[], row) => {
        //reach into private property to get raw data
        const newProduct: createNewProductDTO = {
          name: row._rawData[0],
          defaultClientName: row._rawData[1],
          objectivity:
            row._rawData[3] === ''
              ? 'SUBJECTIVE'
              : row._rawData[3].toUpperCase(),
          productSection: {
            name: row._rawData[4],
            defaultClientName: row._rawData[5],
          },
          productTypes:
            size(row._rawData[6]) > 0
              ? row._rawData[6].split(',').map((item: string) => ({
                  name: item,
                  displayName: item,
                }))
              : [],
          personTypes:
            size(row._rawData[7]) > 0
              ? row._rawData[7].split(',').map((item: string) => ({
                  name: item,
                  displayName: item,
                }))
              : [],
          //convert to boolean from Google sheet required string
          synonyms:
            size(row._rawData[9]) > 0
              ? row._rawData[9].split(',').map((item: string) => item)
              : [],
        };
        acc.push(newProduct);
        return acc;
      }, []);

      return bulkProducts;
    } catch (error) {
      if (error?.status) {
        throw error;
      }
      throw new HttpException(
        `${fn} error in service happened ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private extractSheetId(url: string): string {
    const regex = /\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/;
    const match = url.match(regex);
    if (!match || match.length < 2) {
      throw new HttpException(
        `${this.ns}[extractSheetId]: Invalid Google Sheet URL`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return match[1];
  }
}
