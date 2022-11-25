import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Drive } from '@prisma/client';

import { JwtPayload } from './jwt.strategy';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDriverDto } from 'src/driver/dto/login-driver.dto';
import { DriverService } from 'src/driver/driver.service';
import { CreateDriverDto } from 'src/driver/dto/create-driver.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly driveService: DriverService,
  ) {}

  async register(userDto: CreateDriverDto): Promise<RegistrationStatus> {
    let status: RegistrationStatus = {
      success: true,
      message: 'Conta criada com sucesso',
    };

    try {
      status.data = await this.driveService.create(userDto);
    } catch (err) {
      status = {
        success: false,
        message: err,
      };
    }
    return status;
  }

  async login(loginDriverDto: LoginDriverDto): Promise<any> {
    const user = await this.driveService.findByLogin(loginDriverDto);
    const token = this._createToken(user);

    return {
      ...token,
      message: 'Login realizado com sucesso',
      data: user,
    };
  }

  private _createToken({ CPF }): any {
    const user: JwtPayload = { CPF };
    const Authorization = this.jwtService.sign(user);
    return {
      expiresIn: process.env.EXPIRESIN,
      Authorization,
    };
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    const user = await this.driveService.findByPayload(payload);
    if (!user) {
      throw new HttpException('INVALID_TOKEN', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }
}

export interface RegistrationStatus {
  success: boolean;
  message: string;
  data?: Drive;
}
export interface RegistrationSeederStatus {
  success: boolean;
  message: string;
  data?: Drive[];
}
