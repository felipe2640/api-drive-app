import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
export class CreateDriverDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @ApiProperty({ required: true })
  Nome: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @ApiProperty({ required: true })
  Password: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(11)
  @MaxLength(11)
  @ApiProperty({ required: true })
  CPF: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  Marca: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  Modelo: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  Placa: string;
}
