import { ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { TrainHistoryExerciseSerieService } from '../service/train-history-exercise-serie.service';
import { Request, Response } from 'express';
import { CreateTrainHistoryExerciseSerieRequestDTO } from '../dtos/requests/create-train-history-exercise-serie-request.dto';
import { QueryTrainHistoryExerciseSerieDTO } from '../dtos/requests/query-train-history-exercise-serie.dto';

@ApiTags('Train History Exercise Serie')
@Controller('train-history-exercise-serie')
export class TrainHistoryExerciseSerieController {
  constructor(
    private trainHistoryExerciseSerieService: TrainHistoryExerciseSerieService,
  ) {}

  @Post()
  async createTrainHistoryExerciseSerie(
    @Res() response: Response,
    @Req() request: Request,
    @Body() dto: CreateTrainHistoryExerciseSerieRequestDTO,
  ) {
    const trainHistoryExerciseSerie =
      await this.trainHistoryExerciseSerieService.createTrainHistoryExerciseSerie(
        request.user.id,
        dto,
      );

    return response.status(HttpStatus.CREATED).json({
      data: trainHistoryExerciseSerie,
      status: HttpStatus.CREATED,
    });
  }

  @Get()
  async getFilteredTrainHistoryExerciseSeries(
    @Res() response: Response,
    @Req() request: Request,
    @Query() query: QueryTrainHistoryExerciseSerieDTO,
  ) {
    const trainHistoryExerciseSeries =
      await this.trainHistoryExerciseSerieService.filterTrainHistoryExerciseSeries(
        // request.user.id,
        '28ec41fc-442a-4488-8665-d34c27411f03',

        query,
      );

    return response.status(HttpStatus.OK).json({
      data: trainHistoryExerciseSeries,
      status: HttpStatus.OK,
    });
  }

  @Get(':id')
  async getTrainHistoryExerciseSerie(
    @Res() response: Response,
    @Req() request: Request,
    @Param('id') id: string,
  ) {
    const trainHistoryExerciseSerie =
      await this.trainHistoryExerciseSerieService.getById(id, request.user.id);

    return response.status(HttpStatus.OK).json({
      data: trainHistoryExerciseSerie,
      status: HttpStatus.OK,
    });
  }

  @Delete(':id')
  async deleteTrainHistoryExerciseSerie(
    @Res() response: Response,
    @Req() request: Request,
    @Param('id') id: string,
  ) {
    await this.trainHistoryExerciseSerieService.deleteTrainHistoryExerciseSerie(
      id,
      request.user.id,
    );
    return response.status(HttpStatus.NO_CONTENT).json();
  }
}
