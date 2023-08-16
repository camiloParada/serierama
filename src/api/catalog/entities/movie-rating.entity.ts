import { Column, Entity, JoinColumn, PrimaryColumn } from 'typeorm';

@Entity({ name: 'movie_ratings' })
export class MovieRating {
  @PrimaryColumn()
  id: number;

  @Column({
    type: 'float',
  })
  rating: number;

  @JoinColumn()
  user: string;
}
