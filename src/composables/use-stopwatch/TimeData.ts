type DataList = [number, number, number, number]
type FormatCallback = (data: number) => string

export class TimeData {
  ms: number;
  s: number;
  m: number;
  hr: number;

  constructor(data: DataList = [0, 0, 0, 0]) {
    [this.ms, this.s, this.m, this.hr] = data
  }

  public formatTime(cl: FormatCallback, separator: string) {
    return [
      cl(this.hr),
      cl(this.m),
      cl(this.s),
      cl(this.ms)
    ].join(separator)
  }
}
