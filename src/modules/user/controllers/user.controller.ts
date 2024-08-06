import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Logger,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from '../services/user.service';
import { CreateUserDTO } from '../dtos/requests/create-user.dto';
import { Response } from 'express';

@ApiTags('Users')
@Controller('users')
export class UserController {
  private readonly logger = new Logger('Exercises Controller');

  constructor(private userService: UserService) {}

  @Post()
  async createUser(@Body() data: CreateUserDTO, @Res() response: Response) {
    const user = await this.userService.createUser(data);
    return response.status(HttpStatus.CREATED).json({
      data: user,
      status: HttpStatus.CREATED,
    });
  }

  @Get()
  async getAllUsers(@Res() response: Response) {
    const users = await this.userService.getAllUsers();
    return response.status(HttpStatus.OK).json({
      data: users,
      status: HttpStatus.OK,
    });
  }

  @Get(':id')
  async getUser(@Param('id') id: string, @Res() response: Response) {
    const user = await this.userService.getUser(id);
    return response.status(HttpStatus.OK).json({
      data: user,
      status: HttpStatus.OK,
    });
  }

  @Get('email/:email')
  async getUserByEmail(
    @Param('email') email: string,
    @Res() response: Response,
  ) {
    const user = await this.userService.getUserByEmail(email);
    return response.status(HttpStatus.OK).json({
      data: user,
      status: HttpStatus.OK,
    });
  }

  @Delete()
  async inactivateUser(@Res() response: Response) {
    await this.userService.inactivateUser(
      'dae03eb8-a940-4d1b-94cc-f4a9ef72dffc',
    );

    return response.status(HttpStatus.NO_CONTENT).json();
  }
}
