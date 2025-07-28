import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { LoggerService } from '../logger/logger.service';
import { lowerCase } from 'lodash';
import { usersRoles, usersRolesAttributes } from 'src/models/usersRoles';

@Injectable()
export class UsersService {
  private ns = '[UsersService]';
  constructor(
    @InjectModel(usersRoles, 'MainDB')
    private usersRolesModel: typeof usersRoles,
    private readonly logger: LoggerService,
  ) {}

  async getDBRole(userEmail: string): Promise<string[]> {
    const fn = `${this.ns}[getDBRole]:`;
    this.logger.info(`${fn} start`);
    try {
      const userRoles: usersRolesAttributes[] =
        await this.usersRolesModel.findAll({
          where: { userName: userEmail },
        });
      this.logger.info(`${fn} successfully found all user roles`);
      //get just roles and prevent case issues
      return userRoles.map((role) => lowerCase(role.roleName));
    } catch (error) {
      console.log(Error);
      if (error?.status) {
        throw error;
      }
      throw new HttpException(
        `${fn} error in service happened ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
