import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthGuard } from './auth/auth.guard';
import { AuthModule } from './auth/auth.module';
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
export class AppModule {}
