import {
  Controller,
  Get,
  Query,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { GoogleSheetFetcherService } from '../../services/googleSheetFetcher/googleSheetFetcher.service';
import { LoggerService } from '../../services/logger/logger.service';
import { AdminGuard } from '../../guards/roles.guard';
import { createNewProductDTO } from '../../types/products';

@Controller('google-sheet')
@UseGuards(AdminGuard)
export class GoogleSheetFetcherController {
  private ns = '[GoogleSheetFetcherController]';
  constructor(
    private readonly googleSheetFetcherService: GoogleSheetFetcherService,
    private readonly logger: LoggerService,
  ) {}

  @Get('products')
  async fetchGoogleSheetForProducts(
    @Query('url') url: string,
  ): Promise<createNewProductDTO[]> {
    const fn = `${this.ns}[fetchGoogleSheetForProducts]:`;
    this.logger.info(`${fn} start`);
    if (!url) {
      throw new HttpException(
        `${fn} URL query parameter is required`,
        HttpStatus.BAD_REQUEST,
      );
    }
    try {
      const sheet =
        await this.googleSheetFetcherService.getGoogleSheetDataForProducts(url);
      return sheet;
    } catch (error) {
      this.logger.error(`${fn} error: ${error.message}`);
      throw error;
    }
  }
}
