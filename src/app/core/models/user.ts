import { Role } from './role';

export class User {
  constructor(
    public userId: number,
    public username: string,
    public email: string,
    public password: string,
    public contact: string,
    public roles: Array<Role>
  ) {}
}
