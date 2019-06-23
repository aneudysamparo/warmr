import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from './user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
    private authService: AuthService,
  ) { }

  async createUser(createUserDto: CreateUserDto) {
    const { username, password } = createUserDto;
    const authCredentialsDto = { username, password };
    await this.userRepository.createUser(createUserDto);
    return this.authService.logIn(authCredentialsDto);
  }

  async getUserById(
    id: number,
    user: User,
  ): Promise<User> {
    const found = await this.userRepository.findOne(id);
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }

  async updateCurrentUser(updateUserDto: UpdateUserDto, user: User): Promise<User> {
    if (updateUserDto.id && updateUserDto.id !== user.id) {
      throw new BadRequestException(`ID of entity cannot be updated. Check that URL and request payload ID match`);
    }
    const foundUser = await this.getUserById(user.id, user);
    Object.entries(updateUserDto).forEach(([key, value]) => {
      foundUser[key] = value;
    });
    await foundUser.save();
    return foundUser;
  }

  async updatePassword(updatePasswordDto: UpdatePasswordDto, user: User): Promise<void> {
    const foundUser = await this.userRepository.updatePassword(updatePasswordDto, user);
  }
}
