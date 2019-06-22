import { IsString, IsOptional, Length } from 'class-validator';
import { ApiModelPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
  @IsOptional()
  id: number;

  @ApiModelPropertyOptional()
  @IsOptional()
  @IsString()
  @Length(4, 20)
  username: string;

  @ApiModelPropertyOptional()
  @IsOptional()
  email: string;
}
