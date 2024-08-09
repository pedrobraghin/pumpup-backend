import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TrainService } from '../service/train.service';
import { CreateTrainDTO } from '../dtos/requests/create-train.dto';
import { Response } from 'express';

@ApiTags('Trains')
@Controller('trains')
export class TrainController {
  constructor(private trainService: TrainService) {
  }

  @Post()
  async createTrain(@Body() dto: CreateTrainDTO, @Res() response: Response) {
    const train = await this.trainService.createTrain(dto);
    return response.status(HttpStatus.CREATED).json({
      data: train,
      status: HttpStatus.CREATED,
    });
  }
}
