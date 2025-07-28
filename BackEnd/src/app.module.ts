import { HttpModule } from '@nestjs/axios';
import {
  Logger,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { SequelizeModule } from '@nestjs/sequelize';

import { HealthController } from './health/health.controller';
import { LocalHealthCheckService } from './health/health.service';
import { AboutController } from './controllers/about/about.controller';

import { AdminGuard } from './guards/roles.guard';

import { LoggerService } from './services/logger/logger.service';

import { RequestLoggerMiddleware } from './middlewares/RequestLoggerMiddleware';
import { RouteRewriteMiddleware } from './middlewares/RouteRewriteMiddleware';
import { rewritePathToRoot } from './lib/rewrite-path-to-root';
import { TestingUtilsService } from './services/testingUtils/testingUtils.service';
import { TerminusModule } from '@nestjs/terminus';

import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';
import { CacheModule } from '@nestjs/cache-manager';

import { MetricsMiddleware } from './middlewares/metrics.middleware';
import { MetricsModule } from 'metrics.module';

import { GoogleSheetFetcherService } from './services/googleSheetFetcher/googleSheetFetcher.service';
import { GoogleSheetFetcherController } from './controllers/googleSheetFetcher/googleSheetFetcher.controller';
import { ProductsController } from './controllers/products/products.controller';
import { vProducts } from './models/vProducts';
import { ProductsService } from './services/products/products.service';
import { usersRoles } from './models/usersRoles';

@Module({
  imports: [
    MetricsModule,
    TerminusModule,
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env'],
    }),
    CacheModule.register({
      ttl: 1000 * 60 * 60 * 24,
      max: 10_000, // maximum number of items in cache
    }),
    PassportModule,
    HttpModule.register({
      timeout: 60000, // 60 seconds
    }),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      name: 'MainDB',
      host: process.env.MYSQL_HOST,
      port: 3306,
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DBNAME,
      autoLoadModels: false,
      synchronize: false,
      models: [usersRoles, vProducts],
    }),

    SequelizeModule.forFeature([usersRoles, vProducts], 'MainDB'),
  ],
  controllers: [
    AboutController,
    GoogleSheetFetcherController,
    HealthController,
    ProductsController,
    UsersController,
  ],
  providers: [
    AdminGuard,
    GoogleSheetFetcherService,
    JwtService,
    LocalHealthCheckService,
    LoggerService,
    ProductsService,
    TestingUtilsService,
    UsersService,
  ],
})
export class AppModule implements NestModule {
  private logger = new Logger(AppModule.name);
  configure(consumer: MiddlewareConsumer) {
    const rewriteBase = rewritePathToRoot();
    if (rewriteBase) {
      this.logger.log(
        `REWRITE_PATH_TO_ROOT env var was provided, rewriting all routes from '/${rewriteBase}*' to '/'.`,
      );
      this.logger.log(
        `App listening on port ${
          process.env.PORT || 6137
        } press Ctrl+C to stop'`,
      );
      consumer
        .apply(RouteRewriteMiddleware)
        .forRoutes({ path: `${rewriteBase}*`, method: RequestMethod.ALL });
    } else {
      this.logger.log(
        `REWRITE_PATH_TO_ROOT env var NOT provided, will not rewrite routes.`,
      );
    }
    consumer.apply(RequestLoggerMiddleware, MetricsMiddleware).forRoutes('*');
  }
}
