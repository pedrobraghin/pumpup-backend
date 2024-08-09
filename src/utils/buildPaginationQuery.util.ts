import { defaultPage, paginationItemLimit } from '../shared/consts';
import { PaginationQueryDTO } from '../@types/pagination-query.dto';

export function buildPaginationQuery(query: PaginationQueryDTO) {
  if (query.page) {
    if (query.page <= 0) {
      query.page = defaultPage;
    }

    if (!query.limit) {
      query.limit = paginationItemLimit;
    }
    query.page = Number(query.page - defaultPage) * query.limit;

    return query;
  }
}
