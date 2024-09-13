import { ApiQuery, ApiTags } from '@nestjs/swagger';
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
import { TrainHistoryExerciseService } from '../service/train-history-exercise.service';
import { Request, Response } from 'express';
import { CreateTrainHistoryExerciseDTO } from '../dtos/requests/create-train-history-exercise.dto';
import { UpdateTrainHistoryExerciseDTO } from '../dtos/requests/update-train-history-exercise.dto';

@ApiTags('Train History Exercise')
@Controller('train-history-exercise')
export class TrainHistoryExerciseController {
  constructor(
    private readonly trainHistoryExerciseService: TrainHistoryExerciseService,
  ) {}

  @Post()
  async createTrainHistoryExercise(
    @Res() response: Response,
    @Req() request: Request,
    @Body() dto: CreateTrainHistoryExerciseDTO,
  ) {
    const trainHistoryExercise =
      await this.trainHistoryExerciseService.createTrainHistoryExercise(
        dto,
        'ac430e58-5458-4315-98cd-bac36d1eb807',
      );

    return response.status(HttpStatus.CREATED).json({
      data: trainHistoryExercise,
      status: HttpStatus.CREATED,
    });
  }

  @ApiQuery({
    name: 'id',
    type: String,
    required: false,
  })
  @Get('list')
  async getMany(
    @Res() response: Response,
    @Req() request: Request,
    @Query('id') id?: string,
  ) {
    const trainHistoryExercise = await this.trainHistoryExerciseService.getMany(
      request.user.id,
      id,
    );
    return response.status(HttpStatus.OK).json({
      data: trainHistoryExercise,
      status: HttpStatus.OK,
    });
  }

  @Get(':id')
  async getById(
    @Param('id') id: string,
    @Res() response: Response,
    @Req() request: Request,
  ) {
    const trainHistoryExercise = await this.trainHistoryExerciseService.getById(
      request.user.id,
      id,
    );

    return response.status(HttpStatus.OK).json({
      data: trainHistoryExercise,
      status: HttpStatus.OK,
    });
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Res() response: Response,
    @Body() dto: UpdateTrainHistoryExerciseDTO,
    @Req() request: Request,
  ) {
    const updatedTrainHistoryExercise =
      await this.trainHistoryExerciseService.update(request.user.id, id, dto);

    return response.status(HttpStatus.OK).json({
      data: updatedTrainHistoryExercise,
      status: HttpStatus.OK,
    });
  }

  @Delete(':id')
  async delete(
    @Param('id') id: string,
    @Res() response: Response,
    @Req() request: Request,
  ) {
    await this.trainHistoryExerciseService.delete(request.user.id, id);

    return response.status(HttpStatus.NO_CONTENT).json();
  }
}
