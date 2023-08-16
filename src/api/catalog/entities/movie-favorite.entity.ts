import { MovieStatus } from 'src/common/types/movie-status.type';
import { Column, Entity, JoinColumn, PrimaryColumn } from 'typeorm';

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

  @JoinColumn()
  user: string;
}
