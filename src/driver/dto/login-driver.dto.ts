import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDriverDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly CPF: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly Password: string;
}
