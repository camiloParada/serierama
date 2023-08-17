import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import { User } from '../../users/entities/user.entity';

@Entity({ name: 'movie_ratings' })
export class MovieRating {
  @PrimaryColumn()
  id: number;

  @Column({
    type: 'float',
  })
  rating: number;

  @ManyToOne(() => User, (user) => user, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'user_id' })
  user: string;
}
