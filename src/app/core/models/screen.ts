import { Theater } from './theater';

export class Screen {
  constructor(
    public screenId: number,
    public screenName: string,
    public rows: number,
    public columns: number,
    public theater: Theater
  ) {}
}
