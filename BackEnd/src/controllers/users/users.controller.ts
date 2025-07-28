import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  UseGuards,
  Req,
} from '@nestjs/common';

import { LoggerService } from '../../services/logger/logger.service';
import { AdminGuard } from '../../guards/roles.guard';
import { User as AzureUser } from '../../decorators/user.decorator';
import { TestingUtilsService } from '../../services/testingUtils/testingUtils.service';
import { UserDecorator } from '../../types/users';
import { UsersService } from '../../services/users/users.service';
@Controller('users')
@UseGuards(AdminGuard)
export class UsersController {
  constructor(
    private readonly logger: LoggerService,
    private readonly testingUtils: TestingUtilsService,
    private readonly userService: UsersService,
  ) {}

  @Get('me/role')
  async getRole(
    @AzureUser() user: UserDecorator,
    @Req() request,
  ): Promise<string[]> {
    const ns = '[getRole]:';
    try {
      const testUserRole = await this.testingUtils.verifyTestUserAndToken(
        user.userEmail,
        request,
      );

      if (testUserRole) return testUserRole;

      // const groups = await this.userService.checkRoleGroupsMembership(
      //   user?.userId,
      // );

      const groups = ['users', 'admins']; // Mocked for simplicity
      return groups;
    } catch (e) {
      if (e?.status) {
        throw e;
      }
      this.logger.warn(`${ns} Request failed with an error: ${e}`);
      throw new HttpException(
        `Request failed with an error: ${e}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
