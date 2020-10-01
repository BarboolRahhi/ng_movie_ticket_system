import { Theater } from './theater';

export class Movie {
  constructor(
    public movieId: number,
    public movieName: string,
    public movieGenre: string,
    public movieDirector: string,
    public movieLength: number,
    public languages: Array<string>,
    public movieReleaseDate: string,
    public theater: Theater
  ) {}
}
