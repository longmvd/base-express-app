export interface PagingRequest {
  pageIndex: number;
  pageSize: number;
  filter: string;
  customFilter: string;
  columns: string;
  sorts: Sort[];
}

export class QueryParameter implements PagingRequest {
  pageIndex: number;
  pageSize: number;
  filter: any;
  columns: string;
  customFilter: string;
  sorts: Sort[];
  private filterParse: any[];
  private customFilterParse: any[];

  constructor(
    pageIndex: number,
    pageSize: number,
    filter: any,
    customFilter: string,
    columns: string,
    sorts: Sort[]
  ) {
    this.pageIndex = pageIndex;
    this.pageSize = pageSize;
    this.filter = filter;
    this.sorts = sorts;
    this.columns = columns;
    this.customFilter = customFilter;
    try {
      this.filterParse = JSON.parse(this.filter);
      this.customFilterParse = JSON.parse(this.customFilter);
    } catch (err) {
      this.filterParse = [];
      this.customFilterParse = [];
    }
  }

  public toPrismaQuery() {
    const selectProps = this.getColumnSelected(this.columns?.split(/[;,]/));
    const query = {
      skip: this.pageIndex * this.pageSize,
      take: this.pageSize,
      where: this.filter,
      orderBy: this.sorts.map((sort) => {
        return {
          [sort.selector]: sort.desc ? 'desc' : 'asc',
        };
      }),
      select: {},
    };
    return query;
  }
  private getColumnSelected(columns: string[]): any {
    const result: { [key: string]: any } = {};
    columns.forEach((column) => {
      result[column] = true;
    });
    return result;
  }
}

export interface Sort {
  selector: string;
  desc: boolean;
}
