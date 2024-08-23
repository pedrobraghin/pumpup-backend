import { Injectable, NotFoundException } from '@nestjs/common';
import { CardioSerieRepository } from '../repository/cardio-serie.repository';
import { CreateCardioSerieRequestDTO } from '../dtos/requests/create-cardio-serie-request.dto';
import { CardioSerieBuider } from '../builders/cardio-serie.builder';
import { UpdateCardioSerieDTO } from '../dtos/requests/update-cardio-serie.dto';
import { PaginationQueryDTO } from '../../../@types/pagination-query.dto';
import { Intensity } from '../enums/intensity.enum';

@Injectable()
export class CardioSerieService {
  constructor(private cardioSerieRepository: CardioSerieRepository) {}

  async createCardioSerie(dto: CreateCardioSerieRequestDTO, userId: string) {
    const cardioSerie = await this.cardioSerieRepository.create({
      ...dto,
      userId,
    });
    return CardioSerieBuider.buildCardio(cardioSerie);
  }

  async updateCardioSerie(
    serieId: string,
    userId: string,
    dto: UpdateCardioSerieDTO,
  ) {
    const cardioSerie = await this.cardioSerieRepository.getById(
      serieId,
      userId,
    );

    if (!cardioSerie) {
      throw new NotFoundException('Cardio serie not found');
    }

    const updatedCardioSerie = await this.cardioSerieRepository.update(
      serieId,
      userId,
      dto,
    );

    return CardioSerieBuider.buildCardio(updatedCardioSerie);
  }

  async getCardioSerieById(id: string, userId: string) {
    const cardioSerie = await this.cardioSerieRepository.getById(id, userId);
    if (!cardioSerie) {
      throw new NotFoundException('Cardio serie not found');
    }

    return CardioSerieBuider.buildCardio(cardioSerie);
  }

  async getAllCardioSeries(
    userId: string,
    paginationQuery: PaginationQueryDTO,
    intensity?: Intensity,
  ) {
    const cardioSeries = await this.cardioSerieRepository.getAll(
      userId,
      paginationQuery,
      intensity,
    );

    return cardioSeries.map((serie) => CardioSerieBuider.buildCardio(serie));
  }

  async deleteCardioSerie(userId: string, id: string) {
    const cardioSerie = await this.cardioSerieRepository.getById(id, userId);
    if (!cardioSerie) {
      throw new NotFoundException('Cardio serie not found');
    }
    await this.cardioSerieRepository.delete(cardioSerie.id, userId);
  }
}
