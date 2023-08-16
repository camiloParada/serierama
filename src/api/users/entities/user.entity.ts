import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UUIDVersion } from 'class-validator';
import { Exclude } from 'class-transformer';
import { v4 as uuid4 } from 'uuid';

import { UserStatus } from 'src/common/types/user-status.type';

@Entity({ name: 'adm_users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: UUIDVersion;

  @BeforeInsert()
  generateUuid() {
    this.id = uuid4().replace(/-/g, '').toUpperCase();
  }

  @Column()
  fullname: string;

  @Column({
    type: 'varchar',
    length: 80,
    unique: true,
  })
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.active,
  })
  status: string;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    name: 'updated_at',
    type: 'timestamp',
    onUpdate: 'CURRENT_TIMESTAMP',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
