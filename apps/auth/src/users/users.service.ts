import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entites/user.entity';
import * as bcrypt from 'bcryptjs';
import { GetUserDto } from './dto/get-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async addUser(createUserDto: CreateUserDto) {
    const newUser = new User();
    Object.assign(newUser, {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    });
    return await this.userRepository.create(newUser);
  }

  async validateUser(userName: string, password: string) {
    const user = await this.userRepository.findOne({ userName });
    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (!isCorrectPassword) throw new UnauthorizedException('Bad Credentials');
    return user;
  }

  async getUser(getUserDto: GetUserDto) {
    return await this.userRepository.findOne(getUserDto);
  }
}
