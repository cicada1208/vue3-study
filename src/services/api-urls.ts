export type AppRun = 'dev' | 'test' | 'prod';

export interface IApiUrl {
  ndb: string;
  hr: string;
}

export const apiUrls: Record<AppRun, IApiUrl> = {
  dev: {
    ndb: 'https://webf00.cych.org.tw/NursingDashboardApi/', //'http://localhost:9977/',
    hr: ''
  },
  test: {
    // 測試區
    ndb: '',
    hr: ''
  },
  prod: {
    // 正式區
    ndb: '',
    hr: ''
  }
};
