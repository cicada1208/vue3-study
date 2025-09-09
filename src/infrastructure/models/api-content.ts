import type { CancelTokenSource, AxiosRequestConfig } from 'axios';
import axios from 'axios';

export class ApiContent<TRst = unknown> {
  loading: boolean = false;
  rst: TRst = {} as TRst;
  err: boolean = false;
  cancelTokenSource?: CancelTokenSource;

  constructor(data?: Partial<ApiContent<TRst>>) {
    Object.assign(this, data);
  }

  cancel(message?: string, config?: AxiosRequestConfig, request?: any): void {
    this.cancelTokenSource?.cancel(message, config, request);
    this.cancelTokenSource = axios.CancelToken.source();
    this.loading = false;
  }
}
