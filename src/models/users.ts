export interface IUsers {
  userId?: string;
  loginId?: string;
  userName?: string;
  userTerseName?: string;
  employeeNo?: string;
  employeeDept?: string;
  proTitleId?: string;
  proTitleLevelId?: string;
  isService?: boolean;
  isTester?: boolean;
  dimission?: string;
  DutyCode?: string;
  empCategory?: string;
  isActive?: boolean;
  systemUserId?: string;
  systemDt?: Date;
  password?: string;
  token?: string;
  loggedIn?: boolean;
}

export default class Users implements IUsers {
  userId: string;
  loginId: string;
  userName: string;
  userTerseName: string;
  employeeNo: string;
  employeeDept: string;
  proTitleId: string;
  proTitleLevelId: string;
  isService: boolean;
  isTester: boolean;
  dimission: string;
  DutyCode: string;
  empCategory: string;
  isActive: boolean;
  systemUserId: string;
  systemDt: Date;
  password: string;
  token: string;
  loggedIn: boolean;

  constructor({
    userId = '',
    loginId = '',
    userName = '',
    userTerseName = '',
    employeeNo = '',
    employeeDept = '',
    proTitleId = '',
    proTitleLevelId = '',
    isService = null,
    isTester = null,
    dimission = '',
    DutyCode = '',
    empCategory = '',
    isActive = null,
    systemUserId = '',
    systemDt = null,
    password = '',
    token = '',
    loggedIn = null
  }: IUsers = {}) {
    this.userId = userId;
    this.loginId = loginId;
    this.userName = userName;
    this.userTerseName = userTerseName;
    this.employeeNo = employeeNo;
    this.employeeDept = employeeDept;
    this.proTitleId = proTitleId;
    this.proTitleLevelId = proTitleLevelId;
    this.isService = isService;
    this.isTester = isTester;
    this.dimission = dimission;
    this.DutyCode = DutyCode;
    this.empCategory = empCategory;
    this.isActive = isActive;
    this.systemUserId = systemUserId;
    this.systemDt = systemDt;
    this.password = password;
    this.token = token;
    this.loggedIn = loggedIn;
    if (this.loggedIn === undefined || this.loggedIn === null)
      this.loggedIn = this.loginId ? true : false; // this.loggedIn = this.token ? true : false;
  }
}
