import { Drive } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
export class DriverEntity implements Drive {
  @ApiProperty()
  id: number;

  @ApiProperty({ required: true })
  Nome: string;

  @ApiProperty({ required: true })
  Password: string;

  @ApiProperty({ required: true })
  CPF: string;

  @ApiProperty({ required: true })
  Marca: string;

  @ApiProperty({ required: true })
  Modelo: string;

  @ApiProperty({ required: true })
  Placa: string;
}
