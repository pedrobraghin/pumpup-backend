import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Logger,
  Param,
  Patch,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { CreateExerciseDTO } from '../dtos/requests/create-exercise.dto';
import { Response } from 'express';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Exercise } from '../dtos/exercise.dto';
import { ExerciseService } from '../services/exercise.service';
import { GetExercisesFilterDTO } from '../dtos/requests/filter-exercise.dto';
import { UpdateExerciseDTO } from '../dtos/requests/update-exercise.dto';

@ApiTags('Exercises')
@Controller('exercises')
export class ExerciseController {
  private readonly logger = new Logger('Exercises Controller');

  constructor(private readonly exerciseService: ExerciseService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new exercise' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Exercises created successfully.',
    type: Exercise,
  })
  @ApiBody({ type: CreateExerciseDTO })
  async createExercise(
    @Body() dto: CreateExerciseDTO,
    @Res() response: Response,
  ) {
    const exercise = await this.exerciseService.createExercise(dto);
    this.logger.debug(exercise, 'Create Response');
    return response.status(HttpStatus.CREATED).json({
      data: exercise,
      status: HttpStatus.CREATED,
    });
  }

  @Get('search')
  @ApiOperation({ summary: 'Get all exercises' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Exercises',
    type: [Exercise],
  })
  async getExercises(
    @Query() filters: GetExercisesFilterDTO,
    @Res() response: Response,
    @Query('name') name?: string,
  ) {
    const exercises = await this.exerciseService.searchExercises(name, filters);
    return response.status(HttpStatus.OK).json({
      data: exercises,
      status: HttpStatus.OK,
    });
  }

  @Get('page/:pageNumber')
  async getWithPagination(
    @Query() filters: GetExercisesFilterDTO,
    @Query('take') take: number,
    @Param('pageNumber') pageNumber: number,
    @Res() response: Response,
  ) {
    const exercises = await this.exerciseService.getWithPagination(
      pageNumber,
      take,
      filters,
    );

    return response.status(HttpStatus.OK).json({
      data: exercises,
      status: HttpStatus.OK,
    });
  }

  @Get('/muscle')
  async getByTargetMuscle(
    @Query('targetMuscle') targetMuscle: string,
    @Res() response: Response,
  ) {
    const exercises =
      await this.exerciseService.getByTargetMuscle(targetMuscle);
    return response.status(HttpStatus.OK).json({
      data: exercises,
      status: HttpStatus.OK,
    });
  }

  @Get(':id')
  async getExerciseById(@Param('id') id: string, @Res() response: Response) {
    const exercise = await this.exerciseService.getExerciseById(id);
    return response.status(HttpStatus.OK).json({
      data: exercise,
      status: HttpStatus.OK,
    });
  }

  @Patch(':id')
  async updateExercise(
    @Param('id') id: string,
    @Res() response: Response,
    @Body() dto: UpdateExerciseDTO,
  ) {
    const updatedExercise = await this.exerciseService.updateExercise(dto, id);
    return response.status(HttpStatus.OK).json({
      data: updatedExercise,
      status: HttpStatus.OK,
    });
  }

  @Delete(':id')
  async deleteExercise(@Param('id') id: string, @Res() response: Response) {
    await this.exerciseService.deleteExercise(id);
    return response.status(HttpStatus.NO_CONTENT).json();
  }
}
