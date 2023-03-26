import { v4 as uuidv4 } from 'uuid';

// This object used with reactive array, so i use _ prefix for private properties,
// not #, becouse it trigger error with proxi
export class TimerUnit {
  private _id: string

  public elapsed: number

  constructor(elapsed: number) {
    this.elapsed = elapsed

    this._id = uuidv4()
  }

  get id() {
    return this._id
  }
}
