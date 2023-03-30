export type MsgType = true | false | 'success' | 'error' | 'warning' | 'info';

export interface IMsg {
  show?: boolean;
  type?: MsgType;
  msg?: string;
  timeout?: number;
  top?: boolean;
  centered?: boolean;
  bottom?: boolean;
}

export default class Msg implements IMsg {
  show: boolean;
  type: MsgType;
  msg: string;
  timeout: number;
  top: boolean;
  centered: boolean;
  bottom: boolean;

  constructor({
    show = false,
    type = false,
    msg = '',
    timeout = 5000,
    top = true,
    centered = false,
    bottom = false
  }: IMsg = {}) {
    this.show = show;
    this.type = type;
    this.msg = msg;
    this.timeout = timeout;
    this.top = centered || bottom ? false : top;
    this.centered = centered;
    this.bottom = bottom;
  }
}
