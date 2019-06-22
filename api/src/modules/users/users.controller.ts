import {
  Controller,
  Body,
  ValidationPipe,
  Post,
  Get,
  UseGuards,
  InternalServerErrorException,
  Patch,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ApiUseTags } from '@nestjs/swagger';
import { GetUser } from './get-user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { User } from './user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@ApiUseTags('User')
@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(
    private usersService: UsersService,
  ) { }

  @Post()
  createUser(@Body(ValidationPipe) createUserDto: CreateUserDto): Promise<void> {
    return this.usersService.createUser(createUserDto);
  }

  @Get('/current')
  @UseGuards(AuthGuard())
  getCurrentUser(@GetUser() user: User): User {
    if (!user) {
      throw new InternalServerErrorException();
    }
    return user;
  }

  @Patch('/current')
  @UseGuards(AuthGuard())
  updateCurrentUser(
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
    @GetUser() user: User,
  ): Promise<User> {
    return this.usersService.updateCurrentUser(updateUserDto, user);
  }

  @Patch('/current/password')
  @UseGuards(AuthGuard())
  updatePassword(
    @Body(ValidationPipe) updatePasswordDto: UpdatePasswordDto,
    @GetUser() user: User,
  ): Promise<void> {
    return this.usersService.updatePassword(updatePasswordDto, user);
  }
}
