import ApiResult from '@/libs/models/api-result';
import { BaseApi } from '@/libs/utils/api-util';
// import store from '@/store';
// import Msg from '@/models/msg';
// import axios from 'axios';
import type { AxiosError } from 'axios';
import { apiUrls } from './api-urls';
import type { IApiUrl, AppRun } from './api-urls';
import { createFetch } from '@/libs/vueuse/useFetch';

const apiUrl: IApiUrl = apiUrls[import.meta.env.VITE_APP_RUN as AppRun];

/** set comApi error
 * @param error axios catch error
 * @returns error.response?.data or error.message or error.name
 */
function setComApiError(error: AxiosError) {
  return error.response?.data || error.message || error.name;
}

/** set ndbApi error
 * @param error axios catch error
 * @returns ApiResult
 */
function setNdbApiError(error: AxiosError): ApiResult {
  return (
    (error.response?.data as ApiResult) ||
    new ApiResult({
      Code: error.response?.status,
      Msg: error.message || error.name
    })
  );
}

// /** comApi response no specific model when error */
// const comApi = new BaseApi('', setComApiError);

/** ndbApi response ApiResult */
const ndbApi = new BaseApi(apiUrl.ndb, setNdbApiError);
ndbApi.axios.interceptors.request.use(
  config => {
    // 在發送請求前做些處理
    // // // const user = JSON.parse(localStorage.getItem('user'));
    // // const user = store.state.auth.user;
    // // if (user?.token) config.headers.Authorization = `Bearer ${user.token}`;
    // const token = store.state.auth.token;
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  error => {
    // 對請求錯誤做些處理
    return Promise.reject(error);
  }
);
ndbApi.axios.interceptors.response.use(
  response => {
    // 2xx 狀態碼觸發該函數

    // const rst: ApiResult = response?.data;
    // if (rst && !rst.Succ && rst.Msg) {
    //   store.dispatch(
    //     'alert/setMsg',
    //     new Msg({
    //       show: true,
    //       type: 'error',
    //       msg: rst.Msg
    //     })
    //   );
    // }

    return response;
  },
  (error: AxiosError) => {
    // 非 2xx 狀態碼觸發該函數
    // ex: token expired, logout
    // let msg = setNdbApiError(error).Msg;

    // if (error.response?.status === 401) {
    //   // alert(`重新登入：${err.response?.data.Msg}`);
    //   msg = `重新登入：${msg}`;
    // }

    // if (!axios.isCancel(error)) {
    //   store.dispatch(
    //     'alert/setMsg',
    //     new Msg({
    //       show: true,
    //       type: 'error',
    //       msg
    //     })
    //   );
    // }

    // if (error.response?.status === 401) store.dispatch('auth/logout');
    return Promise.reject(error);
  }
);

/** hrApi response no specific model when error */
const hrApi = new BaseApi(apiUrl.hr, setComApiError);
hrApi.axios.interceptors.response.use(
  response => {
    // 2xx 狀態碼觸發該函數
    return response;
  },
  (error: AxiosError) => {
    // 非 2xx 狀態碼觸發該函數
    // const msg = setComApiError(error);

    // if (!axios.isCancel(error)) {
    //   store.dispatch(
    //     'alert/setMsg',
    //     new Msg({
    //       show: true,
    //       type: 'error',
    //       msg
    //     })
    //   );
    // }

    return Promise.reject(error);
  }
);

const useFetchNdb = createFetch({
  baseUrl: apiUrl.ndb,
  options: {
    // async beforeFetch({ options }) {
    //   const myToken = await getMyToken();
    //   options.headers.Authorization = `Bearer ${myToken}`;
    //   return { options };
    // }
    onFetchError(ctx) {
      ctx.data =
        ctx.data ||
        new ApiResult({
          Code: ctx.response?.status,
          Msg: ctx.error?.message || ctx.error?.name
        });

      ctx.error = ctx.data;
      return ctx;
    }
  }
});

export { ndbApi, hrApi, useFetchNdb };
