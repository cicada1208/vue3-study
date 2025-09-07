import type { CancelTokenSource, AxiosRequestConfig } from 'axios';
import axios from 'axios';

export interface IApiContent<TRst = unknown> {
  loading?: boolean;
  rst?: TRst;
  err?: boolean;
  cancelTokenSource?: CancelTokenSource;
}

export class ApiContent<TRst = unknown> implements IApiContent<TRst> {
  loading: boolean;
  rst: TRst;
  err: boolean;
  cancelTokenSource: CancelTokenSource;

  constructor({
    loading = false,
    rst = {} as TRst,
    err = false,
    cancelTokenSource = undefined
  }: IApiContent<TRst> = {}) {
    this.loading = loading;
    this.rst = rst;
    this.err = err;
    this.cancelTokenSource = cancelTokenSource;
  }

  cancel(message?: string, config?: AxiosRequestConfig, request?: any): void {
    this.cancelTokenSource?.cancel(message, config, request);
    this.cancelTokenSource = axios.CancelToken.source();
    this.loading = false;
  }
}
