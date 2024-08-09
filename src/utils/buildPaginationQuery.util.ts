import { defaultPage, paginationItemLimit } from '../shared/consts';
import { PaginationQueryDTO } from '../@types/pagination-query.dto';

export function buildPaginationQuery(query: PaginationQueryDTO) {
  const result = { ...query };

  const page = result.page > 0 ? result.page : defaultPage;
  const limit = result.limit || paginationItemLimit;

  result.page = (page - 1) * limit;
  result.limit = limit;

  return result;
}
