export class Ch_dnr {
  dnr_pat_idno: string = '';
  dnr_tbl_type: string = '';
  dnr_pat_no: number | null = null;
  dnr_tbl: string = '';
  dnr_filler: string = '';
  A4GLIdentity: number | null = null;
  no143: string = '';
  no144: string = '';
  no145: string = '';
  no146: string = '';
  no147: string = '';
  no148: string = '';
  no149: string = '';
  no150: string = '';
  dnr_type: string = '';
  dnr_info: string = '';
  dnr_sign_dt: string = '';
  dnr_chk_item: Array<string> = [];

  constructor(data?: Partial<Ch_dnr>) {
    Object.assign(this, data);
  }
}
