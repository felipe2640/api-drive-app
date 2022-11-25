import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ClassSerializerInterceptor,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';

import { DriverService } from './driver.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { DriverEntity } from './entities/driver.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('driver')
@ApiBearerAuth()
@ApiTags('Driver')
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @UseGuards(JwtAuthGuard)
  @ApiSecurity('access-key')
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  @ApiOkResponse({ type: DriverEntity, isArray: true })
  findAll() {
    return this.driverService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @ApiSecurity('access-key')
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':Placa')
  @ApiOkResponse({ type: DriverEntity, isArray: true })
  findOnePlaca(@Param('Placa') Placa: string) {
    return this.driverService.findOnePlaca(Placa);
  }

  @UseGuards(JwtAuthGuard)
  @ApiSecurity('access-key')
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':Nome')
  @ApiOkResponse({ type: DriverEntity, isArray: true })
  findOneNome(@Param('Nome') Nome: string) {
    return this.driverService.findOneNome(Nome);
  }

  @UseGuards(JwtAuthGuard)
  @ApiSecurity('access-key')
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':Documento')
  @ApiOkResponse({ type: DriverEntity, isArray: true })
  findOne(@Param('Documento') Documento: string) {
    return this.driverService.findOneDocumento(Documento);
  }

  @UseGuards(JwtAuthGuard)
  @ApiSecurity('access-key')
  @UseInterceptors(ClassSerializerInterceptor)
  @Patch(':id')
  @ApiOkResponse({ type: DriverEntity })
  update(
    @Param('id') id: string,
    @Body() updateDriverDto: UpdateDriverDto,
  ): Promise<any> {
    let convertid = parseInt(id);
    return this.driverService.update(convertid, updateDriverDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiSecurity('access-key')
  @UseInterceptors(ClassSerializerInterceptor)
  @Delete(':CPF')
  @ApiOkResponse({ type: DriverEntity })
  remove(@Param('CPF') CPF: string) {
    return this.driverService.remove(CPF);
  }
}
