export class JwtResponse {
  constructor(
    public email: string,
    public token: string,
    public type: string
  ) {}
}
