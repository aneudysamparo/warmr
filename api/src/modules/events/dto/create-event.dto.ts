import { IsNotEmpty } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateEventDto {
  @ApiModelProperty()
  @IsNotEmpty()
  title: string;

  @ApiModelProperty()
  @IsNotEmpty()
  description: string;
}
