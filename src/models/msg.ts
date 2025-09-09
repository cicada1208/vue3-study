export type MsgType = true | false | 'success' | 'error' | 'warning' | 'info';

export class Msg {
  show: boolean = false;
  type: MsgType = false;
  msg: string = '';
  timeout: number = 5000;
  top: boolean = true;
  centered: boolean = false;
  bottom: boolean = false;

  constructor(data?: Partial<Msg>) {
    Object.assign(this, data);
    if (data) this.top = this.centered || this.bottom ? false : this.top;
  }
}
