import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Logger,
  Param,
  Patch,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { UserService } from '../services/user.service';
import { CreateUserDTO } from '../dtos/requests/create-user.dto';
import { Response } from 'express';
import { UpdateUserDTO } from '../dtos/requests/update-user.dto';

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

  @ApiQuery({
    name: 'active',
    type: Boolean,
    required: false,
  })
  @ApiQuery({
    name: 'name',
    type: String,
    required: false,
  })
  @Get()
  async getAllUsers(
    @Res() response: Response,
    @Query('active') active?: boolean,
    @Query('name') name?: string,
  ) {
    const users = await this.userService.getAllUsers(name, active);
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

  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() dto: UpdateUserDTO,
    @Res() response: Response,
  ) {
    const updatedUser = await this.userService.updateUser(id, dto);
    return response.status(HttpStatus.OK).json({
      data: updatedUser,
      status: HttpStatus.OK,
    });
  }
}
