export type AppRun = 'dev' | 'test' | 'prod';

export interface IApiUrl {
  ndb: string;
  hr: string;
}

export const apiUrls: Record<AppRun, IApiUrl> = {
  dev: {
    ndb: 'https://webf00.cych.org.tw/NursingDashboardApi/', //'http://localhost:9977/',
    hr: 'https://webf00.cych.org.tw/HrApi/'
  },
  test: {
    // 測試區
    ndb: 'https://webf00.cych.org.tw/NursingDashboardApi/',
    hr: 'https://webf00.cych.org.tw/HrApi/'
  },
  prod: {
    // 正式區
    ndb: 'https://webf.cych.org.tw/NursingDashboardApi/',
    hr: 'https://webf.cych.org.tw/HrApi/'
  }
};
