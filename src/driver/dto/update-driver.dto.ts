import { PartialType } from '@nestjs/swagger';
import { CreateDriverDto } from './create-driver.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateDriverDto extends PartialType(CreateDriverDto) {

}
