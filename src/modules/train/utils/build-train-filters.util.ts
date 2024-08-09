import { FilterTrainDTO } from '../dtos/requests/filter-train.dto';
import { buildPaginationQuery } from '../../../utils/buildPaginationQuery.util';

export const buildTrainFilters = (dto: FilterTrainDTO) => {
  const filterConditions: any = {};

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
