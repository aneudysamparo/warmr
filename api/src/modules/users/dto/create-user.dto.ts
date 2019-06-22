import { IsString, IsEmail, Length } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiModelProperty()
  @IsString()
  @Length(4, 20)
  username: string;

  @ApiModelProperty()
  @IsString()
  email: string;

  @ApiModelProperty()
  @IsString()
  @Length(8, 100)
  password: string;
}
