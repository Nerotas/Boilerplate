import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface usersRolesAttributes {
  userName: string;
  roleName: string;
}

@Table({ tableName: 'users_roles', timestamps: false })
export class usersRoles
  extends Model<usersRolesAttributes, usersRolesAttributes>
  implements usersRolesAttributes
{
  @Column({ field: 'user_name', type: DataType.STRING(64), primaryKey: true })
  @Index({ name: 'user_name', using: 'BTREE', order: 'ASC', unique: false })
  userName!: string;
  @Column({ field: 'role_name', type: DataType.STRING(45) })
  @Index({ name: 'role_fk', using: 'BTREE', order: 'ASC', unique: false })
  @Index({ name: 'user_name', using: 'BTREE', order: 'ASC', unique: false })
  roleName!: string;
}
