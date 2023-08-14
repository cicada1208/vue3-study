export interface IApiContent<TRst = unknown> {
  loading?: boolean;
  rst?: TRst;
  err?: boolean;
}

export default class ApiContent<TRst = unknown> implements IApiContent<TRst> {
  loading: boolean;
  rst: TRst;
  err: boolean;

  constructor({
    loading = false,
    rst = {} as TRst,
    err = false
  }: IApiContent<TRst> = {}) {
    this.loading = loading;
    this.rst = rst;
    this.err = err;
  }
}
