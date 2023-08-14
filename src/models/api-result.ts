import msgParam from '@/params/msg-param';

export interface IApiResult<TData = unknown> {
  Succ?: boolean;
  Code?: number;
  Msg?: string;
  Data?: TData;
  RowsAffected?: number;
}

export default class ApiResult<TData = unknown> implements IApiResult<TData> {
  Succ: boolean;
  Code: number;
  Msg: string;
  Data: TData;
  RowsAffected: number;

  constructor({
    Succ = false,
    Code = null,
    Msg = msgParam.apiFailure,
    Data = null,
    RowsAffected = 0
  }: IApiResult<TData> = {}) {
    this.Succ = Succ;
    this.Code = Code;
    this.Msg = Msg;
    this.Data = Data;
    this.RowsAffected = RowsAffected;
  }
}
