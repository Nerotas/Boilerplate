import { UsersController } from './users.controller';
import { LoggerService } from '../../services/logger/logger.service';
import { TestingUtilsService } from '../../services/testingUtils/testingUtils.service';
import { UsersService } from '../../services/users/users.service';
import { HttpException, HttpStatus } from '@nestjs/common';
import { expect, describe, it, jest } from '@jest/globals';

describe('UsersController', () => {
  let controller: UsersController;
  let logger: LoggerService;
  let testingUtils: TestingUtilsService;
  let userService: UsersService;

  const user = { userId: '123', userEmail: 'test@example.com' };
  const request = {};

  beforeEach(() => {
    logger = { warn: jest.fn() } as any;
    testingUtils = { verifyTestUserAndToken: jest.fn() } as any;
    userService = {} as any;
    controller = new UsersController(logger, testingUtils, userService);
  });

  it('should rethrow error if error has status', async () => {
    const error = new HttpException('bad', HttpStatus.BAD_REQUEST);
    (testingUtils.verifyTestUserAndToken as jest.Mock<any>).mockRejectedValue(
      error,
    );
    await expect(controller.getRole(user, request)).rejects.toThrow(error);
  });

  it('should log and throw HttpException on generic error', async () => {
    const error = new Error('fail');
    (testingUtils.verifyTestUserAndToken as jest.Mock<any>).mockRejectedValue(
      error,
    );
    await expect(controller.getRole(user, request)).rejects.toThrow(
      HttpException,
    );
    expect(logger.warn).toHaveBeenCalled();
  });
});
