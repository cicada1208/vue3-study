import type ApiContent from '@/models/api-content';
import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';
import { convertDate } from './date-util';

interface ISetApiError {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (error: AxiosError): any;
}

export default class BaseApi {
  baseUrl: string;
  setApiError: ISetApiError;
  axios: AxiosInstance;

  constructor(baseUrl: string, setApiError: ISetApiError) {
    this.baseUrl = baseUrl;
    this.setApiError = setApiError;

    // axios instance default
    this.axios = axios.create({
      baseURL: this.baseUrl
      // headers: {
      //   Accept: 'application/json',
      //   'Content-Type': 'application/json'
      // }
    });

    // request interceptors：請求前後添加的會先執行。
    // response interceptors：響應後先添加的會先執行。
    this.axios.interceptors.response.use(
      response => {
        // 2xx 狀態碼觸發該函數
        convertDate(response.data);
        return response;
      },
      (error: AxiosError) => {
        // 非 2xx 狀態碼觸發該函數
        return Promise.reject(error);
      }
    );
  }

  /** axios with loading
   * @template TRst 通常為 ApiResult 型別
   */
  method<TRst>(
    content: ApiContent<TRst>,
    url: string,
    {
      params, // url parameters
      data = null, // request body
      method = 'POST',
      headers,
      ...restOption
    }: AxiosRequestConfig = {}
  ): void {
    content.loading = true;
    // 不清空資料，對於較花時間的查詢可同時顯示 loading 及資料
    // content.rst = {} as TRst;
    content.err = false;
    let cancel = false;

    this.axios({
      url,
      params,
      data,
      method,
      headers,
      ...restOption
    })
      .then(response => (content.rst = response.data))
      .catch((error: AxiosError) => {
        if (axios.isCancel(error)) {
          cancel = true;
          console.log('baseApi.method cancel:', error.message);
        } else {
          content.err = true;
          content.rst = this.setApiError(error);
          console.error('baseApi.method error:', content.rst);
        }
      })
      .finally(() => {
        if (!cancel) content.loading = false;
      });
  }

  /** axios with loading
   * @template TRst 通常為 ApiResult 型別
   */
  get<TRst>(
    content: ApiContent<TRst>,
    url: string,
    { params, data = null, headers, ...restOption }: AxiosRequestConfig = {}
  ): void {
    this.method<TRst>(content, url, {
      params,
      data,
      method: 'GET',
      headers,
      ...restOption
    });
  }

  /** axios with loading
   * @template TRst 通常為 ApiResult 型別
   */
  post<TRst>(
    content: ApiContent<TRst>,
    url: string,
    { params, data = null, headers, ...restOption }: AxiosRequestConfig = {}
  ): void {
    this.method<TRst>(content, url, {
      params,
      data,
      method: 'POST',
      headers,
      ...restOption
    });
  }

  /** axios with loading
   * @template TRst 通常為 ApiResult 型別
   */
  put<TRst>(
    content: ApiContent<TRst>,
    url: string,
    { params, data = null, headers, ...restOption }: AxiosRequestConfig = {}
  ): void {
    this.method<TRst>(content, url, {
      params,
      data,
      method: 'PUT',
      headers,
      ...restOption
    });
  }

  /** axios with loading
   * @template TRst 通常為 ApiResult 型別
   */
  patch<TRst>(
    content: ApiContent<TRst>,
    url: string,
    { params, data = null, headers, ...restOption }: AxiosRequestConfig = {}
  ): void {
    this.method<TRst>(content, url, {
      params,
      data,
      method: 'PATCH',
      headers,
      ...restOption
    });
  }

  /** axios with loading
   * @template TRst 通常為 ApiResult 型別
   */
  delete<TRst>(
    content: ApiContent<TRst>,
    url: string,
    { params, data = null, headers, ...restOption }: AxiosRequestConfig = {}
  ): void {
    this.method<TRst>(content, url, {
      params,
      data,
      method: 'DELETE',
      headers,
      ...restOption
    });
  }

  /** axios return promise
   * @template TRst 通常為 ApiResult 型別
   */
  methodPs<TRst>(
    url: string,
    {
      params, // url parameters
      data = null, // request body
      method = 'POST',
      headers,
      ...restOption
    }: AxiosRequestConfig = {}
  ): Promise<TRst> {
    return this.axios({
      url,
      params,
      data,
      method,
      headers,
      ...restOption
    })
      .then<TRst>(response => response.data)
      .catch<TRst>(error => {
        const apiError = this.setApiError(error);
        console.error('baseApi.methodPs error:', apiError);
        return apiError;
      });
  }

  /** axios return promise
   * @template TRst 通常為 ApiResult 型別
   */
  getPs<TRst>(
    url: string,
    { params, data = null, headers, ...restOption }: AxiosRequestConfig = {}
  ): Promise<TRst> {
    return this.methodPs<TRst>(url, {
      params,
      data,
      method: 'GET',
      headers,
      ...restOption
    });
  }

  /** axios return promise
   * @template TRst 通常為 ApiResult 型別
   */
  postPs<TRst>(
    url: string,
    { params, data = null, headers, ...restOption }: AxiosRequestConfig = {}
  ): Promise<TRst> {
    return this.methodPs<TRst>(url, {
      params,
      data,
      method: 'POST',
      headers,
      ...restOption
    });
  }

  /** axios return promise
   * @template TRst 通常為 ApiResult 型別
   */
  putPs<TRst>(
    url: string,
    { params, data = null, headers, ...restOption }: AxiosRequestConfig = {}
  ): Promise<TRst> {
    return this.methodPs<TRst>(url, {
      params,
      data,
      method: 'PUT',
      headers,
      ...restOption
    });
  }

  /** axios return promise
   * @template TRst 通常為 ApiResult 型別
   */
  patchPs<TRst>(
    url: string,
    { params, data = null, headers, ...restOption }: AxiosRequestConfig = {}
  ): Promise<TRst> {
    return this.methodPs<TRst>(url, {
      params,
      data,
      method: 'PATCH',
      headers,
      ...restOption
    });
  }

  /** axios return promise
   * @template TRst 通常為 ApiResult 型別
   */
  deletePs<TRst>(
    url: string,
    { params, data = null, headers, ...restOption }: AxiosRequestConfig = {}
  ): Promise<TRst> {
    return this.methodPs<TRst>(url, {
      params,
      data,
      method: 'DELETE',
      headers,
      ...restOption
    });
  }
}
