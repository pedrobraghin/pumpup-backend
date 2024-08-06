import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { CreateUserDTO } from '../dtos/requests/create-user.dto';
import { UpdateUserDTO } from '../dtos/requests/update-user.dto';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async createUser(dto: CreateUserDTO) {
    const checkUserEmail = await this.userRepository.getByEmail(dto.email);
    if (checkUserEmail) {
      throw new BadRequestException('Email already exists');
    }
    return this.userRepository.create(dto);
  }

  async getAllUsers(name?: string, active?: boolean) {
    return this.userRepository.getAll(name, active);
  }

  async getUser(id: string) {
    const user = await this.userRepository.getById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.getByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async updateUser(id: string, dto: UpdateUserDTO) {
    const user = await this.userRepository.getById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.userRepository.updateUser(user.id, dto);
  }
}
