import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { LoggerService } from '../logger/logger.service';
import { createNewProductDTO, IdsAndName } from '../../types/products';
import { BasicResponse } from '../../types/common/BasicResponse';
import { arrayToStringListHandlerNewLine } from '../../helpers/arrayToStringListHandler';
import { Op } from 'sequelize';
import { vProducts, vProductsAttributes } from 'src/models/vProducts';
import { DisplayName } from 'src/types/common/DisplayName';
const mockProducts: vProductsAttributes[] = [
  {
    id: 1,
    name: 'Product A',
    defaultClientName: 'Client A',
    applicableProductTypes: 'Type1,Type2',
    createdByEmail: '',
  },
  {
    id: 2,
    name: 'Product B',
    defaultClientName: 'Client B',
    applicableProductTypes: 'Type2,Type3',
    createdByEmail: '',
  },
  {
    id: 3,
    name: 'Product C',
    defaultClientName: 'Client C',
    applicableProductTypes: 'Type1,Type3',
    createdByEmail: '',
  },
];
@Injectable()
export class ProductsService {
  private ns = '[ProductsService]';
  constructor(
    @InjectModel(vProducts, 'MainDB')
    private productsModel: typeof vProducts,
    private readonly logger: LoggerService,
  ) {}

  async getAllProducts(): Promise<vProducts[]> {
    const fn = `${this.ns}[getAllProducts]:`;
    this.logger.info(`${fn} start`);
    try {
      const vProducts: vProducts[] = await this.productsModel.findAll();
      this.logger.info(`${fn} successfully found all vProducts`);
      return mockProducts as vProducts[]; // For testing purposes, replace with actual vProducts
      // return vProducts;
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

  //getAllProductNames
  async getAllProductNames(): Promise<string[]> {
    const fn = `${this.ns}[getAllProductNames]:`;
    this.logger.info(`${fn} start`);
    try {
      const vProducts: vProducts[] = await this.productsModel.findAll({
        attributes: ['name'],
      });
      this.logger.info(`${fn} successfully found all names`);
      return vProducts.map((product) => product.name);
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
  async getAllProductsClientNames(): Promise<vProducts[]> {
    const fn = `${this.ns}[getAllProductsClientNames]:`;
    this.logger.info(`${fn} start`);
    try {
      const vProducts: Promise<vProducts[]> = this.productsModel.findAll({
        attributes: ['defaultClientName', 'id'],
        order: [['defaultClientName', 'ASC']],
      });
      this.logger.info(
        `${fn} successfully found all getAllProductsClientNames`,
      );
      return mockProducts as vProducts[]; // For testing purposes, replace with actual vProducts
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

  async getProductsByProduct(query: DisplayName): Promise<vProducts[]> {
    const fn = `${this.ns}[getProductsByProduct]:`;
    this.logger.info(`${fn} start`);
    try {
      const vProducts: Promise<vProducts[]> = this.productsModel.findAll({
        where: { applicableProductTypes: { [Op.substring]: query.name } },
      });
      this.logger.info(`${fn} successfully found all vProducts`);
      return mockProducts as vProducts[]; // For testing purposes, replace with actual vProducts
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

  async getProductsByName(name: string): Promise<vProducts> {
    const fn = `${this.ns}[getProductsByName]:`;
    this.logger.info(`${fn} start`);
    try {
      const vProduct: Promise<vProducts> = this.productsModel.findOne({
        where: { name: name },
      });
      this.logger.info(`${fn} successfully query product ${name}`);
      return mockProducts[0] as vProducts; // For testing purposes, replace with actual vProducts
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

  async deprecateProduct(
    id: number,
    body: vProductsAttributes,
    userEmail: string,
  ): Promise<any> {
    const fn = `${this.ns}[deprecateProduct]:`;
    this.logger.info(`${fn} start`);
    try {
      await this.productsModel.sequelize.query(
        'CALL protocalproducts_deprecate (:name, :deprecate_by)',
        {
          replacements: {
            name: body.name,
            deprecate_by: userEmail,
          },
        },
      );

      this.logger.info(
        `${fn} successfully deprecated product ${id}: name ${body.name}`,
      );
      return { message: `Successfully deprecated ${body.name}.` };
    } catch (error) {
      throw new HttpException(
        `${fn} error in service happened: ${error.parent.sqlMessage}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async bulkDeprecateProducts(
    ids: number[],
    userEmail: string,
  ): Promise<BasicResponse> {
    const fn = `${this.ns}[deprecateProduct]:`;
    this.logger.info(`${fn} start`);

    try {
      let productNames: string[] = [];
      await Promise.all(
        ids.map(async (id) => {
          const product = await this.productsModel.findOne({
            where: { id: id },
          });
          productNames.push(product.name);

          await this.productsModel.sequelize.query(
            'CALL protocalproducts_deprecate (:name, :deprecate_by)',
            {
              replacements: {
                name: product.name,
                deprecate_by: userEmail,
              },
            },
          );

          this.logger.info(
            `${fn} successfully deprecated product ${id}: name ${product.name}`,
          );
        }),
      );
      return { message: `Successfully deprecated ${productNames.join(', ')}.` };
    } catch (error) {
      throw new HttpException(
        `${fn} error in service happened: ${error.parent.sqlMessage}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateProduct(
    id: number,
    body: vProductsAttributes,
    userEmail: string,
  ): Promise<any> {
    const fn = `${this.ns}[updateProduct]:`;
    this.logger.info(`${fn} start`);
    try {
      const response = await this.productsModel.sequelize.query(
        'CALL protocalproducts_edit (:name, :display_name, )',
        {
          replacements: {
            name: body.name,
            display_name: body.defaultClientName,
          },
        },
      );
      this.logger.info(
        `${fn} successfully updated product ${id}, ${body.name} by ${userEmail}`,
      );
      return response;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        `${fn} error in service happened: ${error.parent.sqlMessage}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createProduct(
    body: createNewProductDTO,
    userEmail: string,
  ): Promise<BasicResponse> {
    const fn = `${this.ns}[createProduct]:`;
    this.logger.info(`${fn} start`);
    const { productTypes, personTypes, synonyms } = body;
    const success: string[] = [];
    try {
      await this.productsModel.sequelize.query(
        'CALL protocalproducts_add (:name, :display_name,:created_by, )',
        {
          replacements: {
            name: body.name,
            display_name: body.defaultClientName,
            created_by: userEmail,
          },
        },
      );
      success.push(`Added ${body.name} to products.`);

      await this.productsModel.sequelize.query(
        'CALL protocalcreate_product_productsection_map (:product, :product_section,  :objectivity, :created_by)',
        {
          replacements: {
            product: body.name,
            product_section: body.productSection.name,
            objectivity: body.objectivity,
            created_by: userEmail,
          },
        },
      );
      success.push(`Mapped ${body.name} to ${body.productSection.name}.`);

      personTypes.forEach(async (person) => {
        productTypes.forEach(async (product) => {
          try {
            await this.productsModel.sequelize.query(
              'CALL protocalcreate_registry_entry (:product, :product_section, :person_type, :product_type, :created_by)',
              {
                replacements: {
                  product: body.name,
                  product_section: body.productSection.name,
                  person_type: person.name,
                  product_type: product.name,
                  created_by: userEmail,
                },
              },
            );
            success.push(
              `Created registry ${body.name}: ${body.productSection.name} - ${person} -  ${product}.`,
            );
          } catch (e) {
            console.error(e);
          }
        });
      });

      synonyms.forEach(async (synonym) => {
        await this.productsModel.sequelize.query(
          'CALL protocalcreate_extended_term (:p_product_name, :p_product_section_name, :p_term, :p_term_type, :p_term_lang, :p_created_by_email)',
          {
            replacements: {
              p_product_name: body.name,
              p_product_section_name: body.productSection.name,
              p_term: synonym,
              p_term_type: 'SYNONYM',
              p_term_lang: 'EN_US',
              p_created_by_email: userEmail,
            },
          },
        );
        success.push(`Add ${synonym} for ${body.name}`);
      });

      this.logger.info(
        `${fn} successfully create product ${body.name} by ${userEmail}`,
      );
      console.log(success);
      return { message: arrayToStringListHandlerNewLine(success) };
    } catch (error) {
      throw new HttpException(
        `${fn} error in service happened: ${error.parent.sqlMessage}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createBulkProduct(
    body: createNewProductDTO[],
    userEmail: string,
  ): Promise<BasicResponse> {
    const fn = `${this.ns}[createProduct]:`;
    this.logger.info(`${fn} start`);
    const success: string[] = [];

    try {
      body.forEach(async (product) => {
        const productSection = product.productSection;
        const productName = product.name;
        const productDisplayName = product.defaultClientName;
        const productObjectivity = product.objectivity;
        const productPersonTypes = product.personTypes;
        const productProductTypes = product.productTypes;
        const productSynonyms = product.synonyms;

        await this.productsModel.sequelize.query(
          'CALL protocalproducts_add (:name, :display_name, :created_by)',
          {
            replacements: {
              name: productName,
              display_name: productDisplayName,
              created_by: userEmail,
            },
          },
        );
        success.push(`Added ${productName} to products.`);

        await this.productsModel.sequelize.query(
          'CALL protocalcreate_product_productsection_map (:product, :product_section, :objectivity, :created_by)',
          {
            replacements: {
              product: productName,
              product_section: productSection.name,
              objectivity: productObjectivity,
              created_by: userEmail,
            },
          },
        );
        success.push(`Mapped ${productName} to ${productSection.name}.`);

        productPersonTypes.forEach(async (person) => {
          productProductTypes.forEach(async (product) => {
            try {
              await this.productsModel.sequelize.query(
                'CALL protocalcreate_registry_entry (:product, :product_section, :person_type, :product_type, :created_by)',
                {
                  replacements: {
                    product: productName,
                    product_section: productSection.name,
                    person_type: person.name,
                    product_type: product.name,
                    created_by: userEmail,
                  },
                },
              );
              success.push(
                `Created registry ${productName}: ${productSection.name} - ${person} -  ${product}.`,
              );
            } catch (e) {
              console.error(e);
            }
          });
        });

        productSynonyms.forEach(async (synonym) => {
          await this.productsModel.sequelize.query(
            'CALL protocalcreate_extended_term (:p_product_name, :p_product_section_name, :p_term, :p_term_type, :p_term_lang, :p_created_by_email)',
            {
              replacements: {
                p_product_name: productName,
                p_product_section_name: productSection.name,
                p_term: synonym,
                p_term_type: 'SYNONYM',
                p_term_lang: 'EN_US',
                p_created_by_email: userEmail,
              },
            },
          );
          success.push(`Add ${synonym} for ${productName}`);
        });
      });
      this.logger.info(`${fn} successfully create products by ${userEmail}`);
      console.log(success);
      return { message: arrayToStringListHandlerNewLine(success) };
    } catch (error) {
      throw new HttpException(
        `${fn} error in service happened: ${error.parent.sqlMessage}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
