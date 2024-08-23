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
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { CardioSerieService } from '../service/cardio-serie.service';
import { CreateCardioSerieRequestDTO } from '../dtos/requests/create-cardio-serie-request.dto';
import { Request, Response } from 'express';
import { PaginationQueryDTO } from '../../../@types/pagination-query.dto';
import { Intensity } from '../enums/intensity.enum';
import { UpdateCardioSerieDTO } from '../dtos/requests/update-cardio-serie.dto';
import { QueryCardioSerieDTO } from '../dtos/requests/query-cardio-serie.dto';

@ApiTags('Cardio Series')
@Controller('cardioSerie')
export class CardioSerieController {
  constructor(private cardioSerieService: CardioSerieService) {}

  @Post()
  async createCardioSerie(
    @Body() dto: CreateCardioSerieRequestDTO,
    @Res() response: Response,
    @Req() request: Request,
  ) {
    const cardioSerie = await this.cardioSerieService.createCardioSerie(
      dto,
      request.user.id,
    );

    return response.status(HttpStatus.CREATED).json({
      data: cardioSerie,
      status: HttpStatus.CREATED,
    });
  }

  @ApiQuery({
    name: 'intensity',
    enum: Intensity,
    required: false,
  })
  @Get()
  async getAllCardioSeries(
    @Res() response: Response,
    @Query() query: QueryCardioSerieDTO & PaginationQueryDTO,
    @Req() request: Request,
  ) {
    const cardioSeries = await this.cardioSerieService.getAllCardioSeries(
      request.user.id,
      query,
      query.intensity,
    );
    return response.status(HttpStatus.OK).json({
      data: cardioSeries,
      status: HttpStatus.OK,
    });
  }

  @Get(':id')
  async getCardioSerie(
    @Res() response: Response,
    @Req() request: Request,
    @Param('id') id: string,
  ) {
    const cardioSerie = await this.cardioSerieService.getCardioSerieById(
      id,
      request.user.id,
    );

    return response.status(HttpStatus.OK).json({
      data: cardioSerie,
      status: HttpStatus.OK,
    });
  }

  @Patch(':id')
  async updateCardioSeries(
    @Res() response: Response,
    @Param('id') id: string,
    @Body() data: UpdateCardioSerieDTO,
    @Req() request: Request,
  ) {
    const cardioSeries = await this.cardioSerieService.updateCardioSerie(
      id,
      request.user.id,
      data,
    );

    return response.status(HttpStatus.OK).json({
      data: cardioSeries,
      status: HttpStatus.OK,
    });
  }

  @Delete(':id')
  async deleteCardioSeries(
    @Res() response: Response,
    @Param('id') id: string,
    @Req() request: Request,
  ) {
    await this.cardioSerieService.deleteCardioSerie(request.user.id, id);

    return response.status(HttpStatus.NO_CONTENT).json();
  }
}
