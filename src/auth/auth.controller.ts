import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService, RegistrationStatus } from './auth.service';
import { ApiTags } from '@nestjs/swagger';

import { CreateDriverDto } from 'src/driver/dto/create-driver.dto';
import { LoginDriverDto } from 'src/driver/dto/login-driver.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  public async register(
    @Body() createDriverDto: CreateDriverDto,
  ): Promise<RegistrationStatus> {
    const result: RegistrationStatus = await this.authService.register(
      createDriverDto,
    );
    if (!result.success) {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }
    return result;
  }

  @Post('login')
  public async login(@Body() loginDriverDto: LoginDriverDto): Promise<any> {
    return await this.authService.login(loginDriverDto);
  }
}
