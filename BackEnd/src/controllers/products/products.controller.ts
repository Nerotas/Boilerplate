import { ProductsService } from '../../services/products/products.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { AdminGuard } from '../../guards/roles.guard';
import { createNewProductDTO } from '../../types/products';
import { User } from '../../decorators/user.decorator';
import { UserDecorator } from '../../types/users';
import { BasicResponse } from '../../types/common/BasicResponse';
import { vProducts, vProductsAttributes } from 'src/models/vProducts';
import { DisplayName } from 'src/types/common/DisplayName';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'Get vProducts formatted as a table.',
    isArray: true,
    type: vProducts,
  })
  async getAllProducts(): Promise<vProducts[]> {
    return this.productsService.getAllProducts();
  }

  @Get('names')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'Get vProducts formatted as a table.',
    isArray: true,
    type: vProducts,
  })
  async getAllProductNames(): Promise<string[]> {
    return this.productsService.getAllProductNames();
  }

  @Get('product')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'Get vProducts formatted as a table.',
    isArray: true,
    type: vProducts,
  })
  async getProductsByProduct(
    @Query() query: DisplayName,
  ): Promise<vProducts[]> {
    return this.productsService.getProductsByProduct(query);
  }

  @Get('product/:name')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: `Get single product by product's name.`,
    isArray: true,
    type: vProducts,
  })
  async getProductsByName(@Param('name') name: string): Promise<vProducts> {
    return this.productsService.getProductsByName(name);
  }

  @Get('clientNames')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'Get vProducts formatted as a table.',
    isArray: true,
    type: vProducts,
  })
  async getAllProductsClientNames(): Promise<vProducts[]> {
    return this.productsService.getAllProductsClientNames();
  }

  @Post()
  @HttpCode(200)
  @UseGuards(AdminGuard)
  @ApiResponse({
    status: 200,
    description: 'Create new product.',
    isArray: true,
    type: vProducts,
  })
  async createProduct(
    @Body() payload: createNewProductDTO,
    @User() user: UserDecorator,
  ): Promise<BasicResponse> {
    return this.productsService.createProduct(payload, user.userEmail);
  }

  @Post('bulkAdd')
  @HttpCode(200)
  @UseGuards(AdminGuard)
  @ApiResponse({
    status: 200,
    description: 'Create new product.',
    isArray: true,
    type: vProducts,
  })
  async createBulkProduct(
    @Body() payload: createNewProductDTO[],
    @User() user: UserDecorator,
  ): Promise<BasicResponse> {
    return this.productsService.createBulkProduct(payload, user.userEmail);
  }

  @Put(':id')
  @HttpCode(200)
  @UseGuards(AdminGuard)
  @ApiResponse({
    status: 200,
    description: 'Edit existing product.',
    isArray: true,
    type: vProducts,
  })
  async updateProduct(
    @Param('id') id: number,
    @Body() payload: vProductsAttributes,
    @User() user: UserDecorator,
  ): Promise<any> {
    return this.productsService.updateProduct(id, payload, user.userEmail);
  }

  @Delete(':id')
  @HttpCode(200)
  @UseGuards(AdminGuard)
  @ApiResponse({
    status: 200,
    description: 'Edit existing product.',
    isArray: true,
    type: vProducts,
  })
  async deprecateProduct(
    @Param('id') id: number,
    @Body() payload: vProductsAttributes,
    @User() user: UserDecorator,
  ): Promise<any> {
    return this.productsService.deprecateProduct(id, payload, user.userEmail);
  }

  @Post('bulkDelete')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'Bulk Disable Products.',
  })
  async bulkDeprecateProducts(
    @Body() payload: number[],
    @User() user: UserDecorator,
  ): Promise<BasicResponse> {
    return this.productsService.bulkDeprecateProducts(payload, user.userEmail);
  }
}
