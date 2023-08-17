import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import { MovieStatus } from '../../../common/types/movie-status.type';
import { User } from '../../users/entities/user.entity';

@Entity({ name: 'movie_favorites' })
export class MovieFavorite {
  @PrimaryColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: MovieStatus,
    default: MovieStatus.active,
  })
  status: string;

  @ManyToOne(() => User, (user) => user, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'user_id' })
  user: string;
}
