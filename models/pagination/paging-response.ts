export interface PagingResponse<T> {
  pageData: T[];
  pageIndex: number;
  pageSize: number;
  total: number;
}
