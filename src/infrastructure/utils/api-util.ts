import type { ApiContent } from '@/infrastructure/models/api-content';
import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';
import { convertDate } from './date-util';

interface ISetApiError {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (error: AxiosError): any;
}

interface IApiOption {
  /**
   * 出錯時是否拋出 Exception
   * @default false
   */
  throwOnFailed?: boolean;
}

export class BaseApi {
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

    // request interceptors：請求前，後添加的會先執行。
    // response interceptors：響應後，先添加的會先執行。
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
      method = 'POST',
      params, // url parameters
      data = null, // request body
      headers,
      ...restAxiosRequestConfig
    }: AxiosRequestConfig = {}
  ): void {
    content.loading = true;
    content.err = false;
    // 不清空資料，對於較花時間的查詢可同時顯示 loading 及資料
    // content.rst = {} as TRst;
    let cancel = false;

    this.axios({
      url,
      method,
      params,
      data,
      headers,
      cancelToken: content.cancelTokenSource?.token,
      ...restAxiosRequestConfig
    })
      .then(response => {
        content.err = false;
        content.rst = response.data;
      })
      .catch((error: AxiosError) => {
        if (axios.isCancel(error)) {
          cancel = true;
          console.log('baseApi.method cancel:', error.message);
        } else {
          content.err = true;
          content.rst = this.setApiError(error);
          // 若 TRst 非 Model 型別，且 setApiError 回傳非 Model 型別(例如 string)，
          // 可透過 content.err 判斷 content.rst 為錯誤訊息，
          // 且此時 typeof content.rst 可為 'string'。
          // 若 TRst 為 ApiResult 型別，代表後端已統一回傳格式，可直接判斷 ApiResult.Succ。
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
    axiosRequestConfig: AxiosRequestConfig = {}
  ): void {
    this.method<TRst>(content, url, {
      method: 'GET',
      ...axiosRequestConfig
    });
  }

  /** axios with loading
   * @template TRst 通常為 ApiResult 型別
   */
  post<TRst>(
    content: ApiContent<TRst>,
    url: string,
    axiosRequestConfig: AxiosRequestConfig = {}
  ): void {
    this.method<TRst>(content, url, {
      method: 'POST',
      ...axiosRequestConfig
    });
  }

  /** axios with loading
   * @template TRst 通常為 ApiResult 型別
   */
  put<TRst>(
    content: ApiContent<TRst>,
    url: string,
    axiosRequestConfig: AxiosRequestConfig = {}
  ): void {
    this.method<TRst>(content, url, {
      method: 'PUT',
      ...axiosRequestConfig
    });
  }

  /** axios with loading
   * @template TRst 通常為 ApiResult 型別
   */
  patch<TRst>(
    content: ApiContent<TRst>,
    url: string,
    axiosRequestConfig: AxiosRequestConfig = {}
  ): void {
    this.method<TRst>(content, url, {
      method: 'PATCH',
      ...axiosRequestConfig
    });
  }

  /** axios with loading
   * @template TRst 通常為 ApiResult 型別
   */
  delete<TRst>(
    content: ApiContent<TRst>,
    url: string,
    axiosRequestConfig: AxiosRequestConfig = {}
  ): void {
    this.method<TRst>(content, url, {
      method: 'DELETE',
      ...axiosRequestConfig
    });
  }

  /** axios return promise
   * @template TRst 通常為 ApiResult 型別
   */
  methodPs<TRst>(
    url: string,
    {
      method = 'POST',
      params, // url parameters
      data = null, // request body
      headers,
      ...restAxiosRequestConfig
    }: AxiosRequestConfig = {},
    { throwOnFailed = false }: IApiOption = {}
  ): Promise<TRst> {
    return this.axios({
      url,
      method,
      params,
      data,
      headers,
      ...restAxiosRequestConfig
    })
      .then<TRst>(response => response.data)
      .catch<TRst>(error => {
        const apiError = this.setApiError(error);
        console.error('baseApi.methodPs error:', apiError);
        if (throwOnFailed) return Promise.reject(apiError);
        else return apiError;
      });
  }

  /** axios return promise
   * @template TRst 通常為 ApiResult 型別
   */
  getPs<TRst>(
    url: string,
    axiosRequestConfig: AxiosRequestConfig = {},
    apiOption: IApiOption = {}
  ): Promise<TRst> {
    return this.methodPs<TRst>(
      url,
      {
        method: 'GET',
        ...axiosRequestConfig
      },
      apiOption
    );
  }

  /** axios return promise
   * @template TRst 通常為 ApiResult 型別
   */
  postPs<TRst>(
    url: string,
    axiosRequestConfig: AxiosRequestConfig = {},
    apiOption: IApiOption = {}
  ): Promise<TRst> {
    return this.methodPs<TRst>(
      url,
      {
        method: 'POST',
        ...axiosRequestConfig
      },
      apiOption
    );
  }

  /** axios return promise
   * @template TRst 通常為 ApiResult 型別
   */
  putPs<TRst>(
    url: string,
    axiosRequestConfig: AxiosRequestConfig = {},
    apiOption: IApiOption = {}
  ): Promise<TRst> {
    return this.methodPs<TRst>(
      url,
      {
        method: 'PUT',
        ...axiosRequestConfig
      },
      apiOption
    );
  }

  /** axios return promise
   * @template TRst 通常為 ApiResult 型別
   */
  patchPs<TRst>(
    url: string,
    axiosRequestConfig: AxiosRequestConfig = {},
    apiOption: IApiOption = {}
  ): Promise<TRst> {
    return this.methodPs<TRst>(
      url,
      {
        method: 'PATCH',
        ...axiosRequestConfig
      },
      apiOption
    );
  }

  /** axios return promise
   * @template TRst 通常為 ApiResult 型別
   */
  deletePs<TRst>(
    url: string,
    axiosRequestConfig: AxiosRequestConfig = {},
    apiOption: IApiOption = {}
  ): Promise<TRst> {
    return this.methodPs<TRst>(
      url,
      {
        method: 'DELETE',
        ...axiosRequestConfig
      },
      apiOption
    );
  }
}
