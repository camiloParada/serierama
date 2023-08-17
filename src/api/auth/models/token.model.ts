import { UUIDVersion } from 'class-validator';

export interface PayloadToken {
  id: UUIDVersion;
  name: string;
}
