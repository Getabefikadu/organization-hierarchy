

import { CollectionResult } from './interfaces';

export class Collection<T> {
  public results: T[];
  public total: number;
  public per_page: number;

  constructor(collection: CollectionResult<T>) {
    this.results = collection.data;
    this.total = collection.total;
    this.per_page = collection.per_page;
  }
}