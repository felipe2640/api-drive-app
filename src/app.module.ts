import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { DriverModule } from './driver/driver.module';

@Module({
  imports: [PrismaModule, AuthModule, DriverModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
