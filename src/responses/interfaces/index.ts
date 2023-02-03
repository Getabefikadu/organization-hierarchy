export interface PaginateOption {
  limit?: number;
  page?: number;
}

export interface CollectionResult<T> {
  data: T[];
  total: number;
  per_page: number;
}

