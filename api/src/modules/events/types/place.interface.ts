import { IsArray, IsNotEmpty, ArrayUnique, IsNumber, IsPositive } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class Place {
  @ApiModelProperty()
  @IsArray()
  @ArrayUnique()
  @IsNotEmpty()
  keywords: string[];

  @ApiModelProperty()
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  radius: number;
}
