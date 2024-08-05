import { GetImagesQueryDTO } from '../dtos/requests/get-images-query.dto';
import { defaultPage, paginationItemLimit } from '../../../shared/consts';

export function buildImageQuery(query: GetImagesQueryDTO) {
  if (query.page) {
    if (query.page <= 0) {
      query.page = defaultPage;
    }

    if (!query.limit) {
      query.limit = paginationItemLimit;
    }
    query.page = Number(query.page - defaultPage) * query.limit; // Ajusta a página para ser zero
  }

  return query;
}
