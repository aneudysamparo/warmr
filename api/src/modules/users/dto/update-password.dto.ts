import { IsString, Length } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class UpdatePasswordDto {
  @ApiModelProperty()
  @IsString()
  @Length(8, 100)
  password: string;
}
