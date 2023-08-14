export default {
  dev: {
    ndb: 'http://localhost:9977/',
    opState: 'https://webf00.cych.org.tw/OPStateApi/',
    hr: 'https://webf00.cych.org.tw/HrApi/'
  },
  test: {
    // 測試區
    ndb: 'https://webf00.cych.org.tw/NursingDashboardApi',
    opState: 'https://webf00.cych.org.tw/OPStateApi/',
    hr: 'https://webf00.cych.org.tw/HrApi/'
  },
  prod: {
    // 正式區
    ndb: 'https://webf.cych.org.tw/NursingDashboardApi',
    opState: 'https://webf.cych.org.tw/OPStateApi/',
    hr: 'https://webf.cych.org.tw/HrApi/'
  }
};
