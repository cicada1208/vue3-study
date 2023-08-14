export default {
  Login: {
    PostLogin: 'Login/'
  },
  Users: {
    /** 人員資料 */
    Controller: 'Users/',
    /** 查詢人員資料
     * - 1: 依參數自動組建
     */
    GetUsers: 'Users/',
    /** 查詢護理電子白板人員資料 */
    GetNdbUser: 'Users/GetNdbUser/'
  },
  NisPatInfo: {
    /** 查詢病人資料卡
     * - 1: 依護理站
     * - 2: 依床號
     */
    GetNisPatInfo: 'NisPatInfo/'
  },
  FallASE_Adult: {
    /** 跌倒 */
    Controller: 'FallASE_Adult/',
    /** 依NIS住院序號，查詢最新跌倒資料 */
    GetLatestFallASEItem: 'FallASE_Adult/GetLatestFallASEItem/'
  },
  BedSoresASE: {
    /** 壓力性損傷 */
    Controller: 'BedSoresASE/',
    /** 依NIS住院序號，查詢最新壓力性損傷資料 */
    GetLatestBedSoresASEItem: 'BedSoresASE/GetLatestBedSoresASEItem/'
  },
  TubeMag: {
    /** 管路管理 */
    Controller: 'TubeMag/',
    /** 查詢管路管理
     * - 1: 依參數自動組建
     * - 2: 依NIS住院序號、三管種類，查詢未結管路
     * - 3: 依NIS住院序號，查詢未結Chest tube
     * - 4: 依NIS住院序號、三管種類，查詢是否有未結管路
     * - 5: 依NIS住院序號，查詢是否有未結DL./Hickman
     */
    GetTubeMag: 'TubeMag/',
    /** 查詢管路管理報表
     * - 1: 依參數自動組建
     * - 2: 依NIS住院序號、記錄日期起迄、管路或三管種類、結案狀態
     */
    GetTubeMagRpt: 'TubeMag/GetTubeMagRpt/'
  },
  RestraintMag: {
    /** 約束管理 */
    Controller: 'RestraintMag/',
    /** 查詢約束管理
     * - 1: 依參數自動組建
     * - 2: 依NIS住院序號，查詢是否有未結約束
     */
    GetRestraintMag: 'RestraintMag/',
    /** 查詢約束管理報表
     * - 1: 依參數自動組建
     * - 2: 依NIS住院序號、記錄日期起迄、結案狀態
     */
    GetRestraintMagRpt: 'RestraintMag/GetRestraintMagRpt/'
  },
  ClinicalUnit: {
    /** 護理站 */
    Controller: 'ClinicalUnit/',
    /** 查詢護理站
     * - 1: 依參數自動組建
     * - 2: 查詢臨床單位：病房 、加護、急診
     */
    GetClinicalUnit: 'ClinicalUnit/',
    /** 查詢我的臨床單位
     * - 1: 我的臨床單位：病房 、加護、急診
     * - 2: 我的臨床單位置頂及其他單位：病房 、加護、急診
     */
    GetMyClinicalUnit: 'ClinicalUnit/GetMyClinicalUnit/'
  },
  Bed: {
    /** 床位 */
    Controller: 'Bed/',
    /** 查詢床位
     * - 1: 依參數自動組建
     * - 2: 依護理站，查詢床位資訊
     */
    GetBed: 'Bed/',
    /** 查詢床位資訊
     * - 2: 依護理站，查詢床位資訊
     */
    GetBedInfo: 'Bed/GetBedInfo/'
  },
  VitalSign: {
    /** VitalSign */
    Controller: 'VitalSign/',
    /** 查詢 VitalSign 報表
     * - 1: 依參數自動組建
     * - 2: 依NIS住院序號、評估日期區間
     */
    GetVitalSignRpt: 'VitalSign/GetVitalSignRpt/'
  },
  Mi_mbed: {
    /** Mi_mbed */
    Controller: 'Mi_mbed/',
    /** 查詢科別床動態 */
    GetBedPatDpt: 'Mi_mbed/GetBedPatDpt/',
    /** 查詢不排床註記 */
    GetLockBed: 'Mi_mbed/GetLockBed/',
    /** 查詢預住/轉入 */
    GetTranIn: 'Mi_mbed/GetTranIn/',
    /** 查詢內轉床 */
    GetTranInternal: 'Mi_mbed/GetTranInternal/',
    /** 查詢預出/出院/轉出 */
    GetTranOut: 'Mi_mbed/GetTranOut/'
  },
  CSAssignMain: {
    /** 查詢護理組別 */
    GetCSAssignGroup: 'CSAssignMain/GetCSAssignGroup/'
  },
  MedicalTeam: {
    /** 查詢護理站醫療團隊 */
    GetMedicalTeam: 'MedicalTeam/GetMedicalTeam/',
    /** 查詢值班 */
    GetDrDutySchedule: 'MedicalTeam/GetDrDutySchedule/',
    /** 查詢災難協助 */
    GetDisasterAssistance: 'MedicalTeam/GetDisasterAssistance/'
  },
  TeamNote: {
    /** 團隊說明 */
    Controller: 'TeamNote/'
  },
  TeamContact: {
    /** 團隊聯繫 */
    Controller: 'TeamContact/'
  },
  RecShortCode: {
    /** 設定檔 */
    Controller: 'RecShortCode/',
    /** 查詢設定檔
     * - 1: 依參數自動組建
     * - 2: 依RECMODEL、CODEVER，查詢最新版本選項
     */
    GetRecShortCode: 'RecShortCode/'
  },
  Operation: {
    /** 查詢護理站手術 */
    GetUnitPatientOPListExt: 'Operation/GetUnitPatientOPListExt/'
  }
};
