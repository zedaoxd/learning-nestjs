import { UUID } from 'crypto';

export class UserEntity {
  id: UUID;
  name: string;
  email: string;
  password: string;
  created: Date;
  updated: Date;
}
