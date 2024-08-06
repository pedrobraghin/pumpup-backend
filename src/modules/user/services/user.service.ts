import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { CreateUserDTO } from '../dtos/requests/create-user.dto';
import { UpdateUserDTO } from '../dtos/requests/update-user.dto';
import { UserBuilder } from '../builders/user.buider';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async createUser(dto: CreateUserDTO) {
    const checkUserEmail = await this.userRepository.getByEmail(dto.email);
    if (checkUserEmail) {
      throw new BadRequestException('Email already exists');
    }
    const user = await this.userRepository.create(dto);
    return UserBuilder.buildUser(user);
  }

  async getAllUsers() {
    const users = await this.userRepository.getAll();

    return users.map((user) => UserBuilder.buildUser(user));
  }

  async getUser(id: string) {
    const user = await this.userRepository.getById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return UserBuilder.buildUser(user);
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.getByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return UserBuilder.buildUser(user);
  }

  async updateUser(id: string, dto: UpdateUserDTO) {
    const user = await this.userRepository.getById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const updatedUser = await this.userRepository.updateUser(user.id, dto);
    return UserBuilder.buildUser(updatedUser);
  }

  async inactivateUser(id: string) {
    const user = await this.userRepository.getById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!user.active) {
      throw new BadRequestException('User already inactive');
    }
    return this.userRepository.inactivate(user.id);
  }
}
