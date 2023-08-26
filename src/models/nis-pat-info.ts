import type { Allergy } from './allergy';
import type { Ch_dnr } from './ch-dnr';

export interface INisPatInfo {
  ptEncounterId?: string;
  hisIpdNo?: string;
  BeginDt?: string;
  EndDt?: string;
  Days?: number;
  Vs1Name?: string;
  Vs1No?: string;
  Vs2Name?: string;
  Vs2No?: string;
  encDiagNo1?: string;
  encDiagCh1?: string;
  encDiagEn1?: string;
  encDiagNo2?: string;
  encDiagCh2?: string;
  encDiagEn2?: string;
  encDiagNo3?: string;
  encDiagCh3?: string;
  encDiagEn3?: string;
  encDiagNo4?: string;
  encDiagCh4?: string;
  encDiagEn4?: string;
  encDiagNo5?: string;
  encDiagCh5?: string;
  encDiagEn5?: string;
  odrDiag?: string;
  PatNo?: string;
  PatIdNo?: string;
  PatName?: string;
  PatBirth?: string;
  PatAge?: string;
  PatGender?: string;
  PatBloodType?: string;
  PatBloodRh?: string;
  clinicalUnitId?: string;
  clinicalHisId?: string;
  bedId?: string;
  bedLabel?: string;
  bedLabelClinical?: string;
  bedLabelNo?: string;
  Icu?: boolean;
  TsmitGrade?: string;
  DNR?: Array<Ch_dnr>;
  Blood?: boolean;
  Allergy?: Array<Allergy>;
  FallTotalGrade?: number;
  BedSoresTotalGrade?: number;
  Cough?: boolean;
  Fever?: boolean;
  Infectious?: boolean;
  DHRL?: string;
  ESS?: string;
  CAS?: string;
  EndoTr?: boolean;
  CVC?: string;
  Foley?: string;
  ChestTube?: string;
  DLHick?: boolean;
  O2?: string;
  Restraint?: boolean;
  TransferType?: string;
  TransferBedLabel?: string;
  TransferTool?: string;
  RASS?: number;
  CAM?: string;
  Pain?: string;
  HR?: number;
  AP2?: string;
}

export class NisPatInfo implements INisPatInfo {
  ptEncounterId: string;
  hisIpdNo: string;
  BeginDt: string;
  EndDt: string;
  Days: number;
  Vs1Name: string;
  Vs1No: string;
  Vs2Name: string;
  Vs2No: string;
  encDiagNo1: string;
  encDiagCh1: string;
  encDiagEn1: string;
  encDiagNo2: string;
  encDiagCh2: string;
  encDiagEn2: string;
  encDiagNo3: string;
  encDiagCh3: string;
  encDiagEn3: string;
  encDiagNo4: string;
  encDiagCh4: string;
  encDiagEn4: string;
  encDiagNo5: string;
  encDiagCh5: string;
  encDiagEn5: string;
  odrDiag: string;
  PatNo: string;
  PatIdNo: string;
  PatName: string;
  PatBirth: string;
  PatAge: string;
  PatGender: string;
  PatBloodType: string;
  PatBloodRh: string;
  clinicalUnitId: string;
  clinicalHisId: string;
  bedId: string;
  bedLabel: string;
  bedLabelClinical: string;
  bedLabelNo: string;
  Icu: boolean;
  TsmitGrade: string;
  DNR: Array<Ch_dnr>;
  Blood: boolean;
  Allergy: Array<Allergy>;
  FallTotalGrade: number;
  BedSoresTotalGrade: number;
  Cough: boolean;
  Fever: boolean;
  Infectious: boolean;
  DHRL: string;
  ESS: string;
  CAS: string;
  EndoTr: boolean;
  CVC: string;
  Foley: string;
  ChestTube: string;
  DLHick: boolean;
  O2: string;
  Restraint: boolean;
  TransferType: string;
  TransferBedLabel: string;
  TransferTool: string;
  RASS: number;
  /** 是否譫妄 Y:譫妄 N:沒有譫妄 U:無法評估 */
  CAM: string;
  Pain: string;
  HR: number;
  AP2: string;

  constructor({
    ptEncounterId = '',
    hisIpdNo = '',
    BeginDt = '',
    EndDt = '',
    Days = null,
    Vs1Name = '',
    Vs1No = '',
    Vs2Name = '',
    Vs2No = '',
    encDiagNo1 = '',
    encDiagCh1 = '',
    encDiagEn1 = '',
    encDiagNo2 = '',
    encDiagCh2 = '',
    encDiagEn2 = '',
    encDiagNo3 = '',
    encDiagCh3 = '',
    encDiagEn3 = '',
    encDiagNo4 = '',
    encDiagCh4 = '',
    encDiagEn4 = '',
    encDiagNo5 = '',
    encDiagCh5 = '',
    encDiagEn5 = '',
    odrDiag = '',
    PatNo = '',
    PatIdNo = '',
    PatName = '',
    PatBirth = '',
    PatAge = '',
    PatGender = '',
    PatBloodType = '',
    PatBloodRh = '',
    clinicalUnitId = '',
    clinicalHisId = '',
    bedId = '',
    bedLabel = '',
    bedLabelClinical = '',
    bedLabelNo = '',
    Icu = null,
    TsmitGrade = '',
    DNR = [],
    Blood = null,
    Allergy = [],
    FallTotalGrade = null,
    BedSoresTotalGrade = null,
    Cough = null,
    Fever = null,
    Infectious = null,
    DHRL = '',
    ESS = '',
    CAS = '',
    EndoTr = null,
    CVC = '',
    Foley = '',
    ChestTube = '',
    DLHick = null,
    O2 = '',
    Restraint = null,
    TransferType = '',
    TransferBedLabel = '',
    TransferTool = '',
    RASS = null,
    CAM = '',
    Pain = '',
    HR = null,
    AP2 = ''
  }: INisPatInfo = {}) {
    this.ptEncounterId = ptEncounterId;
    this.hisIpdNo = hisIpdNo;
    this.BeginDt = BeginDt;
    this.EndDt = EndDt;
    this.Days = Days;
    this.Vs1Name = Vs1Name;
    this.Vs1No = Vs1No;
    this.Vs2Name = Vs2Name;
    this.Vs2No = Vs2No;
    this.encDiagNo1 = encDiagNo1;
    this.encDiagCh1 = encDiagCh1;
    this.encDiagEn1 = encDiagEn1;
    this.encDiagNo2 = encDiagNo2;
    this.encDiagCh2 = encDiagCh2;
    this.encDiagEn2 = encDiagEn2;
    this.encDiagNo3 = encDiagNo3;
    this.encDiagCh3 = encDiagCh3;
    this.encDiagEn3 = encDiagEn3;
    this.encDiagNo4 = encDiagNo4;
    this.encDiagCh4 = encDiagCh4;
    this.encDiagEn4 = encDiagEn4;
    this.encDiagNo5 = encDiagNo5;
    this.encDiagCh5 = encDiagCh5;
    this.encDiagEn5 = encDiagEn5;
    this.odrDiag = odrDiag;
    this.PatNo = PatNo;
    this.PatIdNo = PatIdNo;
    this.PatName = PatName;
    this.PatBirth = PatBirth;
    this.PatAge = PatAge;
    this.PatGender = PatGender;
    this.PatBloodType = PatBloodType;
    this.PatBloodRh = PatBloodRh;
    this.clinicalUnitId = clinicalUnitId;
    this.clinicalHisId = clinicalHisId;
    this.bedId = bedId;
    this.bedLabel = bedLabel;
    this.bedLabelClinical = bedLabelClinical;
    this.bedLabelNo = bedLabelNo;
    this.Icu = Icu;
    this.TsmitGrade = TsmitGrade;
    this.DNR = DNR;
    this.Blood = Blood;
    this.Allergy = Allergy;
    this.FallTotalGrade = FallTotalGrade;
    this.BedSoresTotalGrade = BedSoresTotalGrade;
    this.Cough = Cough;
    this.Fever = Fever;
    this.Infectious = Infectious;
    this.DHRL = DHRL;
    this.ESS = ESS;
    this.CAS = CAS;
    this.EndoTr = EndoTr;
    this.CVC = CVC;
    this.Foley = Foley;
    this.ChestTube = ChestTube;
    this.DLHick = DLHick;
    this.O2 = O2;
    this.Restraint = Restraint;
    this.TransferType = TransferType;
    this.TransferBedLabel = TransferBedLabel;
    this.TransferTool = TransferTool;
    this.RASS = RASS;
    this.CAM = CAM;
    this.Pain = Pain;
    this.HR = HR;
    this.AP2 = AP2;
  }
}
