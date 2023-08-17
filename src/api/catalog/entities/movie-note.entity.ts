import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import { User } from '../../users/entities/user.entity';

@Entity({ name: 'movie_notes' })
export class MovieNote {
  @PrimaryColumn()
  id: number;

  @Column({
    type: 'text',
  })
  note: string;

  @ManyToOne(() => User, (user) => user, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'user_id' })
  user: string;
}
