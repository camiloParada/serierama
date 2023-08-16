import { Column, Entity, JoinColumn, PrimaryColumn } from 'typeorm';

@Entity({ name: 'movie_notes' })
export class MovieNote {
  @PrimaryColumn()
  id: number;

  @Column({
    type: 'text',
  })
  note: string;

  @JoinColumn()
  user: string;
}
