import ApiResult from '@/models/api-result';
import BaseApi from '@/libs/api-util';
import store from '@/store';
import Msg from '@/models/msg';
import axios, { AxiosError } from 'axios';
import apiUrls from './api-urls';
interface IApiUrl {
  ndb: string;
  opState: string;
  hr: string;
}

const apiUrl: IApiUrl = apiUrls[process.env.VUE_APP_RUN];

/** set comApi error
 * @param error axios catch error
 * @returns any or error.message
 */
function setComApiError(error: AxiosError) {
  return error.response?.data || error.message;
}

/** set ndbApi error
 * @param error axios catch error
 * @returns ApiResult
 */
function setNdbApiError(error: AxiosError): ApiResult {
  return error.response?.data || new ApiResult({ Msg: error.message });
}

// /** comApi response no specific json */
// const comApi = new BaseApi('', setComApiError);

/** ndbApi response specific json */
const ndbApi = new BaseApi(apiUrl.ndb, setNdbApiError);
ndbApi.axios.interceptors.request.use(
  config => {
    // 在發送請求前做些處理
    // // const user = JSON.parse(localStorage.getItem('user'));
    // const user = store.state.auth.user;
    // if (user?.token) config.headers.Authorization = `Bearer ${user.token}`;
    const token = store.state.auth.token;
    if (token) config.headers.Authorization = `Bearer ${token}`;
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

    const rst: ApiResult = response?.data;
    if (rst && !rst.Succ && rst.Msg) {
      store.dispatch(
        'alert/setMsg',
        new Msg({
          show: true,
          type: 'error',
          msg: rst.Msg
        })
      );
    }

    return response;
  },
  (error: AxiosError) => {
    // 非 2xx 狀態碼觸發該函數
    // ex: token expired, logout
    let msg = setNdbApiError(error).Msg;

    if (error.response?.status === 401) {
      // alert(`重新登入：${err.response?.data.Msg}`);
      msg = `重新登入：${msg}`;
    }

    if (!axios.isCancel(error)) {
      store.dispatch(
        'alert/setMsg',
        new Msg({
          show: true,
          type: 'error',
          msg
        })
      );
    }

    if (error.response?.status === 401) store.dispatch('auth/logout');
    return Promise.reject(error);
  }
);

/** opStateApi response no specific json */
const opStateApi = new BaseApi(apiUrl.opState, setComApiError);
opStateApi.axios.interceptors.response.use(
  response => {
    // 2xx 狀態碼觸發該函數
    return response;
  },
  (error: AxiosError) => {
    // 非 2xx 狀態碼觸發該函數
    const msg = setComApiError(error);

    if (!axios.isCancel(error)) {
      store.dispatch(
        'alert/setMsg',
        new Msg({
          show: true,
          type: 'error',
          msg
        })
      );
    }

    return Promise.reject(error);
  }
);

/** hrApi response no specific json */
const hrApi = new BaseApi(apiUrl.hr, setComApiError);
hrApi.axios.interceptors.response.use(
  response => {
    // 2xx 狀態碼觸發該函數
    return response;
  },
  (error: AxiosError) => {
    // 非 2xx 狀態碼觸發該函數
    const msg = setComApiError(error);

    if (!axios.isCancel(error)) {
      store.dispatch(
        'alert/setMsg',
        new Msg({
          show: true,
          type: 'error',
          msg
        })
      );
    }

    return Promise.reject(error);
  }
);

export { ndbApi, opStateApi, hrApi };
