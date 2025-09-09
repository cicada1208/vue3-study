import msgConst from '@/infrastructure/consts/msg-const';

export class ApiResult<TData = unknown> {
  Succ: boolean = false;
  Code: number | null = null;
  Msg: string = msgConst.apiFailure;
  Data: TData | null = null;
  RowsAffected: number = 0;

  constructor(data?: Partial<ApiResult<TData>>) {
    Object.assign(this, data);
  }
}
