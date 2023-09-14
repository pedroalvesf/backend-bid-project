import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ServiceModule } from './service/service.module';

@Module({
  imports: [UsersModule, ServiceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
