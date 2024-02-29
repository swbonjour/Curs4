import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  username: string;

  @Column({ type: 'text' })
  hash: string;

  @Column({ default: false, type: 'boolean' })
  is_admin: boolean;

  @Column({ default: 0, type: 'integer' })
  score: number;
}
