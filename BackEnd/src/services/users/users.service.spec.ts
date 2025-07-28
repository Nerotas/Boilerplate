import { UsersService } from './users.service';
import { HttpException, HttpStatus } from '@nestjs/common';
import { lowerCase } from 'lodash';
import { jest, describe, it, expect, beforeEach } from '@jest/globals';

describe('UsersService', () => {
  let service: UsersService;
  let usersRolesModel: any;
  let logger: any;

  beforeEach(() => {
    usersRolesModel = {
      findAll: jest.fn(),
    };
    logger = { info: jest.fn(), error: jest.fn(), warn: jest.fn() };
    service = new UsersService(usersRolesModel, logger);
  });

  it('should get DB roles and return them in lower case', async () => {
    const userRoles = [
      { roleName: 'ADMIN' },
      { roleName: 'User' },
      { roleName: 'Writer' },
    ];
    usersRolesModel.findAll.mockResolvedValue(userRoles);

    const result = await service.getDBRole('test@example.com');
    expect(result).toEqual(userRoles.map((r) => lowerCase(r.roleName)));
    expect(usersRolesModel.findAll).toHaveBeenCalledWith({
      where: { userName: 'test@example.com' },
    });
    expect(logger.info).toHaveBeenCalled();
  });

  it('should throw HttpException on error', async () => {
    usersRolesModel.findAll.mockRejectedValue(new Error('fail'));
    await expect(service.getDBRole('test@example.com')).rejects.toThrow(
      HttpException,
    );
  });

  it('should rethrow error if error has status', async () => {
    const errorWithStatus = new HttpException('bad', HttpStatus.BAD_REQUEST);
    usersRolesModel.findAll.mockRejectedValue(errorWithStatus);
    await expect(service.getDBRole('test@example.com')).rejects.toThrow(
      errorWithStatus,
    );
  });
});
