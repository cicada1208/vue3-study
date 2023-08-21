export interface IAllergy {
  ptEncounterID?: string;
  PT_NO?: string;
  AllergyType?: string;
  PRSNO?: string;
  PRSNAME?: string;
  MD_MAN?: string;
  MD_PC?: string;
  MD_Version?: string;
  MD_DT?: string;
  MD_TIME?: string;
  AllergyTypeName?: string;
}

export default class Allergy implements IAllergy {
  ptEncounterID: string;
  PT_NO: string;
  AllergyType: string;
  PRSNO: string;
  PRSNAME: string;
  MD_MAN: string;
  MD_PC: string;
  MD_Version: string;
  MD_DT: string;
  MD_TIME: string;
  AllergyTypeName: string;

  constructor({
    ptEncounterID = '',
    PT_NO = '',
    AllergyType = '',
    PRSNO = '',
    PRSNAME = '',
    MD_MAN = '',
    MD_PC = '',
    MD_Version = '',
    MD_DT = '',
    MD_TIME = '',
    AllergyTypeName = ''
  }: IAllergy = {}) {
    this.ptEncounterID = ptEncounterID;
    this.PT_NO = PT_NO;
    this.AllergyType = AllergyType;
    this.PRSNO = PRSNO;
    this.PRSNAME = PRSNAME;
    this.MD_MAN = MD_MAN;
    this.MD_PC = MD_PC;
    this.MD_Version = MD_Version;
    this.MD_DT = MD_DT;
    this.MD_TIME = MD_TIME;
    this.AllergyTypeName = AllergyTypeName;
  }
}
