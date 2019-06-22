import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

export class CreateEventDto {
  @ApiModelProperty()
  @IsNotEmpty()
  title: string;

  @ApiModelPropertyOptional()
  @IsOptional()
  @IsNotEmpty()
  description: string;
}
