import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthController } from './auth.controller';
import { DriverService } from 'src/driver/driver.service';
import { DriverModule } from 'src/driver/driver.module';

@Module({
  imports: [
    DriverModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),
    JwtModule.register({
      secret: process.env.SECRETKEY,
      signOptions: {
        expiresIn: process.env.EXPIRESIN,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, DriverService, JwtStrategy, PrismaService],
  exports: [PassportModule, JwtModule],
})
export class AuthModule {}
