import { defaultPage, paginationItemLimit } from '../shared/consts';
import { PaginationQueryDTO } from '../@types/pagination-query.dto';

export function buildPaginationQuery(query: PaginationQueryDTO) {
  const page = Math.max(query.page ?? defaultPage, defaultPage);

  const limit = query.limit ?? paginationItemLimit;

  const offset = (page - 1) * limit;

  return {
    page: offset,
    limit: limit,
  };
}
