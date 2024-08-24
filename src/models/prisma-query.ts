export interface PrismaQuery<T> {
  select: {
    [key in keyof T]: boolean;
  };
  where: { [key in keyof T]: PrismaWhereInput<T> & PrismaFilter };
  orderBy: { [key in keyof T]: 'asc' | 'desc' };
  skip: number;
  take: number;
}

export interface PrismaWhereInput<T> {
  AND?: PrismaWhereInput<T> | PrismaWhereInput<T>[];
  OR?: PrismaWhereInput<T>[];
  NOT?: PrismaWhereInput<T> | PrismaWhereInput<T>[];
  [key: string]:
    | PrismaFilter
    | boolean
    | PrismaWhereInput<T>
    | PrismaWhereInput<T>[]
    | undefined;
}

export interface PrismaFilter {
  equals?: string | number | Date | null | undefined | boolean;
  in?: string[];
  notIn?: string[];
  lt?: string | number | Date | null | undefined | boolean;
  lte?: string | number | Date | null | undefined | boolean;
  gt?: string | number | Date | null | undefined | boolean;
  gte?: string | number | Date | null | undefined | boolean;
  contains?: string | number | Date | null | undefined | boolean;
  startsWith?: string | number | Date | null | undefined | boolean;
  endsWith?: string | number | Date | null | undefined | boolean;
  not?: PrismaFilter | string | number | Date | null | undefined | boolean;
}
