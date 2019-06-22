import { IsString, MinLength, MaxLength } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class AuthCredentialsDto {
  @ApiModelProperty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @ApiModelProperty()
  @IsString()
  @MinLength(8)
  @MaxLength(100)
  password: string;
}
