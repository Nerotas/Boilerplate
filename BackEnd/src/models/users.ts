import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface usersAttributes {
  id?: number;
  userSurrogateId: string;
  firstName: string;
  lastName?: string;
  email: string;
  status?: number;
  createdAt?: Date;
  updatedAt?: Date;
  updatedBy?: string;
  createdBy?: string;
}

@Table({ tableName: 'users', timestamps: false })
export class users
  extends Model<usersAttributes, usersAttributes>
  implements usersAttributes
{
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.BIGINT })
  @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
  id?: number;
  @Column({ field: 'userSurrogateID', type: DataType.STRING(45) })
  userSurrogateId!: string;
  @Column({ type: DataType.STRING(128) })
  firstName!: string;
  @Column({ allowNull: true, type: DataType.STRING(128) })
  lastName?: string;
  @Column({ type: DataType.STRING(128) })
  email!: string;
  @Column({
    type: DataType.TINYINT,
    comment: '0 - Inactive, 1 - Active',
    defaultValue: '1',
  })
  status?: number;
  @Column({ type: DataType.DATE, defaultValue: DataType.NOW })
  createdAt?: Date;
  @Column({ type: DataType.DATE, defaultValue: DataType.NOW })
  updatedAt?: Date;
  @Column({ allowNull: true, type: DataType.STRING(256) })
  updatedBy?: string;
  @Column({ allowNull: true, type: DataType.STRING(256) })
  createdBy?: string;
}
