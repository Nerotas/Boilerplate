import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface vProductsAttributes {
  id?: number;
  name: string;
  defaultClientName?: string;
  applicableProductSections?: string;
  applicableProductTypes?: string;
  createdByEmail: string;
  createdOnUtc?: Date;
  deprecatedByEmail?: string;
  deprecatedOnUtc?: Date;
}

@Table({ tableName: 'v_products', timestamps: false, comment: 'VIEW' })
export class vProducts
  extends Model<vProductsAttributes, vProductsAttributes>
  implements vProductsAttributes
{
  @Column({ type: DataType.BIGINT, defaultValue: '0', primaryKey: true })
  id?: number;
  @Column({ type: DataType.STRING(255) })
  name!: string;
  @Column({
    field: 'default_client_name',
    allowNull: true,
    type: DataType.STRING(255),
  })
  defaultClientName?: string;

  @Column({
    field: 'applicable_product_sections',
    allowNull: true,
    type: DataType.STRING,
  })
  applicableProductSections?: string;
  @Column({
    field: 'applicable_product_types',
    allowNull: true,
    type: DataType.STRING,
  })
  applicableProductTypes?: string;

  @Column({ field: 'created_by_email', type: DataType.STRING(255) })
  createdByEmail!: string;
  @Column({
    field: 'created_on_utc',
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  createdOnUtc?: Date;
  @Column({
    field: 'deprecated_by_email',
    allowNull: true,
    type: DataType.STRING(255),
  })
  deprecatedByEmail?: string;
  @Column({ field: 'deprecated_on_utc', allowNull: true, type: DataType.DATE })
  deprecatedOnUtc?: Date;
  @Column({ field: 'merged_with', allowNull: true, type: DataType.BIGINT })
  mergedWith?: number;
}
