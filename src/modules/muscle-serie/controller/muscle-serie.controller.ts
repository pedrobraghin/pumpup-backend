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
import { CreateMuscleSeriesRequestDTO } from '../dtos/requests/create-muscle-serie-request.dto';
import { Request, Response } from 'express';
import { MuscleSerieService } from '../service/muscle-serie.service';
import { PaginationQueryDTO } from '../../../@types/pagination-query.dto';
import { UpdateMuscleSerieDTO } from '../dtos/requests/update-muscle-serie.dto';

@ApiTags('Muscle Series')
@Controller('muscleSeries')
export class MuscleSerieController {
  constructor(private muscleSerieService: MuscleSerieService) {}

  @Post()
  async createMuscleSerie(
    @Body() dto: CreateMuscleSeriesRequestDTO,
    @Res() response: Response,
    @Req() request: Request,
  ) {
    const muscleSerie = await this.muscleSerieService.createMuscleSerie(
      dto,
      request.user.id,
    );
    return response.status(HttpStatus.CREATED).json({
      data: muscleSerie,
      status: HttpStatus.CREATED,
    });
  }

  @Get('muscles-series')
  async getUserMuscleSeries(
    @Res() response: Response,
    @Req() request: Request,
    @Query() paginationQuery: PaginationQueryDTO,
  ) {
    const muscleSeries = await this.muscleSerieService.getMuscleSeries(
      request.user.id,
      paginationQuery,
    );
    return response.status(HttpStatus.OK).json({
      data: muscleSeries,
      status: HttpStatus.OK,
    });
  }

  @Get(':id')
  async getMuscleSerieById(
    @Param('id') id: string,
    @Res() response: Response,
    @Req() request: Request,
  ) {
    const muscleSerie = await this.muscleSerieService.getMuscleSerieById(
      id,
      request.user.id,
    );
    return response.status(HttpStatus.OK).json({
      data: muscleSerie,
      status: HttpStatus.OK,
    });
  }

  @Patch(':id')
  async updateMuscleSerie(
    @Param('id') id: string,
    @Req() request: Request,
    @Res() response: Response,
    @Body() data: UpdateMuscleSerieDTO,
  ) {
    const updatedMuscleSerie = await this.muscleSerieService.updateMuscleSerie(
      id,
      request.user.id,
      data,
    );

    return response.status(HttpStatus.OK).json({
      data: updatedMuscleSerie,
      status: HttpStatus.OK,
    });
  }

  @Delete(':delete')
  async deleteMuscleSerie(
    @Param('id') id: string,
    @Res() response: Response,
    @Req() request: Request,
  ) {
    await this.muscleSerieService.deleteMuscleSeries(id, request.user.id);
    return response.status(HttpStatus.NO_CONTENT).json();
  }
}
