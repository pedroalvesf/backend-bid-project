import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthGuard } from './auth/auth.guard';
import { AuthModule } from './auth/auth.module';
import { CheckRoleAdminMiddleware } from './auth/middleware/check.role.admin.middleware';
import { CheckRoleProviderMiddleware } from './auth/middleware/check.role.provider.middleware';
import { BidModule } from './bid/bid.module';
import { PersonsModule } from './persons/persons.module';
import { ServiceModule } from './service/service.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule, ServiceModule, AuthModule, BidModule, PersonsModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckRoleAdminMiddleware)
      .forRoutes(
        { path: 'users', method: RequestMethod.GET },
        { path: 'users', method: RequestMethod.DELETE },
        { path: 'persons', method: RequestMethod.GET },
        { path: 'persons', method: RequestMethod.DELETE },
        { path: 'service', method: RequestMethod.DELETE },
      ),
      consumer
      .apply(CheckRoleProviderMiddleware)
      .forRoutes(
        { path: 'bid', method: RequestMethod.GET },
        { path: 'bid', method: RequestMethod.POST },
      )
  }
}