export class Users {
  userId: string = '';
  loginId: string = '';
  userName: string = '';
  userTerseName: string = '';
  employeeNo: string = '';
  employeeDept: string = '';
  proTitleId: string = '';
  proTitleLevelId: string = '';
  isService: boolean | null = null;
  isTester: boolean | null = null;
  dimission: string = '';
  DutyCode: string = '';
  empCategory: string = '';
  isActive: boolean | null = null;
  systemUserId: string = '';
  systemDt: Date | null = null;
  password: string = '';
  token: string = '';
  loggedIn: boolean | null = null;

  constructor(data?: Partial<Users>) {
    Object.assign(this, data);
    if (this.loggedIn === null) this.loggedIn = this.loginId ? true : false;
  }
}
