import { IsNumber, IsNotEmpty, IsPositive } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class Location {
  @ApiModelProperty()
  @IsNumber()
  @IsNotEmpty()
  latitude: number;

  @ApiModelProperty()
  @IsNumber()
  @IsNotEmpty()
  longitude: number;

  @ApiModelProperty()
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  radius: number;
}
