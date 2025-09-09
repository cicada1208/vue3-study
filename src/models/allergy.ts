export class Allergy {
  ptEncounterID: string = '';
  PT_NO: string = '';
  AllergyType: string = '';
  PRSNO: string = '';
  PRSNAME: string = '';
  MD_MAN: string = '';
  MD_PC: string = '';
  MD_Version: string = '';
  MD_DT: string = '';
  MD_TIME: string = '';
  AllergyTypeName: string = '';

  constructor(data?: Partial<Allergy>) {
    Object.assign(this, data);
  }
}
