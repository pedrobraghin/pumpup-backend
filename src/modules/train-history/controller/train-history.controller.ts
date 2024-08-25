import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TrainHistoryService } from '../service/train-history.service';
import { CreateTrainHistoryRequestDTO } from '../dtos/requests/create-train-history-request.dto';
import { Request, Response } from 'express';
import { PaginationQueryDTO } from '../../../@types/pagination-query.dto';
import { UpdateTrainHistoryDTO } from '../dtos/requests/update-train-history.dto';

@ApiTags('Train History')
@Controller('train-history')
export class TrainHistoryController {
  constructor(private readonly trainHistoryService: TrainHistoryService) {}

  @Post()
  async createTrainHistory(
    @Body() dto: CreateTrainHistoryRequestDTO,
    @Req() request: Request,
    @Res() response: Response,
  ) {
    const trainHistory = await this.trainHistoryService.createTrainHistory(
      request.user.id,
      dto,
    );
    return response.status(HttpStatus.CREATED).json({
      data: trainHistory,
      status: HttpStatus.CREATED,
    });
  }

  @Get()
  async getTrainHistories(
    @Res() response: Response,
    @Req() request: Request,
    @Query() paginationQuery: PaginationQueryDTO,
  ) {
    const trainHistory = await this.trainHistoryService.getTrainHistories(
      request.user.id,
      paginationQuery,
    );
    return response.status(HttpStatus.OK).json({
      data: trainHistory,
      status: HttpStatus.OK,
    });
  }

  @Get(':id')
  async getTrainHistoryById(
    @Param('id') id: string,
    @Req() request: Request,
    @Res() response: Response,
  ) {
    const trainHistory = await this.trainHistoryService.getTrainHistoryById(
      request.user.id,
      id,
    );

    return response.status(HttpStatus.OK).json({
      data: trainHistory,
      status: HttpStatus.OK,
    });
  }

  @Get('/train/:trainId')
  async getByTrainId(
    @Param('trainId') trainId: string,
    @Req() request: Request,
    @Res() response: Response,
  ) {
    const trainHistories = await this.trainHistoryService.getByTrainId(
      request.user.id,
      trainId,
    );

    return response.status(HttpStatus.OK).json({
      data: trainHistories,
      status: HttpStatus.OK,
    });
  }

  @Patch(':id')
  async updateTrainHistory(
    @Param('id') id: string,
    @Body() dto: UpdateTrainHistoryDTO,
    @Req() request: Request,
    @Res() response: Response,
  ) {
    const trainHistory = await this.trainHistoryService.updateTrainHistory(
      request.user.id,
      id,
      dto,
    );

    return response.status(HttpStatus.OK).json({
      data: trainHistory,
      status: HttpStatus.OK,
    });
  }

  @Delete(':id')
  async deleteTrainHistory(
    @Param('id') id: string,
    @Req() request: Request,
    @Res() response: Response,
  ) {
    await this.trainHistoryService.deleteTrainHistory(request.user.id, id);

    return response.status(HttpStatus.NO_CONTENT).json();
  }
}
