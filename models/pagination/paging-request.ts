export interface PagingResponse<T> {
  pageIndex: number;
  pageSize: number;
  filter: any;
  sorts: Sort[];
}

interface Sort {
  selector: string;
  desc: boolean;
}
