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
  Res,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TrainService } from '../service/train.service';
import { CreateTrainDTO } from '../dtos/requests/create-train.dto';
import { Response } from 'express';
import { FilterTrainDTO } from '../dtos/requests/filter-train.dto';
import { UpdateTrainDTO } from '../dtos/requests/update-train.dto';

@ApiTags('Trains')
@Controller('trains')
export class TrainController {
  constructor(private trainService: TrainService) {}

  @Post()
  async createTrain(@Body() dto: CreateTrainDTO, @Res() response: Response) {
    const train = await this.trainService.createTrain(dto);
    return response.status(HttpStatus.CREATED).json({
      data: train,
      status: HttpStatus.CREATED,
    });
  }

  @Get()
  async searchTrain(@Query() query: FilterTrainDTO, @Res() response: Response) {
    const trains = await this.trainService.searchTrain(query);
    return response.status(HttpStatus.OK).json({
      data: trains,
      status: HttpStatus.OK,
    });
  }

  @Get(':id')
  async getTrain(@Param('id') id: string, @Res() response: Response) {
    const train = await this.trainService.getTrainById(id);
    return response.status(HttpStatus.OK).json({
      data: train,
      status: HttpStatus.OK,
    });
  }

  @Patch(':id')
  async updateTrain(
    @Param('id') id: string,
    @Body() data: UpdateTrainDTO,
    @Res() response: Response,
  ) {
    const updatedTrain = await this.trainService.updateTrain(id, data);
    return response.status(HttpStatus.OK).json({
      data: updatedTrain,
      status: HttpStatus.OK,
    });
  }

  @Delete(':id')
  async deleteTrain(@Param('id') id: string, @Res() response: Response) {
    await this.trainService.deleteTrain(id);
    return response.status(HttpStatus.NO_CONTENT).json();
  }
}
