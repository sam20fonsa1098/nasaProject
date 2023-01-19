export interface IPaging {
  limit?: number;
  page?: number;
}

export interface IBaseRepository<T> {
  list(paging: IPaging): Promise<Array<T>>;
  create(entity: T): Promise<void>;
}
