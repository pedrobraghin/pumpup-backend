import { FilterTrainDTO } from '../dtos/requests/filter-train.dto';
import { buildPaginationQuery } from '../../../utils/buildPaginationQuery.util';
import { ITrainFilterConditions } from '../interfaces/ITrainFilterConditions.interface';

export const buildTrainFilters = (dto: FilterTrainDTO) => {
  const filterConditions: ITrainFilterConditions = {};

  if (dto.name) {
    filterConditions.name = { contains: dto.name, mode: 'insensitive' };
  }

  if (dto.weekday !== undefined) {
    filterConditions.weekday = dto.weekday;
  }

  const paginationQuery = buildPaginationQuery(dto);

  return {
    filterConditions,
    paginationQuery,
  };
};