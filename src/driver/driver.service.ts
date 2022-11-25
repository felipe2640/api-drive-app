import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { RegistrationStatus } from 'src/auth/auth.service';
import { PrismaService } from 'src/prisma/prisma.service';

import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';

@Injectable()
export class DriverService {
  constructor(private prisma: PrismaService) {}
  async create(createDriverDto: CreateDriverDto) {
    const usuarioNoDb = await this.prisma.drive.findFirst({
      where: { CPF: createDriverDto.CPF },
    });
    if (usuarioNoDb) {
      throw new HttpException('Usuario já existente', HttpStatus.CONFLICT);
    }
    return await this.prisma.drive.create({
      data: {
        Nome: createDriverDto.Nome,
        CPF: createDriverDto.CPF,
        Password: await hash(createDriverDto.Password, 10),
        Placa: createDriverDto.Placa,
        Marca: createDriverDto.Marca,
        Modelo: createDriverDto.Modelo,
      },
    });
  }

  async findByLogin({ CPF, Password }: any): Promise<any> {
    const user = await this.prisma.drive.findFirst({
      where: { CPF },
    });

    if (!user) {
      throw new HttpException(
        'Usuário não encontrado',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const areEqual = await compare(Password, user.Password);

    if (!areEqual) {
      throw new HttpException('Senha invalida', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }

  async findByPayload({ CPF }: any): Promise<any> {
    return await this.prisma.drive.findFirst({
      where: { CPF },
    });
  }

  findAll() {
    return this.prisma.drive.findMany();
  }

  findOnePlaca(Placa: string) {
    return this.prisma.drive.findMany({ where: { Placa: Placa } });
  }

  findOneDocumento(CPF: string) {
    return this.prisma.drive.findMany({ where: { CPF: CPF } });
  }
  findOneNome(Nome: string) {
    return this.prisma.drive.findMany({ where: { Nome: Nome } });
  }

  async update(id: number, updateDriverDto: any): Promise<any> {
    let status: any = {
      success: true,
      message: 'Informações atualizadas com sucesso',
    };
    let data: any = this.prisma.drive.update({
      where: { id },
      data: {
        CPF: updateDriverDto.CPF,
        Modelo: updateDriverDto.Modelo,
        Nome: updateDriverDto.Nome,
        Marca: updateDriverDto.Marca,
        Placa: updateDriverDto.Placa,
      },
    });

    if (!data) {
      throw new HttpException(
        'Usuário não encontrado',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return status;
  }

  remove(CPF: string) {
    return this.prisma.drive.delete({ where: { CPF } });
  }
}
