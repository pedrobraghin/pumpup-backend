import { Injectable, NotFoundException } from '@nestjs/common';
import { MuscleSerieRepository } from '../repository/muscle-serie.repository';
import { CreateMuscleSeriesRequestDTO } from '../dtos/requests/create-muscle-serie-request.dto';
import { MuscleSerieBuider } from '../builders/muscle-serie.buider';
import { PaginationQueryDTO } from '../../../@types/pagination-query.dto';
import { UpdateMuscleSerieDTO } from '../dtos/requests/update-muscle-serie.dto';

@Injectable()
export class MuscleSerieService {
  constructor(private muscleSerieRepository: MuscleSerieRepository) {}

  async createMuscleSerie(dto: CreateMuscleSeriesRequestDTO, userId: string) {
    const muscleSerie = await this.muscleSerieRepository.create({
      ...dto,
      userId,
    });
    return MuscleSerieBuider.buildMuscle(muscleSerie);
  }

  async getMuscleSerieById(id: string, userId) {
    const muscleSerie = await this.muscleSerieRepository.getById(id, userId);
    if (!muscleSerie) {
      throw new NotFoundException('Muscle serie not found');
    }
    return MuscleSerieBuider.buildMuscle(muscleSerie);
  }

  async getMuscleSeries(userId: string, paginationQuery: PaginationQueryDTO) {
    const muscleSeries = await this.muscleSerieRepository.getMuscleSeries(
      userId,
      paginationQuery,
    );

    return muscleSeries.map((serie) => MuscleSerieBuider.buildMuscle(serie));
  }

  async updateMuscleSerie(
    id: string,
    userId: string,
    data: UpdateMuscleSerieDTO,
  ) {
    const muscleSerie = await this.muscleSerieRepository.getById(id, userId);
    if (!muscleSerie) {
      throw new NotFoundException('Muscle serie not found');
    }
    const updatedMuscleSerie =
      await this.muscleSerieRepository.updateMuscleSeries(id, userId, data);

    return MuscleSerieBuider.buildMuscle(updatedMuscleSerie);
  }

  async deleteMuscleSeries(id: string, userId: string) {
    const muscleSerie = await this.muscleSerieRepository.getById(id, userId);
    if (!muscleSerie) {
      throw new NotFoundException('Muscle serie not found');
    }
    await this.muscleSerieRepository.delete(id, userId);
  }
}
