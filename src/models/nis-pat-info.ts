import type { Allergy } from './allergy';
import type { Ch_dnr } from './ch-dnr';

export class NisPatInfo {
  ptEncounterId: string = '';
  hisIpdNo: string = '';
  BeginDt: string = '';
  EndDt: string = '';
  Days: number | null = null;
  Vs1Name: string = '';
  Vs1No: string = '';
  Vs2Name: string = '';
  Vs2No: string = '';
  encDiagNo1: string = '';
  encDiagCh1: string = '';
  encDiagEn1: string = '';
  encDiagNo2: string = '';
  encDiagCh2: string = '';
  encDiagEn2: string = '';
  encDiagNo3: string = '';
  encDiagCh3: string = '';
  encDiagEn3: string = '';
  encDiagNo4: string = '';
  encDiagCh4: string = '';
  encDiagEn4: string = '';
  encDiagNo5: string = '';
  encDiagCh5: string = '';
  encDiagEn5: string = '';
  odrDiag: string = '';
  PatNo: string = '';
  PatIdNo: string = '';
  PatName: string = '';
  PatBirth: string = '';
  PatAge: string = '';
  PatGender: string = '';
  PatBloodType: string = '';
  PatBloodRh: string = '';
  clinicalUnitId: string = '';
  clinicalHisId: string = '';
  bedId: string = '';
  bedLabel: string = '';
  bedLabelClinical: string = '';
  bedLabelNo: string = '';
  Icu: boolean | null = null;
  TsmitGrade: string = '';
  DNR: Array<Ch_dnr> = [];
  Blood: boolean | null = null;
  Allergy: Array<Allergy> = [];
  FallTotalGrade: number | null = null;
  BedSoresTotalGrade: number | null = null;
  Cough: boolean | null = null;
  Fever: boolean | null = null;
  Infectious: boolean | null = null;
  DHRL: string = '';
  ESS: string = '';
  CAS: string = '';
  EndoTr: boolean | null = null;
  CVC: string = '';
  Foley: string = '';
  ChestTube: string = '';
  DLHick: boolean | null = null;
  O2: string = '';
  Restraint: boolean | null = null;
  TransferType: string = '';
  TransferBedLabel: string = '';
  TransferTool: string = '';
  RASS: number | null = null;
  /** 是否譫妄 Y:譫妄 N:沒有譫妄 U:無法評估 */
  CAM: string = '';
  Pain: string = '';
  HR: number | null = null;
  AP2: string = '';

  constructor(data?: Partial<NisPatInfo>) {
    Object.assign(this, data);
  }
}
