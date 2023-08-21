export interface ICh_dnr {
  dnr_pat_idno?: string;
  dnr_tbl_type?: string;
  dnr_pat_no?: number;
  dnr_tbl?: string;
  dnr_filler?: string;
  A4GLIdentity?: number;
  no143?: string;
  no144?: string;
  no145?: string;
  no146?: string;
  no147?: string;
  no148?: string;
  no149?: string;
  no150?: string;
  dnr_type?: string;
  dnr_info?: string;
  dnr_sign_dt?: string;
  dnr_chk_item?: Array<string>;
}

export default class Ch_dnr implements ICh_dnr {
  dnr_pat_idno: string;
  dnr_tbl_type: string;
  dnr_pat_no: number;
  dnr_tbl: string;
  dnr_filler: string;
  A4GLIdentity: number;
  no143: string;
  no144: string;
  no145: string;
  no146: string;
  no147: string;
  no148: string;
  no149: string;
  no150: string;
  dnr_type: string;
  dnr_info: string;
  dnr_sign_dt: string;
  dnr_chk_item: Array<string>;

  constructor({
    dnr_pat_idno = '',
    dnr_tbl_type = '',
    dnr_pat_no = null,
    dnr_tbl = '',
    dnr_filler = '',
    A4GLIdentity = null,
    no143 = '',
    no144 = '',
    no145 = '',
    no146 = '',
    no147 = '',
    no148 = '',
    no149 = '',
    no150 = '',
    dnr_type = '',
    dnr_info = '',
    dnr_sign_dt = '',
    dnr_chk_item = []
  }: ICh_dnr = {}) {
    this.dnr_pat_idno = dnr_pat_idno;
    this.dnr_tbl_type = dnr_tbl_type;
    this.dnr_pat_no = dnr_pat_no;
    this.dnr_tbl = dnr_tbl;
    this.dnr_filler = dnr_filler;
    this.A4GLIdentity = A4GLIdentity;
    this.no143 = no143;
    this.no144 = no144;
    this.no145 = no145;
    this.no146 = no146;
    this.no147 = no147;
    this.no148 = no148;
    this.no149 = no149;
    this.no150 = no150;
    this.dnr_type = dnr_type;
    this.dnr_info = dnr_info;
    this.dnr_sign_dt = dnr_sign_dt;
    this.dnr_chk_item = dnr_chk_item;
  }
}
